---
sidebar_label: Logger Hook
---

# Logger Hook

This hook logs each request with its method, URL, status and response time.

## Install

```bash
burger-api add logger
```

To update the copy later, run `burger-api add logger --force`.

## Add it

Add it to `onRequest` in `src/hooks.ts`, so it logs every response, including 404s and errors:

```ts title="src/hooks.ts"
import { logger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [logger()];
```

For options, use `createLogger()`:

```ts title="src/hooks.ts"
import { createLogger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [
  createLogger({ format: "json", skip: /^\/(health|metrics)/ }),
];
```

## Options

- `format`: `"text"` or `"json"`.
- `colors`: color the output. Default `true`.
- `skip`: a string, regex or function. Matching paths are not logged.
- `requestId`: add a request ID, available as `ctx.requestId`. Default `true`.
- `logFn`: send log lines somewhere else, such as a file or a log service.

The full list is in `ecosystem/hooks/logger/README.md`.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
