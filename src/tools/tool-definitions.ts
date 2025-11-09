/**
 * MCP Tool definitions - part 1 (Core APIs)
 * Separated for better organization
 */

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const accountTools: ToolDefinition[] = [
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
  }
];

export const inventoryTools: ToolDefinition[] = [
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
  }
];

export const fulfillmentTools: ToolDefinition[] = [
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
  }
];

export const marketingTools: ToolDefinition[] = [
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
  },
  {
    name: 'ebay_find_listing_recommendations',
    description: 'Find listing recommendations for items',
    inputSchema: {
      type: 'object',
      properties: {
        listingIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of listing IDs to get recommendations for'
        },
        filter: {
          type: 'string',
          description: 'Filter criteria'
        },
        limit: {
          type: 'number',
          description: 'Number of recommendations to return'
        },
        offset: {
          type: 'number',
          description: 'Number to skip'
        },
        marketplaceId: {
          type: 'string',
          description: 'Marketplace ID'
        }
      }
    }
  }
];

export const analyticsTools: ToolDefinition[] = [
  {
    name: 'ebay_get_traffic_report',
    description: 'Get traffic report for listings',
    inputSchema: {
      type: 'object',
      properties: {
        dimension: {
          type: 'string',
          description: 'Dimension for the report (e.g., LISTING, DAY)'
        },
        filter: {
          type: 'string',
          description: 'Filter criteria'
        },
        metric: {
          type: 'string',
          description: 'Metrics to retrieve (e.g., CLICK_THROUGH_RATE, IMPRESSION)'
        },
        sort: {
          type: 'string',
          description: 'Sort order'
        }
      },
      required: ['dimension', 'filter', 'metric']
    }
  },
  {
    name: 'ebay_find_seller_standards_profiles',
    description: 'Find all seller standards profiles',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'ebay_get_seller_standards_profile',
    description: 'Get a specific seller standards profile',
    inputSchema: {
      type: 'object',
      properties: {
        program: {
          type: 'string',
          description: 'The program (e.g., CUSTOMER_SERVICE)'
        },
        cycle: {
          type: 'string',
          description: 'The cycle (e.g., CURRENT)'
        }
      },
      required: ['program', 'cycle']
    }
  },
  {
    name: 'ebay_get_customer_service_metric',
    description: 'Get customer service metrics',
    inputSchema: {
      type: 'object',
      properties: {
        customerServiceMetricType: {
          type: 'string',
          description: 'Type of metric'
        },
        evaluationType: {
          type: 'string',
          description: 'Evaluation type'
        },
        evaluationMarketplaceId: {
          type: 'string',
          description: 'Marketplace ID for evaluation'
        }
      },
      required: ['customerServiceMetricType', 'evaluationType', 'evaluationMarketplaceId']
    }
  }
];

export const metadataTools: ToolDefinition[] = [
  {
    name: 'ebay_get_category_policies',
    description: 'Get category policies for a marketplace',
    inputSchema: {
      type: 'object',
      properties: {
        marketplaceId: {
          type: 'string',
          description: 'Marketplace ID'
        },
        filter: {
          type: 'string',
          description: 'Filter criteria'
        }
      },
      required: ['marketplaceId']
    }
  },
  {
    name: 'ebay_get_item_condition_policies',
    description: 'Get item condition policies for a marketplace',
    inputSchema: {
      type: 'object',
      properties: {
        marketplaceId: {
          type: 'string',
          description: 'Marketplace ID'
        },
        filter: {
          type: 'string',
          description: 'Filter criteria'
        }
      },
      required: ['marketplaceId']
    }
  }
];

export const taxonomyTools: ToolDefinition[] = [
  {
    name: 'ebay_get_default_category_tree_id',
    description: 'Get the default category tree ID for a marketplace',
    inputSchema: {
      type: 'object',
      properties: {
        marketplaceId: {
          type: 'string',
          description: 'Marketplace ID (e.g., EBAY_US)'
        }
      },
      required: ['marketplaceId']
    }
  },
  {
    name: 'ebay_get_category_tree',
    description: 'Get category tree by ID',
    inputSchema: {
      type: 'object',
      properties: {
        categoryTreeId: {
          type: 'string',
          description: 'Category tree ID'
        }
      },
      required: ['categoryTreeId']
    }
  },
  {
    name: 'ebay_get_category_suggestions',
    description: 'Get category suggestions based on query',
    inputSchema: {
      type: 'object',
      properties: {
        categoryTreeId: {
          type: 'string',
          description: 'Category tree ID'
        },
        query: {
          type: 'string',
          description: 'Search query for category suggestions'
        }
      },
      required: ['categoryTreeId', 'query']
    }
  },
  {
    name: 'ebay_get_item_aspects_for_category',
    description: 'Get item aspects for a specific category',
    inputSchema: {
      type: 'object',
      properties: {
        categoryTreeId: {
          type: 'string',
          description: 'Category tree ID'
        },
        categoryId: {
          type: 'string',
          description: 'Category ID'
        }
      },
      required: ['categoryTreeId', 'categoryId']
    }
  }
];

