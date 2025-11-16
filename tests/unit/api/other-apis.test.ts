import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DisputeApi } from '../../../src/api/order-management/dispute.js';
import { TaxonomyApi } from '../../../src/api/listing-metadata/taxonomy.js';
import { RecommendationApi } from '../../../src/api/marketing-and-promotions/recommendation.js';
import { ComplianceApi } from '../../../src/api/other/compliance.js';
import { VeroApi } from '../../../src/api/other/vero.js';
import { TranslationApi } from '../../../src/api/other/translation.js';
import { EDeliveryApi } from '../../../src/api/other/edelivery.js';
import { IdentityApi } from '../../../src/api/other/identity.js';
import type { EbayApiClient } from '../../../src/api/client.js';

describe('Other APIs', () => {
  let client: EbayApiClient;

  beforeEach(() => {
    client = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      getConfig: vi.fn(() => ({ environment: 'sandbox' })),
      getWithFullUrl: vi.fn(),
    } as unknown as EbayApiClient;
  });

  describe('DisputeApi', () => {
    let api: DisputeApi;

    beforeEach(() => {
      api = new DisputeApi(client);
    });

    it('should get payment dispute summaries with filter', async () => {
      const mockResponse = { paymentDisputeSummaries: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getPaymentDisputeSummaries({ order_id: 'ORDER123', limit: 10 });

      expect(client.get).toHaveBeenCalledWith('/sell/fulfillment/v1/payment_dispute_summary', {
        order_id: 'ORDER123',
        limit: 10,
      });
    });

    it('should get payment dispute by ID', async () => {
      const mockResponse = { paymentDisputeId: 'DISPUTE123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getPaymentDispute('DISPUTE123');

      expect(client.get).toHaveBeenCalledWith('/sell/fulfillment/v1/payment_dispute/DISPUTE123');
    });

    it('should contest payment dispute', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.contestPaymentDispute('DISPUTE123', { returnAddress: {} });

      expect(client.post).toHaveBeenCalledWith(
        '/sell/fulfillment/v1/payment_dispute/DISPUTE123/contest',
        { returnAddress: {} }
      );
    });

    it('should accept payment dispute', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.acceptPaymentDispute('DISPUTE123', { returnAddress: {} });

      expect(client.post).toHaveBeenCalledWith(
        '/sell/fulfillment/v1/payment_dispute/DISPUTE123/accept',
        { returnAddress: {} }
      );
    });
  });

  describe('TaxonomyApi', () => {
    let api: TaxonomyApi;

    beforeEach(() => {
      api = new TaxonomyApi(client);
    });

    it('should get default category tree ID', async () => {
      const mockResponse = { categoryTreeId: '0' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getDefaultCategoryTreeId('EBAY_US');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/get_default_category_tree_id',
        { marketplace_id: 'EBAY_US' }
      );
    });

    it('should get category tree', async () => {
      const mockResponse = { rootCategoryNode: {} };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCategoryTree('0');

      expect(client.get).toHaveBeenCalledWith('/commerce/taxonomy/v1/category_tree/0');
    });

    it('should get category suggestions', async () => {
      const mockResponse = { categorySuggestions: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCategorySuggestions('0', 'iPhone');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_category_suggestions',
        { q: 'iPhone' }
      );
    });

    it('should get item aspects for category', async () => {
      const mockResponse = { aspects: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getItemAspectsForCategory('0', '123');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_item_aspects_for_category',
        { category_id: '123' }
      );
    });

    it('should get category subtree', async () => {
      const mockResponse = { categorySubtreeNode: {} };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCategorySubtree('0', '123');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_category_subtree',
        { category_id: '123' }
      );
    });

    it('should get compatibility properties', async () => {
      const mockResponse = { compatibilityProperties: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCompatibilityProperties('0', '123');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_compatibility_properties',
        { category_id: '123' }
      );
    });

    it('should get compatibility property values', async () => {
      const mockResponse = { compatibilityPropertyValues: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getCompatibilityPropertyValues('0', '123', 'Make');

      expect(client.get).toHaveBeenCalledWith(
        '/commerce/taxonomy/v1/category_tree/0/get_compatibility_property_values',
        {
          category_id: '123',
          compatibility_property: 'Make',
        }
      );
    });
  });

  describe('RecommendationApi', () => {
    let api: RecommendationApi;

    beforeEach(() => {
      api = new RecommendationApi(client);
    });

    it('should find listing recommendations', async () => {
      const mockResponse = { listingRecommendations: [] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.findListingRecommendations(
        { listingIds: ['LISTING123'] },
        'filter:test',
        10,
        undefined,
        'EBAY_US'
      );

      expect(client.post).toHaveBeenCalledWith(
        '/sell/recommendation/v1/find',
        { listingIds: ['LISTING123'] },
        {
          params: {
            filter: 'filter:test',
            limit: 10,
          },
          headers: {
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          },
        }
      );
    });
  });

  describe('ComplianceApi', () => {
    let api: ComplianceApi;

    beforeEach(() => {
      api = new ComplianceApi(client);
    });

    it('should get listing violations', async () => {
      const mockResponse = { listingViolations: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getListingViolations('PRODUCT_ADOPTION', undefined, 10);

      expect(client.get).toHaveBeenCalledWith('/sell/compliance/v1/listing_violation', {
        compliance_type: 'PRODUCT_ADOPTION',
        limit: 10,
      });
    });

    it('should get listing violations summary', async () => {
      const mockResponse = { violationSummaries: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getListingViolationsSummary('PRODUCT_ADOPTION');

      expect(client.get).toHaveBeenCalledWith('/sell/compliance/v1/listing_violation_summary', {
        compliance_type: 'PRODUCT_ADOPTION',
      });
    });

    it('should suppress violation', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.suppressViolation('VIOLATION123');

      expect(client.post).toHaveBeenCalledWith('/sell/compliance/v1/suppress_violation', {
        listing_violation_id: 'VIOLATION123',
      });
    });
  });

  describe('VeroApi', () => {
    let api: VeroApi;

    beforeEach(() => {
      api = new VeroApi(client);
    });

    it('should create VERO report', async () => {
      const mockResponse = { veroReportId: 'REPORT123' };
      const reportData = {
        items: [
          {
            itemId: 'ITEM123',
            reportingReason: 'TRADEMARK',
          },
        ],
        rightsOwnerEmail: 'owner@example.com',
      };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createVeroReport(reportData);

      expect(client.post).toHaveBeenCalledWith('/commerce/vero/v1/vero_report', reportData);
    });

    it('should get VERO report by ID', async () => {
      const mockResponse = { veroReportId: 'REPORT123', status: 'OPEN' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getVeroReport('REPORT123');

      expect(client.get).toHaveBeenCalledWith('/commerce/vero/v1/vero_report/REPORT123');
    });

    it('should get VERO report items', async () => {
      const mockResponse = { items: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getVeroReportItems('filter:test', 10, 5);

      expect(client.get).toHaveBeenCalledWith('/commerce/vero/v1/vero_report_items', {
        filter: 'filter:test',
        limit: 10,
        offset: 5,
      });
    });

    it('should get VERO report items without optional params', async () => {
      const mockResponse = { items: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getVeroReportItems();

      expect(client.get).toHaveBeenCalledWith('/commerce/vero/v1/vero_report_items', {});
    });

    it('should get VERO reason code by ID', async () => {
      const mockResponse = {
        veroReasonCodeId: 'CODE123',
        name: 'Trademark Infringement',
        description: 'Unauthorized use of trademark',
      };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getVeroReasonCode('CODE123');

      expect(client.get).toHaveBeenCalledWith('/commerce/vero/v1/vero_reason_code/CODE123');
    });

    it('should get all VERO reason codes', async () => {
      const mockResponse = {
        veroReasonCodes: [
          { veroReasonCodeId: 'CODE1', name: 'Trademark' },
          { veroReasonCodeId: 'CODE2', name: 'Copyright' },
        ],
      };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getVeroReasonCodes();

      expect(client.get).toHaveBeenCalledWith('/commerce/vero/v1/vero_reason_code');
    });
  });

  describe('TranslationApi', () => {
    let api: TranslationApi;

    beforeEach(() => {
      api = new TranslationApi(client);
    });

    it('should translate text', async () => {
      const mockResponse = { translations: [] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.translate('en', 'es', 'ITEM_TITLE', ['Hello']);

      expect(client.post).toHaveBeenCalledWith('/commerce/translation/v1/translate', {
        from: 'en',
        to: 'es',
        translationContext: 'ITEM_TITLE',
        text: ['Hello'],
      });
    });
  });

  describe('EDeliveryApi', () => {
    let api: EDeliveryApi;

    beforeEach(() => {
      api = new EDeliveryApi(client);
    });

    it('should create shipping quote', async () => {
      const mockResponse = { quoteId: 'QUOTE123' };
      const shippingQuoteRequest = {
        packageDetails: { weight: { value: 1, unit: 'kg' } },
        shipFrom: { country: 'US' },
        shipTo: { country: 'CA' },
      };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createShippingQuote(shippingQuoteRequest);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/shipping_quote',
        shippingQuoteRequest
      );
    });

    it('should get shipping quote', async () => {
      const mockResponse = { quoteId: 'QUOTE123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getShippingQuote('QUOTE123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/shipping_quote/QUOTE123');
    });

    // Cost & Preferences
    it('should get actual costs', async () => {
      const mockResponse = { costs: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getActualCosts({ package_id: 'PKG123' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/actual_costs', {
        package_id: 'PKG123',
      });
    });

    it('should get address preferences', async () => {
      const mockResponse = { preferences: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getAddressPreferences();

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/address_preference');
    });

    it('should create address preference', async () => {
      const mockResponse = { preferenceId: 'PREF123' };
      const addressData = { address: { city: 'New York' } };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createAddressPreference(addressData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/address_preference',
        addressData
      );
    });

    it('should get consign preferences', async () => {
      const mockResponse = { preferences: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getConsignPreferences();

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/consign_preference');
    });

    it('should create consign preference', async () => {
      const mockResponse = { preferenceId: 'CONS123' };
      const consignData = { consignment: { type: 'DROPOFF' } };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createConsignPreference(consignData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/consign_preference',
        consignData
      );
    });

    // Agents & Services
    it('should get agents', async () => {
      const mockResponse = { agents: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getAgents({ country: 'US' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/agents', { country: 'US' });
    });

    it('should get battery qualifications', async () => {
      const mockResponse = { qualifications: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getBatteryQualifications({ battery_type: 'LITHIUM_ION' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/battery_qualifications', {
        battery_type: 'LITHIUM_ION',
      });
    });

    it('should get dropoff sites', async () => {
      const mockResponse = { sites: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getDropoffSites({ postal_code: '10001', country: 'US' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/dropoff_sites', {
        postal_code: '10001',
        country: 'US',
      });
    });

    it('should get shipping services', async () => {
      const mockResponse = { services: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getShippingServices({ country: 'US' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/services', { country: 'US' });
    });

    // Bundles
    it('should create bundle', async () => {
      const mockResponse = { bundleId: 'BUNDLE123' };
      const bundleData = { packages: ['PKG1', 'PKG2'] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createBundle(bundleData);

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/bundle', bundleData);
    });

    it('should get bundle', async () => {
      const mockResponse = { bundleId: 'BUNDLE123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getBundle('BUNDLE123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/bundle/BUNDLE123');
    });

    it('should cancel bundle', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.cancelBundle('BUNDLE123');

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/bundle/BUNDLE123/cancel', {});
    });

    it('should get bundle label', async () => {
      const mockResponse = { labelUrl: 'https://label.url' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getBundleLabel('BUNDLE123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/bundle/BUNDLE123/label');
    });

    // Packages (Single)
    it('should create package', async () => {
      const mockResponse = { packageId: 'PKG123' };
      const packageData = { weight: { value: 1, unit: 'kg' } };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createPackage(packageData);

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/package', packageData);
    });

    it('should get package', async () => {
      const mockResponse = { packageId: 'PKG123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getPackage('PKG123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/package/PKG123');
    });

    it('should delete package', async () => {
      vi.mocked(client.delete).mockResolvedValue(undefined);

      await api.deletePackage('PKG123');

      expect(client.delete).toHaveBeenCalledWith('/sell/logistics/v1/package/PKG123');
    });

    it('should get package by order line item', async () => {
      const mockResponse = { packageId: 'PKG123' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getPackageByOrderLineItem('ORDER_LINE_123');

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/package/ORDER_LINE_123/item');
    });

    it('should cancel package', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.cancelPackage('PKG123');

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/package/PKG123/cancel', {});
    });

    it('should clone package', async () => {
      const mockResponse = { packageId: 'PKG456' };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.clonePackage('PKG123');

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/package/PKG123/clone', {});
    });

    it('should confirm package', async () => {
      vi.mocked(client.post).mockResolvedValue(undefined);

      await api.confirmPackage('PKG123');

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/package/PKG123/confirm', {});
    });

    // Packages (Bulk)
    it('should bulk cancel packages', async () => {
      const mockResponse = { results: [] };
      const bulkData = { packageIds: ['PKG1', 'PKG2'] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.bulkCancelPackages(bulkData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/package/bulk_cancel_packages',
        bulkData
      );
    });

    it('should bulk confirm packages', async () => {
      const mockResponse = { results: [] };
      const bulkData = { packageIds: ['PKG1', 'PKG2'] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.bulkConfirmPackages(bulkData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/package/bulk_confirm_packages',
        bulkData
      );
    });

    it('should bulk delete packages', async () => {
      const mockResponse = { results: [] };
      const bulkData = { packageIds: ['PKG1', 'PKG2'] };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.bulkDeletePackages(bulkData);

      expect(client.post).toHaveBeenCalledWith(
        '/sell/logistics/v1/package/bulk_delete_packages',
        bulkData
      );
    });

    // Labels & Tracking
    it('should get labels', async () => {
      const mockResponse = { labels: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getLabels({ package_id: 'PKG123' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/labels', {
        package_id: 'PKG123',
      });
    });

    it('should get handover sheet', async () => {
      const mockResponse = { sheetUrl: 'https://sheet.url' };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getHandoverSheet({ bundle_id: 'BUNDLE123' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/handover_sheet', {
        bundle_id: 'BUNDLE123',
      });
    });

    it('should get tracking', async () => {
      const mockResponse = { tracking: [] };
      vi.mocked(client.get).mockResolvedValue(mockResponse);

      await api.getTracking({ tracking_number: 'TRACK123' });

      expect(client.get).toHaveBeenCalledWith('/sell/logistics/v1/tracking', {
        tracking_number: 'TRACK123',
      });
    });

    // Other
    it('should create complaint', async () => {
      const mockResponse = { complaintId: 'COMPLAINT123' };
      const complaintData = { description: 'Package damaged' };
      vi.mocked(client.post).mockResolvedValue(mockResponse);

      await api.createComplaint(complaintData);

      expect(client.post).toHaveBeenCalledWith('/sell/logistics/v1/complaint', complaintData);
    });
  });

  describe('IdentityApi', () => {
    let api: IdentityApi;

    beforeEach(() => {
      api = new IdentityApi(client);
    });

    it('should get user identity', async () => {
      const mockResponse = { userId: 'USER123' };
      vi.mocked(client.getWithFullUrl).mockResolvedValue(mockResponse);

      await api.getUser();

      expect(client.getWithFullUrl).toHaveBeenCalledWith(
        'https://apiz.sandbox.ebay.com/commerce/identity/v1/user'
      );
    });

    it('should handle errors when getting user', async () => {
      vi.mocked(client.getWithFullUrl).mockRejectedValue(new Error('Unauthorized'));

      await expect(api.getUser()).rejects.toThrow('Unauthorized');
    });
  });
});
