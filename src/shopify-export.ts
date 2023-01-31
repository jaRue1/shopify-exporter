import * as fs from "fs"
import { assignCategory } from "../utils"

console.log("Shopify Exporter Initialized")

// Read the input text file
const inputText = fs.readFileSync("../tests/input.txt", "utf-8")
console.log("reading input.txt file")

// Split the input text into lines
const lines = inputText.split("\n")

// Initialize the output CSV
let outputCsv =
  "Handle,Title,Body (HTML),Vendor,Product Category,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Weight Unit,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Alt Text,Gift Card,Price / International,Compare At Price / International,Status\n"
console.log("Initialized outputCsv")

// Process each line and add it to the output CSV
for (const [index, line] of lines.entries()) {
  const [tags, title, option1Value, variantPrice, option1Name] = line.split(";")

  // Generate a handle from the title
  const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  // Grab the first two letters from title
  let category = tags.substring(0, 2).toLocaleUpperCase()
  console.log("category:", category, "title:", title, "line #:", index)

  // Set the other fields to empty values
  const body = ""
  const vendor = "croftshill-enterprise"
  // Dynamically assign category
  let productCategory = assignCategory(category)
  const type = ""
  const published = "FALSE"
  // const option1Name = ""
  // const option1Value = ""
  const option2Name = ""
  const option2Value = ""
  const option3Name = ""
  const option3Value = ""
  const variantSku = ""
  const variantGrams = "0.0"
  const variantWeightUnit = "kg"

  const variantInventoryTracker = ""
  const variantInventoryQty = "0"
  const variantInventoryPolicy = "deny"
  const variantFulfillmentService = "manual"
  const variantCompareAtPrice = ""
  const variantRequiresShipping = "FALSE"
  const variantTaxable = "TRUE"
  const variantBarcode = ""
  const imageSrc = ""
  const imageAltText = ""
  const giftCard = ""
  const priceInternational = "??"
  const compareAtPriceInternational = "???"
  const status = "draft"

  // Add the current line to the output CSV
  outputCsv += `${handle},${title},${body},${vendor},${productCategory},${type},${tags},${published},${option1Name},${option1Value},${option2Name},${option2Value},${option3Name},${option3Value},${variantSku},${variantGrams},${variantWeightUnit},${variantInventoryTracker},${variantInventoryQty},${variantInventoryPolicy},${variantFulfillmentService},${variantPrice},${variantCompareAtPrice},${variantRequiresShipping},${variantTaxable},${variantBarcode},${imageSrc},${imageAltText},${giftCard},${priceInternational},${compareAtPriceInternational},${status}\n`
}

// Write the output CSV to a file
fs.writeFileSync("../tests/output.csv", outputCsv) // for testing
// fs.writeFileSync("../export/export.csv", outputCsv) // live run
console.log("Export to output.csv complete.")
