import type { EbaySellerApi } from "../api/index.js";
import {
  accountTools,
  analyticsTools,
  communicationTools,
  fulfillmentTools,
  inventoryTools,
  marketingTools,
  metadataTools,
  otherApiTools,
  ToolDefinition,
  taxonomyTools,
} from "./tool-definitions.js";

export { ToolDefinition };

/**
 * Get all tool definitions for the MCP server
 */
export function getToolDefinitions(): ToolDefinition[] {
  return [
    ...accountTools,
    ...inventoryTools,
    ...fulfillmentTools,
    ...marketingTools,
    ...analyticsTools,
    ...metadataTools,
    ...taxonomyTools,
    ...communicationTools,
    ...otherApiTools,
  ];
}

/**
 * Execute a tool based on its name
 */
export async function executeTool(
  api: EbaySellerApi,
  toolName: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  switch (toolName) {
    // Account Management
    case "ebay_get_custom_policies":
      return api.account.getCustomPolicies(args.policyTypes as string);
    case "ebay_get_fulfillment_policies":
      return api.account.getFulfillmentPolicies(args.marketplaceId as string);
    case "ebay_get_payment_policies":
      return api.account.getPaymentPolicies(args.marketplaceId as string);
    case "ebay_get_return_policies":
      return api.account.getReturnPolicies(args.marketplaceId as string);

    // Inventory Management
    case "ebay_get_inventory_items":
      return api.inventory.getInventoryItems(
        args.limit as number,
        args.offset as number,
      );
    case "ebay_get_inventory_item":
      return api.inventory.getInventoryItem(args.sku as string);
    case "ebay_create_inventory_item":
      return api.inventory.createOrReplaceInventoryItem(
        args.sku as string,
        args.inventoryItem,
      );
    case "ebay_get_offers":
      return api.inventory.getOffers(
        args.sku as string,
        args.marketplaceId as string,
        args.limit as number,
      );
    case "ebay_create_offer":
      return api.inventory.createOffer(args.offer);
    case "ebay_publish_offer":
      return api.inventory.publishOffer(args.offerId as string);

    // Order Management
    case "ebay_get_orders":
      return api.fulfillment.getOrders(
        args.filter as string,
        args.limit as number,
        args.offset as number,
      );
    case "ebay_get_order":
      return api.fulfillment.getOrder(args.orderId as string);
    case "ebay_create_shipping_fulfillment":
      return api.fulfillment.createShippingFulfillment(
        args.orderId as string,
        args.fulfillment,
      );

    // Marketing
    case "ebay_get_campaigns":
      return api.marketing.getCampaigns(
        args.campaignStatus as string,
        args.marketplaceId as string,
        args.limit as number,
      );
    case "ebay_get_promotions":
      return api.marketing.getPromotions(
        args.marketplaceId as string,
        args.limit as number,
      );

    // Recommendation
    case "ebay_find_listing_recommendations":
      return api.recommendation.findListingRecommendations(
        args.listingIds
          ? { listingIds: args.listingIds as string[] }
          : undefined,
        args.filter as string,
        args.limit as number,
        args.offset as number,
        args.marketplaceId as string,
      );

    // Analytics
    case "ebay_get_traffic_report":
      return api.analytics.getTrafficReport(
        args.dimension as string,
        args.filter as string,
        args.metric as string,
        args.sort as string,
      );
    case "ebay_find_seller_standards_profiles":
      return api.analytics.findSellerStandardsProfiles();
    case "ebay_get_seller_standards_profile":
      return api.analytics.getSellerStandardsProfile(
        args.program as string,
        args.cycle as string,
      );
    case "ebay_get_customer_service_metric":
      return api.analytics.getCustomerServiceMetric(
        args.customerServiceMetricType as string,
        args.evaluationType as string,
        args.evaluationMarketplaceId as string,
      );

    // Metadata
    case "ebay_get_category_policies":
      return api.metadata.getCategoryPolicies(
        args.marketplaceId as string,
        args.filter as string,
      );
    case "ebay_get_item_condition_policies":
      return api.metadata.getItemConditionPolicies(
        args.marketplaceId as string,
        args.filter as string,
      );

    // Taxonomy
    case "ebay_get_default_category_tree_id":
      return api.taxonomy.getDefaultCategoryTreeId(
        args.marketplaceId as string,
      );
    case "ebay_get_category_tree":
      return api.taxonomy.getCategoryTree(args.categoryTreeId as string);
    case "ebay_get_category_suggestions":
      return api.taxonomy.getCategorySuggestions(
        args.categoryTreeId as string,
        args.query as string,
      );
    case "ebay_get_item_aspects_for_category":
      return api.taxonomy.getItemAspectsForCategory(
        args.categoryTreeId as string,
        args.categoryId as string,
      );

    // Communication - Negotiation
    case "ebay_get_offers_to_buyers":
      return api.negotiation.getOffersToBuyers(
        args.filter as string,
        args.limit as number,
        args.offset as number,
      );
    case "ebay_send_offer_to_interested_buyers":
      return api.negotiation.sendOfferToInterestedBuyers(
        args.offerId as string,
        args.offerData as Record<string, unknown>,
      );

    // Communication - Message
    case "ebay_search_messages":
      return api.message.searchMessages(
        args.filter as string,
        args.limit as number,
        args.offset as number,
      );
    case "ebay_get_message":
      return api.message.getMessage(args.messageId as string);
    case "ebay_reply_to_message":
      return api.message.replyToMessage(
        args.messageId as string,
        args.messageContent as string,
      );

    // Communication - Notification
    case "ebay_get_notification_config":
      return api.notification.getConfig();
    case "ebay_update_notification_config":
      return api.notification.updateConfig(
        args.config as Record<string, unknown>,
      );
    case "ebay_create_notification_destination":
      return api.notification.createDestination(
        args.destination as Record<string, unknown>,
      );

    // Communication - Feedback
    case "ebay_get_feedback":
      return api.feedback.getFeedback(args.transactionId as string);
    case "ebay_leave_feedback_for_buyer":
      return api.feedback.leaveFeedbackForBuyer(
        args.feedbackData as Record<string, unknown>,
      );
    case "ebay_get_feedback_summary":
      return api.feedback.getFeedbackSummary();

    // Other APIs - Identity
    case "ebay_get_user":
      return api.identity.getUser();

    // Other APIs - Compliance
    case "ebay_get_listing_violations":
      return api.compliance.getListingViolations(
        args.complianceType as string,
        args.offset as number,
        args.limit as number,
      );
    case "ebay_get_listing_violations_summary":
      return api.compliance.getListingViolationsSummary(
        args.complianceType as string,
      );
    case "ebay_suppress_violation":
      return api.compliance.suppressViolation(
        args.listingViolationId as string,
      );

    // Other APIs - VERO
    case "ebay_report_infringement":
      return api.vero.reportInfringement(
        args.infringementData as Record<string, unknown>,
      );
    case "ebay_get_reported_items":
      return api.vero.getReportedItems(
        args.filter as string,
        args.limit as number,
        args.offset as number,
      );

    // Other APIs - Translation
    case "ebay_translate":
      return api.translation.translate(
        args.from as string,
        args.to as string,
        args.translationContext as string,
        args.text as string[],
      );

    // Other APIs - eDelivery
    case "ebay_create_shipping_quote":
      return api.edelivery.createShippingQuote(
        args.shippingQuoteRequest as Record<string, unknown>,
      );
    case "ebay_get_shipping_quote":
      return api.edelivery.getShippingQuote(args.shippingQuoteId as string);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
