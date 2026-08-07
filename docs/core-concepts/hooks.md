---
sidebar_label: Hooks
---

# Hooks

Hooks control when code runs on a request. They are named stages in the request lifecycle:

`onRequest`, `transform`, `beforeRoute`, `afterRoute`, `mapResponse`, `onError`.

A hook returns `undefined` to continue, a `Response` to short-circuit, or a function to transform the response.

Hooks live in two scopes:

- Global: `src/hooks.ts`, for every request.
- Route: `api/**/hooks.ts`, for a single route directory.

Plugins are a separate concept: they extend the application and may register hooks. Keep the two separate.

See [Hook System](/docs/hooks/system) for the full model: scope order, route convention files, and the return contract. See [Ecosystem](/docs/ecosystem/introduction) for how hooks and plugins are packaged.


## Related

- [Applications](/docs/core-concepts/applications)
- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)
