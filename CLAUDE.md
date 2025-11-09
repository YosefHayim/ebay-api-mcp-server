# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for eBay APIs, specifically focused on eBay's Sell APIs. The project provides access to eBay's seller-facing APIs through the MCP protocol, allowing AI assistants to interact with eBay seller functionality.

## Repository Structure

```
docs/sell-apps/
├── account-management/       # Account API - seller policies, programs, tax tables
├── analytics-and-report/     # Analytics API - traffic reports, performance metrics
├── communication/            # Negotiation, Feedback, Notification, Message APIs
├── listing-management/       # Inventory API - manage listings and inventory
├── listing-metadata/         # Metadata API - category and listing metadata
├── markeitng-and-promotions/ # Marketing and Recommendation APIs (typo in folder name)
├── order-management/         # Fulfillment API - order processing and shipping
└── other-apis/              # Identity, Vero, Compliance, Translation, eDelivery APIs
```

## OpenAPI Specifications

The repository contains 18 OpenAPI 3.0 specification files for eBay's Sell APIs:

### Core Selling APIs
- **sell_account_v1_oas3.json** - Seller account configuration, policies, programs
- **sell_inventory_v1_oas3.json** - Inventory and listing management
- **sell_fulfillment_v1_oas3.json** - Order fulfillment and shipping
- **sell_marketing_v1_oas3.json** - Marketing campaigns and promotions
- **sell_analytics_v1_oas3.json** - Sales and traffic analytics

### Communication APIs
- **sell_negotiation_v1_oas3.json** - Buyer-seller negotiations
- **commerce_message_v1_oas3.json** - Messaging between buyers and sellers
- **commerce_notification_v1_oas3.json** - Event notifications
- **commerce_feedback_v1_beta_oas3.json** - Feedback management

### Supporting APIs
- **sell_metadata_v1_oas3.json** - Category and listing metadata
- **sell_recommendation_v1_oas3.json** - Listing recommendations
- **sell_compliance_v1_oas3.json** - Listing compliance checks
- **commerce_identity_v1_oas3.json** - User identity verification
- **commerce_translation_v1_beta_oas3.json** - Translation services
- **commerce_vero_v1_oas3.json** - Verified Rights Owner program
- **sell_edelivery_international_shipping_oas3.json** - International shipping eDelivery

## Development Context

### Current State
The repository is in early development with only OpenAPI specifications committed. The MCP server implementation is not yet present.

### Expected Architecture
When implementing the MCP server, it will likely follow this pattern:
- MCP server entrypoint that exposes eBay API operations as MCP tools
- Authentication handling for eBay OAuth 2.0
- API client code generated from or based on the OpenAPI specs
- Tool definitions mapping eBay API endpoints to MCP tool calls

### Known Issues
- Typo in directory name: `markeitng-and-promotions` should be `marketing-and-promotions`
- Duplicate marketing spec files in both `markeitng-and-promotions/` and `other-apis/`

## API Categories

When working with the specifications, note the logical groupings:

1. **Account Management**: Configure seller account, business policies, payment policies, return policies, sales tax
2. **Listing Management**: Create, update, manage inventory items and offers
3. **Order Management**: Process orders, manage shipments, handle fulfillment
4. **Marketing**: Create promotions, manage campaigns, get recommendations
5. **Analytics**: Access performance data, traffic reports, sales metrics
6. **Communication**: Handle buyer messages, negotiations, notifications, feedback
7. **Compliance & Metadata**: Check listing compliance, access category metadata, translations

## eBay API Context

All APIs use the base URL `https://api.ebay.com/sell/{api_name}/{version}` and require OAuth 2.0 authentication with appropriate scopes for seller operations.
