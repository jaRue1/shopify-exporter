# Shopify CSV Mapper

This script maps customer CSV data to Shopify's required CSV format for product imports.

## Usage

1. Place your customer data CSV in the `data/` directory
2. Run the mapping script to convert it to Shopify format
3. Output will be generated in the `export/` directory

## Files

- `data/customer-data.csv` - Your input customer data
- `data/shopify_template.csv` - Shopify's required format template  
- `export/` - Generated Shopify-compatible CSV files

## Requirements

- Node.js with TypeScript support
- CSV parsing and generation capabilities
