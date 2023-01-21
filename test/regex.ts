import { shopifyProductTaxonomy } from "../shopify"
const firstRow = "ADCTTB;Silicone Tube(Black);720.00"
const secondRow = "ADCTTC;Silicone Tube(Clear);750.00"
const regex = /;(\w+)\s(\w+)/
const currentRow = firstRow.match(regex)
const nextRow = secondRow.match(regex)

if (currentRow[0] === nextRow[0]) {
  console.log("variable product found !")
  const result = handleVariableProduct(firstRow, secondRow)
  console.log("variable product row", result)
}
function handleVariableProduct(currentRow, nextRow) {
  return ""
}

console.log(shopifyProductTaxonomy)
