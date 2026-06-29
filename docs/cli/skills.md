---
sidebar_label: Skills Command
---

# Skills Command

`burger-api skills` manages AI agent skills for your project. Skills provide structured documentation that helps agentic IDEs understand your BurgerAPI project.

## Commands

### `burger-api skills install [name]`

Download an AI agent skill from the ecosystem:

```bash
# Install the default burger-api skill
burger-api skills install

# Install a specific skill by name
burger-api skills install burger-api
```

Installs to `.agents/skills/<name>/`. The name defaults to `burger-api`.

### `burger-api skills list`

List locally installed skills:

```bash
burger-api skills list
```

Reads descriptions from each skill's `SKILL.md` frontmatter.

### `burger-api skills available`

Browse all skills available from the ecosystem:

```bash
burger-api skills available
```

Fetches the remote catalog from GitHub and shows descriptions parsed from each skill's `SKILL.md`. Install one with `burger-api skills install <name>`.

## Output Structure

When you install the `burger-api` skill, you get:

```text
.agents/skills/burger-api/
├── SKILL.md              # Main skill definition
└── references/           # Reference documentation
    ├── routing.md
    ├── validation.md
    ├── middleware.md
    ├── cli.md
    └── openapi.md
```

## Compatible Agents

Skills in `.agents/skills/` are automatically discovered by:

- **Cursor** — reads from `.agents/skills/`
- **Claude Code** — reads from `.agents/skills/`
- **OpenCode** — reads from `.agents/skills/`
- **OpenAI Codex** — reads from `.agents/skills/`
- **GitHub Copilot** — reads from `.agents/skills/`
- Any tool supporting the [agentskills.io](https://agentskills.io) open standard

No configuration needed — agents detect skills automatically.
