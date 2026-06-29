---
slug: burger-api-cli-v0.9.9-release
title: BurgerAPI CLI v0.9.9 Released
authors: [isfhan]
tags: [release, cli, ai, skills]
---

**BurgerAPI CLI v0.9.9 introduces Agent Skills — structured, AI-readable documentation that replaces the legacy `.llm-context` files. Skills follow the [agentskills.io](https://agentskills.io) open standard and are automatically discovered by Cursor, Claude Code, OpenCode, Copilot, and Codex.**

{/* truncate */}

## What's New in CLI v0.9.9

- **`burger-api skills`** — New command family with `install [name]`, `list`, and `available` subcommands
- **Skills prompt** — New "Add AI agent skills?" question during `burger-api create` (default: yes)
- **Structured context** — Skills install to `.agents/skills/burger-api/` with `SKILL.md` and reference files
- **Compatible out of the box** — Works with Cursor, Claude Code, OpenCode, GitHub Copilot, OpenAI Codex, and any tool supporting the agentskills.io standard
- **`.llm-context` no longer auto-installed** — The CLI no longer copies `ecosystem/.llm-context/` into new projects

## Agent Skills: Smarter AI Context

Agent Skills replace the flat `.llm-context` text files with a structured format that AI assistants understand natively. Each skill consists of:

- **`SKILL.md`** — Main file with YAML frontmatter (name, description, version) and progressive overview
- **`references/`** — Detailed reference docs for routing, validation, middleware, CLI, and OpenAPI

The key difference: instead of manually attaching files to your prompts, you install a skill once and your agent discovers it automatically from `.agents/skills/`.

## CLI Commands

```bash
# Install the default burger-api skill
burger-api skills install

# List installed skills
burger-api skills list

# Browse available skills from the ecosystem
burger-api skills available

# Install during project creation (new prompt)
burger-api create my-api
# Answer Yes to "Add AI agent skills?"
```

## Migration from `.llm-context`

Projects created before v0.9.9 may have an `ecosystem/.llm-context/` folder. To adopt the new format:

```bash
burger-api skills install
```

The old `.llm-context` folder can be safely removed. See the [Agent Skills documentation](/docs/ai-assistance/agent-skills) for details.

## Get Involved

- ⭐ Star us on [GitHub](https://github.com/isfhan/burger-api)
- 🐛 Report issues on the [issue tracker](https://github.com/isfhan/burger-api/issues)
- 💬 Join [discussions](https://github.com/isfhan/burger-api/discussions)
- 🔀 Submit pull requests

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
