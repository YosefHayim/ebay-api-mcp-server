import { EbayApiClient } from './client.js';
import { AccountApi } from './account-management/account.js';
import { InventoryApi } from './listing-management/inventory.js';
import { FulfillmentApi } from './order-management/fulfillment.js';
import { MarketingApi } from './marketing-and-promotions/marketing.js';
import { EbayConfig } from '../types/ebay.js';

/**
 * Main API facade providing access to all eBay Sell APIs
 */
export class EbaySellerApi {
  private client: EbayApiClient;

  // API categories
  public account: AccountApi;
  public inventory: InventoryApi;
  public fulfillment: FulfillmentApi;
  public marketing: MarketingApi;

  constructor(config: EbayConfig) {
    this.client = new EbayApiClient(config);

    // Initialize API category handlers
    this.account = new AccountApi(this.client);
    this.inventory = new InventoryApi(this.client);
    this.fulfillment = new FulfillmentApi(this.client);
    this.marketing = new MarketingApi(this.client);
  }

  /**
   * Check if the API client is authenticated
   */
  isAuthenticated(): boolean {
    return this.client.isAuthenticated();
  }
}

export * from './client.js';
export * from './account-management/account.js';
export * from './listing-management/inventory.js';
export * from './order-management/fulfillment.js';
export * from './marketing-and-promotions/marketing.js';
