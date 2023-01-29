import * as fs from "fs"
import { assignCategory } from "../utils"
console.log("Shopify Exporter Initialized")

// Read the input text file
const inputText = fs.readFileSync("../tests/import.txt", "utf-8")
// const inputText = fs.readFileSync("../import/ideal-format.txt", "utf-8")
console.log("reading input.txt file")

// Split the input text into lines
const lines = inputText.split("\n")

// Initialize the output CSV
let outputCsv =
  "Handle,Title,Body (HTML),Vendor,Product Category,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Alt Text,Gift Card\n"
console.log("Initialized outputCsv")

// Process each line and add it to the output CSV
for (const [index, line] of lines.entries()) {
  const [tags, title, variantPrice] = line.split(";")

  // Generate a handle from the title
  const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  // Grab the first two letters from title
  let category = tags.substring(0, 3).toLocaleUpperCase()
  console.log("category:", category, "title:", title, "line #:", index)

  // Set the other fields to empty values
  const body = ""
  const vendor = ""
  // Dynamically assign category
  let productCategory = assignCategory(category)
  const type = ""
  const published = ""
  const option1Name = ""
  const option1Value = ""
  const option2Name = ""
  const option2Value = ""
  const option3Name = ""
  const option3Value = ""
  const variantSku = ""
  const variantGrams = ""
  const variantInventoryTracker = ""
  const variantInventoryQty = ""
  const variantInventoryPolicy = ""
  const variantFulfillmentService = ""
  const variantCompareAtPrice = ""
  const variantRequiresShipping = ""
  const variantTaxable = ""
  const variantBarcode = ""
  const imageSrc = ""
  const imageAltText = ""
  const giftCard = ""

  // Add the current line to the output CSV
  outputCsv += `${handle},${title},${body},${vendor},${productCategory},${type},${tags},${published},${option1Name},${option1Value},${option2Name},${option2Value},${option3Name},${option3Value},${variantSku},${variantGrams},${variantInventoryTracker},${variantInventoryQty},${variantInventoryPolicy},${variantFulfillmentService},${variantPrice},${variantCompareAtPrice},${variantRequiresShipping},${variantTaxable},${variantBarcode},${imageSrc},${imageAltText},${giftCard}\n`
}

// Write the output CSV to a file
// fs.writeFileSync("../export/export.csv", outputCsv)
fs.writeFileSync("../tests/output.csv", JSON.stringify(outputCsv)) // for testing

console.log("Export to output.csv complete.")

//  A/C: I need to format the data before I can use it. Which means I need to read the raw data write it to a txt file in the correct order (format)
// * Phase 0: take raw data in and output a txt file with ideal format (did this manually)
//*  Complete !

//  A/C: I need to categorize data and account for variant product while writing data to a csv file
// * Phase 1 categorize data
// ? How can I dynamically categorize the data ?
// TODO : Build a map and use the first two letters in the tags to find the correct product category

// * Phase 2 account for variable product ( up next )
// ? How can I
// ? 1 dynamically account for variable products
// ? 2 populate the correct rows when those product are found
// ? 3 ensure that there are no duplicates

// TODO: implement a condition that compares the 'first word' within the previous row title and the first word' within current row title.
// TODO: if the current row's title 'first word' matches the previous row's title 'first word' then call addProductVariant()
// TODO:  addProductVariant() will add variant tag, variant option and price to previous product and call deleteCurrentRow()
// TODO: deleteCurrentRow() will remove current row.
