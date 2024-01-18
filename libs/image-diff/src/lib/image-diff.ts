import * as fs from 'fs/promises'
import looksSame, { CreateDiffOptions } from 'looks-same'
export async function compareImages(sourceImage: Buffer, targetImage: Buffer): Promise<boolean> {
  const { equal } = await looksSame(sourceImage, targetImage)
  return equal
}

export async function imageDiff(
  sourcePath: string,
  targetPath: string,
  outputPath?: string,
  diffOptions?: CreateDiffOptions,
): Promise<boolean> {
  const sourceImage = await fs.readFile(sourcePath)
  const targetImage = await fs.readFile(targetPath)
  const equal = await compareImages(sourceImage, targetImage)
  if (outputPath && !equal) {
    const defaultDiffOptions: CreateDiffOptions = {
      reference: sourceImage,
      current: targetImage,
      diff: outputPath,
      highlightColor: '#ff00ff', // color to highlight the differences
      strict: false, // strict comparsion
      tolerance: 5,
      antialiasingTolerance: 0,
      ignoreAntialiasing: true, // ignore antialising by default
      ignoreCaret: true, // ignore caret by default
    }
    await looksSame.createDiff({
      ...defaultDiffOptions,
      ...diffOptions,
    })
  }
  return equal
}
