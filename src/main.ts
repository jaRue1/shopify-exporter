import { exportShopifyCsv } from "./shopify-export"
import { exportDataToJson } from "./json-exporter"
import { filePaths } from "./config"
const { batch1Paths } = filePaths

const inputPath = batch1Paths.inputPathBatch1
const csvPath = batch1Paths.exportPathToCsvBatch1
const jsonPath = batch1Paths.exportPathToJsonBatch1

async function main(): Promise<string> {
  await exportShopifyCsv(inputPath, csvPath)
  await exportDataToJson(inputPath, jsonPath)
  return "export complete"
}

const result = main()
console.log(result)
