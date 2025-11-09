import { EbaySellerApi } from '../api/index.js';

/**
 * MCP Tool definitions for eBay Seller APIs
 */

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

/**
 * Get all tool definitions for the MCP server
 */
export function getToolDefinitions(): ToolDefinition[] {
  return [
    // Account Management Tools
    {
      name: 'ebay_get_custom_policies',
      description: 'Retrieve custom policies defined for the seller account',
      inputSchema: {
        type: 'object',
        properties: {
          policyTypes: {
            type: 'string',
            description: 'Comma-delimited list of policy types to retrieve'
          }
        }
      }
    },
    {
      name: 'ebay_get_fulfillment_policies',
      description: 'Get fulfillment policies for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          marketplaceId: {
            type: 'string',
            description: 'eBay marketplace ID (e.g., EBAY_US)'
          }
        }
      }
    },
    {
      name: 'ebay_get_payment_policies',
      description: 'Get payment policies for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          marketplaceId: {
            type: 'string',
            description: 'eBay marketplace ID (e.g., EBAY_US)'
          }
        }
      }
    },
    {
      name: 'ebay_get_return_policies',
      description: 'Get return policies for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          marketplaceId: {
            type: 'string',
            description: 'eBay marketplace ID (e.g., EBAY_US)'
          }
        }
      }
    },

    // Inventory Management Tools
    {
      name: 'ebay_get_inventory_items',
      description: 'Retrieve all inventory items for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: 'Number of items to return (max 100)'
          },
          offset: {
            type: 'number',
            description: 'Number of items to skip'
          }
        }
      }
    },
    {
      name: 'ebay_get_inventory_item',
      description: 'Get a specific inventory item by SKU',
      inputSchema: {
        type: 'object',
        properties: {
          sku: {
            type: 'string',
            description: 'The seller-defined SKU'
          }
        },
        required: ['sku']
      }
    },
    {
      name: 'ebay_create_inventory_item',
      description: 'Create or replace an inventory item',
      inputSchema: {
        type: 'object',
        properties: {
          sku: {
            type: 'string',
            description: 'The seller-defined SKU'
          },
          inventoryItem: {
            type: 'object',
            description: 'Inventory item details'
          }
        },
        required: ['sku', 'inventoryItem']
      }
    },
    {
      name: 'ebay_get_offers',
      description: 'Get all offers for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          sku: {
            type: 'string',
            description: 'Filter by SKU'
          },
          marketplaceId: {
            type: 'string',
            description: 'Filter by marketplace ID'
          },
          limit: {
            type: 'number',
            description: 'Number of offers to return'
          }
        }
      }
    },
    {
      name: 'ebay_create_offer',
      description: 'Create a new offer for an inventory item',
      inputSchema: {
        type: 'object',
        properties: {
          offer: {
            type: 'object',
            description: 'Offer details including SKU, marketplace, pricing, and policies'
          }
        },
        required: ['offer']
      }
    },
    {
      name: 'ebay_publish_offer',
      description: 'Publish an offer to create a listing',
      inputSchema: {
        type: 'object',
        properties: {
          offerId: {
            type: 'string',
            description: 'The offer ID to publish'
          }
        },
        required: ['offerId']
      }
    },

    // Order Management Tools
    {
      name: 'ebay_get_orders',
      description: 'Retrieve orders for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          filter: {
            type: 'string',
            description: 'Filter criteria (e.g., orderfulfillmentstatus:{NOT_STARTED})'
          },
          limit: {
            type: 'number',
            description: 'Number of orders to return'
          },
          offset: {
            type: 'number',
            description: 'Number of orders to skip'
          }
        }
      }
    },
    {
      name: 'ebay_get_order',
      description: 'Get details of a specific order',
      inputSchema: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The unique order ID'
          }
        },
        required: ['orderId']
      }
    },
    {
      name: 'ebay_create_shipping_fulfillment',
      description: 'Create a shipping fulfillment for an order',
      inputSchema: {
        type: 'object',
        properties: {
          orderId: {
            type: 'string',
            description: 'The order ID'
          },
          fulfillment: {
            type: 'object',
            description: 'Shipping fulfillment details including tracking number'
          }
        },
        required: ['orderId', 'fulfillment']
      }
    },

    // Marketing Tools
    {
      name: 'ebay_get_campaigns',
      description: 'Get marketing campaigns for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          campaignStatus: {
            type: 'string',
            description: 'Filter by campaign status (RUNNING, PAUSED, ENDED)'
          },
          marketplaceId: {
            type: 'string',
            description: 'Filter by marketplace ID'
          },
          limit: {
            type: 'number',
            description: 'Number of campaigns to return'
          }
        }
      }
    },
    {
      name: 'ebay_get_promotions',
      description: 'Get promotions for the seller',
      inputSchema: {
        type: 'object',
        properties: {
          marketplaceId: {
            type: 'string',
            description: 'Filter by marketplace ID'
          },
          limit: {
            type: 'number',
            description: 'Number of promotions to return'
          }
        }
      }
    }
  ];
}

/**
 * Execute a tool based on its name
 */
export async function executeTool(
  api: EbaySellerApi,
  toolName: string,
  args: Record<string, any>
): Promise<any> {
  switch (toolName) {
    // Account Management
    case 'ebay_get_custom_policies':
      return api.account.getCustomPolicies(args.policyTypes);
    case 'ebay_get_fulfillment_policies':
      return api.account.getFulfillmentPolicies(args.marketplaceId);
    case 'ebay_get_payment_policies':
      return api.account.getPaymentPolicies(args.marketplaceId);
    case 'ebay_get_return_policies':
      return api.account.getReturnPolicies(args.marketplaceId);

    // Inventory Management
    case 'ebay_get_inventory_items':
      return api.inventory.getInventoryItems(args.limit, args.offset);
    case 'ebay_get_inventory_item':
      return api.inventory.getInventoryItem(args.sku);
    case 'ebay_create_inventory_item':
      return api.inventory.createOrReplaceInventoryItem(args.sku, args.inventoryItem);
    case 'ebay_get_offers':
      return api.inventory.getOffers(args.sku, args.marketplaceId, args.limit);
    case 'ebay_create_offer':
      return api.inventory.createOffer(args.offer);
    case 'ebay_publish_offer':
      return api.inventory.publishOffer(args.offerId);

    // Order Management
    case 'ebay_get_orders':
      return api.fulfillment.getOrders(args.filter, args.limit, args.offset);
    case 'ebay_get_order':
      return api.fulfillment.getOrder(args.orderId);
    case 'ebay_create_shipping_fulfillment':
      return api.fulfillment.createShippingFulfillment(args.orderId, args.fulfillment);

    // Marketing
    case 'ebay_get_campaigns':
      return api.marketing.getCampaigns(
        args.campaignStatus,
        args.marketplaceId,
        args.limit
      );
    case 'ebay_get_promotions':
      return api.marketing.getPromotions(args.marketplaceId, args.limit);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
