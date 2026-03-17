---
sidebar_label: "Migrating to 0.9"
sidebar_position: 1
---

# Migrating to BurgerAPI 0.9

BurgerAPI 0.9.3 introduces production-ready builds with AOT route discovery, a project config file, and pre-built route support. This guide helps you update scripts and paths if you're affected by the CLI changes. If you only use `apiDir` / `pageDir` in the Burger constructor and don't run production builds, no changes are required.

## Migration checklist

- [ ] **Replace the executable command.** If you use `burger-api build:executable`, switch to **`burger-api build:exec`** in scripts and documentation.
  - Before: `burger-api build:executable src/index.ts`
  - After: `burger-api build:exec src/index.ts`

- [ ] **Update default build output paths** if your deploy or scripts rely on them:
  - **Bundle:** Default output is now **`.build/bundle/app.js`** (was `.build/bundle.js`). Update paths in deploy scripts, or keep the old location with `--outfile .build/bundle.js`.
  - **Executable:** Default output is now **`.build/executable/<project>.exe`** or **`.build/executable/<project>`** on Unix (was `.build/<project>.exe` or `.build/<project>`). Update paths, or use `--outfile .build/myapp.exe` (or your preferred path) to override.

- [ ] **(Optional) Add a project config.** You can add **`burger.config.ts`** at the project root with `apiDir`, `pageDir`, `apiPrefix`, and `pagePrefix` so the CLI and your app share one config. New projects created with `burger-api create` get this file automatically.

- [ ] **No changes needed** if you only use `apiDir` and `pageDir` in the Burger constructor. **`apiRoutes`** and **`pageRoutes`** are optional and are used by the CLI-generated production entry; existing dev setups continue to work as before.

## Summary

| Change | Action |
|--------|--------|
| `build:executable` | Use **`build:exec`** |
| Bundle default path | Use **`.build/bundle/app.js`** or `--outfile` |
| Executable default path | Use **`.build/executable/<project>[.exe]`** or `--outfile` |
| Project config | Optional: add **`burger.config.ts`** at root |
| Constructor options | No change for `apiDir`/`pageDir`-only apps |

For more on what's new in 0.9.3, see the [v0.9.3 release post](/blog/burger-api-v0.9.3-release).
