import { EbayApiClient } from '../client.js';

/**
 * Inventory API - Manage listings and inventory
 * Based on: docs/sell-apps/listing-management/sell_inventory_v1_oas3.json
 */
export class InventoryApi {
  private readonly basePath = '/sell/inventory/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get all inventory items
   */
  async getInventoryItems(limit?: number, offset?: number) {
    const params: any = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    return this.client.get(`${this.basePath}/inventory_item`, params);
  }

  /**
   * Get a specific inventory item
   */
  async getInventoryItem(sku: string) {
    return this.client.get(`${this.basePath}/inventory_item/${sku}`);
  }

  /**
   * Create or replace an inventory item
   */
  async createOrReplaceInventoryItem(sku: string, inventoryItem: any) {
    return this.client.put(`${this.basePath}/inventory_item/${sku}`, inventoryItem);
  }

  /**
   * Delete an inventory item
   */
  async deleteInventoryItem(sku: string) {
    return this.client.delete(`${this.basePath}/inventory_item/${sku}`);
  }

  /**
   * Get all offers
   */
  async getOffers(sku?: string, marketplaceId?: string, limit?: number) {
    const params: any = {};
    if (sku) params.sku = sku;
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get(`${this.basePath}/offer`, params);
  }

  /**
   * Create an offer
   */
  async createOffer(offer: any) {
    return this.client.post(`${this.basePath}/offer`, offer);
  }

  /**
   * Publish an offer
   */
  async publishOffer(offerId: string) {
    return this.client.post(`${this.basePath}/offer/${offerId}/publish`);
  }
}
