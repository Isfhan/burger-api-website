---
sidebar_label: Inside BurgerAPI
sidebar_position: 7
---

# Inside BurgerAPI

This page shows how a request travels through BurgerAPI at runtime. It complements the [Compiler Pipeline](./compiler-pipeline) page, which covers build time. Here we follow a single request from the socket to the response.

```mermaid
flowchart TD
    classDef edge fill:#1f2933,stroke:#3b82f6,color:#e5e7eb,stroke-width:1px;
    classDef core fill:#0b3d2e,stroke:#10b981,color:#d1fae5,stroke-width:2px;
    classDef dispatch fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe,stroke-width:1px;
    classDef ctx fill:#3b1f5e,stroke:#a78bfa,color:#ede9fe,stroke-width:1px;
    classDef pipe fill:#5e1f2f,stroke:#f472b6,color:#fce7f3,stroke-width:1px;
    classDef done fill:#3a2f0b,stroke:#fbbf24,color:#fef3c7,stroke-width:1px;

    Client([Client / Bombardier]):::edge

    subgraph Bun["Bun.serve (HTTP server)"]
        direction TB
        Native["Native routes map<br/>(static, O(1))"]:::dispatch
        Fetch["fetch fallback<br/>(dynamic + wildcard)"]:::dispatch
    end

    Client --> Bun

    subgraph Router["Router (hybrid dispatch)"]
        direction TB
        SM["StaticMap<br/>exact + loose-slash"]:::core
        NR["Native param routes<br/>:param / * on Bun's routes map"]:::core
        TR["Trie (fallback)<br/>unmatched / loose-slash / empty-param"]:::core
        AC["AllowCache<br/>405 + Allow"]:::core
    end

    Native --> SM
    Native --> NR
    Fetch --> TR
    NR --> MK
    TR --> AC

    MK["match.handler(request, ctxInit)"]:::core
    SM --> MK
    AC --> MK

    subgraph CTX["BurgerContext (built once)"]
        direction TB
        Q["lazy query parser"]:::ctx
        P["params / wildcardParams"]:::ctx
        R["route {path, pattern}"]:::ctx
        S["set {status, headers}"]:::ctx
        V["validated"]:::ctx
    end

    MK --> CTX

    subgraph Pipe["Middleware pipeline (single pass)"]
        direction TB
        GM["globalMiddleware[]<br/>(ServerOptions)"]:::pipe
        VAL["Validation middleware<br/>params/query/headers/cookie/body"]:::pipe
        RM["route.middleware[]"]:::pipe
        H["Handler<br/>GET/POST/..."]:::pipe
    end

    CTX --> GM
    GM --> VAL
    VAL --> RM
    RM --> H

    subgraph After["Response processing"]
        direction TB
        APPLY["applySet merges ctx.set<br/>(status + headers)"]:::done
        HEAD["auto-HEAD derived from GET"]:::done
        RESP["Final Response"]:::done
    end

    H --> After
    VAL -. "return Response" .-> RESP
    RM -. "return Response (short-circuit)" .-> After
    After --> Client

    ERR["onError / 405 / 404"]:::edge
    TR -. "no match" .-> ERR
    ERR --> Client
```

## What each stage does

1. **Bun.serve** accepts the connection. Static paths hit Bun's native `routes` map directly; everything else reaches the `fetch` fallback.
2. **Router** owns the compiled dispatch state: a `StaticMap` (exact + loose-trailing-slash), a `Trie` (`:param` beats `*` by priority), and an `AllowCache` for `405` responses.
3. **Compiled handler** (`match.handler`) seeds a `ContextInit` with `route`, `params`, and `wildcardParams`, then builds the single `BurgerContext`.
4. **BurgerContext** is allocated once per request. `query` is parsed lazily, `set` collects response mutations, and `validated` holds validation output.
5. **Middleware pipeline** runs in one pass: `globalMiddleware` → validation middleware → route `middleware` → your handler. Any stage may return a `Response` to stop early, or a function to transform the final response (applied in reverse order).
6. **Response processing** merges `ctx.set` into the response exactly once and derives `HEAD` from `GET`. `405`/`404`/`onError` exit the same way.

Because static and dynamic routes run the same compiled handler, method dispatch, `405`/`Allow`, auto-`HEAD`, and middleware behavior are identical for every route.

## Related

- [Compiler Pipeline](/docs/architecture/compiler-pipeline)
- [Request Lifecycle](/docs/architecture/request-lifecycle)
- [Routing Engine](/docs/architecture/routing-engine)
- [BurgerContext](/docs/architecture/burger-context)
