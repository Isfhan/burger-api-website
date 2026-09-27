import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sidebars from "../sidebars";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DOCS_DIR = resolve(ROOT, "docs");
const STATIC_DIR = resolve(ROOT, "static");
const CONFIG_FILE = resolve(ROOT, "docusaurus.config.ts");

const SITE_URL = "https://burger-api.com";
const DOCS_URL = `${SITE_URL}/docs`;

const SMALL_DOC_IDS = [
  "intro",
  "quick-start",
  "getting-started/installation",
  "key-concepts",
  "core-concepts/routing",
  "validation/zod",
  "hooks/system",
  "api/request-api",
  "api/response-mutation",
  "getting-started/cli",
  "advanced/deployment",
];

const SIDEBAR_ROOTS: Record<string, string> = {
  tutorialSidebar: "Overview",
  tutorialsSidebar: "Tutorials",
};

interface Doc {
  id: string;
  url: string;
  title: string;
  heading: string;
  description: string;
  content: string;
}

interface SidebarItem {
  type?: string;
  id?: string;
  label?: string;
  items?: SidebarItem[];
}

interface OrderedDoc {
  id: string;
  group: string;
}

function listDocs(dir: string, prefix: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...listDocs(resolve(dir, entry.name), rel));
    else if (/\.mdx?$/.test(entry.name)) files.push(rel);
  }
  return files;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function extractHeading(body: string): { heading: string | null; rest: string } {
  const lines = body.split(/\r?\n/);
  const index = lines.findIndex((line) => line.trim() !== "");
  if (index === -1) return { heading: null, rest: body };
  const match = lines[index].match(/^#\s+(.+)$/);
  if (!match) return { heading: null, rest: body };
  lines.splice(index, 1);
  return { heading: match[1].trim(), rest: lines.join("\n") };
}

function cleanInline(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\u2192/g, "->")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(body: string): string {
  const lines = body.split(/\r?\n/);
  let index = 0;
  let collected: string[] = [];
  for (; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) {
      if (collected.length) break;
      continue;
    }
    if (
      line.startsWith("#") ||
      line.startsWith("```") ||
      line.startsWith("~~~") ||
      line.startsWith(":::")
    ) {
      if (collected.length) break;
      continue;
    }
    collected.push(line);
  }
  let text = cleanInline(collected.join(" ")).replace(/^[-*+]\s+/, "");
  const sentence = text.match(/^.+?[.!?](?=\s|$)/);
  if (sentence) text = sentence[0];
  if (text.length > 220) text = `${text.slice(0, 217).replace(/\s+\S*$/, "")}...`;
  return text;
}

function docUrl(id: string, slug?: string): string {
  if (slug !== undefined) {
    if (slug === "/") return `${DOCS_URL}/`;
    return `${DOCS_URL}/${slug.replace(/^\/+/, "")}`;
  }
  return `${DOCS_URL}/${id}`;
}

function resolveTarget(target: string, fromId: string, docsById: Map<string, Doc>): string | null {
  if (/^(https?:)?\/\//.test(target) || /^(mailto|tel):/.test(target)) return null;
  if (target.startsWith("#")) return null;
  const hashIndex = target.indexOf("#");
  const path = hashIndex === -1 ? target : target.slice(0, hashIndex);
  const anchor = hashIndex === -1 ? "" : target.slice(hashIndex);
  if (!path) return null;
  if (path.startsWith("/")) return `${SITE_URL}${path}${anchor}`;
  const fromDir = fromId.includes("/") ? fromId.slice(0, fromId.lastIndexOf("/")) : "";
  let resolved = posix.normalize(posix.join(fromDir, path));
  if (resolved.startsWith("..")) return null;
  const ext = posix.extname(resolved);
  if (ext === ".md" || ext === ".mdx") resolved = resolved.slice(0, -ext.length);
  const doc = docsById.get(resolved);
  if (doc) return `${doc.url}${anchor}`;
  return null;
}

function convertLinks(line: string, fromId: string, docsById: Map<string, Doc>): string {
  return line.replace(/\]\(([^()\s]+)\)/g, (whole, target: string) => {
    const url = resolveTarget(target, fromId, docsById);
    return url ? `](${url})` : whole;
  });
}

function transformBody(body: string, fromId: string, docsById: Map<string, Doc>): string {
  const lines = body.split(/\r?\n/);
  const out: string[] = [];
  let fence: { char: string; length: number } | null = null;
  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      out.push(line);
      if (fenceMatch && fenceMatch[1][0] === fence.char && fenceMatch[1].length >= fence.length) {
        fence = null;
      }
      continue;
    }
    if (fenceMatch) {
      fence = { char: fenceMatch[1][0], length: fenceMatch[1].length };
      out.push(line);
      continue;
    }
    if (/^(import|export)\b/.test(line)) continue;
    if (/^\s*<\/?[A-Z][A-Za-z0-9]*[\s/>]/.test(line)) continue;
    out.push(convertLinks(line, fromId, docsById));
  }
  return out
    .join("\n")
    .replace(/\u2192/g, "->")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function walkSidebar(
  items: SidebarItem[],
  currentGroup: string,
  out: OrderedDoc[],
  topLevel: boolean,
): void {
  for (const item of items) {
    if (typeof item === "string") {
      out.push({ id: item, group: currentGroup });
      continue;
    }
    if (!item || typeof item !== "object") continue;
    if (item.type === "category" && Array.isArray(item.items)) {
      const nextGroup = topLevel ? item.label || currentGroup : currentGroup;
      walkSidebar(item.items, nextGroup, out, false);
      continue;
    }
    if (item.type === "doc" && item.id) out.push({ id: item.id, group: currentGroup });
  }
}

