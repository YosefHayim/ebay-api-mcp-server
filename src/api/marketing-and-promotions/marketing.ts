import { EbayApiClient } from '../client.js';

/**
 * Marketing API - Marketing campaigns and promotions
 * Based on: docs/sell-apps/marketing-and-promotions/sell_marketing_v1_oas3.json
 */
export class MarketingApi {
  private readonly basePath = '/sell/marketing/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get campaigns
   */
  async getCampaigns(
    campaignStatus?: string,
    marketplaceId?: string,
    limit?: number
  ) {
    const params: any = {};
    if (campaignStatus) params.campaign_status = campaignStatus;
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get(`${this.basePath}/ad_campaign`, params);
  }

  /**
   * Get a specific campaign
   */
  async getCampaign(campaignId: string) {
    return this.client.get(`${this.basePath}/ad_campaign/${campaignId}`);
  }

  /**
   * Create a campaign
   */
  async createCampaign(campaign: any) {
    return this.client.post(`${this.basePath}/ad_campaign`, campaign);
  }

  /**
   * Get promotions
   */
  async getPromotions(marketplaceId?: string, limit?: number) {
    const params: any = {};
    if (marketplaceId) params.marketplace_id = marketplaceId;
    if (limit) params.limit = limit;
    return this.client.get(`${this.basePath}/promotion`, params);
  }

  /**
   * Create a promotion
   */
  async createPromotion(promotion: any) {
    return this.client.post(`${this.basePath}/promotion`, promotion);
  }
}
