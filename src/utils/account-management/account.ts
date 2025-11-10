import { z } from "zod";

export const getCustomPoliciesSchema = z.object({
  policy_types: z.string({
    message: "Policy types are required",
    required_error: "policy_types is required",
    invalid_type_error: "policy_types must be a string",
    description: "The policy types to retrieve."
  }).optional(),
});

export const getCustomPolicySchema = z.object({
  custom_policy_id: z.string({
    message: "Custom policy ID is required",
    required_error: "custom_policy_id is required",
    invalid_type_error: "custom_policy_id must be a string",
    description: "The unique identifier for the custom policy."
  }),
});

export const getFulfillmentPoliciesSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }).optional(),
});

export const getPaymentPoliciesSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }).optional(),
});

export const getReturnPoliciesSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }).optional(),
});

export const getFulfillmentPolicySchema = z.object({
  fulfillment_policy_id: z.string({
    message: "Fulfillment policy ID is required",
    required_error: "fulfillment_policy_id is required",
    invalid_type_error: "fulfillment_policy_id must be a string",
    description: "The unique identifier for the fulfillment policy."
  }),
});

export const getFulfillmentPolicyByNameSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }),
  name: z.string({
    message: "Policy name is required",
    required_error: "name is required",
    invalid_type_error: "name must be a string",
    description: "The name of the policy."
  }),
});

export const getPaymentPolicySchema = z.object({
  payment_policy_id: z.string({
    message: "Payment policy ID is required",
    required_error: "payment_policy_id is required",
    invalid_type_error: "payment_policy_id must be a string",
    description: "The unique identifier for the payment policy."
  }),
});

export const getPaymentPolicyByNameSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }),
  name: z.string({
    message: "Policy name is required",
    required_error: "name is required",
    invalid_type_error: "name must be a string",
    description: "The name of the policy."
  }),
});

export const getReturnPolicySchema = z.object({
  return_policy_id: z.string({
    message: "Return policy ID is required",
    required_error: "return_policy_id is required",
    invalid_type_error: "return_policy_id must be a string",
    description: "The unique identifier for the return policy."
  }),
});

export const getReturnPolicyByNameSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }),
  name: z.string({
    message: "Policy name is required",
    required_error: "name is required",
    invalid_type_error: "name must be a string",
    description: "The name of the policy."
  }),
});

export const getPaymentsProgramStatusSchema = z.object({
  marketplace_id: z.string({
    message: "Marketplace ID is required",
    required_error: "marketplace_id is required",
    invalid_type_error: "marketplace_id must be a string",
    description: "The unique identifier for the eBay marketplace."
  }),
  payments_program_type: z.string({
    message: "Payments program type is required",
    required_error: "payments_program_type is required",
    invalid_type_error: "payments_program_type must be a string",
    description: "The type of payments program."
  }),
});

export const getSalesTaxSchema = z.object({
  country_code: z.string({
    message: "Country code is required",
    required_error: "country_code is required",
    invalid_type_error: "country_code must be a string",
    description: "The country code."
  }),
  jurisdiction_id: z.string({
    message: "Jurisdiction ID is required",
    required_error: "jurisdiction_id is required",
    invalid_type_error: "jurisdiction_id must be a string",
    description: "The jurisdiction ID."
  }),
});

export const getSalesTaxesSchema = z.object({
  country_code: z.string({
    message: "Country code is required",
    required_error: "country_code is required",
    invalid_type_error: "country_code must be a string",
    description: "The country code."
  }).optional(),
});

export const getSubscriptionSchema = z.object({
  limit_type: z.string({
    message: "Limit type is required",
    required_error: "limit_type is required",
    invalid_type_error: "limit_type must be a string",
    description: "The limit type."
  }).optional(),
});