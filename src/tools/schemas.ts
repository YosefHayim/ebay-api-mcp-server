import { z } from 'zod';

/**
 * Reusable Zod schemas for eBay API tool input validation
 *
 * These schemas provide type-safe validation while remaining flexible
 * enough to accept the full complexity of eBay API request objects.
 */

// ============================================================================
// Common/Shared Schemas
// ============================================================================

export const timeDurationSchema = z.object({
  unit: z.enum(['YEAR', 'MONTH', 'DAY', 'HOUR', 'CALENDAR_DAY', 'BUSINESS_DAY', 'MINUTE', 'SECOND', 'MILLISECOND']),
  value: z.number()
}).passthrough();

export const amountSchema = z.object({
  currency: z.string(),
  value: z.string()
}).passthrough();

export const regionSchema = z.object({
  regionName: z.string().optional(),
  regionType: z.enum(['COUNTRY', 'COUNTRY_REGION', 'STATE_OR_PROVINCE', 'WORLD_REGION', 'WORLDWIDE']).optional()
}).passthrough();

export const regionSetSchema = z.object({
  regionIncluded: z.array(regionSchema).optional(),
  regionExcluded: z.array(regionSchema).optional()
}).passthrough();

// ============================================================================
// Account Management Schemas
// ============================================================================

export const categoryTypeSchema = z.object({
  name: z.string().optional(),
  default: z.boolean().optional()
}).passthrough();

export const shippingServiceSchema = z.object({
  additionalShippingCost: amountSchema.optional(),
  buyerResponsibleForPickup: z.boolean().optional(),
  buyerResponsibleForShipping: z.boolean().optional(),
  cashOnDeliveryFee: amountSchema.optional(),
  freeShipping: z.boolean().optional(),
  shipToLocations: regionSetSchema.optional(),
  shippingCarrierCode: z.string().optional(),
  shippingCost: amountSchema.optional(),
  shippingServiceCode: z.string().optional(),
  sortOrder: z.number().optional()
}).passthrough();

export const shippingOptionSchema = z.object({
  costType: z.enum(['CALCULATED', 'FLAT_RATE', 'NOT_SPECIFIED']),
  optionType: z.enum(['DOMESTIC', 'INTERNATIONAL']),
  packageHandlingCost: amountSchema.optional(),
  rateTableId: z.string().optional(),
  shippingServices: z.array(shippingServiceSchema).optional()
}).passthrough();

export const fulfillmentPolicySchema = z.object({
  name: z.string(),
  marketplaceId: z.string(),
  categoryTypes: z.array(categoryTypeSchema).optional(),
  description: z.string().optional(),
  freightShipping: z.boolean().optional(),
  globalShipping: z.boolean().optional(),
  handlingTime: timeDurationSchema.optional(),
  localPickup: z.boolean().optional(),
  pickupDropOff: z.boolean().optional(),
  shippingOptions: z.array(shippingOptionSchema).optional(),
  shipToLocations: regionSetSchema.optional()
}).passthrough();

export const paymentMethodSchema = z.object({
  paymentMethodType: z.string(),
  brands: z.array(z.string()).optional(),
  recipientAccountReference: z.object({
    referenceId: z.string().optional(),
    referenceType: z.string().optional()
  }).passthrough().optional()
}).passthrough();

export const depositSchema = z.object({
  depositAmount: amountSchema.optional(),
  depositType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']).optional(),
  dueIn: timeDurationSchema.optional()
}).passthrough();

export const paymentPolicySchema = z.object({
  name: z.string(),
  marketplaceId: z.string(),
  categoryTypes: z.array(categoryTypeSchema).optional(),
  description: z.string().optional(),
  deposit: depositSchema.optional(),
  fullPaymentDueIn: timeDurationSchema.optional(),
  immediatePay: z.boolean().optional(),
  paymentInstructions: z.string().optional(),
  paymentMethods: z.array(paymentMethodSchema).optional()
}).passthrough();

export const returnPolicySchema = z.object({
  name: z.string(),
  marketplaceId: z.string(),
  categoryTypes: z.array(categoryTypeSchema).optional(),
  description: z.string().optional(),
  extendedHolidayReturnsOffered: z.boolean().optional(),
  refundMethod: z.enum(['MONEY_BACK', 'MERCHANDISE_CREDIT']).optional(),
  restockingFeePercentage: z.string().optional(),
  returnInstructions: z.string().optional(),
  returnMethod: z.enum(['REPLACEMENT', 'EXCHANGE']).optional(),
  returnPeriod: timeDurationSchema.optional(),
  returnsAccepted: z.boolean().optional(),
  returnShippingCostPayer: z.enum(['BUYER', 'SELLER']).optional()
}).passthrough();

