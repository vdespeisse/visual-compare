import * as fs from 'fs/promises'
import looksSame from 'looks-same'
export async function compareImages(sourceImage: Buffer, targetImage: Buffer): Promise<boolean> {
  const { equal } = await looksSame(sourceImage, targetImage)
  return equal
}
// export function compareImages(sourceImage: Buffer, targetImage: Buffer, options: any): Promise<any> {
//   return new Promise((resolve, reject) =>
//     compare(sourceImage, targetImage, options, (err: any, data: any) => {
//       if (err) {
//         reject(err)
//       }
//       resolve(data)
//     }),
//   )
// }

export async function imageDiff(sourcePath: string, targetPath: string, outputPath?: string): Promise<number> {
  const sourceImage = await fs.readFile(sourcePath)
  const targetImage = await fs.readFile(targetPath)
  console.log('sourceImage', sourceImage)
  const equal = await compareImages(sourceImage, targetImage)
  if (outputPath && !equal) {
    console.log('is not equal')
    await looksSame.createDiff({
      reference: sourceImage,
      current: targetImage,
      diff: outputPath,
      highlightColor: '#ff00ff', // color to highlight the differences
      strict: false, // strict comparsion
      tolerance: 5,
      antialiasingTolerance: 0,
      ignoreAntialiasing: true, // ignore antialising by default
      ignoreCaret: true, // ignore caret by default
    })
  }
  return equal
  // return 0
}

export async function imageDiffWithThreshold(): Promise<number> {
  return 0
}
