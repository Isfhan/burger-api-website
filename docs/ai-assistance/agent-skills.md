---
sidebar_label: "Agent Skills"
title: "AI Agent Skills"
description: "Learn how to use Agent Skills to help AI assistants understand your BurgerAPI project structure, APIs, and patterns."
sidebar_position: 1
---

# AI Agent Skills

An Agent Skill is a set of markdown files that teaches your AI coding assistant how BurgerAPI works. Install it once. Your assistant finds it on its own and uses it when you ask about routes, hooks, validation, or the CLI.

Skills follow the [agentskills.io](https://agentskills.io) open standard.

## Install

### New project

`burger-api create` asks:

```text
◇  Add AI agent skills? (recommended for agentic IDEs)
│  Yes / No
```

Answer Yes (the default). Every new project also gets an `AGENTS.md` file with project rules for AI agents.

### Existing project

```bash
burger-api skills install
```

To see what is available and what is installed:

```bash
burger-api skills available
burger-api skills list
```

## Where the files go

The skill is written to two folders with the same content:

```text
.agents/skills/burger-api/     # read by OpenCode, Codex, and other agentskills.io tools
.claude/skills/burger-api/     # read by Claude Code
```

If your tool reads a different folder, copy the skill there. The files are plain markdown.

## Related

- [Skills CLI Command Reference](/docs/cli/skills)
