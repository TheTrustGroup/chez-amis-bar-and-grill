# Chez Amis Bar and Grill - Deployment Guide

**Status:** Ready for Production Deployment  
**Framework:** Next.js 14.2.33  
**Build Status:** ✅ All checks passing

---

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [x] Build successful (`npm run build`)
- [x] No TypeScript errors
- [x] No linting errors
- [x] All components optimized
- [x] Images optimized
- [x] Code cleanup completed

### ⚠️ Before Deployment
- [ ] Review all contact information (phone, email, address)
- [ ] Verify all menu prices are correct
- [ ] Test all forms (contact, reservation, order)
- [ ] Check all links are working
- [ ] Verify images are properly optimized
- [ ] Test on multiple devices/browsers
- [ ] Review SEO metadata

---

## 🚀 Recommended Deployment Platform: Vercel

**Why Vercel?**
- Built by Next.js creators - perfect integration
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Free tier available
- Easy environment variable management
- Automatic deployments from Git

### Alternative Platforms:
- **Netlify** - Good alternative, similar features
- **AWS Amplify** - For AWS ecosystem
- **Self-hosted** - VPS/Cloud server (more complex)

---

## 📦 Step 1: Prepare Your Codebase

### 1.1 Update Next.js Config

Update `next.config.js` for production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.unsplash.com', // If using Unsplash
      'your-cdn-domain.com', // Your image CDN if applicable
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
```

### 1.2 Create Environment Variables Template

Create `.env.example` file:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://chezamis.com
NEXT_PUBLIC_RESTAURANT_NAME=Chez Amis Bar and Grill
NEXT_PUBLIC_PHONE=+2330243952339
NEXT_PUBLIC_EMAIL=info@chezamis.com

# Contact Information
NEXT_PUBLIC_ADDRESS=40 Boundary Rd, Accra, Ghana
NEXT_PUBLIC_HOURS=Daily 9:30 am - 12 am

# API Endpoints (if you have backend)
NEXT_PUBLIC_API_URL=https://api.chezamis.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Form Submissions (optional - for contact/reservation forms)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 1.3 Update Package.json Scripts (Optional)

Add helpful scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "analyze": "ANALYZE=true next build"
  }
}
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket
3. Verify your email

### 2.2 Connect Your Repository

1. **Push code to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Production ready"
   git branch -M main
   git remote add origin https://github.com/yourusername/chez-amis.git
   git push -u origin main
   ```

2. **Import Project in Vercel:**
   - Click "Add New Project"
   - Select your repository
   - Vercel auto-detects Next.js

### 2.3 Configure Build Settings

Vercel auto-detects, but verify:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

### 2.4 Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

Add all variables from `.env.example`:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_ADDRESS`
- etc.

**Important:** 
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are server-only

### 2.5 Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-5 minutes)
3. Get your deployment URL: `https://chez-amis-bar-and-grill.vercel.app`

---

## 🔧 Step 3: Configure Custom Domain

### 3.1 Add Domain in Vercel

1. Go to Project → Settings → Domains
2. Add your domain: `chezamis.com` and `www.chezamis.com`
3. Follow DNS configuration instructions

### 3.2 Update DNS Records

Add these records to your domain registrar:

