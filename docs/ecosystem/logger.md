---
sidebar_label: Logger Hook
---

# Logger Hook

The logger hook logs requests with method, URL, status code, response time, and optional extras. Install it with:

```bash
burger-api add logger
```

## Usage

Compose it in `src/hooks.ts` as an `onRequest` hook:

```ts title="src/hooks.ts"
import { logger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [logger()];
```

The logger returns a response mapper, so it logs each request when the response is ready. `onRequest` runs for every request, so the hook's response mapper also covers 404, 405, validation errors and `onError` responses, and sees the final status.

## Options

- `colors`: colorized output. Default `true`.
- `format`: `"text"` or `"json"`.
- `logQuery`, `logHeaders`, `logBody`: extra request details. Default `false`. `logBody` may log sensitive data; use only in development.
- `requestId`: attach and log a request ID, read from `requestIdHeader` when present. Default `true`. The ID is available as `ctx.requestId` (typed by the hook's module augmentation).
- `requestIdHeader`: header an existing request ID is read from. Default `"X-Request-ID"`.
- `includeRequestIdInLog`: include the ID in each log line. Default `true`.
- `skip`: a string, regex, or function to skip certain requests. Strings and regexes match the request pathname, not the full URL.
- `formatter`: custom log format.
- `logFn`: custom output function (file, external service).

```ts title="src/hooks.ts"
import { createLogger } from "../ecosystem/hooks/logger/logger";

export const onRequest = [
  createLogger({ format: "json", skip: /^\/(health|metrics)/ }),
];
```

Check the package README in `ecosystem/hooks/logger/` for the full option list.

## Related

- [Ecosystem](/docs/ecosystem/introduction)
- [Hook System](/docs/hooks/system)
