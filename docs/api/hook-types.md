---
sidebar_label: Hook Types
---

# Hook Types

Type reference for hooks. All types come from `burger-api`. For how hooks work, see [Hook System](/docs/hooks/system).

## ForwardHook and ResponseHook

```ts
type ForwardHookResult =
  | Response
  | ((response: Response) => Response | Promise<Response>)
  | void
  | undefined;

type ResponseHookResult = ForwardHookResult;

type ForwardHook = (
  ctx: BurgerContext
) => ForwardHookResult | Promise<ForwardHookResult>;

type ResponseHook = (
  ctx: BurgerContext
) => ResponseHookResult | Promise<ResponseHookResult>;

type Hook = ForwardHook | ResponseHook;
```

`ForwardHook` is used by `onRequest` and `beforeRoute`. `ResponseHook` is used by `afterRoute` and `mapResponse`. Each slot takes one hook or an array. See [Hook Return Types](/docs/hooks/return-types) for what each return value does.

## ErrorHook

```ts
type ErrorHook = (
  error: Error,
  ctx: BurgerContext
) => Response | void | undefined | Promise<Response | void | undefined>;
```

Return a `Response` to handle the error. Return `undefined` to let the next `onError` hook try. If no hook handles it, BurgerAPI sends a default error response.

## RouteHooks

```ts
interface RouteHooks {
  transform?: TransformMap;
  beforeRoute?: ForwardHook | ForwardHook[];
  afterRoute?: ResponseHook | ResponseHook[];
  mapResponse?: ResponseHook | ResponseHook[];
  onError?: ErrorHook | ErrorHook[];
}
```

The shape of a route `hooks.ts`. It has no `onRequest`.

## GlobalHooks

```ts
interface GlobalHooks extends RouteHooks {
  onRequest?: ForwardHook | ForwardHook[];
}
```

The shape of `src/hooks.ts` and of a plugin's `hooks`.

## TransformMap

```ts
type TransformMap = Record<string, (ctx: BurgerContext) => unknown>;
```

Each key is a field to add to `ctx`. Each function returns that field's value. See [Global Hooks](/docs/hooks/global#transform).

## Related

- [Hook System](/docs/hooks/system)
- [Hook Return Types](/docs/hooks/return-types)
- [Key Concepts](/docs/key-concepts)
