import type { InventoryItem, InventoryItemWithSkuLocaleGroupKeys } from "../inventory-api-global-types.js";

/**
 * Query parameters for getInventoryItems.
 * limit: Max items per page (1–200, default 25) — stringified integer.
 * offset: Zero-based page index (default 0) — stringified integer.
 */
export type GetInventoryItemsQueryParams = {
  limit?: string;
  offset?: string;
};

/**
 * Inventory item shape returned by list endpoint with additional grouping fields.
 * Extends base InventoryItem with group associations.
 */
export type InventoryItemWithSkuLocaleGroupId = InventoryItem & {
  /**
   * Group identifiers this item belongs to.
   * Occurrence: Conditional
   */
  groupIds?: string[];

  /**
   * Variation keys for multi-variation listings.
   * Occurrence: Conditional
   */
  inventoryItemGroupKeys?: InventoryItemWithSkuLocaleGroupKeys[];
};

/**
 * Response payload for getInventoryItems.
 */
export type GetInventoryItemsResponse = {
  /**
   * URL to the current page.
   * Occurrence: Always
   */
  href: string;

  /**
   * Inventory items on this page.
   * Occurrence: Always
   */
  inventoryItems: InventoryItemWithSkuLocaleGroupId[];

  /**
   * Page size used.
   * Occurrence: Always
   */
  limit: number;

  /**
   * URL to next page (if more pages exist).
   * Occurrence: Conditional
   */
  next?: string;

  /**
   * URL to previous page (if exists).
   * Occurrence: Conditional
   */
  prev?: string;

  /**
   * Total number of pages available.
   * Occurrence: Always
   */
  size: number;

  /**
   * Total number of inventory items in account.
   * Occurrence: Always
   */
  total: number;
};
