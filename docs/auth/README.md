# eBay OAuth Scopes Documentation

This directory contains comprehensive documentation about eBay OAuth scopes for the MCP server.

## Overview

eBay uses OAuth 2.0 for authentication and authorization. **OAuth scopes** determine what actions your application can perform on behalf of a user. This MCP server supports both **sandbox** and **production** environments, each with different sets of available scopes.

### Important Distinction: Two OAuth Systems

This MCP server uses **two separate OAuth systems**:

1. **MCP OAuth** - Controls access to the MCP server itself
   - Scopes: `mcp:tools` (allows calling MCP tools)
   - Used by: MCP clients (Claude Desktop, etc.)
   - Configured in: `OAUTH_REQUIRED_SCOPES` environment variable

2. **eBay OAuth** - Controls access to eBay's APIs
   - Scopes: eBay-specific scopes (see below)
   - Used by: This MCP server when making eBay API calls
   - Configured in: eBay Developer credentials + user authorization

## Environment-Specific Scopes

### Scope Configuration Files

- **Production Scopes**: [`production_scopes.json`](./production_scopes.json) - 27 unique scopes
- **Sandbox Scopes**: [`sandbox_scopes.json`](./sandbox_scopes.json) - 35 unique scopes

### Key Differences

| Feature | Production | Sandbox |
|---------|-----------|---------|
| **Total Scopes** | 27 | 35 |
| **Buy API Scopes** | ❌ Not available | ✅ Available (8 scopes) |
| **Extended Identity** | ❌ Basic only | ✅ Email, phone, address, name, status |
| **eDelivery** | ✅ Available | ❌ Not available |
| **Item Draft** | ❌ Not available | ✅ Available |
| **Commerce Shipping** | ✅ Available | ❌ Not available |

### Production-Only Scopes

These scopes are **only available in production**:

```
https://api.ebay.com/oauth/scope/sell.edelivery
https://api.ebay.com/oauth/api_scope/commerce.message
https://api.ebay.com/oauth/api_scope/commerce.shipping
```

### Sandbox-Only Scopes

These scopes are **only available in sandbox**:

#### Buy API Scopes (8 scopes)
```
https://api.ebay.com/oauth/api_scope/buy.order.readonly
https://api.ebay.com/oauth/api_scope/buy.guest.order
https://api.ebay.com/oauth/api_scope/buy.shopping.cart
https://api.ebay.com/oauth/api_scope/buy.offer.auction
https://api.ebay.com/oauth/api_scope/buy.item.feed
https://api.ebay.com/oauth/api_scope/buy.marketing
https://api.ebay.com/oauth/api_scope/buy.product.feed
https://api.ebay.com/oauth/api_scope/buy.marketplace.insights
https://api.ebay.com/oauth/api_scope/buy.proxy.guest.order
https://api.ebay.com/oauth/api_scope/buy.item.bulk
https://api.ebay.com/oauth/api_scope/buy.deal
```

#### Extended Identity Scopes (5 scopes)
```
https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly
https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly
https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly
https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly
https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly
```

#### Other Sandbox-Only Scopes
```
https://api.ebay.com/oauth/api_scope/sell.item.draft
https://api.ebay.com/oauth/api_scope/sell.item
https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly
https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly
```

### Common Scopes (Both Environments)

These 20 scopes are available in **both production and sandbox**:

#### Core Access
```
https://api.ebay.com/oauth/api_scope
```

#### Sell APIs
```
https://api.ebay.com/oauth/api_scope/sell.marketing.readonly
https://api.ebay.com/oauth/api_scope/sell.marketing
https://api.ebay.com/oauth/api_scope/sell.inventory.readonly
https://api.ebay.com/oauth/api_scope/sell.inventory
https://api.ebay.com/oauth/api_scope/sell.account.readonly
https://api.ebay.com/oauth/api_scope/sell.account
https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly
https://api.ebay.com/oauth/api_scope/sell.fulfillment
https://api.ebay.com/oauth/api_scope/sell.analytics.readonly
https://api.ebay.com/oauth/api_scope/sell.finances
https://api.ebay.com/oauth/api_scope/sell.payment.dispute
https://api.ebay.com/oauth/api_scope/sell.reputation
https://api.ebay.com/oauth/api_scope/sell.reputation.readonly
https://api.ebay.com/oauth/api_scope/sell.stores
https://api.ebay.com/oauth/api_scope/sell.stores.readonly
https://api.ebay.com/oauth/api_scope/sell.inventory.mapping
```

#### Commerce APIs
```
https://api.ebay.com/oauth/api_scope/commerce.identity.readonly
https://api.ebay.com/oauth/api_scope/commerce.notification.subscription
https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly
https://api.ebay.com/oauth/api_scope/commerce.vero
https://api.ebay.com/oauth/api_scope/commerce.feedback
https://api.ebay.com/oauth/api_scope/commerce.feedback.readonly
```

## Authentication Methods

### 1. User Tokens (Recommended)

**Rate Limit**: 10,000-50,000 requests/day

User tokens provide the highest rate limits and full API access. They require user authorization via OAuth flow.

**To get user tokens**:
1. Use the `ebay_get_oauth_url` tool to generate an authorization URL
2. User opens URL in browser and grants permissions
3. User is redirected to your callback with an authorization code
4. Exchange the code for tokens (or use `ebay_set_user_tokens` if you have them)

