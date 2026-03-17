---
sidebar_label: Burger Class
---

# Burger Class

The **`Burger`** class is the main entry point for your BurgerAPI application. You import it, create an instance with options, and call `serve()` to start the server.

## Constructor

```typescript
import { Burger } from "burger-api";

const app = new Burger({
  apiDir: "api",
  // ... other options
});

await app.serve(4000);
```

The constructor accepts a [Server Options](/docs/core/server-options) object that defines where routes live, URL prefixes, global middleware, and OpenAPI metadata.

## Methods

### serve(port, callback?)

Starts the server and listens for requests.

```typescript
await app.serve(4000);
await app.serve(4000, () => {
  console.log("Server running at http://localhost:4000");
});
```

- **port** (number, default: 4000) — Port to listen on.
- **callback?** (function) — Optional function called after the server has started.

For full configuration options and examples, see [Configuration](/docs/core/configuration).
