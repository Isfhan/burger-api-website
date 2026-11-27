---
sidebar_label: Timeout
---

# Timeout Hook

This package limits how long a request may take. It has two exports:

- `withTimeout()` wraps one handler and answers `504` at the deadline.
- `requestTimeout()` is a hook for the whole app. It replaces a late response with `408`.

## Install

```bash
burger-api add timeout
```

To update the copy later, run `burger-api add timeout --force`.

## Wrap a handler

```ts title="src/api/report/route.ts"
import { withTimeout } from "../../../ecosystem/hooks/timeout/timeout";

export const GET = withTimeout(
  async (ctx, signal) => {
    const res = await fetch("https://slow.example.com/data", { signal });
    return Response.json(await res.json());
  },
  { ms: 5000 }
);
```

The handler gets an `AbortSignal`. Pass it to `fetch` and other work, so the work stops at the deadline too.

## Add an app-wide limit

```ts title="src/hooks.ts"
import { requestTimeout } from "../ecosystem/hooks/timeout/timeout";

export const beforeRoute = [requestTimeout({ ms: 30000 })];
```

This hook cannot stop a slow handler. The client gets the `408` only after the handler finishes. Use `withTimeout()` when the client must get an answer on time.

## Options

- `ms`: timeout in milliseconds. Default `30000`.
- `message`: message in the default JSON body.
- `onTimeout`: a function that returns your own response.

The full list is in `ecosystem/hooks/timeout/README.md`.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
