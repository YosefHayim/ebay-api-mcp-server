import type { EbayApiClient } from '../client.js';

/**
 * Notification API - Event notifications and subscriptions
 * Based on: docs/sell-apps/communication/commerce_notification_v1_oas3.json
 */
export class NotificationApi {
  private readonly basePath = '/commerce/notification/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get public key for validating notifications
   * @throws Error if required parameters are missing or invalid
   */
  async getPublicKey(publicKeyId: string) {
    if (!publicKeyId || typeof publicKeyId !== 'string') {
      throw new Error('publicKeyId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/public_key/${publicKeyId}`);
    } catch (error) {
      throw new Error(
        `Failed to get public key: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get notification config
   * @throws Error if the request fails
   */
  async getConfig() {
    try {
      return await this.client.get(`${this.basePath}/config`);
    } catch (error) {
      throw new Error(
        `Failed to get config: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update notification config
   * @throws Error if required parameters are missing or invalid
   */
  async updateConfig(config: Record<string, unknown>) {
    if (!config || typeof config !== 'object') {
      throw new Error('config is required and must be an object');
    }

    try {
      return await this.client.put(`${this.basePath}/config`, config);
    } catch (error) {
      throw new Error(
        `Failed to update config: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get all destinations (paginated)
   * @throws Error if the request fails
   */
  async getDestinations(limit?: number, continuationToken?: string) {
    const params: Record<string, string> = {};
    if (limit !== undefined) params.limit = String(limit);
    if (continuationToken) params.continuation_token = continuationToken;

    try {
      return await this.client.get(`${this.basePath}/destination`, params);
    } catch (error) {
      throw new Error(
        `Failed to get destinations: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get destination
   * @throws Error if required parameters are missing or invalid
   */
  async getDestination(destinationId: string) {
    if (!destinationId || typeof destinationId !== 'string') {
      throw new Error('destinationId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/destination/${destinationId}`);
    } catch (error) {
      throw new Error(
        `Failed to get destination: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Create destination
   * @throws Error if required parameters are missing or invalid
   */
  async createDestination(destination: Record<string, unknown>) {
    if (!destination || typeof destination !== 'object') {
      throw new Error('destination is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/destination`, destination);
    } catch (error) {
      throw new Error(
        `Failed to create destination: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update destination
   * @throws Error if required parameters are missing or invalid
   */
  async updateDestination(destinationId: string, destination: Record<string, unknown>) {
    if (!destinationId || typeof destinationId !== 'string') {
      throw new Error('destinationId is required and must be a string');
    }
    if (!destination || typeof destination !== 'object') {
      throw new Error('destination is required and must be an object');
    }

    try {
      return await this.client.put(`${this.basePath}/destination/${destinationId}`, destination);
    } catch (error) {
      throw new Error(
        `Failed to update destination: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Delete destination
   * @throws Error if required parameters are missing or invalid
   */
  async deleteDestination(destinationId: string) {
    if (!destinationId || typeof destinationId !== 'string') {
      throw new Error('destinationId is required and must be a string');
    }

    try {
      return await this.client.delete(`${this.basePath}/destination/${destinationId}`);
    } catch (error) {
      throw new Error(
        `Failed to delete destination: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get all subscriptions
   * Endpoint: GET /subscription
   * @throws Error if the request fails
   */
  async getSubscriptions(limit?: number, continuationToken?: string) {
    const params: Record<string, string | number> = {};

    if (limit !== undefined) {
      if (typeof limit !== 'number' || limit < 1) {
        throw new Error('limit must be a positive number when provided');
      }
      params.limit = limit;
    }
    if (continuationToken !== undefined) {
      if (typeof continuationToken !== 'string') {
        throw new Error('continuationToken must be a string when provided');
      }
      params.continuation_token = continuationToken;
    }

    try {
      return await this.client.get(`${this.basePath}/subscription`, params);
    } catch (error) {
      throw new Error(
        `Failed to get subscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Create a subscription
   * Endpoint: POST /subscription
   * @throws Error if required parameters are missing or invalid
   */
  async createSubscription(subscription: Record<string, unknown>) {
    if (!subscription || typeof subscription !== 'object') {
      throw new Error('subscription is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/subscription`, subscription);
    } catch (error) {
      throw new Error(
        `Failed to create subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a subscription
   * Endpoint: GET /subscription/{subscription_id}
   * @throws Error if required parameters are missing or invalid
   */
  async getSubscription(subscriptionId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/subscription/${subscriptionId}`);
    } catch (error) {
      throw new Error(
        `Failed to get subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update a subscription
   * Endpoint: PUT /subscription/{subscription_id}
   * @throws Error if required parameters are missing or invalid
   */
  async updateSubscription(subscriptionId: string, subscription: Record<string, unknown>) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }
    if (!subscription || typeof subscription !== 'object') {
      throw new Error('subscription is required and must be an object');
    }

    try {
      return await this.client.put(`${this.basePath}/subscription/${subscriptionId}`, subscription);
    } catch (error) {
      throw new Error(
        `Failed to update subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Delete a subscription
   * Endpoint: DELETE /subscription/{subscription_id}
   * @throws Error if required parameters are missing or invalid
   */
  async deleteSubscription(subscriptionId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }

    try {
      return await this.client.delete(`${this.basePath}/subscription/${subscriptionId}`);
    } catch (error) {
      throw new Error(
        `Failed to delete subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Disable a subscription
   * Endpoint: POST /subscription/{subscription_id}/disable
   * @throws Error if required parameters are missing or invalid
   */
  async disableSubscription(subscriptionId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }

    try {
      return await this.client.post(`${this.basePath}/subscription/${subscriptionId}/disable`, {});
    } catch (error) {
      throw new Error(
        `Failed to disable subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Enable a subscription
   * Endpoint: POST /subscription/{subscription_id}/enable
   * @throws Error if required parameters are missing or invalid
   */
  async enableSubscription(subscriptionId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }

    try {
      return await this.client.post(`${this.basePath}/subscription/${subscriptionId}/enable`, {});
    } catch (error) {
      throw new Error(
        `Failed to enable subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Test a subscription
   * Endpoint: POST /subscription/{subscription_id}/test
   * @throws Error if required parameters are missing or invalid
   */
  async testSubscription(subscriptionId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }

    try {
      return await this.client.post(`${this.basePath}/subscription/${subscriptionId}/test`, {});
    } catch (error) {
      throw new Error(
        `Failed to test subscription: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a topic
   * Endpoint: GET /topic/{topic_id}
   * @throws Error if required parameters are missing or invalid
   */
  async getTopic(topicId: string) {
    if (!topicId || typeof topicId !== 'string') {
      throw new Error('topicId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/topic/${topicId}`);
    } catch (error) {
      throw new Error(
        `Failed to get topic: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get all topics
   * Endpoint: GET /topic
   * @throws Error if the request fails
   */
  async getTopics(limit?: number, continuationToken?: string) {
    const params: Record<string, string | number> = {};

    if (limit !== undefined) {
      if (typeof limit !== 'number' || limit < 1) {
        throw new Error('limit must be a positive number when provided');
      }
      params.limit = limit;
    }
    if (continuationToken !== undefined) {
      if (typeof continuationToken !== 'string') {
        throw new Error('continuationToken must be a string when provided');
      }
      params.continuation_token = continuationToken;
    }

    try {
      return await this.client.get(`${this.basePath}/topic`, params);
    } catch (error) {
      throw new Error(
        `Failed to get topics: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Create a subscription filter
   * Endpoint: POST /subscription/{subscription_id}/filter
   * @throws Error if required parameters are missing or invalid
   */
  async createSubscriptionFilter(subscriptionId: string, filter: Record<string, unknown>) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }
    if (!filter || typeof filter !== 'object') {
      throw new Error('filter is required and must be an object');
    }

    try {
      return await this.client.post(
        `${this.basePath}/subscription/${subscriptionId}/filter`,
        filter
      );
    } catch (error) {
      throw new Error(
        `Failed to create subscription filter: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a subscription filter
   * Endpoint: GET /subscription/{subscription_id}/filter/{filter_id}
   * @throws Error if required parameters are missing or invalid
   */
  async getSubscriptionFilter(subscriptionId: string, filterId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }
    if (!filterId || typeof filterId !== 'string') {
      throw new Error('filterId is required and must be a string');
    }

    try {
      return await this.client.get(
        `${this.basePath}/subscription/${subscriptionId}/filter/${filterId}`
      );
    } catch (error) {
      throw new Error(
        `Failed to get subscription filter: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Delete a subscription filter
   * Endpoint: DELETE /subscription/{subscription_id}/filter/{filter_id}
   * @throws Error if required parameters are missing or invalid
   */
  async deleteSubscriptionFilter(subscriptionId: string, filterId: string) {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
      throw new Error('subscriptionId is required and must be a string');
    }
    if (!filterId || typeof filterId !== 'string') {
      throw new Error('filterId is required and must be a string');
    }

    try {
      return await this.client.delete(
        `${this.basePath}/subscription/${subscriptionId}/filter/${filterId}`
      );
    } catch (error) {
      throw new Error(
        `Failed to delete subscription filter: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
