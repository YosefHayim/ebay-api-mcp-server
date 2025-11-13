#!/usr/bin/env tsx

/**
 * Endpoint Audit Script
 *
 * This script compares the eBay API endpoints documented on the eBay Developer site
 * with our implementation to identify missing endpoints.
 */

// Account API endpoints from eBay documentation
const ebayAccountEndpoints = [
  // custom_policy
  { method: 'POST', path: '/custom_policy/', name: 'createCustomPolicy' },
  { method: 'GET', path: '/custom_policy/', name: 'getCustomPolicies' },
  { method: 'GET', path: '/custom_policy/{custom_policy_id}', name: 'getCustomPolicy' },
  { method: 'PUT', path: '/custom_policy/{custom_policy_id}', name: 'updateCustomPolicy' },

  // fulfillment_policy
  { method: 'POST', path: '/fulfillment_policy/', name: 'createFulfillmentPolicy' },
  { method: 'DELETE', path: '/fulfillment_policy/{fulfillmentPolicyId}', name: 'deleteFulfillmentPolicy' },
  { method: 'GET', path: '/fulfillment_policy', name: 'getFulfillmentPolicies' },
  { method: 'GET', path: '/fulfillment_policy/{fulfillmentPolicyId}', name: 'getFulfillmentPolicy' },
  { method: 'GET', path: '/fulfillment_policy/get_by_policy_name', name: 'getFulfillmentPolicyByName' },
  { method: 'PUT', path: '/fulfillment_policy/{fulfillmentPolicyId}', name: 'updateFulfillmentPolicy' },

  // payment_policy
  { method: 'POST', path: '/payment_policy', name: 'createPaymentPolicy' },
  { method: 'DELETE', path: '/payment_policy/{payment_policy_id}', name: 'deletePaymentPolicy' },
  { method: 'GET', path: '/payment_policy', name: 'getPaymentPolicies' },
  { method: 'GET', path: '/payment_policy/{payment_policy_id}', name: 'getPaymentPolicy' },
  { method: 'GET', path: '/payment_policy/get_by_policy_name', name: 'getPaymentPolicyByName' },
  { method: 'PUT', path: '/payment_policy/{payment_policy_id}', name: 'updatePaymentPolicy' },

  // payments_program (deprecated)
  { method: 'GET', path: '/payments_program/{marketplace_id}/{payments_program_type}', name: 'getPaymentsProgram', deprecated: true },
  { method: 'GET', path: '/payments_program/{marketplace_id}/{payments_program_type}/onboarding', name: 'getPaymentsProgramOnboarding', deprecated: true },

  // privilege
  { method: 'GET', path: '/privilege', name: 'getPrivileges' },

  // program
  { method: 'GET', path: '/program/get_opted_in_programs', name: 'getOptedInPrograms' },
  { method: 'POST', path: '/program/opt_in', name: 'optInToProgram' },
  { method: 'POST', path: '/program/opt_out', name: 'optOutOfProgram' },

  // rate_table
  { method: 'GET', path: '/rate_table', name: 'getRateTables' },

  // return_policy
  { method: 'POST', path: '/return_policy', name: 'createReturnPolicy' },
  { method: 'DELETE', path: '/return_policy/{return_policy_id}', name: 'deleteReturnPolicy' },
  { method: 'GET', path: '/return_policy', name: 'getReturnPolicies' },
  { method: 'GET', path: '/return_policy/{return_policy_id}', name: 'getReturnPolicy' },
  { method: 'GET', path: '/return_policy/get_by_policy_name', name: 'getReturnPolicyByName' },
  { method: 'PUT', path: '/return_policy/{return_policy_id}', name: 'updateReturnPolicy' },

  // sales_tax
  { method: 'POST', path: '/bulk_create_or_replace_sales_tax', name: 'bulkCreateOrReplaceSalesTax' },
  { method: 'PUT', path: '/sales_tax/{countryCode}/{jurisdictionId}', name: 'createOrReplaceSalesTax' },
  { method: 'DELETE', path: '/sales_tax/{countryCode}/{jurisdictionId}', name: 'deleteSalesTax' },
  { method: 'GET', path: '/sales_tax/{countryCode}/{jurisdictionId}', name: 'getSalesTax' },
  { method: 'GET', path: '/sales_tax', name: 'getSalesTaxes' },

  // subscription
  { method: 'GET', path: '/subscription', name: 'getSubscription' },

  // kyc (deprecated)
  { method: 'GET', path: '/kyc', name: 'getKYC', deprecated: true },

  // advertising_eligibility
  { method: 'GET', path: '/advertising_eligibility', name: 'getAdvertisingEligibility' },
];

// Our implemented Account API methods
const ourAccountMethods = [
  'getCustomPolicies',
  'getCustomPolicy',
  'getFulfillmentPolicies',
  'getPaymentPolicies',
  'getReturnPolicies',
  'getPrivileges',
  'createFulfillmentPolicy',
  'getFulfillmentPolicy',
  'getFulfillmentPolicyByName',
  'updateFulfillmentPolicy',
  'deleteFulfillmentPolicy',
  'createPaymentPolicy',
  'getPaymentPolicy',
  'getPaymentPolicyByName',
  'updatePaymentPolicy',
  'deletePaymentPolicy',
  'createReturnPolicy',
  'getReturnPolicy',
  'getReturnPolicyByName',
  'updateReturnPolicy',
  'deleteReturnPolicy',
  'createCustomPolicy',
  'updateCustomPolicy',
  'deleteCustomPolicy',
  'getKyc',
  'optInToPaymentsProgram',
  'getPaymentsProgramStatus',
  'getRateTables',
  'createOrReplaceSalesTax',
  'bulkCreateOrReplaceSalesTax',
  'deleteSalesTax',
  'getSalesTax',
  'getSalesTaxes',
  'getSubscription',
  'optInToProgram',
  'optOutOfProgram',
  'getOptedInPrograms',
  'getAdvertisingEligibility',
  'getPaymentsProgram',
  'getPaymentsProgramOnboarding',
];

