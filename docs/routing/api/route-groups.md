---
sidebar_label: "Route Groups"
---

# Route Groups

Route groups allow you to organize your API route files into logical folders without affecting the URL structure. This is perfect for keeping large projects organized while maintaining clean, simple URLs.

## What Are Route Groups?

Route groups use parentheses `(folder)` to create organizational folders that are **ignored** when BurgerAPI builds the route path. The folder exists for your organization, but doesn't appear in the URL.

## Syntax

Wrap any folder name in parentheses to make it a route group:

```
(groupName)
```

## Basic Example

### Without Route Groups

```
api/
  users/
    route.ts           → /api/users
  products/
    route.ts           → /api/products
  orders/
    route.ts           → /api/orders
```

All files are at the root level—hard to organize as your API grows.

### With Route Groups

```
api/
  (public)/
    users/
      route.ts         → /api/users
    products/
      route.ts         → /api/products
  (admin)/
    orders/
      route.ts         → /api/orders
    settings/
      route.ts         → /api/settings
```

The `(public)` and `(admin)` folders don't appear in URLs:
- `/api/users` (not `/api/public/users`)
- `/api/orders` (not `/api/admin/orders`)

## Common Use Cases

### 1. Organizing by Access Level

Separate public, authenticated, and admin routes:

```
api/
  (public)/
    products/
      route.ts         → /api/products
    health/
      route.ts         → /api/health
  (authenticated)/
    profile/
      route.ts         → /api/profile
    orders/
      route.ts         → /api/orders
  (admin)/
    users/
      route.ts         → /api/users
    analytics/
      route.ts         → /api/analytics
```

**Benefits:**
- Clear visual separation by access level
- Maintains clean, simple URLs

### 2. Organizing by Feature

Group related functionality together:

```
api/
  (shop)/
    products/
      route.ts         → /api/products
    cart/
      route.ts         → /api/cart
    checkout/
      route.ts         → /api/checkout
  (user-management)/
    users/
      route.ts         → /api/users
    roles/
      route.ts         → /api/roles
    permissions/
      route.ts         → /api/permissions
```

### 3. Organizing by Version

Prepare for API versioning without changing URLs:

```
api/
  (v1)/
    users/
      route.ts         → /api/users
    products/
      route.ts         → /api/products
  (v2-draft)/
    users/
      route.ts         → /api/users (new version in development)
```

Later, you can switch versions by moving files or changing your apiDir configuration.

### 4. Organizing by Team

Large teams can organize by ownership:

```
api/
  (team-commerce)/
    products/
      route.ts         → /api/products
    orders/
      route.ts         → /api/orders
  (team-auth)/
    login/
      route.ts         → /api/login
    register/
      route.ts         → /api/register
```

## Nested Route Groups

You can nest route groups for more granular organization:

```
api/
  (features)/
    (shop)/
      products/
        route.ts       → /api/products
      cart/
        route.ts       → /api/cart
    (auth)/
      login/
        route.ts       → /api/login
      register/
        route.ts       → /api/register
```

Both `(features)` and `(shop)` are ignored, resulting in `/api/products`.

## Combining with Other Route Types

Route groups work seamlessly with all other routing patterns:

### Route Groups + Dynamic Routes

```
api/
  (admin)/
    users/
      [userId]/
        route.ts       → /api/users/[userId]
```

**URL:** `/api/users/123` (not `/api/admin/users/123`)

### Route Groups + Wildcard Routes

```
api/
  (internal)/
    proxy/
      [...]/
        route.ts       → /api/proxy/[...]
```

**URL:** `/api/proxy/any/nested/path` (not `/api/internal/proxy/...`)

## Example: Complete Organization

Here's a real-world example of a well-organized API:

```
api/
  (public)/
    health/
      route.ts              → /api/health
    products/
      route.ts              → /api/products
      [productId]/
        route.ts            → /api/products/[productId]
  (authenticated)/
    profile/
      route.ts              → /api/profile
    orders/
      route.ts              → /api/orders
      [orderId]/
        route.ts            → /api/orders/[orderId]
  (admin)/
    users/
      route.ts              → /api/users
      [userId]/
        route.ts            → /api/users/[userId]
    analytics/
      [...]/
        route.ts            → /api/analytics/[...]
```

**Result:** Clean URLs with excellent organization!

## Best Practices

### 1. Use Descriptive Group Names

```typescript
// ✅ Good: Clear purpose
(admin)
(authenticated)
(public-api)
(feature-shop)

// ❌ Avoid: Vague names
(misc)
(stuff)
(routes)
```

### 2. Keep Nesting Shallow

```typescript
// ✅ Good: 1-2 levels of grouping
api/(features)/(shop)/products/route.ts

// ❌ Avoid: Too many nested groups
api/(org)/(dept)/(team)/(feature)/(sub)/route.ts
```

### 3. Consistent Naming Convention

```typescript
// ✅ Good: Pick a convention and stick with it
(admin)
(public)
(authenticated)

// ❌ Avoid: Mixed conventions
(admin)
(publicRoutes)
(Authenticated_Users)
```

### 4. Document Your Organization

Add a README in your api directory explaining your grouping strategy:

```markdown
# API Structure

## Route Groups

- `(public)` - Public endpoints, no authentication
- `(authenticated)` - Requires user authentication
- `(admin)` - Requires admin privileges
```

## Route Groups vs. URL Segments

It's important to understand the difference:

| Feature | Route Groups `(folder)` | Regular Folders |
|---------|------------------------|-----------------|
| Affects URL | ❌ No | ✅ Yes |
| Purpose | Organization only | URL structure |
| Example | `(admin)/users/` → `/api/users` | `admin/users/` → `/api/admin/users` |

## When NOT to Use Route Groups

Don't use route groups when:

1. **The path should be in the URL**
   ```typescript
   // ❌ Don't hide important URL segments
   api/(v1)/users/route.ts  → /api/users  (version hidden!)
   
   // ✅ Keep version in URL if it matters
   api/v1/users/route.ts    → /api/v1/users
   ```

2. **Organization doesn't add value**
   ```typescript
   // ❌ Unnecessary grouping
   api/(routes)/(endpoints)/users/route.ts
   
   // ✅ Simple is better
   api/users/route.ts
   ```

## Next Steps

Learn about other routing patterns:

- **[Static Routes](./static-routes.md)** - Fixed API endpoints
- **[Dynamic Routes](./dynamic-routes.md)** - Capture URL parameters
- **[Wildcard Routes](./wildcard-routes.md)** - Handle complex nested paths

Route groups are a powerful organizational tool. Use them to keep your codebase clean and maintainable as your API grows, without sacrificing URL simplicity.

