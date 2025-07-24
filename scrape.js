import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import logoScraper from './logoScraper.js'
import colourPalletScraper from './colourScraper.js'

puppeteer.use(StealthPlugin())

const scrape = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    })
    try {
        const page = await browser.newPage()
        await page.goto(url, { waitUntil: 'domcontentloaded' })

        const metadata = await page.evaluate(() => {
            const title = document.querySelector('title')?.innerText
            const description = document.querySelector('meta[name="description"]')?.content
            const allImages = Array.from(document.querySelectorAll('img'))
                .filter(img => img.naturalWidth >= 64 && img.naturalHeight >= 64)
                .map(img => img.src)
            return { title, description, allImages }
        })

        // these functions are independent and both use their own browser instances, you can run them in parallel:
        const [logo, colour] = await Promise.all([
            logoScraper(page),
            colourPalletScraper(browser, url)
        ])
        return { ...metadata, logo, colour }
    } catch (err) {
        throw err
    } finally {
        await browser.close()
    }
}

export default scrape
