# eBay API Scope Requirements

This document maps eBay API operations to their required OAuth scopes.

## Overview

Each eBay API endpoint requires specific OAuth scopes. Using this guide, you can determine which scopes to request when authorizing a user.

## Scope Requirement Matrix

### Account Management API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get fulfillment policies | `sell.account.readonly` or `sell.account` | Read |
| Create fulfillment policy | `sell.account` | Write |
| Update fulfillment policy | `sell.account` | Write |
| Delete fulfillment policy | `sell.account` | Write |
| Get payment policies | `sell.account.readonly` or `sell.account` | Read |
| Create payment policy | `sell.account` | Write |
| Update payment policy | `sell.account` | Write |
| Delete payment policy | `sell.account` | Write |
| Get return policies | `sell.account.readonly` or `sell.account` | Read |
| Create return policy | `sell.account` | Write |
| Update return policy | `sell.account` | Write |
| Delete return policy | `sell.account` | Write |
| Get sales tax | `sell.account.readonly` or `sell.account` | Read |
| Set sales tax | `sell.account` | Write |
| Get subscription | `sell.account.readonly` or `sell.account` | Read |
| Get KYC status | `sell.account.readonly` or `sell.account` | Read |
| Get rate tables | `sell.account.readonly` or `sell.account` | Read |

### Inventory Management API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get inventory items | `sell.inventory.readonly` or `sell.inventory` | Read |
| Get inventory item | `sell.inventory.readonly` or `sell.inventory` | Read |
| Create inventory item | `sell.inventory` | Write |
| Update inventory item | `sell.inventory` | Write |
| Delete inventory item | `sell.inventory` | Write |
| Get offers | `sell.inventory.readonly` or `sell.inventory` | Read |
| Create offer | `sell.inventory` | Write |
| Update offer | `sell.inventory` | Write |
| Delete offer | `sell.inventory` | Write |
| Publish offer | `sell.inventory` | Write |
| Withdraw offer | `sell.inventory` | Write |
| Get inventory locations | `sell.inventory.readonly` or `sell.inventory` | Read |
| Create inventory location | `sell.inventory` | Write |
| Update inventory location | `sell.inventory` | Write |
| Delete inventory location | `sell.inventory` | Write |
| Get product compatibility | `sell.inventory.readonly` or `sell.inventory` | Read |
| Set product compatibility | `sell.inventory` | Write |

### Order Fulfillment API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get orders | `sell.fulfillment.readonly` or `sell.fulfillment` | Read |
| Get order | `sell.fulfillment.readonly` or `sell.fulfillment` | Read |
| Create shipping fulfillment | `sell.fulfillment` | Write |
| Issue refund | `sell.fulfillment` | Write |

### Marketing API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get campaigns | `sell.marketing.readonly` or `sell.marketing` | Read |
| Get campaign | `sell.marketing.readonly` or `sell.marketing` | Read |
| Create campaign | `sell.marketing` | Write |
| Update campaign | `sell.marketing` | Write |
| Pause campaign | `sell.marketing` | Write |
| Resume campaign | `sell.marketing` | Write |
| End campaign | `sell.marketing` | Write |
| Clone campaign | `sell.marketing` | Write |
| Get promotions | `sell.marketing.readonly` or `sell.marketing` | Read |
| Create promotion | `sell.marketing` | Write |
| Update promotion | `sell.marketing` | Write |

### Analytics API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get traffic report | `sell.analytics.readonly` | Read |
| Get customer service metrics | `sell.analytics.readonly` | Read |
| Find seller standards profiles | `sell.analytics.readonly` | Read |
| Get seller standards profile | `sell.analytics.readonly` | Read |

### Recommendation API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Find listing recommendations | `sell.inventory.readonly` or `sell.inventory` | Read |

### Dispute API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get disputes | `sell.payment.dispute` | Read |
| Get dispute | `sell.payment.dispute` | Read |
| Update dispute evidence | `sell.payment.dispute` | Write |

### Finances API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get transactions | `sell.finances` | Read |
| Get payouts | `sell.finances` | Read |
| Get seller payouts summary | `sell.finances` | Read |

### Negotiation API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get offers to buyers | `sell.inventory` | Read |
| Send offer to buyers | `sell.inventory` | Write |

### Messaging API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Search messages | `commerce.message` | Read |
| Get message | `commerce.message` | Read |
| Send message | `commerce.message` | Write |
| Reply to message | `commerce.message` | Write |

**Note**: `commerce.message` scope is:
- ✅ Available in **production**
- ❌ Not available in **sandbox** (sandbox has implicit messaging access)

### Feedback API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get feedback | `commerce.feedback.readonly` or `commerce.feedback` | Read |
| Leave feedback | `commerce.feedback` | Write |
| Get feedback summary | `commerce.feedback.readonly` or `commerce.feedback` | Read |

### Identity API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get user | `commerce.identity.readonly` | Read |

**Extended Identity (Sandbox Only)**:
- Email: `commerce.identity.email.readonly`
- Phone: `commerce.identity.phone.readonly`
- Address: `commerce.identity.address.readonly`
- Name: `commerce.identity.name.readonly`
- Status: `commerce.identity.status.readonly`

### Notification API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get notification config | `commerce.notification.subscription.readonly` or `commerce.notification.subscription` | Read |
| Update notification config | `commerce.notification.subscription` | Write |
| Create destination | `commerce.notification.subscription` | Write |

