---
sidebar_label: Introduction
sidebar_position: 1
---

# Ecosystem

BurgerAPI has a small core. Extra features come as ready-made hooks and plugins. The CLI copies their source into your project, so you can read and change them.

- **Hooks** run code around requests. Add them in `src/hooks.ts` or a route's `hooks.ts`.
- **Plugins** add app features, such as auth. Register them in `src/plugins.ts`.
- **Skills** help AI coding tools understand a BurgerAPI project.

See [Hooks & Plugins](/docs/ecosystem/hooks-plugins) for the difference.

## Add a package

```bash
burger-api list          # show available packages
burger-api add cors      # copy a package into your project
```

Hooks land in `ecosystem/hooks/<name>/` and plugins in `ecosystem/plugins/<name>/`. Each folder has a `README.md` with every option.

To update a copy later, run `burger-api add <name> --force`. This overwrites your local changes.

## Hooks

- [CORS](/docs/ecosystem/cors)
- [Logger](/docs/ecosystem/logger)
- [Rate limiter](/docs/ecosystem/rate-limiter)
- [Cache](/docs/ecosystem/cache)
- [Compression](/docs/ecosystem/compression)
- [Security headers](/docs/ecosystem/security-headers)
- [Timeout](/docs/ecosystem/timeout)
- [Body size limiter](/docs/ecosystem/body-size-limiter)

## Plugins

Auth is always a plugin. The core has no built-in auth.

- [JWT Auth](/docs/ecosystem/jwt-auth)
- [API Key Auth](/docs/ecosystem/api-key-auth)
- [Basic Auth](/docs/ecosystem/basic-auth)
- [Session](/docs/ecosystem/session)
- [OIDC](/docs/ecosystem/oidc)
- [Env Validation](/docs/ecosystem/env) (checks environment variables at startup)

## Agent skills

```bash
burger-api skills install
burger-api skills list
```

Skills install to `.agents/skills/<name>/` and `.claude/skills/<name>/`. See [AI Agent Skills](/docs/ai-assistance/agent-skills).

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [CLI Add](/docs/cli/add)
- [Hook System](/docs/hooks/system)
