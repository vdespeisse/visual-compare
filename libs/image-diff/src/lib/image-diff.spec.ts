import { imageDiff } from './image-diff'
import * as path from 'path'
import * as fs from 'fs'

describe('imageDiff', () => {
  it('should work', async () => {
    const imageAPath = path.join(__dirname, '..', '..', 'tests', 'imageA.jpeg')
    const imageBPath = path.join(__dirname, '..', '..', 'tests', 'imageB.jpeg')
    const imageCPath = path.join(__dirname, '..', '..', 'tests', 'imageC.jpeg')
    const diffImagePath = path.join(__dirname, '..', '..', 'tests', 'tmp', 'diff.png')
    const nonEqual = await imageDiff(imageAPath, imageCPath, diffImagePath)
    expect(nonEqual).toEqual(false)
    expect(fs.existsSync(diffImagePath)).toEqual(true)
    expect(await imageDiff(imageAPath, imageBPath)).toEqual(true)
  }, 10000)
})