**Token Validity**:
- Access token: ~2 hours
- Refresh token: ~18 months
- Automatically refreshed by the server

### 2. Client Credentials (Fallback)

**Rate Limit**: 1,000 requests/day

Client credentials provide basic API access without user authorization. Used automatically as fallback when no user tokens are available.

**Scope**: `https://api.ebay.com/oauth/api_scope` (basic access only)

## Scope Selection

### Automatic Environment-Specific Scopes

When generating an OAuth authorization URL without specifying custom scopes, the server automatically selects the appropriate scopes for your environment:

```javascript
// If EBAY_ENVIRONMENT=production, uses production scopes (27 scopes)
// If EBAY_ENVIRONMENT=sandbox, uses sandbox scopes (35 scopes)
```

### Custom Scopes

You can provide custom scopes when calling `ebay_get_oauth_url`:

```json
{
  "scopes": [
    "https://api.ebay.com/oauth/api_scope/sell.inventory",
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment"
  ]
}
```

**Scope Validation**: The server will validate your custom scopes against the current environment and warn you if:
- You request production-only scopes in sandbox
- You request sandbox-only scopes in production
- You request unrecognized scopes

## Rate Limits

Rate limits vary significantly based on authentication method and account level:

| Method | Daily Rate Limit | Best For |
|--------|-----------------|----------|
| Client Credentials | 1,000 requests | Development, basic operations |
| User Token (Standard) | 10,000 requests | Small-medium sellers |
| User Token (Professional) | 50,000+ requests | Large sellers, high-volume |

**Recommendation**: Always use user tokens for production applications to avoid hitting rate limits.

## Troubleshooting

### "Scope not valid for environment" Warning

**Problem**: You're requesting scopes that don't exist in your current environment.

**Solution**:
1. Check your `EBAY_ENVIRONMENT` setting (should match your credentials)
2. Review the scope lists above to ensure you're requesting valid scopes
3. If switching environments, clear tokens and re-authorize: `ebay_clear_tokens`

### "User authorization expired" Error

**Problem**: Your refresh token has expired (~18 months since last authorization).

**Solution**:
1. Call `ebay_get_oauth_url` to get a new authorization URL
2. Complete the OAuth flow again
3. Use `ebay_set_user_tokens` with the new tokens

### "Rate limit exceeded" Error

**Problem**: You've exceeded your daily rate limit.

**Solution**:
1. Check token type: `ebay_get_token_status`
2. If using client credentials, upgrade to user tokens
3. If using user tokens, consider upgrading your eBay seller account tier
4. Implement request throttling in your application

### Scope Mismatch After Environment Switch

**Problem**: Stored tokens have scopes from a different environment.

**Solution**:
1. Clear existing tokens: `ebay_clear_tokens`
2. Update `EBAY_ENVIRONMENT` in your `.env` file
3. Restart the MCP server
4. Re-authorize with `ebay_get_oauth_url` and `ebay_set_user_tokens`

## Best Practices

1. **Request Only Needed Scopes**: Don't request all scopes if you only need a few APIs
2. **Use Environment-Appropriate Scopes**: Let the server auto-select scopes when possible
3. **Monitor Token Status**: Use `ebay_get_token_status` to check token validity
4. **Handle Refresh Gracefully**: The server auto-refreshes, but handle expiry in your app
5. **Test in Sandbox First**: Always test scope changes in sandbox before production
6. **Store Tokens Securely**: Tokens are stored in `~/.ebay-mcp-tokens.json` - protect this file
7. **Rotate Tokens Regularly**: Re-authorize periodically for security best practices

## Related Documentation

- [Scope Requirements](./scope-requirements.md) - Which APIs require which scopes
- [Troubleshooting Guide](./troubleshooting.md) - Common issues and solutions
- [eBay OAuth Documentation](https://developer.ebay.com/api-docs/static/oauth-authorization-code-grant.html) - Official eBay OAuth guide
- [Token Management](../manual-token-config.md) - Manual token configuration

## Tools for Scope Management

### Check Token Status
```
ebay_get_token_status
```
Returns:
- Whether user tokens are set
- Whether client credentials are available
- Token scopes vs. environment scopes
- Missing scopes

### Generate OAuth URL
```
ebay_get_oauth_url
```
Parameters:
- `scopes` (optional): Custom scopes array
- `redirectUri` (optional): OAuth callback URL
- `state` (optional): CSRF protection

### Set User Tokens
```
ebay_set_user_tokens
```
Parameters:
- `accessToken`: User access token
- `refreshToken`: User refresh token

### Clear Tokens
```
ebay_clear_tokens
```
Removes all stored tokens (user and client credentials).

## Scope Update Policy

eBay may add new scopes over time. This server:
- ✅ Allows unrecognized scopes (forwards them to eBay)
- ⚠️ Warns about unrecognized scopes
- 📝 Logs warnings for debugging
- 🔄 Update `production_scopes.json` and `sandbox_scopes.json` periodically

To update scope files:
1. Check eBay Developer Portal for new scopes
2. Update JSON files in `docs/auth/`
3. Rebuild the server: `npm run build`
4. Restart the MCP server
