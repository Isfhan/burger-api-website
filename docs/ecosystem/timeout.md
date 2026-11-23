---
sidebar_label: Timeout
---

# Timeout Hook

The timeout package gives you request budgets. It ships two exports: `withTimeout()` wraps a handler and answers at the deadline, while `requestTimeout()` is a hook that replaces a late response.

## Install

```bash
burger-api add timeout
```

## Usage

Use `withTimeout()` when the client must get an answer at the deadline. Wrap the handler in `route.ts`:

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

The handler gets a second argument, an `AbortSignal`. It aborts at the deadline or when the client disconnects. Pass it to anything that accepts one so the work stops too.

Use `requestTimeout()` as an app-wide budget check. It is a forward hook, so compose it in `beforeRoute`:

```ts title="src/hooks.ts"
import { requestTimeout } from "../ecosystem/hooks/timeout/timeout";

export const beforeRoute = [requestTimeout({ ms: 30000 })];
```

## Options

- `ms`: timeout in milliseconds. Default `30000`.
- `message`: the `message` field in the default JSON body. Default `"Request timeout"`.
- `onTimeout`: a function returning the response to send. Defaults to a `504` JSON body for `withTimeout()` and a `408` JSON body for `requestTimeout()`.

## Good to know

- `requestTimeout()` cannot answer at the deadline. A hook cannot wrap the handler, so the client waits for the slow handler and only then receives the `408`. That is why it is a coarse budget check, not a hard deadline.
- `withTimeout()` sends the `504` exactly at `ms`. JavaScript cannot cancel a running function, so the handler keeps running after the response unless it checks `signal.aborted` or passes the signal along. A late result is discarded.
- A late error is logged. Abort errors caused by the timeout itself are not.
- Keep `ms` below the timeout of any reverse proxy or load balancer in front of your app, or the proxy will answer first. For work that legitimately runs for minutes, return `202 Accepted` and finish it as a background job.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
