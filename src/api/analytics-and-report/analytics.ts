import { EbayApiClient } from '../client.js';

/**
 * Analytics API - Sales and traffic analytics
 * Based on: docs/sell-apps/analytics-and-report/sell_analytics_v1_oas3.json
 */
export class AnalyticsApi {
  private readonly basePath = '/sell/analytics/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get traffic report for listings
   */
  async getTrafficReport(
    dimension: string,
    filter: string,
    metric: string,
    sort?: string
  ) {
    const params: Record<string, string> = {
      dimension,
      filter,
      metric
    };
    if (sort) params.sort = sort;
    return this.client.get(`${this.basePath}/traffic_report`, params);
  }

  /**
   * Find all seller standards profiles
   * Endpoint: GET /seller_standards_profile
   */
  async findSellerStandardsProfiles() {
    return this.client.get(`${this.basePath}/seller_standards_profile`);
  }

  /**
   * Get a specific seller standards profile
   * Endpoint: GET /seller_standards_profile/{program}/{cycle}
   */
  async getSellerStandardsProfile(program: string, cycle: string) {
    return this.client.get(
      `${this.basePath}/seller_standards_profile/${program}/${cycle}`
    );
  }

  /**
   * Get customer service metrics
   * Endpoint: GET /customer_service_metric/{customer_service_metric_type}/{evaluation_type}
   */
  async getCustomerServiceMetric(
    customerServiceMetricType: string,
    evaluationType: string,
    evaluationMarketplaceId: string
  ) {
    const params = {
      evaluation_marketplace_id: evaluationMarketplaceId
    };
    return this.client.get(
      `${this.basePath}/customer_service_metric/${customerServiceMetricType}/${evaluationType}`,
      params
    );
  }
}
