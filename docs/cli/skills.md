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

Downloads once into `.agents/skills/<name>/` under the current working
directory, then copies the folder to `.claude/skills/<name>/`. The name
defaults to `burger-api`, and the files are downloaded from the framework's
`ecosystem/skills/<name>/` directory on GitHub.

### `burger-api skills list`

List locally installed skills:

```bash
burger-api skills list
```

Reads descriptions from each skill's `SKILL.md` frontmatter. A skill found in
both folders is listed once, with both locations.

### `burger-api skills available`

Browse all skills available from the ecosystem:

```bash
burger-api skills available
```

Fetches the remote catalog from GitHub and shows descriptions parsed from each skill's `SKILL.md`. Install one with `burger-api skills install <name>`.

## Output Structure

When you install the `burger-api` skill, you get the same files in both
folders:

```text
.agents/skills/burger-api/     # Agent Skills standard
├── SKILL.md              # Main skill definition
└── references/           # Reference documentation
    ├── routing.md
    ├── validation.md
    ├── hooks.md
    ├── cli.md
    └── openapi.md

.claude/skills/burger-api/     # same files, copied for Claude Code
```

## Compatible Agents

No configuration needed; agents detect skills automatically:

- **Claude Code**: reads from `.claude/skills/`
- **OpenCode**, **Codex**, and other tools that support the [agentskills.io](https://agentskills.io) open standard: read from `.agents/skills/`

If a tool looks in a different folder, copy the skill there yourself. The
files are plain markdown.


## Related

- [CLI Installation](/docs/cli/installation)
- [Create Command](/docs/cli/create)
- [Add Command](/docs/cli/add)
- [Burger API CLI Tool](/docs/getting-started/cli)
