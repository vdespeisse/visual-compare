import { imageDiff } from './image-diff'
import * as path from 'path'

describe('imageDiff', () => {
  it('should work', async () => {
    console.log('dqs', __dirname)
    const imageAPath = path.join(__dirname, '..', '..', 'tests', 'imageA.jpeg')
    const imageBPath = path.join(__dirname, '..', '..', 'tests', 'imageB.jpeg')
    const imageCPath = path.join(__dirname, '..', '..', 'tests', 'imageC.jpeg')
    expect(
      await imageDiff(imageAPath, imageCPath, path.join(__dirname, '..', '..', 'tests', 'tmp', 'diff.png')),
    ).toEqual(false)
    // expect(await imageDiff(imageAPath, imageBPath, '../../tests/tmp/output.jpg')).toEqual(true)
  }, 100000)
})
