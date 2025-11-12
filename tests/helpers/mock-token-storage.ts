import type { StoredTokenData } from "@/types/ebay.js";

/**
 * Mock token storage for testing
 */
export class MockTokenStorage {
  private static tokens: StoredTokenData | null = null;

  static async hasTokens(): Promise<boolean> {
    return this.tokens !== null;
  }

  static async loadTokens(): Promise<StoredTokenData> {
    if (!this.tokens) {
      throw new Error("No tokens stored");
    }
    return this.tokens;
  }

  static async saveTokens(tokens: StoredTokenData): Promise<void> {
    this.tokens = tokens;
  }

  static async clearTokens(): Promise<void> {
    this.tokens = null;
  }

  static isUserAccessTokenExpired(tokens: StoredTokenData): boolean {
    return Date.now() >= tokens.userAccessTokenExpiry;
  }

  static isUserRefreshTokenExpired(tokens: StoredTokenData): boolean {
    return Date.now() >= tokens.userRefreshTokenExpiry;
  }

  // Helper methods for testing
  static setMockTokens(tokens: StoredTokenData | null): void {
    this.tokens = tokens;
  }

  static getMockTokens(): StoredTokenData | null {
    return this.tokens;
  }

  static reset(): void {
    this.tokens = null;
  }
}

/**
 * Create mock stored token data for testing
 */
export function createMockTokens(
  overrides: Partial<StoredTokenData> = {}
): StoredTokenData {
  const now = Date.now();
  return {
    userAccessToken: "mock_access_token",
    userRefreshToken: "mock_refresh_token",
    tokenType: "Bearer",
    userAccessTokenExpiry: now + 7200 * 1000, // 2 hours from now
    userRefreshTokenExpiry: now + 18 * 30 * 24 * 60 * 60 * 1000, // 18 months
    scope: "https://api.ebay.com/oauth/api_scope/sell.inventory",
    ...overrides,
  };
}

/**
 * Create expired mock tokens
 */
export function createExpiredAccessToken(): StoredTokenData {
  const now = Date.now();
  return createMockTokens({
    userAccessTokenExpiry: now - 1000, // 1 second ago
    userRefreshTokenExpiry: now + 18 * 30 * 24 * 60 * 60 * 1000, // Still valid
  });
}

/**
 * Create fully expired mock tokens (both access and refresh)
 */
export function createFullyExpiredTokens(): StoredTokenData {
  const now = Date.now();
  return createMockTokens({
    userAccessTokenExpiry: now - 1000, // 1 second ago
    userRefreshTokenExpiry: now - 1000, // Also expired
  });
}
