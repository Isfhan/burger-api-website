---
sidebar_label: Applications
---

# Applications

A BurgerAPI application is an instance of the `Burger` class. You configure it once and start it with `serve`.

```ts
import { Burger } from "burger-api";

const burger = new Burger({
  apiDir: "api",
});

burger.serve(4000);
```

The application brings together four things:

- **Routes** discovered from the file system (see [Routing](./routing.md)).
- **Middleware** that runs before and after handlers (see [Middleware](./middleware.md)).
- **Validation** schemas that guard requests (see [Validation](./validation.md)).
- **OpenAPI** documentation generated automatically from your routes (see [OpenAPI](./openapi.md)).

Configuration options such as `apiDir`, `apiPrefix`, `globalMiddleware`, and `version` are described in [Burger Options](../core/server-options.md) and [Configuration](../core/configuration.md).


## Related

- [Routing](/docs/core-concepts/routing)
- [Handlers](/docs/core-concepts/handlers)
- [Request Context](/docs/core/request-handling)

