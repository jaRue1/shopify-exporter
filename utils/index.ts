import { shopifyProductTaxonomy } from "./shopify"
const categoryMap = {
  AD: shopifyProductTaxonomy.key2183, //Adhesive
  AG: shopifyProductTaxonomy.key3038, // Agricultural
  AU: shopifyProductTaxonomy.key5352, // Automotive
  BP: shopifyProductTaxonomy.key4890, // Bicycle parts
  CD: shopifyProductTaxonomy.key148, // Child Clothing
  CM: shopifyProductTaxonomy.key1153, // Medial Clothing
  CP: shopifyProductTaxonomy.key1146, // Worksite Clothing
  CS: shopifyProductTaxonomy.key352, // Shoes *
  DU: shopifyProductTaxonomy.key2225, // Roofing
  EL: shopifyProductTaxonomy.key2416, // Electrical
  FT: shopifyProductTaxonomy.key2283, // Fasteners
  FTB: shopifyProductTaxonomy.key2286, // Nuts & Bolts
  FTN: shopifyProductTaxonomy.key2285, // Nails
  FX: shopifyProductTaxonomy.key2170, // Fixtures
  HH: shopifyProductTaxonomy.key3303, // Household Supplies
  MS: shopifyProductTaxonomy.key3303, // Household Supplies
  MT: shopifyProductTaxonomy.key5352, // Vehicle Parts
  MW: shopifyProductTaxonomy.key2170, // Hardware / Metal Works *
  PA: shopifyProductTaxonomy.key2191, // Paint
  PB: shopifyProductTaxonomy.key2335, // Plumbing
  RF: shopifyProductTaxonomy.key2225, // Roofing,
  RM: shopifyProductTaxonomy.key2201, // Building Materials
  SH: shopifyProductTaxonomy.key2170, // Hardware / Second Hand Items *
  TI: shopifyProductTaxonomy.key2229, // Tiling
  TO: shopifyProductTaxonomy.key2516, // Tools
  WP: shopifyProductTaxonomy.key2222, // Lumber & Sheet Stock
}
export function assignCategory(category: string): string {
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

export function awsS3UrlGenerator(value: string): string {
  let url: string = `https://s3.amazonaws.com/croftshillent.com-photos/${value}.png`
  return url
}