function loadDocs(): { ordered: OrderedDoc[]; docsById: Map<string, Doc> } {
  const files = listDocs(DOCS_DIR, "");
  const docsById = new Map<string, Doc>();
  const bodies = new Map<string, string>();

  for (const rel of files) {
    const id = rel.replace(/\.mdx?$/, "");
    const raw = readFileSync(resolve(DOCS_DIR, rel), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const { heading, rest } = extractHeading(body);
    const title = data.title || data.sidebar_label || heading || id;
    docsById.set(id, {
      id,
      url: docUrl(id, data.slug),
      title,
      heading: heading || title,
      description: data.description || firstParagraph(rest) || title,
      content: "",
    });
    bodies.set(id, rest);
  }

  for (const [id, doc] of docsById) {
    doc.content = transformBody(bodies.get(id) ?? "", id, docsById);
  }

  const ordered: OrderedDoc[] = [];
  const seen = new Set<string>();
  for (const [sidebarId, rootGroup] of Object.entries(SIDEBAR_ROOTS)) {
    const items = (sidebars as Record<string, SidebarItem[]>)[sidebarId];
    if (!items) continue;
    const found: OrderedDoc[] = [];
    walkSidebar(items, rootGroup, found, true);
    for (const entry of found) {
      if (seen.has(entry.id)) continue;
      if (!docsById.has(entry.id)) throw new Error(`Sidebar references missing doc: ${entry.id}`);
      seen.add(entry.id);
      ordered.push(entry);
    }
  }

  for (const rel of files) {
    const id = rel.replace(/\.mdx?$/, "");
    if (seen.has(id)) continue;
    console.warn(`llms: doc not referenced by a sidebar, appending: ${rel}`);
    seen.add(id);
    ordered.push({ id, group: "Other" });
  }

  return { ordered, docsById };
}

function renderDocBlock(doc: Doc): string {
  return `---\nurl: '${doc.url}'\n---\n\n# ${doc.heading}\n\n${doc.content}`;
}

function renderList(ordered: OrderedDoc[], docsById: Map<string, Doc>): string {
  const groups = new Map<string, Doc[]>();
  for (const entry of ordered) {
    const doc = docsById.get(entry.id)!;
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group)!.push(doc);
  }
  const sections: string[] = [];
  for (const [group, docs] of groups) {
    const lines = docs.map((doc) => `- [${doc.title}](${doc.url}): ${doc.description}`);
    sections.push(`### ${group}\n\n${lines.join("\n")}`);
  }
  return sections.join("\n\n");
}

function readConfigValue(key: string): string | null {
  const text = readFileSync(CONFIG_FILE, "utf8");
  const match = text.match(new RegExp(`${key}:\\s*["']([^"']+)["']`));
  return match ? match[1] : null;
}

const { ordered, docsById } = loadDocs();
const projectName = readConfigValue("projectName") || "BurgerAPI";
const version = readConfigValue("frameworkVersion") || "unknown";

const summary = [
  `${projectName} is a Bun-first, WinterCG-compatible API framework with file-based routing, six lifecycle hooks, plugins, providers, Standard Schema (Zod) validation, automatic OpenAPI generation, shared \`BurgerContext\`, and WebSocket support.`,
  `It ships as two packages, \`burger-api\` and \`@burger-api/cli\`, both at \`${version}\` (public beta, not yet recommended for production).`,
  `TypeScript and JavaScript are both first-class, and the same app runs on Bun, Node, Cloudflare Workers, Deno, and Vercel.`,
].join(" ");

const llmsTxt = [
  `# ${projectName} - Bun-native API Framework`,
  `> ${summary}`,
  `## Table of Contents`,
  renderList(ordered, docsById),
  [
    "## Optional",
    "",
    `- [Full documentation for LLMs](${SITE_URL}/llms-full.txt)`,
    `- [Essential reference for LLMs](${SITE_URL}/llms-small.txt)`,
  ].join("\n"),
].join("\n\n");

const fullTxt = `${ordered.map(({ id }) => renderDocBlock(docsById.get(id)!)).join("\n\n")}\n`;

const smallDocs = ordered.filter(({ id }) => SMALL_DOC_IDS.includes(id));
if (smallDocs.length !== SMALL_DOC_IDS.length) {
  const found = new Set(smallDocs.map(({ id }) => id));
  throw new Error(`llms-small docs missing: ${SMALL_DOC_IDS.filter((id) => !found.has(id)).join(", ")}`);
}
const smallTxt = `${smallDocs.map(({ id }) => renderDocBlock(docsById.get(id)!)).join("\n\n")}\n`;

writeFileSync(resolve(STATIC_DIR, "llms.txt"), `${llmsTxt}\n`, "utf8");
writeFileSync(resolve(STATIC_DIR, "llms-full.txt"), fullTxt, "utf8");
writeFileSync(resolve(STATIC_DIR, "llms-small.txt"), smallTxt, "utf8");

console.log(
  `llms: wrote static/llms.txt (${ordered.length} docs), static/llms-full.txt (${ordered.length} docs), static/llms-small.txt (${smallDocs.length} docs)`,
);
