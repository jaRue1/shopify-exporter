import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';

interface CustomerData {
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
  'Option Name 4': string;
  'Option Value 4': string;
  'Option Name 5': string;
  'Option Value 5': string;
  'Option Name 6': string;
  'Option Value 6': string;
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

interface ShopifyData {
  Handle: string;
  Title: string;
  'Body (HTML)': string;
  Vendor: string;
  'Product Category': string;
  Type: string;
  Tags: string;
  Published: string;
  'Option1 Name': string;
  'Option1 Value': string;
  'Option2 Name': string;
  'Option2 Value': string;
  'Option3 Name': string;
  'Option3 Value': string;
  'Variant SKU': string;
  'Variant Grams': string;
  'Variant Inventory Tracker': string;
  'Variant Inventory Qty': string;
  'Variant Inventory Policy': string;
  'Variant Fulfillment Service': string;
  'Variant Price': string;
  'Variant Compare At Price': string;
  'Variant Requires Shipping': string;
  'Variant Taxable': string;
  'Variant Barcode': string;
  'Image Src': string;
  'Image Position': string;
  'Image Alt Text': string;
  'Gift Card': string;
  'SEO Title': string;
  'SEO Description': string;
  'Google Shopping / Google Product Category': string;
  'Google Shopping / Gender': string;
  'Google Shopping / Age Group': string;
  'Google Shopping / MPN': string;
  'Google Shopping / Condition': string;
  'Google Shopping / Custom Product': string;
  'Variant Image': string;
  'Variant Weight Unit': string;
  'Variant Tax Code': string;
  'Cost per item': string;
  'Included / United States': string;
  'Price / United States': string;
  'Compare At Price / United States': string;
  'Included / International': string;
  'Price / International': string;
  'Compare At Price / International': string;
  Status: string;
}

export class CsvMapper {
  private customerDataPath: string;
  private outputPath: string;

  constructor() {
    this.customerDataPath = path.join(__dirname, '..', 'data', 'customer-data.csv');
    this.outputPath = path.join(__dirname, '..', 'export', 'shopify-mapped-data.csv');
  }

  async mapData(): Promise<void> {
    try {
      const customerData = await this.readCustomerData();
      const shopifyData = this.convertToShopifyFormat(customerData);
      await this.writeShopifyData(shopifyData);
      console.log(`Successfully mapped ${customerData.length} records to Shopify format`);
      console.log(`Output saved to: ${this.outputPath}`);
    } catch (error) {
      console.error('Error mapping CSV data:', error);
      throw error;
    }
  }

  private async readCustomerData(): Promise<CustomerData[]> {
    return new Promise((resolve, reject) => {
      const results: CustomerData[] = [];
      fs.createReadStream(this.customerDataPath)
        .pipe(parse({ columns: true, skip_empty_lines: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  private convertToShopifyFormat(customerData: CustomerData[]): ShopifyData[] {
    return customerData.map((customer, index) => {
      // Extract first image URL from the space-separated URLs
      const imageUrls = customer['Hosted Image URLs'].split(' ');
      const firstImageUrl = imageUrls[0] || '';

      return {
        Handle: this.generateHandle(customer.Title, customer['Product URL']),
        Title: customer.Title,
        'Body (HTML)': customer.Description,
        Vendor: '', // Not provided in customer data
        'Product Category': '', // Not provided in customer data
        Type: customer['Product Type [Non Editable]'] === 'PHYSICAL' ? 'Physical' : customer['Product Type [Non Editable]'],
        Tags: customer.Tags,
        Published: customer.Visible === 'Yes' ? 'TRUE' : 'FALSE',
        'Option1 Name': customer['Option Name 1'],
        'Option1 Value': customer['Option Value 1'],
        'Option2 Name': customer['Option Name 2'],
        'Option2 Value': customer['Option Value 2'],
        'Option3 Name': customer['Option Name 3'],
        'Option3 Value': customer['Option Value 3'],
        'Variant SKU': customer.SKU,
        'Variant Grams': '', // Need to convert from weight
        'Variant Inventory Tracker': customer.Stock === 'Unlimited' ? '' : 'shopify',
        'Variant Inventory Qty': customer.Stock === 'Unlimited' ? '' : customer.Stock,
        'Variant Inventory Policy': customer.Stock === 'Unlimited' ? 'continue' : 'deny',
        'Variant Fulfillment Service': 'manual',
        'Variant Price': customer['On Sale'] === 'Yes' && customer['Sale Price'] !== '0.00' ? customer['Sale Price'] : customer.Price,
        'Variant Compare At Price': customer['On Sale'] === 'Yes' && customer['Sale Price'] !== '0.00' ? customer.Price : '',
        'Variant Requires Shipping': 'TRUE',
        'Variant Taxable': 'TRUE',
        'Variant Barcode': '',
        'Image Src': firstImageUrl,
        'Image Position': (index + 1).toString(),
        'Image Alt Text': customer.Title,
        'Gift Card': 'FALSE',
        'SEO Title': customer.Title,
        'SEO Description': '',
        'Google Shopping / Google Product Category': '',
        'Google Shopping / Gender': '',
        'Google Shopping / Age Group': '',
        'Google Shopping / MPN': customer.SKU,
        'Google Shopping / Condition': 'new',
        'Google Shopping / Custom Product': 'TRUE',
        'Variant Image': firstImageUrl,
        'Variant Weight Unit': 'g',
        'Variant Tax Code': '',
        'Cost per item': '',
        'Included / United States': 'TRUE',
        'Price / United States': '',
        'Compare At Price / United States': '',
        'Included / International': 'TRUE',
        'Price / International': '',
        'Compare At Price / International': '',
        Status: customer.Visible === 'Yes' ? 'active' : 'draft'
      };
    });
  }

  private generateHandle(title: string, productUrl: string): string {
    // Use Product URL if available, otherwise generate from title
    if (productUrl && productUrl !== 'shop') {
      return productUrl;
    }
    
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private async writeShopifyData(shopifyData: ShopifyData[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const outputDir = path.dirname(this.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      stringify(shopifyData, { header: true }, (err, output) => {
        if (err) {
          reject(err);
          return;
        }
        
        fs.writeFile(this.outputPath, output, (writeErr) => {
          if (writeErr) {
            reject(writeErr);
            return;
          }
          resolve();
        });
      });
    });
  }
} 