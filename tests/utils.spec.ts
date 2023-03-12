import { awsS3UrlGenerator, assignCategory } from "../utils"

describe('utils functions', () => {
  it('assigns correct shopfiy taxomy given a category', () => {
    const value = `ADBG`
    const result = assignCategory(value)
    const assertion = `Hardware > Building Consumables > Hardware Glue & Adhesives`
    expect(result).toEqual(assertion)
  })
  it('gernerates aws url', () => {
    const value = `ADBG.jpeg`
    const result = awsS3UrlGenerator(value)
    const assertion = 'https://s3.amazonaws.com/croftshillent.com-photos/ADBG.jpeg'
    expect(result).toEqual(assertion)
  })
})