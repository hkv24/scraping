# Railway Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository
Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect your Node.js app and deploy it!

### 3. Environment Variables (Optional)
Railway will automatically set the PORT variable, but you can add custom ones:
- Go to your project dashboard
- Click on "Variables"
- Add any environment variables you need

### 4. Custom Domain (Optional)
1. In your Railway project dashboard
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 📊 What Railway Provides

✅ **Automatic Puppeteer Support** - No additional configuration needed
✅ **Free Tier** - $5 monthly credit
✅ **Automatic HTTPS** - SSL certificates included
✅ **Auto-scaling** - Handles traffic spikes
✅ **Monitoring** - Built-in logs and metrics
✅ **Zero-downtime deploys** - Seamless updates

## 🔗 Your API Endpoints

Once deployed, your app will be available at: `https://your-app-name.railway.app`

- **Health Check**: `GET /health`
- **Scrape Website**: `POST /api/v1/scrape`

## 📱 Test Your Deployment

```bash
# Test health endpoint
curl https://your-app-name.railway.app/health

# Test scraping
curl -X POST https://your-app-name.railway.app/api/v1/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## 🛠️ Troubleshooting

If you encounter issues:
1. Check Railway logs in the dashboard
2. Verify your package.json has the "start" script
3. Ensure all dependencies are in package.json
4. Check that PORT is properly configured

## 💰 Cost Estimation

Railway's free tier includes:
- $5 monthly credit
- Usage-based pricing after credit
- Typical costs: $0.20-$2/month for light usage

Your scraping API should easily fit within the free tier for development and light production use!
