import { CsvMapper } from '../src/csv-mapper';
import { CustomerData, ShopifyData } from '../src/types';

// Simple test data structure that matches the actual CSV format
interface SimpleCustomerData {
  'Product ID [Non Editable]': string;
  'Variant ID [Non Editable]': string;
  'Product Type [Non Editable]': string;
  'Product Page': string;
  'Product URL': string;
  'Title': string;
  'Description': string;
  'SKU': string;
  'Option Name 1': string;
  'Option Value 1': string;
  'Option Name 2': string;
  'Option Value 2': string;
  'Option Name 3': string;
  'Option Value 3': string;
  'Price': string;
  'Sale Price': string;
  'On Sale': string;
  'Stock': string;
  'Categories': string;
  'Tags': string;
  'Weight': string;
  'Length': string;
  'Width': string;
  'Height': string;
  'Visible': string;
  'Hosted Image URLs': string;
}

// Create a test-specific mapper class that exposes the conversion method
class TestCsvMapper extends CsvMapper {
  public testConvertToShopifyFormat(customerData: SimpleCustomerData[]) {
    return (this as any).convertToShopifyFormat(customerData);
  }

  public testGenerateHandle(title: string, productUrl: string) {
    return (this as any).generateHandle(title, productUrl);
  }
}

describe('CsvMapper', () => {
  let mapper: TestCsvMapper;

  beforeEach(() => {
    mapper = new TestCsvMapper();
  });

  describe('convertToShopifyFormat', () => {
    it('should correctly map customer data to Shopify format', () => {
      // Sample customer data
      const customerData: SimpleCustomerData[] = [
        {
          'Product ID [Non Editable]': '12345',
          'Variant ID [Non Editable]': '67890',
          'Product Type [Non Editable]': 'PHYSICAL',
          'Product Page': 'test-product',
          'Product URL': 'test-product-url',
          'Title': 'Test Product Title',
          'Description': '<p>This is a test product description</p>',
          'SKU': 'TEST-SKU-001',
          'Option Name 1': 'Color',
          'Option Value 1': 'Red',
          'Option Name 2': 'Size',
          'Option Value 2': 'Large',
          'Option Name 3': 'Material',
          'Option Value 3': 'Cotton',
          'Price': '29.99',
          'Sale Price': '0.00',
          'On Sale': 'No',
          'Stock': '100',
          'Categories': 'Clothing',
          'Tags': 'summer, casual, cotton',
          'Weight': '0.5',
          'Length': '10',
          'Width': '8',
          'Height': '2',
          'Visible': 'Yes',
          'Hosted Image URLs': 'https://example.com/image1.jpg https://example.com/image2.jpg'
        }
      ];

      const result = mapper.testConvertToShopifyFormat(customerData);

      expect(result).toHaveLength(1);
      
      // Test key mappings
      expect(result[0]['Handle']).toBe('test-product-url');
      expect(result[0]['Title']).toBe('Test Product Title');
      expect(result[0]['Body (HTML)']).toBe('<p>This is a test product description</p>');
      expect(result[0]['Type']).toBe('Physical');
      expect(result[0]['Tags']).toBe('summer, casual, cotton');
      expect(result[0]['Published']).toBe('TRUE');
      expect(result[0]['Option1 Name']).toBe('Color');
      expect(result[0]['Option1 Value']).toBe('Red');
      expect(result[0]['Option2 Name']).toBe('Size');
      expect(result[0]['Option2 Value']).toBe('Large');
      expect(result[0]['Option3 Name']).toBe('Material');
      expect(result[0]['Option3 Value']).toBe('Cotton');
      expect(result[0]['Variant SKU']).toBe('TEST-SKU-001');
      expect(result[0]['Variant Inventory Qty']).toBe('100');
      expect(result[0]['Variant Price']).toBe('29.99');
      expect(result[0]['Image Src']).toBe('https://example.com/image1.jpg');
      expect(result[0]['Status']).toBe('active');
    });

    it('should handle unlimited stock correctly', () => {
      const customerData: SimpleCustomerData[] = [
        {
          'Product ID [Non Editable]': '12345',
          'Variant ID [Non Editable]': '67890',
          'Product Type [Non Editable]': 'PHYSICAL',
          'Product Page': 'test-product',
          'Product URL': 'test-product-url',
          'Title': 'Test Product',
          'Description': 'Test Description',
          'SKU': 'TEST-SKU-001',
          'Option Name 1': '',
          'Option Value 1': '',
          'Option Name 2': '',
          'Option Value 2': '',
          'Option Name 3': '',
          'Option Value 3': '',
          'Price': '19.99',
          'Sale Price': '0.00',
          'On Sale': 'No',
          'Stock': 'Unlimited',
          'Categories': 'Test',
          'Tags': 'test',
          'Weight': '0.5',
          'Length': '10',
          'Width': '8',
          'Height': '2',
          'Visible': 'Yes',
          'Hosted Image URLs': 'https://example.com/image1.jpg'
        }
      ];

      const result = mapper.testConvertToShopifyFormat(customerData);

      expect(result[0]['Variant Inventory Tracker']).toBe('');
      expect(result[0]['Variant Inventory Qty']).toBe('');
      expect(result[0]['Variant Inventory Policy']).toBe('continue');
    });

    it('should handle sale prices correctly', () => {
      const customerData: SimpleCustomerData[] = [
        {
          'Product ID [Non Editable]': '12345',
          'Variant ID [Non Editable]': '67890',
          'Product Type [Non Editable]': 'PHYSICAL',
          'Product Page': 'test-product',
          'Product URL': 'test-product-url',
          'Title': 'Sale Product',
          'Description': 'Sale Description',
          'SKU': 'SALE-SKU-001',
          'Option Name 1': '',
          'Option Value 1': '',
          'Option Name 2': '',
          'Option Value 2': '',
          'Option Name 3': '',
          'Option Value 3': '',
          'Price': '29.99',
          'Sale Price': '19.99',
          'On Sale': 'Yes',
          'Stock': '50',
          'Categories': 'Sale',
          'Tags': 'sale, discount',
          'Weight': '0.5',
          'Length': '10',
          'Width': '8',
          'Height': '2',
          'Visible': 'Yes',
          'Hosted Image URLs': 'https://example.com/image1.jpg'
        }
      ];

      const result = mapper.testConvertToShopifyFormat(customerData);

      expect(result[0]['Variant Price']).toBe('19.99');
      expect(result[0]['Variant Compare At Price']).toBe('29.99');
    });
  });

  describe('generateHandle', () => {
    it('should generate a handle from title when productUrl is empty', () => {
      const result = mapper.testGenerateHandle('Test Product Title', '');
      expect(result).toBe('test-product-title');
    });

    it('should use productUrl when provided', () => {
      const result = mapper.testGenerateHandle('Test Product Title', 'custom-product-url');
      expect(result).toBe('custom-product-url');
    });

    it('should handle special characters in title', () => {
      const result = mapper.testGenerateHandle('Test & Product - Title!', '');
      expect(result).toBe('test-product-title');
    });
  });
}); 