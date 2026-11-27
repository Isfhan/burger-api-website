---
sidebar_label: Skills Command
---

# Skills Command

`burger-api skills` adds AI agent skills to your project. A skill is a set of markdown files that teaches AI coding agents (Claude Code, Codex, OpenCode and others) how BurgerAPI works, so they write code that fits your project.

```bash
burger-api skills install            # the burger-api skill
burger-api skills list               # skills in this project
burger-api skills available          # skills you can install
```

`skills install` puts the files in `.agents/skills/<name>/` and `.claude/skills/<name>/`. Agents find them there on their own. If your tool reads skills from another folder, copy the files there.

To update an installed skill, add `--force`:

```bash
burger-api skills install burger-api --force
```

`burger-api create` offers to install the `burger-api` skill for you.

## Related

- [Create Command](/docs/cli/create)
- [Burger API CLI Tool](/docs/getting-started/cli)
