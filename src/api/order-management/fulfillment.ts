import { EbayApiClient } from '../client.js';

/**
 * Fulfillment API - Order processing and shipping
 * Based on: docs/sell-apps/order-management/sell_fulfillment_v1_oas3.json
 */
export class FulfillmentApi {
  private readonly basePath = '/sell/fulfillment/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get orders for the seller
   */
  async getOrders(filter?: string, limit?: number, offset?: number) {
    const params: any = {};
    if (filter) params.filter = filter;
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    return this.client.get(`${this.basePath}/order`, params);
  }

  /**
   * Get a specific order
   */
  async getOrder(orderId: string) {
    return this.client.get(`${this.basePath}/order/${orderId}`);
  }

  /**
   * Create a shipping fulfillment
   */
  async createShippingFulfillment(orderId: string, fulfillment: any) {
    return this.client.post(
      `${this.basePath}/order/${orderId}/shipping_fulfillment`,
      fulfillment
    );
  }

  /**
   * Get shipping fulfillments for an order
   */
  async getShippingFulfillments(orderId: string) {
    return this.client.get(`${this.basePath}/order/${orderId}/shipping_fulfillment`);
  }

  /**
   * Issue a refund
   */
  async issueRefund(orderId: string, refund: any) {
    return this.client.post(`${this.basePath}/order/${orderId}/issue_refund`, refund);
  }
}
