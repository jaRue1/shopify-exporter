import { exportShopifyCsv } from "./shopify-export"
import { exportDataToJson } from "./json-exporter"
import { filePaths } from "./config"
// 1 - 323 (Adhesive, Agricultural, Bicycle parts) Batch 1
// 324 - 591 (Child Clothing, Medial Clothing, Worksite Clothing, Shoes, Roofing, Electrical) Batch 2
// 592 - 831 (Fasteners,Nuts & Bolts,Nails, Fixtures) Batch 3

const { batch2Paths, testPaths } = filePaths

const { inputPath, exportPathToCsv, exportPathToJson } = batch2Paths

async function main(): Promise<string> {
  await exportShopifyCsv(inputPath, exportPathToCsv)
  await exportDataToJson(inputPath, exportPathToJson)
  return "export complete"
}

async function run() {
  const result = await main()
  console.log(result)
}

run()
