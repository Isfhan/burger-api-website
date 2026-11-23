---
sidebar_label: Env Validation
---

# Env Plugin

The env plugin checks your environment variables when the app starts. It validates types, fills in defaults, and throws a clear error that lists every problem, so a bad deploy fails at boot instead of on the first request. It is not an auth plugin: it has no request hooks and does not touch routing or `config.auth`.

Install it with:

```bash
burger-api add env
```

## Usage

Register the plugin in `src/plugins.ts`:

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
        LOG_LEVEL: { type: "string", default: "info" },
      },
    })
  );
};
```

Validation runs while `src/plugins.ts` is loaded. With the config above, a missing `DATABASE_URL` or a `PORT` of `"abc"` stops startup with a message that names each variable.

## Options

- `required`: object of variable name to schema. Default `{}`.
- `optional`: object of variable name to schema, normally with a `default`. Default `{}`.
- `throwOnError`: throw when anything is missing or invalid. Default `true`.
- `onError`: callback that receives the error list, for logging or reporting. Called before the throw. Default unset.

Each schema supports:

- `type`: `"string"`, `"number"`, `"boolean"`, `"url"`, or `"json"`. Required.
- `default`: value used when the variable is missing or empty. A default also makes a `required` variable optional.
- `validate`: `(value: string) => boolean` for extra checks.
- `description`: text added to the missing-variable message.

Each reported error has `name`, `message`, and `type` (`"missing"` or `"invalid"`).

## What the handler sees

The plugin adds nothing to the context and runs no hooks. It checks `process.env` and writes defaults back into it, so handlers keep reading `process.env.PORT` as before, typed `string | undefined`. There is no generated typed env object, so parse the value where you need a number or a boolean.

## Good to know

- An empty string counts as missing, for both `required` and `optional`, so `PORT=` fails a number check by being treated as absent.
- Defaults are written to `process.env` as strings: `default: 3000` becomes `"3000"`. A required variable with a default is not an error.
- `validate` is not called when the value came from `default`; it only sees values that were already set.
- `number` accepts anything `Number()` accepts, so `"0x10"` and `"1e3"` pass. `boolean` accepts `true`, `false`, `1`, `0`, `yes`, and `no`, case-insensitive.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Configuration](/docs/core/configuration)
- [Ecosystem](/docs/ecosystem/introduction)
