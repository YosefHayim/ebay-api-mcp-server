# OAuth Scopes Troubleshooting Guide

This guide helps you diagnose and resolve common issues related to OAuth scopes in the eBay API MCP Server.

## Quick Diagnostics

### Check Token Status

Run this tool first to diagnose most issues:

```
ebay_get_token_status
```

**Interpretation:**

```json
{
  "hasUserToken": true,         // ✅ User tokens are set
  "hasClientToken": false,       // Client credentials not cached (normal)
  "scopeInfo": {
    "tokenScopes": [...],        // Scopes your token has
    "environmentScopes": [...],  // Scopes available in this environment
    "missingScopes": [...]       // Scopes you don't have but environment supports
  }
}
```

**Red Flags:**
- `hasUserToken: false` → You're using client credentials (1k req/day limit)
- `missingScopes` not empty → Some operations may fail
- Warnings in console → Scope/environment mismatch

## Common Issues

### 1. "Access token is missing" Error

**Symptom:**
```
Error: Access token is missing. Please call ebay_set_user_tokens first.
```

**Cause:** No user tokens are set, and client credentials are not being used.

**Solution:**

1. **Generate OAuth URL:**
   ```
   ebay_get_oauth_url
   ```

2. **Open the returned URL in browser**

3. **User authorizes the app**

4. **Set tokens:**
   ```
   ebay_set_user_tokens
   {
     "accessToken": "v^1.1#...",
     "refreshToken": "v^1.1#..."
   }
   ```

**Alternative:** Server should fall back to client credentials automatically. If this error persists:
- Check `EBAY_CLIENT_ID` and `EBAY_CLIENT_SECRET` in `.env`
- Restart the MCP server

---

### 2. "User authorization expired" Error

**Symptom:**
```
Error: User authorization expired. Please provide new access and refresh tokens.
```

**Cause:** Refresh token has expired (~18 months since authorization).

**Solution:**

1. **Clear old tokens:**
   ```
   ebay_clear_tokens
   ```

