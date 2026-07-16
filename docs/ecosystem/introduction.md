---
sidebar_label: Introduction
sidebar_position: 1
---

# Ecosystem & Extensibility

BurgerAPI aims to provide a lean, fast core, focusing on the essentials for building modern web applications and APIs with Bun.

We believe in extensibility and plan to foster an ecosystem where additional functionalities, such as specific middleware or integrations, can be easily added to your project.

To explore and add middleware to your project, use the Burger API CLI:

1. **List available middleware:**
   ```bash
   burger-api list
   ```

2. **Add middleware to your project:**
   ```bash
   burger-api add <middleware-name>
   ```

This command downloads the middleware and places it in your project's `ecosystem/middleware/` directory, making it easy to import and use.

### Agent Skills

BurgerAPI also provides **Agent Skills** — structured documentation that helps AI assistants understand your project. Skills follow the [agentskills.io](https://agentskills.io) open standard and are automatically discovered by Cursor, Claude Code, OpenCode, Copilot, and Codex.

```bash
# Install the default burger-api skill
burger-api skills install

# List installed skills
burger-api skills list

# Browse available skills
burger-api skills available
```

See the [Agent Skills](/docs/ai-assistance/agent-skills) documentation for more details.

Stay tuned for updates as the BurgerAPI ecosystem develops! 


## Related

- [Available Middleware](/docs/ecosystem/middleware)
- [CORS Middleware](/docs/ecosystem/cors)
- [Logger Middleware](/docs/ecosystem/logger)
- [Middleware System](/docs/middleware/system)
