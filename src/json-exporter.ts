import * as fs from "fs"
import { assignCategory } from "../utils"

console.log("JSON Exporter Initialized")
const inputText = fs.readFileSync("../import/ideal-format.txt", "utf-8")
// const inputText = fs.readFileSync("../tests/import.txt", "utf-8")

const lines = inputText.split("\n")

let output = []
for (const [index, line] of lines.entries()) {
  const [tags, productName, variantName, variantPrice] = line.split(";")
  const handle = productName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  let category = tags.substring(0, 3).toLocaleUpperCase()
  let productCategory = assignCategory(category)
  console.log("Exporting line #", index + 1)
  output.push({
    id: index,
    handle: handle,
    tags: tags,
    productName: productName,
    variantName: variantName,
    variantPrice: variantPrice,
    category: productCategory,
  })
}

fs.writeFileSync("../export/export.json", JSON.stringify(output))
// fs.writeFileSync("../tests/output.json", JSON.stringify(output))
console.log("Output to JSON File Complete")
