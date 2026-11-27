---
sidebar_label: Env Validation
---

# Env Plugin

This plugin checks your environment variables when the app starts. It checks types, fills in defaults, and stops startup with a clear list of problems. It is not an auth plugin and adds no request hooks.

## Install

```bash
burger-api add env
```

To update the copy later, run `burger-api add env --force`.

## Register

```ts title="src/plugins.ts"
import type { PluginRegistrar } from "burger-api";
import { env } from "../ecosystem/plugins/env/env";

export default (burger: PluginRegistrar) => {
  burger.usePlugin(
    env({
      required: {
        DATABASE_URL: { type: "url" },
        JWT_SECRET: { type: "string", validate: (value) => value.length >= 32 },
      },
      optional: {
        PORT: { type: "number", default: 3000 },
      },
    })
  );
};
```

With this config, a missing `DATABASE_URL` or a `PORT` of `"abc"` stops startup.

## Options

- `required`: variables that must be set.
- `optional`: variables that may be missing, usually with a `default`.

Each variable takes:

- `type`: `"string"`, `"number"`, `"boolean"`, `"url"` or `"json"`.
- `default`: value used when the variable is missing or empty.
- `validate`: `(value) => boolean` for extra checks.

The full list is in `ecosystem/plugins/env/README.md`.

## Use the values

Read them from `process.env` as usual. Defaults are written back as strings, so `PORT` is `"3000"`. Parse numbers and booleans where you use them.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Configuration](/docs/core/configuration)
- [Ecosystem](/docs/ecosystem/introduction)
