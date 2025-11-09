// inventory/withdraw-offer-by-inventory-item-group.d.ts

import type { EbayMarketplace } from "../../inventory-api-global-types.js";

/**
 * POST https://api.ebay.com/sell/inventory/v1/offer/withdraw_by_inventory_item_group
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Ends the multiple-variation eBay listing associated with an inventory item group.
 * The inventory item group and its offers remain but revert to unpublished state.
 *
 * OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * Required header: Content-Type: application/json
 */

/** Request body for withdrawOfferByInventoryItemGroup */
export type WithdrawByInventoryItemGroupRequest = {
  /** Unique identifier of the inventory item group. */
  inventoryItemGroupKey: string;

  /** Target marketplace for which the listing is ended. */
  marketplaceId: EbayMarketplace;
};

/** No response payload on success (HTTP 204). */
export type WithdrawByInventoryItemGroupResponse = undefined;

/** HTTP status codes potentially returned by this operation. */
export type WithdrawByInventoryItemGroupHttpStatus = 204 | 400 | 500;

/** Options for executing withdrawOfferByInventoryItemGroup. */
export type WithdrawByInventoryItemGroupOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers (Content-Type will be application/json). */
  headers?: Record<string, string>;
};

/**
 * Withdraw (end) the multiple-variation listing associated with an inventory item group.
 * Returns no payload on success (204 No Content).
 */
export declare function withdrawOfferByInventoryItemGroup(
  request: WithdrawByInventoryItemGroupRequest,
  options: WithdrawByInventoryItemGroupOptions
): Promise<WithdrawByInventoryItemGroupResponse>;
