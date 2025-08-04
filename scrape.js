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
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--disable-extensions',
            '--disable-plugins',
            '--disable-default-apps',
            '--disable-hang-monitor',
            '--disable-prompt-on-repost',
            '--disable-sync',
            '--metrics-recording-only',
            '--safebrowsing-disable-auto-update',
            '--enable-automation',
            '--password-store=basic',
            '--use-mock-keychain'
        ],
        ignoreDefaultArgs: ['--disable-extensions'],
        timeout: 60000
    })
    try {
        const page = await browser.newPage()
        
        // Set page timeouts and configurations
        await page.setDefaultNavigationTimeout(30000)
        await page.setDefaultTimeout(30000)
        
        // Set user agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        
        await page.goto(url, { 
            waitUntil: 'domcontentloaded',
            timeout: 30000
        })

        const metadata = await page.evaluate(() => {
            const title = document.querySelector('title')?.innerText
            const description = document.querySelector('meta[name="description"]')?.content
            const allImages = Array.from(document.querySelectorAll('img'))
                .filter(img => img.naturalWidth >= 64 && img.naturalHeight >= 64)
                .map(img => img.src)
                .filter(src => /\.(jpg|jpeg|png|webp)(\?|$)/i.test(src))
            return { title, description, allImages }
        })

        // these functions are independent and both use their own browser instances, you can run them in parallel:
        const [logo, colour] = await Promise.all([
            logoScraper(page),
            colourPalletScraper(browser, url)
        ])
        return { ...metadata, logo, colour }
    } catch (err) {
        console.error('Scraping error:', err.message)
        throw new Error(`Failed to scrape website: ${err.message}`)
    } finally {
        try {
            await browser.close()
        } catch (closeError) {
            console.error('Error closing browser:', closeError.message)
        }
    }
}

export default scrape
