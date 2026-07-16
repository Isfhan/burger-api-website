---
sidebar_label: Upgrading
---

# Upgrading

BurgerAPI is designed to be additive between releases, so existing applications keep working without code changes.

## The request context

Handlers receive a `BurgerRequest` with everything needed for the request: `req.params`, `req.query`, `req.route`, `req.validated`, and `req.set`. These are available together on the same object your handlers already use.

## Adopting new capabilities

You can move to the current request API at your own pace:

- Read query parameters with `req.query` instead of `new URL(req.url)`.
- Use `req.route` when you need the matched route pattern.
- Use `req.set` to set response status and headers.

None of these change how existing routes behave — they are additional ways to read request data and shape the response.

## Older releases

For help moving between earlier releases, see [Migrating to 0.9](./migrating-to-0.9.md).


## Related

- [Migrating to BurgerAPI 0.9](/docs/migration/migrating-to-0.9)
- [Error Handling Patterns](/docs/advanced/error-handling)
