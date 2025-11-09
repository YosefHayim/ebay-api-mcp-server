import { EbayApiClient } from '../client.js';

/**
 * Metadata API - Marketplace policies and configurations
 * Based on: docs/sell-apps/listing-metadata/sell_metadata_v1_oas3.json
 */
export class MetadataApi {
  private readonly basePath = '/sell/metadata/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get automotive parts compatibility policies for a marketplace
   */
  async getAutomotivePartsCompatibilityPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_automotive_parts_compatibility_policies`,
      params
    );
  }

  /**
   * Get category policies for a marketplace
   */
  async getCategoryPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_category_policies`,
      params
    );
  }

  /**
   * Get extended producer responsibility policies
   */
  async getExtendedProducerResponsibilityPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_extended_producer_responsibility_policies`,
      params
    );
  }

  /**
   * Get hazardous materials labels
   */
  async getHazardousMaterialsLabels(marketplaceId: string) {
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_hazardous_materials_labels`
    );
  }

  /**
   * Get item condition policies for a marketplace
   */
  async getItemConditionPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_item_condition_policies`,
      params
    );
  }

  /**
   * Get listing structure policies
   */
  async getListingStructurePolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_listing_structure_policies`,
      params
    );
  }

  /**
   * Get negotiated price policies
   */
  async getNegotiatedPricePolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_negotiated_price_policies`,
      params
    );
  }

  /**
   * Get product safety labels
   */
  async getProductSafetyLabels(marketplaceId: string) {
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_product_safety_labels`
    );
  }

  /**
   * Get regulatory policies
   */
  async getRegulatoryPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_regulatory_policies`,
      params
    );
  }

  /**
   * Get return policies for a marketplace
   */
  async getReturnPolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_return_policies`,
      params
    );
  }

  /**
   * Get shipping cost type policies
   */
  async getShippingCostTypePolicies(marketplaceId: string, filter?: string) {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    return this.client.get(
      `${this.basePath}/marketplace/${marketplaceId}/get_shipping_cost_type_policies`,
      params
    );
  }
}
