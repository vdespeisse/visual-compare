import puppeteer, { Page, Browser } from 'puppeteer'
import { imageDiff } from '@vdespeisse/image-diff'
// take a puppeteer instance
// take a url
export async function navigate(browser: Browser, url: string, { navigationFn, waitFor }: CompareParams = {}) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1900, height: 1080 })
  await page.goto(url)
  if (navigationFn) {
    await navigationFn(page)
  }
  if (waitFor) {
    if (typeof waitFor === 'number') {
      await new Promise(resolve => setTimeout(resolve, waitFor))
    } else {
      await page.waitForSelector(waitFor)
    }
  }
  const screenshot = await page.screenshot()
  return screenshot
}

interface CompareParams {
  navigationFn?: (page: Page) => Promise<void>
  outputPath?: string
  waitFor?: number | string
}
export default async function visualCompare(referenceUrl: string, targetUrl: string, params: CompareParams = {}) {
  const browser = await puppeteer.launch({ headless: 'new' })
  try {
    const referenceImage = await navigate(browser, referenceUrl, params)
    const targetImage = await navigate(browser, targetUrl, params)
    await browser.close()
    const isEqual = await imageDiff(referenceImage, targetImage, params.outputPath)
    console.log(`${referenceUrl} and ${targetUrl} are ${isEqual ? 'equal' : 'different'}`)
    return isEqual
  } catch (e) {
    await browser.close()
    throw e
  }
}
