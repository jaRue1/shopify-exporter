import { awsS3UrlGenerator } from "./index";
import { batch1fileNames } from "./batch1";
import * as fs from "fs"

async function createS3UrlsArray(batch1fileNames): Promise<string[]> {
  let allUrls = []
  for (let index = 0; index < batch1fileNames.length; index++) {
    let fileName = batch1fileNames[index];
    let url = awsS3UrlGenerator(fileName)
    allUrls.push(url)
  }
  return allUrls
}
async function save() {
  const urls = await createS3UrlsArray(batch1fileNames)
  await fs.writeFileSync('../export/batches/batch1/batch1Urls.json', JSON.stringify(urls))
  console.log('done')
}
save()