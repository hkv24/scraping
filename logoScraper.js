

const logoScraper = async (page) => {
  try {
    const logoUrls = await page.evaluate(() => {
      const results = [];

      // Favicon
      const icons = Array.from(document.querySelectorAll('link[rel*="icon"]'));
      icons.forEach(link => {
        if (link.href) results.push(link.href);
      });

      // Open Graph image
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage?.content) {
        results.push(ogImage.content);
      }

      // Common header logo image
      const possibleLogo = document.querySelector('img[src*="logo"], img[class*="logo"], img[id*="logo"]');
      if (possibleLogo?.src) {
        results.push(possibleLogo.src)
      }

      return results.filter(src => /\.(jpg|jpeg|png|webp)(\?|$)/i.test(src))
    })

    return logoUrls
  } catch(err) {
    throw err
  }
}

export default logoScraper
