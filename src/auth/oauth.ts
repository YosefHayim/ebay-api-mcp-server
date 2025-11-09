import axios from 'axios';
import { EbayConfig, EbayAuthToken } from '../types/ebay.js';
import { getAuthUrl } from '../config/environment.js';

/**
 * Manages eBay OAuth 2.0 authentication
 */
export class EbayOAuthClient {
  private token: EbayAuthToken | null = null;
  private tokenExpiry: number = 0;

  constructor(private config: EbayConfig) {}

  /**
   * Get a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token.access_token;
    }

    await this.authenticate();
    return this.token!.access_token;
  }

  /**
   * Authenticate using client credentials flow
   */
  private async authenticate(): Promise<void> {
    const authUrl = getAuthUrl(this.config.environment);
    const credentials = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`
    ).toString('base64');

    try {
      const response = await axios.post(
        authUrl,
        'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
          }
        }
      );

      this.token = response.data;
      // Set expiry with 60 second buffer
      this.tokenExpiry = Date.now() + (this.token!.expires_in - 60) * 1000;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `eBay authentication failed: ${error.response?.data?.error_description || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Check if currently authenticated
   */
  isAuthenticated(): boolean {
    return this.token !== null && Date.now() < this.tokenExpiry;
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this.token = null;
    this.tokenExpiry = 0;
  }
}
