---
sidebar_label: Middleware Types
---

# Middleware Types

## Middleware

```ts
type Middleware =
  | ((request: BurgerRequest) => Promise<BurgerNext>)
  | ((request: BurgerRequest) => BurgerNext);
```

A middleware receives the `BurgerRequest` and returns one of the three `BurgerNext` outcomes.

## BurgerNext

```ts
type BurgerNext =
  | Response                                  // stop: send this response
  | ((response: Response) => Promise<Response>) // transform: modify the final response
  | undefined;                                // continue to the next step
```

- A **`Response`** short-circuits the chain.
- A **function** transforms the final response after the handler runs (and runs in reverse order for after-middlewares).
- **`undefined`** continues to the next middleware or handler.

## RequestHandler

```ts
type RequestHandler = (
  request: BurgerRequest
) => Promise<Response> | Response;
```

This is the shape of your exported `GET`/`POST`/... functions. See [Middleware](../middleware/system.md) for the full model.


## Related

- [Burger Class](/docs/core/burger-class)
- [Server Options](/docs/core/server-options)
- [BurgerRequest](/docs/api/burger-request)
- [Request API](/docs/api/request-api)
