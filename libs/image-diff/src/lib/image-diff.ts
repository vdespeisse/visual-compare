import * as fs from 'fs/promises'
import looksSame, { CreateDiffOptions } from 'looks-same'
export async function compareImages(referenceImage: Buffer, targetImage: Buffer): Promise<boolean> {
  const { equal } = await looksSame(referenceImage, targetImage, { tolerance: 5 })
  return equal
}

export async function imageDiff(
  reference: string | Buffer,
  target: string | Buffer,
  outputPath?: string,
  diffOptions?: CreateDiffOptions,
): Promise<boolean> {
  const referenceImage = typeof reference === 'string' ? await fs.readFile(reference) : reference
  const targetImage = typeof target === 'string' ? await fs.readFile(target) : target
  const equal = await compareImages(referenceImage, targetImage)
  console.log(`Sdsqqs are ${equal}`)
  if (outputPath && !equal) {
    console.log(`Saving diff image to ${outputPath}`)
    const defaultDiffOptions: CreateDiffOptions = {
      reference: referenceImage,
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
