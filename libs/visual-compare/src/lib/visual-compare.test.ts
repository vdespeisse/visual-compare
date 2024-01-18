import visualCompare from './visual-compare'
import * as path from 'path'
const tmpFolder = path.join(__dirname, '..', '..', 'tests', 'tmp')

describe('visualCompare', () => {
  it('Same url should return true', async () => {
    const tmpFolder = path.join(__dirname, '..', '..', 'tests', 'tmp')

    expect(
      await visualCompare(
        'https://webscraper.io/test-sites/e-commerce/static',
        'https://webscraper.io/test-sites/e-commerce/static',
        {
          waitFor: 500,
          outputPath: path.join(tmpFolder, 'shouldBeSame.png'),
        },
      ),
    ).toEqual(true)
  }, 100000)
  it('Different url should return false', async () => {
    expect(
      await visualCompare(
        'https://webscraper.io/test-sites/e-commerce/static',
        'https://webscraper.io/test-sites/e-commerce/static/phones',
        {
          outputPath: path.join(tmpFolder, 'shouldBeDiff.png'),
        },
      ),
    ).toEqual(false)
  }, 100000)
  it('Navigation on same url should return true', async () => {
    const tmpFolder = path.join(__dirname, '..', '..', 'tests', 'tmp')

    expect(
      await visualCompare(
        'https://webscraper.io/test-sites/e-commerce/static',
        'https://webscraper.io/test-sites/e-commerce/static',
        {
          outputPath: path.join(tmpFolder, 'shouldBeSameNavigation.png'),
          navigationFn: async page => {
            await page.waitForSelector('.category-link.nav-link')
            await page.click('.category-link.nav-link')
          },
        },
      ),
    ).toEqual(true)
  }, 100000)
  it('Navigation on different url should return false', async () => {
    expect(
      await visualCompare(
        'https://webscraper.io/test-sites/e-commerce/static',
        'https://webscraper.io/test-sites/tables',
        {
          outputPath: path.join(tmpFolder, 'shouldBeDiffNavigation.png'),
          navigationFn: async page => {
            // await page.waitForSelector('.category-link.nav-link')
            await new Promise(resolve => setTimeout(resolve, 1000))
            try {
              await page.click('.category-link.nav-link')
            } catch (e) {
              console.log(e)
            }
          },
        },
      ),
    ).toEqual(false)
  }, 100000)
})
