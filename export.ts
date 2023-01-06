import * as fs from "fs"
console.log("Shopify Exporter Initialized")

// Read the input text file
const inputText = fs.readFileSync("ideal-format.txt", "utf-8")
console.log("reading input.txt file")

// Split the input text into lines
const lines = inputText.split("\n")

// Initialize the output CSV
let outputCsv =
  "Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Alt Text,Gift Card\n"
console.log("Initialized outputCsv")

// Process each line and add it to the output CSV
for (const line of lines) {
  // console.log("Process line ", index + 1)
  const [tags, title, variantPrice] = line.split(",")

  // Generate a handle from the title
  const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  // Set the other fields to empty values
  const body = ""
  const vendor = ""
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
  outputCsv += `${handle},${title},${body},${vendor},${type},${tags},${published},${option1Name},${option1Value},${option2Name},${option2Value},${option3Name},${option3Value},${variantSku},${variantGrams},${variantInventoryTracker},${variantInventoryQty},${variantInventoryPolicy},${variantFulfillmentService},${variantPrice},${variantCompareAtPrice},${variantRequiresShipping},${variantTaxable},${variantBarcode},${imageSrc},${imageAltText},${giftCard}\n`
}

// Write the output CSV to a file
fs.writeFileSync("output.csv", outputCsv)
console.log("Export to output.csv complete.")