**For Root Domain (chezamis.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.chezamis.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 SSL Certificate

- Vercel automatically provisions SSL certificates
- Wait 24-48 hours for DNS propagation
- SSL will be active once DNS is verified

---

## 📧 Step 4: Set Up Form Submissions

### Option A: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to Vercel environment variables: `RESEND_API_KEY`
4. Create API route: `/app/api/contact/route.ts`

Example API route:
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    await resend.emails.send({
      from: 'contact@chezamis.com',
      to: 'info@chezamis.com',
      subject: `New Contact Form: ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

### Option B: Formspree / FormSubmit

- Use third-party form services
- No backend code needed
- Add form action URL to forms

---

## 📊 Step 5: Add Analytics & Monitoring

### 5.1 Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID: `G-XXXXXXXXXX`
3. Add to Vercel environment: `NEXT_PUBLIC_GA_ID`
4. Add to `app/layout.tsx`:

```typescript
// Add to <head> section
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `,
      }}
    />
  </>
)}
```

### 5.2 Vercel Analytics

- Built-in analytics in Vercel
- Go to Project → Analytics
- Enable Web Analytics (free tier available)

### 5.3 Error Monitoring (Optional)

**Sentry:**
1. Sign up at [sentry.io](https://sentry.io)
2. Install: `npm install @sentry/nextjs`
3. Configure: `npx @sentry/wizard@latest -i nextjs`
4. Add DSN to environment variables

---

## ✅ Step 6: Post-Deployment Checklist

### 6.1 Functionality Tests

- [ ] Homepage loads correctly
- [ ] Menu page displays all items
- [ ] Signature Creations section shows Attieke dishes
- [ ] Contact form submits successfully
- [ ] Reservation form works
- [ ] Order flow functions properly
- [ ] All links work
- [ ] Images load properly
- [ ] Mobile navigation works
- [ ] Search functionality works

### 6.2 Performance Tests

- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Test page load speed (< 3 seconds)
- [ ] Check mobile performance
- [ ] Verify image optimization
- [ ] Test on slow connections

### 6.3 SEO Verification

- [ ] Verify meta tags in page source
- [ ] Check Open Graph tags
- [ ] Test structured data (if added)
- [ ] Verify sitemap.xml (auto-generated by Next.js)
- [ ] Submit to Google Search Console

### 6.4 Cross-Browser Testing

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 🔄 Step 7: Continuous Deployment

### 7.1 Automatic Deployments

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

### 7.2 Deployment Workflow

```bash
# Make changes locally
git add .
git commit -m "Update menu items"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Sends notification
```

### 7.3 Preview Deployments

- Every branch gets a preview URL
- Test changes before merging
- Share preview links with team

---

## 🛠️ Step 8: Maintenance & Updates

### 8.1 Regular Updates

**Weekly:**
- Review analytics
- Check error logs
- Monitor form submissions

**Monthly:**
- Update dependencies: `npm update`
- Review performance metrics
- Update menu items/prices
- Check for security updates

### 8.2 Updating Menu Items

Menu items are in `/lib/data/menuData.ts`:
1. Edit menu data
2. Commit changes
3. Push to Git
4. Vercel auto-deploys

### 8.3 Backup Strategy

- Code: Git repository (automatic)
- Images: Store in CDN or Vercel Blob
- Database: If added later, set up regular backups

---

## 📱 Step 9: Mobile App (Future)

Consider creating a mobile app:
- **PWA (Progressive Web App)** - Convert website to app
- **React Native** - Native mobile app
- **Expo** - Easier React Native setup

---

## 🆘 Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Run `npm run build` locally
3. Check for TypeScript errors
4. Verify all environment variables

### Images Not Loading

1. Check `next.config.js` image domains
2. Verify image paths are correct
3. Check image optimization settings

### Forms Not Working

1. Verify API routes are deployed
2. Check environment variables
3. Test API endpoints directly
4. Check CORS settings

### Slow Performance

1. Run Lighthouse audit
2. Optimize images
3. Enable Vercel Edge Caching
4. Review bundle size

---

## 📞 Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

## 🎯 Quick Start Commands

```bash
# 1. Prepare for deployment
npm run build
npm run lint

# 2. Initialize Git (if not done)
git init
git add .
git commit -m "Ready for deployment"

# 3. Push to GitHub
git remote add origin <your-repo-url>
git push -u origin main

# 4. Deploy to Vercel
# - Go to vercel.com
# - Import project
# - Configure environment variables
# - Deploy!
```

---

## 📝 Deployment Checklist Summary

### Pre-Deployment
- [x] Code cleanup complete
- [x] Build successful
- [x] No errors
- [ ] Review all content
- [ ] Test all features
- [ ] Prepare environment variables

### Deployment
- [ ] Push code to Git
- [ ] Connect to Vercel
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy to production
- [ ] Configure custom domain

### Post-Deployment
- [ ] Test all pages
- [ ] Verify forms work
- [ ] Set up analytics
- [ ] Configure email notifications
- [ ] Test on multiple devices
- [ ] Submit to search engines

---

## 🚀 You're Ready to Deploy!

Your Chez Amis Bar and Grill website is production-ready. Follow the steps above to get it live!

**Estimated Deployment Time:** 15-30 minutes

**Next Steps:**
1. Push code to Git
2. Deploy to Vercel
3. Configure domain
4. Test everything
5. Go live! 🎉

---

**Last Updated:** $(date)  
**Status:** ✅ Ready for Production

