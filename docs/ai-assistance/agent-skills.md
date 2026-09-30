---
sidebar_label: "Agent Skills (New)"
title: "AI Agent Skills"
description: "Learn how to use Agent Skills to help AI assistants understand your BurgerAPI project structure, APIs, and patterns."
sidebar_position: 1
---

# AI Agent Skills

Agent Skills provide structured, AI-readable documentation for your BurgerAPI project. Modern agentic IDEs discover them automatically.

## What Are Agent Skills?

Agent Skills follow the [agentskills.io](https://agentskills.io) open standard: a `SKILL.md` file with YAML frontmatter and progressive disclosure through reference documents.

Instead of attaching files manually, you install a skill once and your AI assistant finds it automatically.

## How They Work

1. **Install**: `burger-api skills install` downloads the burger-api skill once, then writes it to both `.agents/skills/burger-api/` and `.claude/skills/burger-api/`
2. **Discover**: Each agent scans its own skills folder at the project root and loads relevant skills
3. **Activate**: When you ask about routing, hooks, or CLI tasks, the agent uses the skill as context

## Installation

### With a New Project

When you run `burger-api create`, you'll be asked:

```text
◇  Add AI agent skills? (recommended for agentic IDEs)
│  Yes / No
```

Answer Yes (default) and the skill is installed automatically. The new project
also gets `AGENTS.md` (project rules for AI agents, read by Claude Code and
other agents), even if you skip skills.

### In an Existing Project

```bash
burger-api skills install
```

This installs the default burger-api skill. You can also browse available skills:

```bash
burger-api skills available
burger-api skills list
```

`skills list` shows each installed skill once and names every folder it is in.

## Project Layout

When skills are installed, your project includes both copies:

```text
.agents/skills/burger-api/     # Agent Skills standard
├── SKILL.md
└── references/
    ├── routing.md
    ├── validation.md
    ├── hooks.md
    ├── cli.md
    └── openapi.md

.claude/skills/burger-api/     # same files, copied for Claude Code
```

## Compatible Agents

No configuration needed. Each tool reads its own folder:

- **Claude Code**: reads from `.claude/skills/`
- **OpenCode**, **Codex**, and other tools that support the agentskills.io standard: read from `.agents/skills/`

If a tool looks for a different folder, copy the skill there yourself. The
files are plain markdown.

## Next Steps

- [Skills CLI Command Reference](/docs/cli/skills)