// Tool name to method name mapping
const toolToMethodMap: Record<string, string> = {
  'ebay_get_custom_policies': 'getCustomPolicies',
  'ebay_get_custom_policy': 'getCustomPolicy',
  'ebay_create_custom_policy': 'createCustomPolicy',
  'ebay_update_custom_policy': 'updateCustomPolicy',
  'ebay_delete_custom_policy': 'deleteCustomPolicy',
  'ebay_get_fulfillment_policies': 'getFulfillmentPolicies',
  'ebay_create_fulfillment_policy': 'createFulfillmentPolicy',
  'ebay_get_fulfillment_policy': 'getFulfillmentPolicy',
  'ebay_get_fulfillment_policy_by_name': 'getFulfillmentPolicyByName',
  'ebay_update_fulfillment_policy': 'updateFulfillmentPolicy',
  'ebay_delete_fulfillment_policy': 'deleteFulfillmentPolicy',
  'ebay_get_payment_policies': 'getPaymentPolicies',
  'ebay_create_payment_policy': 'createPaymentPolicy',
  'ebay_get_payment_policy': 'getPaymentPolicy',
  'ebay_get_payment_policy_by_name': 'getPaymentPolicyByName',
  'ebay_update_payment_policy': 'updatePaymentPolicy',
  'ebay_delete_payment_policy': 'deletePaymentPolicy',
  'ebay_get_return_policies': 'getReturnPolicies',
  'ebay_create_return_policy': 'createReturnPolicy',
  'ebay_get_return_policy': 'getReturnPolicy',
  'ebay_get_return_policy_by_name': 'getReturnPolicyByName',
  'ebay_update_return_policy': 'updateReturnPolicy',
  'ebay_delete_return_policy': 'deleteReturnPolicy',
  'ebay_get_kyc': 'getKyc',
  'ebay_opt_in_to_payments_program': 'optInToPaymentsProgram',
  'ebay_get_payments_program_status': 'getPaymentsProgramStatus',
  'ebay_get_rate_tables': 'getRateTables',
  'ebay_create_or_replace_sales_tax': 'createOrReplaceSalesTax',
  'ebay_bulk_create_or_replace_sales_tax': 'bulkCreateOrReplaceSalesTax',
  'ebay_delete_sales_tax': 'deleteSalesTax',
  'ebay_get_sales_tax': 'getSalesTax',
  'ebay_get_sales_taxes': 'getSalesTaxes',
  'ebay_get_subscription': 'getSubscription',
  'ebay_opt_in_to_program': 'optInToProgram',
  'ebay_opt_out_of_program': 'optOutOfProgram',
  'ebay_get_opted_in_programs': 'getOptedInPrograms',
  'ebay_get_privileges': 'getPrivileges',
  'ebay_get_advertising_eligibility': 'getAdvertisingEligibility',
  'ebay_get_payments_program': 'getPaymentsProgram',
  'ebay_get_payments_program_onboarding': 'getPaymentsProgramOnboarding',
};

console.log('='.repeat(80));
console.log('ACCOUNT API ENDPOINT AUDIT');
console.log('='.repeat(80));

console.log('\n📊 Statistics:');
console.log(`   eBay documented endpoints: ${ebayAccountEndpoints.length}`);
console.log(`   Our implemented methods: ${ourAccountMethods.length}`);
console.log(`   Tool definitions: ${Object.keys(toolToMethodMap).length}`);

// Find missing endpoints
const missingEndpoints = ebayAccountEndpoints.filter(
  endpoint => !ourAccountMethods.includes(endpoint.name)
);

console.log('\n❌ Missing Endpoints:');
if (missingEndpoints.length === 0) {
  console.log('   ✅ All endpoints are implemented!');
} else {
  missingEndpoints.forEach(endpoint => {
    const deprecatedTag = endpoint.deprecated ? ' [DEPRECATED]' : '';
    console.log(`   ${endpoint.method} ${endpoint.path} (${endpoint.name})${deprecatedTag}`);
  });
}

// Find methods without tools
const methodsWithoutTools = ourAccountMethods.filter(method => {
  return !Object.values(toolToMethodMap).includes(method);
});

console.log('\n⚠️  Methods without tool definitions:');
if (methodsWithoutTools.length === 0) {
  console.log('   ✅ All methods have tool definitions!');
} else {
  methodsWithoutTools.forEach(method => {
    console.log(`   - ${method}`);
  });
}

// Verify all tools have corresponding methods
const toolsWithoutMethods: string[] = [];
Object.entries(toolToMethodMap).forEach(([tool, method]) => {
  if (!ourAccountMethods.includes(method)) {
    toolsWithoutMethods.push(`${tool} -> ${method}`);
  }
});

console.log('\n⚠️  Tools without corresponding methods:');
if (toolsWithoutMethods.length === 0) {
  console.log('   ✅ All tools have corresponding methods!');
} else {
  toolsWithoutMethods.forEach(tool => {
    console.log(`   - ${tool}`);
  });
}

console.log('\n' + '='.repeat(80));

// Calculate coverage
const implementedCount = ebayAccountEndpoints.length - missingEndpoints.length;
const coverage = ((implementedCount / ebayAccountEndpoints.length) * 100).toFixed(1);
console.log(`\n✅ Implementation Coverage: ${coverage}% (${implementedCount}/${ebayAccountEndpoints.length})`);
console.log('='.repeat(80) + '\n');
