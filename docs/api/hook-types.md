---
sidebar_label: Hook Types
---

# Hook Types

Hooks are the request lifecycle functions. This page is the type reference. For the full model, see [Hook System](/docs/hooks/system).

## Hook

```ts
type ForwardHook = (
  ctx: BurgerContext
) => Response | ((response: Response) => Response | Promise<Response>) | void | undefined;

type ResponseHook = (
  ctx: BurgerContext
) => Response | ((response: Response) => Response | Promise<Response>) | void | undefined;

type Hook = ForwardHook | ResponseHook;
```

`Hook` is the union of the two stage contracts: `ForwardHook` (`onRequest`, `beforeRoute`) and `ResponseHook` (`afterRoute`, `mapResponse`). Where multiple hooks run in sequence, the type is `Hook[]` (a single `Hook` is also accepted).

A hook returns one of three things:

- A `Response` stops the pipeline. That response is sent and the rest of the pipeline is skipped.
- `undefined` continues to the next hook or to the handler.
- A function `(response) => Response` registers a mapper. Forward hooks queue it to run on the final response after the handler; response hooks apply it immediately.

## ErrorHook

```ts
type ErrorHook = (
  error: Error,
  ctx: BurgerContext
) => Response | void | undefined | Promise<Response | void | undefined>;
```

`onError` hooks handle errors thrown after routing (validation, `beforeRoute`, the handler, `afterRoute`, `mapResponse`). They run nearest-first, Route → Global → Plugin → Framework. Return a `Response` to handle the error, or `undefined`/`void` to let the next `onError` hook try. If none handles it, the framework renders the default error response and logs 5xx errors. May be async.

## RouteHooks

```ts
interface RouteHooks {
  beforeRoute?: ForwardHook | ForwardHook[];
  afterRoute?: ResponseHook | ResponseHook[];
  mapResponse?: ResponseHook | ResponseHook[];
  onError?: ErrorHook | ErrorHook[];
  transform?: TransformMap;
}
```

`RouteHooks` is the shape of a route's `hooks.ts`. There is no `onRequest` here: `onRequest` runs before a route is matched, so it cannot be scoped to one route. `transform` runs before validation.

## GlobalHooks

```ts
interface GlobalHooks extends RouteHooks {
  onRequest?: ForwardHook | ForwardHook[];
}
```

`GlobalHooks` is the shape of the app's `src/hooks.ts` and of a plugin's `hooks` object. It adds `onRequest` on top of `RouteHooks`.

## TransformMap

```ts
type TransformMap = Record<string, (ctx: BurgerContext) => unknown>;
```

`transform` is a map of factory functions keyed by the context field to inject. Each factory receives the context and its return value is merged onto the context instance. Use it to attach request-scoped values before validation runs.

## Related

- [Hook System](/docs/hooks/system)
- [Key Concepts](/docs/key-concepts)