export const customPolicySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  policyType: z.string(),
  label: z.string().optional()
}).passthrough();

export const salesTaxBaseSchema = z.object({
  salesTaxPercentage: z.string(),
  shippingAndHandlingTaxed: z.boolean().optional()
}).passthrough();

export const programRequestSchema = z.object({
  programType: z.string()
}).passthrough();

// ============================================================================
// Inventory Management Schemas
// ============================================================================

export const availabilitySchema = z.object({
  shipToLocationAvailability: z.object({
    quantity: z.number().optional()
  }).passthrough().optional()
}).passthrough();

export const productSchema = z.object({
  title: z.string().optional(),
  aspects: z.record(z.array(z.string())).optional(),
  brand: z.string().optional(),
  description: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  mpn: z.string().optional(),
  ean: z.array(z.string()).optional(),
  isbn: z.array(z.string()).optional(),
  upc: z.array(z.string()).optional(),
  epid: z.string().optional()
}).passthrough();

export const inventoryItemSchema = z.object({
  availability: availabilitySchema.optional(),
  condition: z.enum(['NEW', 'LIKE_NEW', 'NEW_OTHER', 'NEW_WITH_DEFECTS', 'MANUFACTURER_REFURBISHED', 'CERTIFIED_REFURBISHED', 'EXCELLENT_REFURBISHED', 'VERY_GOOD_REFURBISHED', 'GOOD_REFURBISHED', 'SELLER_REFURBISHED', 'USED_EXCELLENT', 'USED_VERY_GOOD', 'USED_GOOD', 'USED_ACCEPTABLE', 'FOR_PARTS_OR_NOT_WORKING']).optional(),
  conditionDescription: z.string().optional(),
  packageWeightAndSize: z.object({
    dimensions: z.object({
      height: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
      unit: z.enum(['INCH', 'FEET', 'CENTIMETER', 'METER']).optional()
    }).passthrough().optional(),
    packageType: z.string().optional(),
    weight: z.object({
      value: z.number().optional(),
      unit: z.enum(['POUND', 'KILOGRAM', 'OUNCE', 'GRAM']).optional()
    }).passthrough().optional()
  }).passthrough().optional(),
  product: productSchema.optional()
}).passthrough();

export const pricingSchema = z.object({
  price: amountSchema,
  pricingVisibility: z.enum(['NONE', 'PRE_CHECKOUT', 'DURING_CHECKOUT']).optional(),
  minimumAdvertisedPrice: amountSchema.optional(),
  originalRetailPrice: amountSchema.optional()
}).passthrough();

export const listingPoliciesSchema = z.object({
  fulfillmentPolicyId: z.string().optional(),
  paymentPolicyId: z.string().optional(),
  returnPolicyId: z.string().optional(),
  eBayPlusIfEligible: z.boolean().optional(),
  bestOfferTerms: z.object({
    autoAcceptPrice: amountSchema.optional(),
    autoDeclinePrice: amountSchema.optional(),
    bestOfferEnabled: z.boolean().optional()
  }).passthrough().optional()
}).passthrough();

export const offerSchema = z.object({
  sku: z.string(),
  marketplaceId: z.string(),
  format: z.enum(['AUCTION', 'FIXED_PRICE']),
  availableQuantity: z.number().optional(),
  categoryId: z.string().optional(),
  listingDescription: z.string().optional(),
  listingPolicies: listingPoliciesSchema.optional(),
  merchantLocationKey: z.string().optional(),
  pricingSummary: pricingSchema.optional(),
  quantityLimitPerBuyer: z.number().optional(),
  tax: z.object({
    applyTax: z.boolean().optional(),
    thirdPartyTaxCategory: z.string().optional(),
    vatPercentage: z.number().optional()
  }).passthrough().optional()
}).passthrough();

export const productCompatibilitySchema = z.object({
  compatibleProducts: z.array(z.object({
    productIdentifier: z.object({
      epid: z.string().optional()
    }).passthrough().optional(),
    productFamilyProperties: z.object({
      make: z.string().optional(),
      model: z.string().optional(),
      year: z.string().optional(),
      trim: z.string().optional(),
      engine: z.string().optional()
    }).passthrough().optional(),
    notes: z.string().optional()
  }).passthrough()).optional()
}).passthrough();