export const communicationTools: ToolDefinition[] = [
  // Negotiation API
  {
    name: 'ebay_get_offers_to_buyers',
    description: 'Get offers to buyers (Best Offers) for the seller',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          description: 'Filter criteria for offers'
        },
        limit: {
          type: 'number',
          description: 'Number of offers to return'
        },
        offset: {
          type: 'number',
          description: 'Number of offers to skip'
        }
      }
    }
  },
  {
    name: 'ebay_send_offer_to_interested_buyers',
    description: 'Send offer to interested buyers',
    inputSchema: {
      type: 'object',
      properties: {
        offerId: {
          type: 'string',
          description: 'The offer ID'
        },
        offerData: {
          type: 'object',
          description: 'Offer details to send to buyers'
        }
      },
      required: ['offerId', 'offerData']
    }
  },
  // Message API
  {
    name: 'ebay_search_messages',
    description: 'Search for buyer-seller messages',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          description: 'Filter criteria for messages'
        },
        limit: {
          type: 'number',
          description: 'Number of messages to return'
        },
        offset: {
          type: 'number',
          description: 'Number of messages to skip'
        }
      }
    }
  },
  {
    name: 'ebay_get_message',
    description: 'Get a specific message by ID',
    inputSchema: {
      type: 'object',
      properties: {
        messageId: {
          type: 'string',
          description: 'The message ID'
        }
      },
      required: ['messageId']
    }
  },
  {
    name: 'ebay_reply_to_message',
    description: 'Reply to a buyer message',
    inputSchema: {
      type: 'object',
      properties: {
        messageId: {
          type: 'string',
          description: 'The message ID to reply to'
        },
        messageContent: {
          type: 'string',
          description: 'The reply message content'
        }
      },
      required: ['messageId', 'messageContent']
    }
  },
  // Notification API
  {
    name: 'ebay_get_notification_config',
    description: 'Get notification configuration',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'ebay_update_notification_config',
    description: 'Update notification configuration',
    inputSchema: {
      type: 'object',
      properties: {
        config: {
          type: 'object',
          description: 'Notification configuration settings'
        }
      },
      required: ['config']
    }
  },
  {
    name: 'ebay_create_notification_destination',
    description: 'Create a notification destination',
    inputSchema: {
      type: 'object',
      properties: {
        destination: {
          type: 'object',
          description: 'Destination configuration'
        }
      },
      required: ['destination']
    }
  },
  // Feedback API
  {
    name: 'ebay_get_feedback',
    description: 'Get feedback for a transaction',
    inputSchema: {
      type: 'object',
      properties: {
        transactionId: {
          type: 'string',
          description: 'The transaction ID'
        }
      },
      required: ['transactionId']
    }
  },
  {
    name: 'ebay_leave_feedback_for_buyer',
    description: 'Leave feedback for a buyer',
    inputSchema: {
      type: 'object',
      properties: {
        feedbackData: {
          type: 'object',
          description: 'Feedback details including rating and comment'
        }
      },
      required: ['feedbackData']
    }
  },
  {
    name: 'ebay_get_feedback_summary',
    description: 'Get feedback summary for the seller',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

export const otherApiTools: ToolDefinition[] = [
  // Identity API
  {
    name: 'ebay_get_user',
    description: 'Get user identity information',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  // Compliance API
  {
    name: 'ebay_get_listing_violations',
    description: 'Get listing violations for the seller',
    inputSchema: {
      type: 'object',
      properties: {
        complianceType: {
          type: 'string',
          description: 'Type of compliance violation'
        },
        offset: {
          type: 'number',
          description: 'Number of violations to skip'
        },
        limit: {
          type: 'number',
          description: 'Number of violations to return'
        }
      }
    }
  },
  {
    name: 'ebay_get_listing_violations_summary',
    description: 'Get summary of listing violations',
    inputSchema: {
      type: 'object',
      properties: {
        complianceType: {
          type: 'string',
          description: 'Type of compliance violation'
        }
      }
    }
  },
  {
    name: 'ebay_suppress_violation',
    description: 'Suppress a listing violation',
    inputSchema: {
      type: 'object',
      properties: {
        listingViolationId: {
          type: 'string',
          description: 'The violation ID to suppress'
        }
      },
      required: ['listingViolationId']
    }
  },
  // VERO API
  {
    name: 'ebay_report_infringement',
    description: 'Report intellectual property infringement',
    inputSchema: {
      type: 'object',
      properties: {
        infringementData: {
          type: 'object',
          description: 'Infringement report details'
        }
      },
      required: ['infringementData']
    }
  },
  {
    name: 'ebay_get_reported_items',
    description: 'Get reported items',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          description: 'Filter criteria'
        },
        limit: {
          type: 'number',
          description: 'Number of items to return'
        },
        offset: {
          type: 'number',
          description: 'Number of items to skip'
        }
      }
    }
  },
  // Translation API
  {
    name: 'ebay_translate',
    description: 'Translate listing text',
    inputSchema: {
      type: 'object',
      properties: {
        from: {
          type: 'string',
          description: 'Source language code'
        },
        to: {
          type: 'string',
          description: 'Target language code'
        },
        translationContext: {
          type: 'string',
          description: 'Translation context (e.g., ITEM_TITLE, ITEM_DESCRIPTION)'
        },
        text: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of text to translate'
        }
      },
      required: ['from', 'to', 'translationContext', 'text']
    }
  },
  // eDelivery API
  {
    name: 'ebay_create_shipping_quote',
    description: 'Create a shipping quote for international shipping',
    inputSchema: {
      type: 'object',
      properties: {
        shippingQuoteRequest: {
          type: 'object',
          description: 'Shipping quote request details'
        }
      },
      required: ['shippingQuoteRequest']
    }
  },
  {
    name: 'ebay_get_shipping_quote',
    description: 'Get a shipping quote by ID',
    inputSchema: {
      type: 'object',
      properties: {
        shippingQuoteId: {
          type: 'string',
          description: 'The shipping quote ID'
        }
      },
      required: ['shippingQuoteId']
    }
  }
];
