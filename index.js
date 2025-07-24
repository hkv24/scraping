import express from 'express'
import scrape from './scrape.js'
import 'dotenv/config'
import cors from 'cors'
const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(cors())

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.post('/api/v1/scrape', async (req, res) => {
    const { url } = req.body

    if(!url) {
        return res.status(400).json({ error: 'URL is required' })
    }
    
    // Validate URL format and protocol
    try {
        const parsedUrl = new URL(url)
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            return res.status(400).json({ error: 'Only HTTP and HTTPS URLs are allowed' })
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL format' })
    }

    try {
        const metadata = await scrape(url)
        res.json(metadata)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
