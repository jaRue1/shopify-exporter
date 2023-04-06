import { awsS3UrlGenerator } from "./index"
import { batch2fileNames } from "./batch2"
import * as fs from "fs"
const folderName = "batch2"
const fileName = folderName + "Urls.json"

async function createS3UrlsArray(fileNames: string[]): Promise<string[]> {
  let allUrls = []
  for (let index = 0; index < fileNames.length; index++) {
    let fileName = fileNames[index]
    let url = awsS3UrlGenerator(fileName)
    allUrls.push(url)
  }
  return allUrls
}
async function save() {
  const urls = await createS3UrlsArray(batch2fileNames)
  await fs.writeFileSync(
    `../export/batches/${folderName}/${fileName}`,
    JSON.stringify(urls)
  )
  console.log("done")
}
save()
