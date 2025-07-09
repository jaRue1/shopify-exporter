#!/usr/bin/env node

import { CsvMapper } from './csv-mapper';

async function main() {
  console.log('Starting CSV mapping process...');
  console.log('Converting customer data to Shopify format...');
  
  try {
    const mapper = new CsvMapper();
    await mapper.mapData();
    console.log('✅ CSV mapping completed successfully!');
  } catch (error) {
    console.error('❌ Error during CSV mapping:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 