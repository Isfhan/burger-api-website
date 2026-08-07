---
sidebar_label: "Agent Skills (New)"
title: "AI Agent Skills"
description: "Learn how to use Agent Skills to help AI assistants understand your BurgerAPI project structure, APIs, and patterns."
sidebar_position: 1
---

# AI Agent Skills

Agent Skills provide structured, AI-readable documentation for your BurgerAPI project. Modern agentic IDEs discover them automatically.

## What Are Agent Skills?

Agent Skills follow the [agentskills.io](https://agentskills.io) open standard — a `SKILL.md` file with YAML frontmatter and progressive disclosure through reference documents.

Instead of attaching files manually, you install a skill once and your AI assistant finds it automatically.

## How They Work

1. **Install** — `burger-api skills install` downloads the burger-api skill to `.agents/skills/burger-api/`
2. **Discover** — Agentic IDEs scan `.agents/skills/` at project root and load relevant skills
3. **Activate** — When you ask about routing, hooks, or CLI tasks, the agent uses the skill as context

## Installation

### With a New Project

When you run `burger-api create`, you'll be asked:

```text
◇  Add AI agent skills? (recommended for agentic IDEs)
│  Yes / No
```

Answer Yes (default) and the skill is installed automatically.

### In an Existing Project

```bash
burger-api skills install
```

This installs the default burger-api skill. You can also browse available skills:

```bash
burger-api skills available
burger-api skills list
```

## Project Layout

When skills are installed, your project includes:

```text
.agents/
└── skills/
    └── burger-api/
        ├── SKILL.md
        └── references/
            ├── routing.md
            ├── validation.md
            ├── hooks.md
            ├── cli.md
            └── openapi.md
```

## Compatible Agents

No configuration needed — these tools discover `.agents/skills/` automatically:

- **Cursor** — loads skills as project context
- **Claude Code** — reads from `.agents/skills/`
- **OpenCode** — reads from `.agents/skills/`
- **OpenAI Codex** — reads from `.agents/skills/`
- **GitHub Copilot** — reads from `.agents/skills/`
- Any tool supporting the agentskills.io standard

## Next Steps

- [Skills CLI Command Reference](/docs/cli/skills)
