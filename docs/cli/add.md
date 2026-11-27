---
sidebar_label: Add Command
---

# Add Command

`burger-api add <name...>` copies official hooks and plugins into your project. Hooks go to `ecosystem/hooks/`, plugins to `ecosystem/plugins/`. After copying, the CLI prints the code to register them in `src/hooks.ts` or `src/plugins.ts`.

```bash
burger-api add cors
burger-api add cors logger rate-limiter
burger-api add jwt-auth
```

See what is available with `burger-api list`, or browse the [Ecosystem](/docs/ecosystem/introduction).

## Updating a copy

The files are yours to read and edit, so updating the CLI does not change them. To replace a copy with the latest version, add `--force`:

```bash
burger-api add cors --force
```

`--force` overwrites the copy, so re-apply any edits you made. `burger-api doctor` tells you which copies are out of date. See [Doctor Command](/docs/cli/doctor).

## Related

- [List Command](/docs/cli/list)
- [Generate Command](/docs/cli/generate): create your own hook or plugin
- [Burger API CLI Tool](/docs/getting-started/cli)