### Compliance API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get listing violations | `sell.inventory.readonly` or `sell.inventory` | Read |
| Get violations summary | `sell.inventory.readonly` or `sell.inventory` | Read |
| Suppress violation | `sell.inventory` | Write |

### VERO API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Report infringement | `commerce.vero` | Write |
| Get reported items | `commerce.vero` | Read |

### Translation API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Translate | `sell.inventory` | Read |

### Taxonomy API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get category tree | `https://api.ebay.com/oauth/api_scope` | Read |
| Get category suggestions | `https://api.ebay.com/oauth/api_scope` | Read |
| Get item aspects | `https://api.ebay.com/oauth/api_scope` | Read |

**Note**: Taxonomy API uses the base scope (public data).

### Metadata API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get automotive parts compatibility | `https://api.ebay.com/oauth/api_scope` | Read |
| Get category policies | `https://api.ebay.com/oauth/api_scope` | Read |
| Get item condition policies | `https://api.ebay.com/oauth/api_scope` | Read |
| Get listing structure policies | `https://api.ebay.com/oauth/api_scope` | Read |
| Get negotiated price policies | `https://api.ebay.com/oauth/api_scope` | Read |
| Get return policies | `https://api.ebay.com/oauth/api_scope` | Read |

**Note**: Metadata API uses the base scope (public data).

### eDelivery API (Production Only)

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Create shipping quote | `sell.edelivery` | Write |
| Get shipping quote | `sell.edelivery` | Read |

**Note**: `sell.edelivery` is only available in **production**.

### Shipping API (Production Only)

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get shipping options | `commerce.shipping` | Read |
| Create shipment | `commerce.shipping` | Write |

**Note**: `commerce.shipping` is only available in **production**.

### Stores API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get store | `sell.stores.readonly` or `sell.stores` | Read |
| Update store | `sell.stores` | Write |

### Reputation API

| Operation | Required Scope | Read/Write |
|-----------|---------------|------------|
| Get seller reputation | `sell.reputation.readonly` or `sell.reputation` | Read |
| Update seller reputation | `sell.reputation` | Write |

## Scope Selection Strategies

### Minimal Scopes (Read-Only Operations)

If your application only needs to read data, use readonly scopes:

```javascript
const readOnlyScopes = [
  "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
  "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
  "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly",
  "https://api.ebay.com/oauth/api_scope/commerce.identity.readonly",
];
```

### Full Seller Scopes (Read/Write Operations)

For full seller functionality:

```javascript
const sellerScopes = [
  "https://api.ebay.com/oauth/api_scope/sell.inventory",
  "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
  "https://api.ebay.com/oauth/api_scope/sell.account",
  "https://api.ebay.com/oauth/api_scope/sell.marketing",
  "https://api.ebay.com/oauth/api_scope/sell.finances",
  "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly",
  "https://api.ebay.com/oauth/api_scope/commerce.identity.readonly",
];
```

### All Scopes (Maximum Access)

For comprehensive access, use the environment's default scopes:
- Let the server auto-select: Don't pass `scopes` parameter to `ebay_get_oauth_url`
- Production: 27 scopes
- Sandbox: 35 scopes

## Scope Hierarchy

Some scopes imply others:

### Write Implies Read

If you have write access, you can also read:
- `sell.inventory` → Can also read (includes `sell.inventory.readonly`)
- `sell.fulfillment` → Can also read (includes `sell.fulfillment.readonly`)
- `sell.account` → Can also read (includes `sell.account.readonly`)

### Dependent Scopes

Some operations require multiple scopes:

**Publishing an offer**:
- `sell.inventory` (create/update offer)
- `sell.account` (policies must exist)
- `sell.fulfillment` (if creating listings that ship)

**Creating a campaign**:
- `sell.marketing` (campaign operations)
- `sell.inventory.readonly` (to verify items exist)

## Checking Required Scopes

### Using Token Status

Check which scopes your token has:

```
ebay_get_token_status
```

Returns:
```json
{
  "hasUserToken": true,
  "scopeInfo": {
    "tokenScopes": ["sell.inventory", "sell.fulfillment", ...],
    "environmentScopes": [...],
    "missingScopes": [...]
  }
}
```

### Missing Scopes

If `missingScopes` is not empty, you may need to:
1. Re-authorize with additional scopes
2. Accept that some operations won't work
3. Use a different token with required scopes

## Best Practices

1. **Request Minimal Scopes**: Only request scopes you actually need
2. **Use Readonly When Possible**: Reduces risk if token is compromised
3. **Check Before Operations**: Verify token has required scope before calling API
4. **Handle Scope Errors**: eBay returns 403 Forbidden if scope is missing
5. **Document Scope Requirements**: Clearly document which scopes your app needs

## Common Scope Combinations

### Inventory Manager App
```
sell.inventory
sell.account.readonly
commerce.identity.readonly
```

### Order Fulfillment App
```
sell.fulfillment
sell.finances
commerce.identity.readonly
```

### Marketing Dashboard App
```
sell.marketing
sell.inventory.readonly
sell.analytics.readonly
```

### Complete Seller Portal
```
sell.inventory
sell.fulfillment
sell.account
sell.marketing
sell.finances
sell.analytics.readonly
commerce.identity.readonly
commerce.notification.subscription
```

## Related Documentation

- [OAuth Scopes Overview](./README.md) - Main scope documentation
- [Troubleshooting Guide](./troubleshooting.md) - Common scope issues
- [eBay API Documentation](https://developer.ebay.com/api-docs) - Official API docs
