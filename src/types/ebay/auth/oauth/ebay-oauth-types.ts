import type { EbayMarketplaceIdEnum } from "../../global/global-ebay-types.js";

/** Standard OAuth token response from eBay */
export type EbayTokenResponse = {
  /** Access token (Bearer) used for API calls */
  access_token: string;
  /** Seconds until access_token expiry */
  expires_in: number;
  /** Refresh token used to mint new access tokens */
  refresh_token: string;
  /** Seconds until refresh_token expiry */
  refresh_token_expires_in: number;
  /** Token type, typically "Bearer" */
  token_type: string;
  error?: string;
  error_description?: string;
};

export type EbayAppAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

/** Standard OAuth token response from eBay */
export type EbayTokenClientCredentials = {
  /** Access token (Bearer) used for API calls */
  access_token: string;
  /** Seconds until access_token expiry */
  expires_in: number;
  /** Token type, typically "Bearer" */
  token_type: string;
};

export type ConsentQueryParameters = {
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope: string;
  locale?: EbayMarketplaceIdEnum;
  prompt?: string;
  state?: string;
};

export type UpdateAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  error?: string;
  error_description?: string;
};
