# Web Scraping API

A Node.js API for scraping website metadata including logos, color palettes, titles, and descriptions.

## Features

- Extract website metadata (title, description, images)
- Logo detection from favicons, Open Graph images, and common logo selectors
- Color palette extraction from website screenshots
- CORS enabled for cross-origin requests
- URL validation for security

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   PORT=3001
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3001).

## API Endpoints

### Health Check
```
GET /health
```

### Scrape Website
```
POST /api/v1/scrape
Content-Type: application/json

{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "title": "Website Title",
  "description": "Website description",
  "allImages": ["image1.jpg", "image2.png"],
  "logo": ["favicon.ico", "logo.png"],
  "colour": ["#ff0000", "#00ff00", "#0000ff"]
}
```

## Deployment

### Environment Variables
- `PORT`: Server port (default: 3001)

### Docker Deployment
The application uses Puppeteer which requires specific Chrome/Chromium dependencies. For containerized deployments, use a base image with Chrome pre-installed.

### Cloud Deployment
This application is ready for deployment on:
- Heroku
- Railway
- Render
- AWS EC2
- Google Cloud Run
- Any Node.js hosting platform

**Note:** Ensure your hosting platform supports Puppeteer and has sufficient memory (recommended: 1GB+ RAM).

## Security Features

- URL validation (HTTP/HTTPS only)
- SSRF protection
- Automatic screenshot cleanup
- Stealth mode for bot detection avoidance

## Dependencies

- **express**: Web framework
- **puppeteer**: Web scraping
- **puppeteer-extra**: Enhanced Puppeteer functionality
- **puppeteer-extra-plugin-stealth**: Bot detection avoidance
- **get-image-colors**: Color extraction from images
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
