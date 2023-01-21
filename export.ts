import * as fs from "fs"
import { shopifyProductTaxonomy } from "./shopify"
const categoryMap = {
  AD: "Adhesive", // shopifyProductTaxonomy.key2183: `Hardware > Building Consumables > Hardware Glue & Adhesives`,
  AG: "Agricultural", // shopifyProductTaxonomy.key3038: `Home & Garden`
  AU: "Automotive", // shopifyProductTaxonomy.key5352: `Vehicles & Parts`
  BP: "Bicycle parts", //  shopifyProductTaxonomy.key4890: `Sporting Goods > Outdoor Recreation > Cycling > Bicycle Parts > Bicycle Brake Parts`,
  CD: "Child Clothing", // shopifyProductTaxonomy.key148: `Apparel & Accessories > Clothing > Baby & Toddler Clothing`,
  CM: "Medical Clothing", // shopifyProductTaxonomy.key1153: `Business & Industrial > Work Safety Protective Gear > Protective Masks`,
  CP: "Worksite Clothing", // shopifyProductTaxonomy.key1146: `Business & Industrial > Work Safety Protective Gear`,
  CS: "Chinese Clothing", // shopifyProductTaxonomy.key352: `Apparel & Accessories > Shoes`,
  DU: "Roofing", // shopifyProductTaxonomy.key2225: `Hardware > Building Materials > Roofing`,
  EL: "Electrical", //   shopifyProductTaxonomy.key2416: `Hardware > Power & Electrical Supplies`,
  FT: "Fasteners", //   shopifyProductTaxonomy.key2283: `Hardware > Hardware Accessories > Hardware Fasteners`,
  FTB: "Bolts", // shopifyProductTaxonomy.key2286: `Hardware > Hardware Accessories > Hardware Fasteners > Nuts & Bolts`
  FTN: "Nails", // shopifyProductTaxonomy.key2285: `Hardware > Hardware Accessories > Hardware Fasteners > Nails`,
  FX: "Fixtures", //  shopifyProductTaxonomy.key2170: `Hardware`,
  HH: "House Hold Items", // shopifyProductTaxonomy.key3303: `Home & Garden > Household Supplies`,
  MS: "Misalliance Items / Multi Purpose Items", // shopifyProductTaxonomy.key3303: `Home & Garden > Household Supplies`,
  MT: "Motor Tools", //   shopifyProductTaxonomy.key5352: `Vehicles & Parts`,
  MW: "Metal Work", // shopifyProductTaxonomy.key2170: `Hardware`,
  PA: "Paint", //  shopifyProductTaxonomy.key2191: `Hardware > Building Consumables > Painting Consumables > Paint`,
  PB: "Plumbing", //   shopifyProductTaxonomy.key2335: `Hardware > Plumbing`,
  RF: "Roofing", //   shopifyProductTaxonomy.key2225: `Hardware > Building Materials > Roofing`,
  RM: "Raw Materials", // shopifyProductTaxonomy.key2201: `Hardware > Building Materials`,
  SH: "Second Hand Items (Used)", //  shopifyProductTaxonomy.key2170: `Hardware`,
  TI: "Tiling", // shopifyProductTaxonomy.key2229: `Hardware > Building Materials > Roofing > Roofing Shingles & Tiles`,
  TO: "Tools", // shopifyProductTaxonomy.key2516: `Hardware > Tools`,
  WP: "Wood Products / Lumber / Plyboards", //   key2222: `Hardware > Building Materials > Lumber & Sheet Stock`,
}
function assignCategory(category: string): string {
  let assignedCategory = ""
  if (category === "FTB") {
    assignedCategory = categoryMap.FTB
  }
  if (category === "FTN") {
    assignedCategory = categoryMap.FTN
  }
  switch (category.substring(0, 2)) {
    case "AD":
      assignedCategory = categoryMap.AD
      break
    case "AG":
      assignedCategory = categoryMap.AG
      break
    case "AU":
      assignedCategory = categoryMap.AU
      break
    case "BP":
      assignedCategory = categoryMap.BP
      break
    case "BP":
      assignedCategory = categoryMap.BP
      break
    case "CD":
      assignedCategory = categoryMap.CD
      break
    case "CM":
      assignedCategory = categoryMap.CM
      break
    case "CP":
      assignedCategory = categoryMap.CP
      break
    case "CS":
      assignedCategory = categoryMap.CS
      break
    case "DU":
      assignedCategory = categoryMap.DU
      break
    case "EL":
      assignedCategory = categoryMap.EL
      break
    case "FT":
      assignedCategory = categoryMap.FT
      break
    case "FX":
      assignedCategory = categoryMap.FX
      break
    case "HH":
      assignedCategory = categoryMap.HH
      break
    case "MS":
      assignedCategory = categoryMap.MS
      break
    case "MT":
      assignedCategory = categoryMap.MT
      break
    case "MS":
      assignedCategory = categoryMap.MS
      break
    case "MW":
      assignedCategory = categoryMap.MW
      break
    case "PA":
      assignedCategory = categoryMap.PA
      break
    case "PB":
      assignedCategory = categoryMap.PB
      break
    case "RF":
      assignedCategory = categoryMap.RF
      break
    case "RM":
      assignedCategory = categoryMap.RM
      break
    case "SH":
      assignedCategory = categoryMap.SH
      break
    case "TI":
      assignedCategory = categoryMap.TI
      break
    case "TO":
      assignedCategory = categoryMap.TO
      break
    case "WP":
      assignedCategory = categoryMap.WP
      break
    default:
      assignedCategory = "No Category Found"
  }
  return assignedCategory
}

console.log("Shopify Exporter Initialized")

// Read the input text file
const inputText = fs.readFileSync("ideal-format.txt", "utf-8")
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
fs.writeFileSync("output.csv", outputCsv)
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
