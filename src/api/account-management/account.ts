import { EbayApiClient } from '../client.js';

/**
 * Account API - Seller account configuration, policies, programs
 * Based on: docs/sell-apps/account-management/sell_account_v1_oas3.json
 */
export class AccountApi {
  private readonly basePath = '/sell/account/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get custom policies for the seller
   */
  async getCustomPolicies(policyTypes?: string) {
    const params = policyTypes ? { policy_types: policyTypes } : undefined;
    return this.client.get(`${this.basePath}/custom_policy`, params);
  }

  /**
   * Get a specific custom policy
   */
  async getCustomPolicy(customPolicyId: string) {
    return this.client.get(`${this.basePath}/custom_policy/${customPolicyId}`);
  }

  /**
   * Get fulfillment policies
   */
  async getFulfillmentPolicies(marketplaceId?: string) {
    const params = marketplaceId ? { marketplace_id: marketplaceId } : undefined;
    return this.client.get(`${this.basePath}/fulfillment_policy`, params);
  }

  /**
   * Get payment policies
   */
  async getPaymentPolicies(marketplaceId?: string) {
    const params = marketplaceId ? { marketplace_id: marketplaceId } : undefined;
    return this.client.get(`${this.basePath}/payment_policy`, params);
  }

  /**
   * Get return policies
   */
  async getReturnPolicies(marketplaceId?: string) {
    const params = marketplaceId ? { marketplace_id: marketplaceId } : undefined;
    return this.client.get(`${this.basePath}/return_policy`, params);
  }

  /**
   * Get seller account privileges
   */
  async getPrivileges() {
    return this.client.get(`${this.basePath}/privilege`);
  }
}
