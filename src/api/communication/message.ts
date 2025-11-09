import { EbayApiClient } from '../client.js';

/**
 * Message API - Buyer-seller messaging
 * Based on: docs/sell-apps/communication/commerce_message_v1_oas3.json
 */
export class MessageApi {
  private readonly basePath = '/commerce/message/v1';

  constructor(private client: EbayApiClient) {}

  /**
   * Bulk update conversation
   * Endpoint: POST /bulk_update_conversation
   * @throws Error if required parameters are missing or invalid
   */
  async bulkUpdateConversation(updateData: Record<string, unknown>) {
    if (!updateData || typeof updateData !== 'object') {
      throw new Error('updateData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/bulk_update_conversation`, updateData);
    } catch (error) {
      throw new Error(
        `Failed to bulk update conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get conversations
   * Endpoint: GET /conversation
   * @throws Error if the request fails
   */
  async getConversations(filter?: string, limit?: number, offset?: number) {
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
      return await this.client.get(`${this.basePath}/conversation`, params);
    } catch (error) {
      throw new Error(
        `Failed to get conversations: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a specific conversation
   * Endpoint: GET /conversation/{conversation_id}
   * @throws Error if required parameters are missing or invalid
   */
  async getConversation(conversationId: string) {
    if (!conversationId || typeof conversationId !== 'string') {
      throw new Error('conversationId is required and must be a string');
    }

    try {
      return await this.client.get(`${this.basePath}/conversation/${conversationId}`);
    } catch (error) {
      throw new Error(
        `Failed to get conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Send a message
   * Endpoint: POST /send_message
   * @throws Error if required parameters are missing or invalid
   */
  async sendMessage(messageData: Record<string, unknown>) {
    if (!messageData || typeof messageData !== 'object') {
      throw new Error('messageData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/send_message`, messageData);
    } catch (error) {
      throw new Error(
        `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update a conversation
   * Endpoint: POST /update_conversation
   * @throws Error if required parameters are missing or invalid
   */
  async updateConversation(updateData: Record<string, unknown>) {
    if (!updateData || typeof updateData !== 'object') {
      throw new Error('updateData is required and must be an object');
    }

    try {
      return await this.client.post(`${this.basePath}/update_conversation`, updateData);
    } catch (error) {
      throw new Error(
        `Failed to update conversation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Search for messages
   * @deprecated Use getConversations() instead
   */
  async searchMessages(filter?: string, limit?: number, offset?: number) {
    return this.getConversations(filter, limit, offset);
  }

  /**
   * Get a specific message
   * @deprecated Use getConversation() instead
   */
  async getMessage(messageId: string) {
    return this.getConversation(messageId);
  }

  /**
   * Reply to a message
   * @deprecated Use sendMessage() instead
   */
  async replyToMessage(messageId: string, messageContent: string) {
    return this.sendMessage({
      conversation_id: messageId,
      message_content: messageContent
    });
  }
}
