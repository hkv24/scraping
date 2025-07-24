import getColors from 'get-image-colors'
import fs from 'fs'
import { randomUUID } from 'crypto'

// Generate a unique filename for each request
const screenshotPath = `screenshot-${randomUUID()}.png`

const colourPalletScraper = async (browser, url) => {
  let page;
  try {
    page = await browser.newPage()
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    await page.setViewport({ width: 1200, height: 800 })

    await page.screenshot({ path: screenshotPath, fullPage: true })

    const colors = await getColors(screenshotPath)
    
    return colors.map(c => c.hex())
  } catch(err) {
    throw err
  } finally {
    if (page) {
      await page.close()
    }
    fs.unlink(screenshotPath, (err) => {
      if(err) console.error(`Failed to delete screenshot: ${screenshotPath}`, err)
    })
  }
}

export default colourPalletScraper
