import axios from "axios";
import { getAuthUrl, getBaseUrl, getDefaultScopes, validateScopes } from "@/config/environment.js";
import type {
  EbayAppAccessTokenResponse,
  EbayConfig,
  EbayUserToken,
  StoredTokenData,
} from "@/types/ebay.js";
import { TokenStorage } from "@/auth/token-storage.js";

/**
 * Manages eBay OAuth 2.0 authentication
 * Supports both client credentials (app tokens) and user access tokens with refresh
 */
export class EbayOAuthClient {
  private appAccessToken: string | null = null;
  private appAccessTokenExpiry = 0;
  private userTokens: StoredTokenData | null = null;

  constructor(private config: EbayConfig) { }

  /**
   * Initialize user tokens from storage if available
   */
  async initialize(): Promise<void> {
    if (await TokenStorage.hasTokens()) {
      this.userTokens = await TokenStorage.loadTokens();

      // Validate stored token scopes against current environment
      if (this.userTokens?.scope) {
        const tokenScopes = this.userTokens.scope.split(' ');
        const validation = validateScopes(tokenScopes, this.config.environment);

        if (validation.warnings.length > 0) {
          console.warn('⚠️  Token scope validation warnings:');
          validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
          console.warn('  Token will still be used, but some scopes may not work in this environment.');
        }
      }
    }
  }

  /**
   * Check if user tokens are available
   */
  hasUserTokens(): boolean {
    return this.userTokens !== null;
  }

  /**
   * Get a valid access token, with priority order:
   * 1. User access token (if available and valid, or refreshable)
   * 2. App access token from client credentials (fallback)
   */
  async getAccessToken(): Promise<string> {
    // Try to use user token first
    if (this.userTokens) {
      // Check if access token is still valid
      if (!TokenStorage.isUserAccessTokenExpired(this.userTokens)) {
        return this.userTokens.userAccessToken;
      }

      // Try to refresh if refresh token is valid
      if (!TokenStorage.isUserRefreshTokenExpired(this.userTokens)) {
        try {
          await this.refreshUserToken();
          return this.userTokens.userAccessToken;
        } catch (error) {
          console.error(
            "Failed to refresh user token, falling back to app access token:",
            error,
          );
          // Clear invalid tokens
          this.userTokens = null;
          await TokenStorage.clearTokens();
        }
      } else {
        // Refresh token expired
        console.error("User refresh token expired. User needs to re-authorize.");
        this.userTokens = null;
        await TokenStorage.clearTokens();
        throw new Error(
          "User authorization expired. Please provide new access and refresh tokens.",
        );
      }
    }

    // Fallback to app access token (client credentials)
    if (this.appAccessToken && Date.now() < this.appAccessTokenExpiry) {
      return this.appAccessToken;
    }

    await this.getAppAccessToken();
    return this.appAccessToken!;
  }

  /**
   * Set user access token and refresh token
   * This is called when user provides their tokens
   */
  async setUserTokens(
    accessToken: string,
    refreshToken: string,
    accessTokenExpiry?: number,
    refreshTokenExpiry?: number,
  ): Promise<void> {
    // Store tokens with default expiry (adjust based on actual token response)
    // Access tokens typically expire in 2 hours (7200 seconds)
    // Refresh tokens typically expire in 18 months
    const now = Date.now();
    const storedTokens: StoredTokenData = {
      userAccessToken: accessToken,
      userRefreshToken: refreshToken,
      tokenType: "Bearer",
      userAccessTokenExpiry: accessTokenExpiry ?? (now + 7200 * 1000), // 2 hours default
      userRefreshTokenExpiry: refreshTokenExpiry ?? (now + 18 * 30 * 24 * 60 * 60 * 1000), // ~18 months default
    };

    this.userTokens = storedTokens;
    await TokenStorage.saveTokens(storedTokens);
  }

