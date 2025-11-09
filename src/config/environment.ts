import { config } from 'dotenv';
import { EbayConfig } from '../types/ebay.js';

config();

export function getEbayConfig(): EbayConfig {
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  const environment = (process.env.EBAY_ENVIRONMENT || 'sandbox') as 'production' | 'sandbox';

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing required eBay credentials. Please set EBAY_CLIENT_ID and EBAY_CLIENT_SECRET environment variables.'
    );
  }

  return {
    clientId,
    clientSecret,
    redirectUri: process.env.EBAY_REDIRECT_URI,
    environment
  };
}

export function getBaseUrl(environment: 'production' | 'sandbox'): string {
  return environment === 'production'
    ? 'https://api.ebay.com'
    : 'https://api.sandbox.ebay.com';
}

export function getAuthUrl(environment: 'production' | 'sandbox'): string {
  return environment === 'production'
    ? 'https://api.ebay.com/identity/v1/oauth2/token'
    : 'https://api.sandbox.ebay.com/identity/v1/oauth2/token';
}
