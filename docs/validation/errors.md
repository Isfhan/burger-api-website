---
sidebar_label: Error Handling
---

# Validation Error Handling

When validation fails, BurgerAPI returns a **400** response with a structured error payload (e.g. grouped by `query`, `body`, `params`). The format is consistent with Zod 4.x. Your frontend can parse this to show field-level errors.

See the [Validation](/docs/request-handling/validation) guide for the exact response shape and examples.