2. **Re-authorize** (same steps as issue #1)

**Prevention:** Re-authorize before 18 months expire.

---

### 3. "Rate limit exceeded" Error

**Symptom:**
```
eBay API Error: Rate limit exceeded
```

**Cause:** You've exceeded your daily request limit.

**Diagnosis:**

```
ebay_get_token_status
```

Check `hasUserToken`:
- `false` → Using client credentials (1,000 req/day)
- `true` → Using user tokens (10,000-50,000 req/day, depending on tier)

**Solution:**

**If using client credentials:**
1. Set up user tokens (see issue #1)
2. User tokens have 10-50x higher limits

**If using user tokens:**
1. Check your eBay seller account tier
2. Professional/Enterprise accounts have higher limits
3. Implement request throttling in your application
4. Cache API responses when possible
5. Use batch operations where available

**Temporary workaround:**
- Wait until tomorrow (limits reset daily)

---

### 4. Scope Validation Warnings on Startup

**Symptom:**
```
⚠️  Token scope validation warnings:
  - Scope "https://api.ebay.com/oauth/api_scope/buy.order.readonly" is only available in sandbox environment, not in production.
```

**Cause:** Stored tokens have scopes from a different environment.

**Impact:**
- Tokens will still work
- Some scopes may be rejected by eBay
- Some operations may fail with 403 Forbidden

**Solution:**

**If you switched environments:**

1. **Clear tokens:**
   ```
   ebay_clear_tokens
   ```

2. **Update environment in `.env`:**
   ```
   EBAY_ENVIRONMENT=production  # or sandbox
   ```

3. **Restart MCP server**

4. **Re-authorize** (see issue #1)

**If you didn't switch environments:**
- Ignore the warning if it works
- Or re-authorize to get clean scopes

---

### 5. "403 Forbidden" on API Calls

**Symptom:**
```
eBay API Error: Forbidden. The request was understood, but access is not allowed.
```

**Cause:** Missing required scope for the operation.

**Diagnosis:**

1. **Check scope requirements:**
   - See [Scope Requirements Matrix](./scope-requirements.md)
   - Find the operation you're trying to perform
   - Note the required scope

2. **Check your token scopes:**
   ```
   ebay_get_token_status
   ```
   Look at `scopeInfo.tokenScopes`

3. **Compare:**
   - Is the required scope in `tokenScopes`?
   - If no → missing scope
   - If yes → different issue (check credentials, environment, etc.)

**Solution:**

Re-authorize with the required scope:

```
ebay_get_oauth_url
{
  "scopes": [
    "https://api.ebay.com/oauth/api_scope/sell.inventory",
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
    // Add other needed scopes
  ]
}
```

**Or use all scopes** (recommended for testing):
```
ebay_get_oauth_url
// Omit scopes parameter to get all environment-specific scopes
```

---

### 6. "Scope not recognized for environment" Warning

**Symptom:**
```
Warnings:
- Scope "https://api.ebay.com/oauth/scope/sell.edelivery" is only available in production environment, not in sandbox.
```

**Cause:** You requested a scope not available in the current environment.

**Impact:**
- eBay may reject the scope during authorization
- The tool will still attempt to use it
- Related API calls may fail

**Solution:**

**Check current environment:**
```bash
echo $EBAY_ENVIRONMENT
# Should output: sandbox or production
```

**If environment is correct:**
- Don't request that scope
- See [README.md](./README.md) for environment-specific scopes

**If environment is wrong:**
1. Update `.env`:
   ```
   EBAY_ENVIRONMENT=production
   ```
2. Restart MCP server
3. Re-authorize

---

### 7. Tokens Work in Sandbox but Not Production

**Symptom:**
- Sandbox works fine
- Production returns errors

**Cause:** Using sandbox credentials in production environment (or vice versa).

**Solution:**

1. **Check credentials source:**
   - Sandbox credentials: eBay Developer Portal → Sandbox keys
   - Production credentials: eBay Developer Portal → Production keys
   - **They are different!**

2. **Update `.env` to match:**
   ```
   EBAY_CLIENT_ID=your-production-client-id
   EBAY_CLIENT_SECRET=your-production-client-secret
   EBAY_ENVIRONMENT=production
   ```

3. **Restart MCP server**

4. **Clear old tokens:**
   ```
   ebay_clear_tokens
   ```

5. **Re-authorize with production credentials**

---

### 8. "Invalid scope" Error from eBay

**Symptom:**
```
eBay API Error: Invalid scope requested
```

**Cause:**
- Typo in scope name
- Scope doesn't exist
- Scope not available for your account type

**Solution:**

1. **Check scope spelling:**
   - See [production_scopes.json](./production_scopes.json)
   - See [sandbox_scopes.json](./sandbox_scopes.json)
   - Scopes are case-sensitive!

2. **Check account eligibility:**
   - Some scopes require professional seller account
   - Some scopes require specific eBay programs enrollment

3. **Use default scopes instead:**
   ```
   ebay_get_oauth_url
   // Omit scopes parameter
   ```

---

### 9. Missing Scopes in Token Status

**Symptom:**
```json
{
  "scopeInfo": {
    "missingScopes": [
      "https://api.ebay.com/oauth/api_scope/sell.marketing",
      "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly"
    ]
  }
}
```

**Meaning:** Your token doesn't have these scopes, but your environment supports them.

**Impact:**
- Operations requiring these scopes will fail
- Other operations work fine

**When to fix:**
- **Now:** If you need those operations
- **Later:** If you might need them in the future
- **Never:** If you don't use those APIs

**Solution (if needed):**

Re-authorize with additional scopes:
```
ebay_get_oauth_url
{
  "scopes": [
    // Include all current scopes
    "https://api.ebay.com/oauth/api_scope/sell.inventory",
    // Plus new scopes
    "https://api.ebay.com/oauth/api_scope/sell.marketing",
    "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly"
  ]
}
```

---

### 10. Token Refresh Failures

**Symptom:**
```
Failed to refresh token: invalid_grant
```

**Causes:**
1. Refresh token expired (18 months)
2. User revoked authorization
3. Token was manually invalidated

**Solution:**

1. **Clear tokens:**
   ```
   ebay_clear_tokens
   ```

2. **Re-authorize** (see issue #1)

**Prevention:**
- Monitor token expiry
- Re-authorize before 18 months
- Don't share tokens between servers (each server needs its own)

---

## Diagnostic Checklist

Use this checklist to systematically diagnose issues:

- [ ] Run `ebay_get_token_status` - what does it show?
- [ ] Check console logs - any warnings or errors?
- [ ] Verify `.env` file settings:
  - [ ] `EBAY_CLIENT_ID` set?
  - [ ] `EBAY_CLIENT_SECRET` set?
  - [ ] `EBAY_ENVIRONMENT` correct (matches credentials)?
  - [ ] `EBAY_REDIRECT_URI` set (if using OAuth flow)?
- [ ] Check token file: `cat ~/.ebay-mcp-tokens.json`
  - [ ] File exists?
  - [ ] `accessToken` present?
  - [ ] `refreshToken` present?
  - [ ] `scope` field present and populated?
- [ ] Environment match check:
  - [ ] Sandbox credentials with `EBAY_ENVIRONMENT=sandbox`?
  - [ ] Production credentials with `EBAY_ENVIRONMENT=production`?
- [ ] Scope requirements:
  - [ ] Does the operation require specific scopes?
  - [ ] Do your tokens have those scopes?

---

## When to Re-Authorize

You should re-authorize when:

1. **First time setup** - No tokens set yet
2. **After 18 months** - Refresh token expiry
3. **Switching environments** - Sandbox ↔ Production
4. **Changing credentials** - New client ID/secret
5. **After clearing tokens** - `ebay_clear_tokens` was called
6. **Need new scopes** - Current token missing required scopes
7. **After revocation** - User revoked app access
8. **After errors persist** - Nuclear option: clear and re-auth

---

## Advanced Troubleshooting

### Check Token File Directly

```bash
cat ~/.ebay-mcp-tokens.json
```

**Expected format:**
```json
{
  "accessToken": "v^1.1#i^1#...",
  "refreshToken": "v^1.1#i^1#...",
  "tokenType": "Bearer",
  "accessTokenExpiry": 1736899200000,
  "refreshTokenExpiry": 1783449600000,
  "scope": "https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.fulfillment ..."
}
```

**Issues:**
- File doesn't exist → No tokens stored
- Empty `{}` → Tokens were cleared
- Missing `scope` → Old token format (pre-scope validation)
- Expiry in the past → Token expired

### Manually Test eBay OAuth

**Test outside MCP server:**

1. **Get user authorization URL:**
   ```bash
   curl https://auth.sandbox.ebay.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=https://api.ebay.com/oauth/api_scope/sell.inventory
   ```

2. **Open URL in browser, authorize**

3. **Exchange code for token:**
   ```bash
   curl -X POST https://api.sandbox.ebay.com/identity/v1/oauth2/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Authorization: Basic BASE64(CLIENT_ID:CLIENT_SECRET)" \
     -d "grant_type=authorization_code&code=AUTH_CODE&redirect_uri=YOUR_REDIRECT_URI"
   ```

4. **If this works** → Issue is with MCP server
5. **If this fails** → Issue is with eBay credentials

### Enable Debug Logging

**Edit `src/auth/oauth.ts`:**

Add console logging to track token flow:

```typescript
async getAccessToken(): Promise<string> {
  console.log('[DEBUG] Getting access token...');
  console.log('[DEBUG] Has user tokens:', this.userTokens !== null);

  if (this.userTokens) {
    console.log('[DEBUG] User token expiry:', new Date(this.userTokens.accessTokenExpiry));
    console.log('[DEBUG] Is expired:', TokenStorage.isAccessTokenExpired(this.userTokens));
  }

  // ... rest of method
}
```

**Rebuild and run:**
```bash
npm run build
# Restart MCP server
```

---

## Getting Help

If none of these solutions work:

1. **Check MCP server logs** - May contain additional error details
2. **Check eBay API status** - https://developer.ebay.com/support/api-status
3. **Verify account status** - Some operations require account approval
4. **Review eBay documentation** - https://developer.ebay.com/api-docs
5. **Open an issue** - GitHub repo with:
   - Error message (sanitize tokens!)
   - Steps to reproduce
   - Output from `ebay_get_token_status`
   - Environment (sandbox/production)

---

## Related Documentation

- [OAuth Scopes Overview](./README.md) - Main scope documentation
- [Scope Requirements](./scope-requirements.md) - Which APIs need which scopes
- [eBay OAuth Guide](https://developer.ebay.com/api-docs/static/oauth-authorization-code-grant.html) - Official OAuth docs
