---
sidebar_label: Introduction
sidebar_position: 1
---

# Ecosystem

BurgerAPI keeps a small core and ships optional packages under `ecosystem/`:

```
ecosystem/
├── hooks/      # Request lifecycle factories (CORS, logger, rate-limit, ...)
├── plugins/    # Application extensions (JWT, session, env, ...)
└── skills/     # AI agent skills
```

| Folder | Role |
|--------|------|
| **hooks/** | Compose in `src/hooks.ts` or route `hooks.ts` |
| **plugins/** | Register in `src/plugins.ts` via `burger.usePlugin()` |
| **skills/** | Help AI tools understand BurgerAPI projects |

**Hooks** control the request lifecycle. **Plugins** extend the application. They are separate concepts.

### CLI

```bash
burger-api list
burger-api add cors
burger-api add logger
burger-api skills install
```

Packages install into `ecosystem/hooks/` or `ecosystem/plugins/` as appropriate.

### Authentication

Authentication is implemented through official ecosystem **plugins** that integrate with BurgerAPI's hook system and route `config.ts`. The framework core stays auth-agnostic.

### Agent skills

```bash
burger-api skills install
burger-api skills list
burger-api skills available
```