export const inventoryItemGroupSchema = z.object({
  aspects: z.record(z.array(z.string())),
  description: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  inventoryItemGroupKey: z.string(),
  subtitle: z.string().optional(),
  title: z.string(),
  variantSKUs: z.array(z.string()).optional(),
  variesBy: z.object({
    specifications: z.array(z.object({
      name: z.string(),
      values: z.array(z.string())
    }).passthrough()).optional()
  }).passthrough().optional()
}).passthrough();

export const locationSchema = z.object({
  location: z.object({
    address: z.object({
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      stateOrProvince: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional()
    }).passthrough().optional()
  }).passthrough().optional(),
  locationAdditionalInformation: z.string().optional(),
  locationInstructions: z.string().optional(),
  locationTypes: z.array(z.enum(['STORE', 'WAREHOUSE'])).optional(),
  locationWebUrl: z.string().optional(),
  merchantLocationStatus: z.enum(['ENABLED', 'DISABLED']).optional(),
  name: z.string().optional(),
  operatingHours: z.array(z.object({
    dayOfWeekEnum: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).optional(),
    intervals: z.array(z.object({
      open: z.string().optional(),
      close: z.string().optional()
    }).passthrough()).optional()
  }).passthrough()).optional(),
  phone: z.string().optional(),
  specialHours: z.array(z.object({
    date: z.string().optional(),
    intervals: z.array(z.object({
      open: z.string().optional(),
      close: z.string().optional()
    }).passthrough()).optional()
  }).passthrough()).optional()
}).passthrough();

// ============================================================================
// Fulfillment/Order Management Schemas
// ============================================================================

export const lineItemRefundSchema = z.object({
  lineItemId: z.string(),
  refundAmount: amountSchema.optional(),
  legacyReference: z.object({
    legacyItemId: z.string().optional(),
    legacyTransactionId: z.string().optional()
  }).passthrough().optional()
}).passthrough();

export const refundDataSchema = z.object({
  reasonForRefund: z.enum([
    'BUYER_CANCEL',
    'OUT_OF_STOCK',
    'FOUND_CHEAPER_PRICE',
    'INCORRECT_PRICE',
    'ITEM_DAMAGED',
    'ITEM_DEFECTIVE',
    'LOST_IN_TRANSIT',
    'MUTUALLY_AGREED',
    'SELLER_CANCEL'
  ]),
  comment: z.string().optional(),
  refundItems: z.array(lineItemRefundSchema).optional(),
  orderLevelRefundAmount: amountSchema.optional()
}).passthrough();

export const shippingFulfillmentSchema = z.object({
  lineItems: z.array(z.object({
    lineItemId: z.string(),
    quantity: z.number().optional()
  }).passthrough()),
  shippedDate: z.string().optional(),
  shippingCarrierCode: z.string().optional(),
  trackingNumber: z.string().optional()
}).passthrough();

// ============================================================================
// Marketing Schemas
// ============================================================================

export const campaignCriterionSchema = z.object({
  autoSelectFutureInventory: z.boolean().optional(),
  criterionType: z.string().optional(),
  selectionRules: z.array(z.object({
    brands: z.array(z.string()).optional(),
    categoryIds: z.array(z.string()).optional(),
    categoryScope: z.string().optional(),
    listingConditionIds: z.array(z.string()).optional(),
    maxPrice: amountSchema.optional(),
    minPrice: amountSchema.optional()
  }).passthrough()).optional()
}).passthrough();

export const fundingStrategySchema = z.object({
  bidPercentage: z.string().optional(),
  fundingModel: z.enum(['COST_PER_SALE', 'COST_PER_CLICK']).optional()
}).passthrough();

export const campaignSchema = z.object({
  campaignName: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  fundingStrategy: fundingStrategySchema.optional(),
  marketplaceId: z.string().optional(),
  campaignCriterion: campaignCriterionSchema.optional()
}).passthrough();

// ============================================================================
// Communication Schemas
// ============================================================================

export const messageDataSchema = z.object({
  messageText: z.string(),
  conversationId: z.string().optional(),
  otherPartyUsername: z.string().optional(),
  reference: z.object({
    referenceId: z.string().optional(),
    referenceType: z.enum(['LISTING', 'ORDER']).optional()
  }).passthrough().optional(),
  messageMedia: z.array(z.object({
    mediaUrl: z.string().optional(),
    mediaType: z.string().optional()
  }).passthrough()).optional(),
  emailCopyToSender: z.boolean().optional()
}).passthrough();

