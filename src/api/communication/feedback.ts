import { EbayApiClient } from '../client.js';

/**
 * Feedback API - Manage buyer and seller feedback
 * Based on: docs/sell-apps/communication/commerce_feedback_v1_beta_oas3.json
 */
export class FeedbackApi {
  private readonly basePath = '/commerce/feedback/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Get items awaiting feedback
   * Endpoint: GET /awaiting_feedback
   * @throws Error if the request fails
   */
  async getAwaitingFeedback(filter?: string, limit?: number, offset?: number) {
    const params: Record<string, string | number> = {};

    if (filter !== undefined) {
      if (typeof filter !== 'string') {
        throw new Error('filter must be a string when provided');
      }
      params.filter = filter;
    }
    if (limit !== undefined) {
      if (typeof limit !== 'number' || limit < 1) {
        throw new Error('limit must be a positive number when provided');
      }
      params.limit = limit;
    }
    if (offset !== undefined) {
      if (typeof offset !== 'number' || offset < 0) {
        throw new Error('offset must be a non-negative number when provided');
      }
      params.offset = offset;
    }

    try {
      return await this.client.get(`${this.basePath}/awaiting_feedback`, params);
    } catch (error) {
      throw new Error(
        `Failed to get awaiting feedback: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get feedback for a transaction
   * Endpoint: GET /feedback
   * @throws Error if required parameters are missing or invalid
   */
  async getFeedback(transactionId: string) {
    if (!transactionId || typeof transactionId !== 'string') {
      throw new Error('transactionId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/feedback`, {
        transaction_id: transactionId
      });
    } catch (error) {
      throw new Error(
        `Failed to get feedback: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get feedback rating summary
   * Endpoint: GET /feedback_rating_summary
   * @throws Error if the request fails
   */
  async getFeedbackRatingSummary() {
    try {
      return await this.client.get(`${this.basePath}/feedback_rating_summary`);
    } catch (error) {
      throw new Error(
        `Failed to get feedback rating summary: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Leave feedback for a buyer
   * Endpoint: POST /feedback
   * @throws Error if required parameters are missing or invalid
   */
  async leaveFeedbackForBuyer(feedbackData: Record<string, unknown>) {
    if (!feedbackData || typeof feedbackData !== 'object') {
      throw new Error('feedbackData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/feedback`, feedbackData);
    } catch (error) {
      throw new Error(
        `Failed to leave feedback: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Respond to feedback
   * Endpoint: POST /respond_to_feedback
   * @throws Error if required parameters are missing or invalid
   */
  async respondToFeedback(feedbackId: string, responseText: string) {
    if (!feedbackId || typeof feedbackId !== 'string') {
      throw new Error('feedbackId is required and must be a string');
    }
    if (!responseText || typeof responseText !== 'string') {
      throw new Error('responseText is required and must be a string');
    }

    try {
      return await this.client.post(`${this.basePath}/respond_to_feedback`, {
        feedback_id: feedbackId,
        response_text: responseText
      });
    } catch (error) {
      throw new Error(
        `Failed to respond to feedback: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get feedback summary
   * @deprecated Use getFeedbackRatingSummary() instead
   */
  async getFeedbackSummary() {
    return this.getFeedbackRatingSummary();
  }
}
