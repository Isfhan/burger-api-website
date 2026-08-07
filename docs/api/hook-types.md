---
sidebar_label: Hook Types
---

# Hook Types

Hooks are the request lifecycle functions. This page is the type reference. For the full model, see [Hook System](/docs/hooks/system).

## Hook

```ts
type Hook = (ctx: BurgerContext) => unknown;
```

`Hook` is the type of every lifecycle hook function. It receives the `BurgerContext`. Where multiple hooks run in sequence, the type is `Hook[]` (a single `Hook` is also accepted).

A hook returns one of three things:

- A `Response` stops the pipeline. That response is sent and the rest of the pipeline is skipped.
- `undefined` continues to the next hook or to the handler.
- In the response phases (`afterRoute`, `mapResponse`), a function receives the current response and returns the transformed response.

## ErrorHook

```ts
type ErrorHook = (error: Error, ctx: BurgerContext) => Response | void | undefined;
```

`onError` hooks handle errors thrown in the pipeline. They run nearest-first, from route to global. Return a `Response` to handle the error, or `undefined`/`void` to let the next `onError` hook try. If none handles it, the framework renders the default error response.

## RouteHooks

```ts
interface RouteHooks {
  onRequest?: Hook | Hook[];
  beforeRoute?: Hook | Hook[];
  afterRoute?: Hook | Hook[];
  mapResponse?: Hook | Hook[];
  onError?: ErrorHook | ErrorHook[];
  transform?: TransformMap;
}
```

`RouteHooks` is the shape of the hooks object carried by `hooks.ts` (route) or `src/hooks.ts` (global). `onRequest` is app-level only: it runs before routing. `transform` runs before validation.

## TransformMap

```ts
type TransformMap = Record<string, (ctx: BurgerContext) => unknown>;
```

`transform` is a map of factory functions keyed by the context field to inject. Each factory receives the context and its return value is merged onto the context instance. Use it to attach request-scoped values before validation runs.

## Related

- [Hook System](/docs/hooks/system)
- [Key Concepts](/docs/key-concepts)