export const feedbackDataSchema = z.object({
  orderLineItemId: z.string(),
  rating: z.enum(['POSITIVE', 'NEUTRAL', 'NEGATIVE']),
  feedbackText: z.string().optional()
}).passthrough();

export const notificationConfigSchema = z.object({
  deliveryConfigs: z.array(z.object({
    endpoint: z.string().optional(),
    format: z.string().optional()
  }).passthrough()).optional()
}).passthrough();

export const notificationDestinationSchema = z.object({
  name: z.string(),
  endpoint: z.string(),
  verificationToken: z.string().optional()
}).passthrough();

// ============================================================================
// Metadata/Compatibility Schemas
// ============================================================================

export const compatibilitySpecificationSchema = z.object({
  categoryTreeId: z.string().optional(),
  categoryId: z.string().optional(),
  compatibilityProperties: z.array(z.object({
    name: z.string(),
    value: z.string()
  }).passthrough()).optional()
}).passthrough();

export const compatibilityDataSchema = z.object({
  categoryTreeId: z.string().optional(),
  specification: compatibilitySpecificationSchema.optional()
}).passthrough();

// ============================================================================
// Other Schemas
// ============================================================================

export const infringementDataSchema = z.object({
  itemId: z.string(),
  reportedItemType: z.enum(['LISTING', 'IMAGE']).optional(),
  reportingReason: z.string().optional(),
  comments: z.string().optional()
}).passthrough();

export const shippingQuoteRequestSchema = z.object({
  packageDetails: z.object({
    weight: z.object({
      value: z.number(),
      unit: z.string()
    }).passthrough(),
    dimensions: z.object({
      height: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
      unit: z.string().optional()
    }).passthrough().optional()
  }).passthrough(),
  shipFrom: z.object({
    addressLine1: z.string().optional(),
    city: z.string().optional(),
    stateOrProvince: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string()
  }).passthrough(),
  shipTo: z.object({
    addressLine1: z.string().optional(),
    city: z.string().optional(),
    stateOrProvince: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string()
  }).passthrough()
}).passthrough();

// ============================================================================
// Bulk Operation Schemas
// ============================================================================

export const bulkInventoryItemRequestSchema = z.object({
  requests: z.array(z.object({
    sku: z.string(),
    product: productSchema.optional(),
    availability: availabilitySchema.optional(),
    condition: z.string().optional(),
    conditionDescription: z.string().optional()
  }).passthrough())
}).passthrough();

export const bulkPriceQuantityRequestSchema = z.object({
  requests: z.array(z.object({
    offerId: z.string(),
    pricingSummary: pricingSchema.optional(),
    availableQuantity: z.number().optional()
  }).passthrough())
}).passthrough();

export const bulkOfferRequestSchema = z.object({
  requests: z.array(offerSchema)
}).passthrough();

export const bulkPublishRequestSchema = z.object({
  requests: z.array(z.object({
    offerId: z.string()
  }).passthrough())
}).passthrough();

export const bulkMigrateRequestSchema = z.object({
  requests: z.array(z.object({
    listingId: z.string()
  }).passthrough())
}).passthrough();

export const bulkSalesTaxRequestSchema = z.object({
  requests: z.array(z.object({
    countryCode: z.string(),
    jurisdictionId: z.string(),
    salesTaxBase: salesTaxBaseSchema
  }).passthrough())
}).passthrough();

// ============================================================================
// Helper: Offers for listing fees
// ============================================================================

export const listingFeesRequestSchema = z.object({
  offers: z.array(z.object({
    offerId: z.string().optional(),
    sku: z.string().optional(),
    marketplaceId: z.string().optional(),
    format: z.enum(['AUCTION', 'FIXED_PRICE']).optional()
  }).passthrough())
}).passthrough();

// ============================================================================
// Offer to interested buyers
// ============================================================================

export const offerToBuyersSchema = z.object({
  allowCounterOffer: z.boolean().optional(),
  message: z.string().optional(),
  offeredItems: z.array(z.object({
    offerId: z.string().optional(),
    availableQuantity: z.number().optional(),
    price: amountSchema.optional()
  }).passthrough()).optional()
}).passthrough();
