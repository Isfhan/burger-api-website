---
sidebar_label: Add Command
---

# Add Command

`burger-api add <middleware...>` adds one or more middleware from the ecosystem to your project.

- Downloads middleware from GitHub and copies to `ecosystem/middleware/`.
- Prints usage instructions after install.

**Examples:**

```bash
burger-api add cors
burger-api add cors logger rate-limiter
burger-api add jwt-auth api-key-auth
```

List available middleware with `burger-api list`. See [CLI Tool](/docs/getting-started/cli) and [Ecosystem](/docs/ecosystem/introduction).
