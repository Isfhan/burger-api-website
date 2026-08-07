---
sidebar_label: Logger Hook
---

# Logger Hook

The logger hook logs requests with method, URL, status code, response time, and optional extras. Install it with:

```bash
burger-api add logger
```

## Usage

Compose it in `src/hooks.ts`. The logger decorates the response, so it runs as a `beforeRoute` hook:

```ts title="src/hooks.ts"
import { logger } from "../ecosystem/hooks/logger/logger";

export const beforeRoute = [logger()];
```

## Options

- `colors`: colorized output. Default `true`.
- `format`: `"text"` or `"json"`.
- `logQuery`, `logHeaders`, `logBody`: extra request details. Default `false`. `logBody` may log sensitive data; use only in development.
- `requestId`: attach and log a request ID, read from `X-Request-ID` when present. Default `true`. The ID is available as `ctx.requestId`.
- `skip`: a string, regex, or function to skip certain requests.
- `formatter`: custom log format.
- `logFn`: custom output function (file, external service).

```ts title="src/hooks.ts"
import { createLogger } from "../ecosystem/hooks/logger/logger";

export const beforeRoute = [
  createLogger({ format: "json", skip: /^\/(health|metrics)/ }),
];
```

Check the package README in `ecosystem/hooks/logger/` for the full option list.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