  /**
   * Get app access token using client credentials flow
   * This is a public method that can be called directly to get app-level access
   * Rate limit: 1,000 requests/day
   */
  async getAppAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.appAccessToken && Date.now() < this.appAccessTokenExpiry) {
      return this.appAccessToken;
    }

    const authUrl = `${getBaseUrl(this.config.environment)}/identity/v1/oauth2/token`;
    const credentials = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`,
    ).toString("base64");

    // Client credentials flow only supports basic scope
    // User authorization flows can request additional scopes
    const scopeParam = "https://api.ebay.com/oauth/api_scope";

    try {
      const response = await axios.post<EbayAppAccessTokenResponse>(
        authUrl,
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: scopeParam,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      this.appAccessToken = response.data.access_token;
      // Set expiry with 60 second buffer
      this.appAccessTokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;

      return this.appAccessToken;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get app access token: ${error.response?.data?.error_description || error.message}`,
        );
      }
      throw error;
    }
  }

  /**
   * Exchange authorization code for user access token
   */
  async exchangeCodeForToken(code: string): Promise<EbayUserToken> {
    if (!this.config.redirectUri) {
      throw new Error(
        "Redirect URI is required for authorization code exchange",
      );
    }

    const authUrl = getAuthUrl(this.config.environment);
    const credentials = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`,
    ).toString("base64");

    try {
      const response = await axios.post(
        authUrl,
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: this.config.redirectUri,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      const tokenData: EbayUserToken = response.data;

      // Store the user tokens
      const now = Date.now();
      const storedTokens: StoredTokenData = {
        userAccessToken: tokenData.access_token,
        userRefreshToken: tokenData.refresh_token,
        tokenType: tokenData.token_type,
        userAccessTokenExpiry: now + tokenData.expires_in * 1000,
        userRefreshTokenExpiry: now + tokenData.refresh_token_expires_in * 1000,
        scope: tokenData.scope,
      };

      this.userTokens = storedTokens;
      await TokenStorage.saveTokens(storedTokens);

      return tokenData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to exchange code for token: ${error.response?.data?.error_description || error.message}`,
        );
      }
      throw error;
    }
  }

  /**
   * Refresh user access token using refresh token
   */
  private async refreshUserToken(): Promise<void> {
    if (!this.userTokens) {
      throw new Error("No user tokens available to refresh");
    }

    const authUrl = getAuthUrl(this.config.environment);
    const credentials = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`,
    ).toString("base64");

    try {
      const response = await axios.post(
        authUrl,
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.userTokens.userRefreshToken,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      const tokenData: EbayUserToken = response.data;

      // Update stored tokens
      const now = Date.now();
      const updatedTokens: StoredTokenData = {
        userAccessToken: tokenData.access_token,
        userRefreshToken: tokenData.refresh_token || this.userTokens.userRefreshToken, // Use new refresh token if provided
        tokenType: tokenData.token_type,
        userAccessTokenExpiry: now + tokenData.expires_in * 1000,
        userRefreshTokenExpiry: tokenData.refresh_token_expires_in
          ? now + tokenData.refresh_token_expires_in * 1000
          : this.userTokens.userRefreshTokenExpiry, // Keep existing expiry if not provided
        scope: tokenData.scope,
      };

      this.userTokens = updatedTokens;
      await TokenStorage.saveTokens(updatedTokens);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to refresh token: ${error.response?.data?.error_description || error.message}`,
        );
      }
      throw error;
    }
  }

  /**
   * Check if currently authenticated (either user or app credentials)
   */
  isAuthenticated(): boolean {
    if (
      this.userTokens &&
      !TokenStorage.isUserAccessTokenExpired(this.userTokens)
    ) {
      return true;
    }
    return this.appAccessToken !== null && Date.now() < this.appAccessTokenExpiry;
  }

  /**
   * Clear all authentication tokens
   */
  async clearAllTokens(): Promise<void> {
    this.appAccessToken = null;
    this.appAccessTokenExpiry = 0;
    this.userTokens = null;
    await TokenStorage.clearTokens();
  }

  /**
   * Get current token info for debugging
   */
  getTokenInfo(): { hasUserToken: boolean; hasAppAccessToken: boolean; scopeInfo?: { tokenScopes: string[]; environmentScopes: string[]; missingScopes: string[] } } {
    const info: { hasUserToken: boolean; hasAppAccessToken: boolean; scopeInfo?: { tokenScopes: string[]; environmentScopes: string[]; missingScopes: string[] } } = {
      hasUserToken:
        this.userTokens !== null &&
        !TokenStorage.isUserAccessTokenExpired(this.userTokens),
      hasAppAccessToken: this.appAccessToken !== null && Date.now() < this.appAccessTokenExpiry,
    };

    // Add scope comparison info if user tokens are available
    if (this.userTokens?.scope) {
      const tokenScopes = this.userTokens.scope.split(' ');
      const environmentScopes = getDefaultScopes(this.config.environment);
      const tokenScopeSet = new Set(tokenScopes);
      const missingScopes = environmentScopes.filter(scope => !tokenScopeSet.has(scope));

      info.scopeInfo = {
        tokenScopes,
        environmentScopes,
        missingScopes,
      };
    }

    return info;
  }
}
