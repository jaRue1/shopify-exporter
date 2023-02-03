import { exportShopifyCsv } from "./shopify-export"
import { exportDataToJson } from "./json-exporter"
import { filePaths } from "./config"

const { batch1Paths } = filePaths

const { inputPath, exportPathToCsv, exportPathToJson } = batch1Paths

async function main(): Promise<string> {
  await exportShopifyCsv(inputPath, exportPathToCsv)
  await exportDataToJson(inputPath, exportPathToJson)
  return "export complete"
}

const result = main()
console.log(result)
