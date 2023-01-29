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
const optionMap = {
  title: "title",
  size: "size",
  color: "color",
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

export function determineOptionName(value: string): string {
  let assignedOptionName = ""

  return assignedOptionName
}
