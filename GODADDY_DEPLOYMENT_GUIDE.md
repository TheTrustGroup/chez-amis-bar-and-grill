# 🚀 GoDaddy Domain + Next.js Deployment Guide

## Overview
This guide will walk you through deploying your Chez Amis Bar and Grill website and connecting it to your GoDaddy domain.

## Recommended Hosting Platform: Vercel

**Why Vercel?**
- ✅ Built by the creators of Next.js
- ✅ Zero-configuration deployment
- ✅ Automatic SSL certificates
- ✅ Free tier available
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Perfect Next.js optimization

## Step-by-Step Deployment

### PART 1: Prepare Your Code for Deployment

#### Step 1: Verify Your Code is Ready
```bash
# Make sure you're in the project directory
cd "/Users/raregem.zillion/Desktop/Chez Amis Bar and Grill"

# Run a production build to check for errors
npm run build

# If build succeeds, you're ready!
```

#### Step 2: Push to GitHub (if not already done)
```bash
# Check if you have a remote repository
git remote -v

# If you need to create a new repository:
# 1. Go to https://github.com/new
# 2. Create a new repository (e.g., "chez-amis-website")
# 3. Don't initialize with README
# 4. Copy the repository URL

# Add remote and push (if new repository)
git remote add origin https://github.com/YOUR_USERNAME/chez-amis-website.git
git branch -M main
git push -u origin main

# Or if you already have a remote, just push:
git push
```

---

### PART 2: Deploy to Vercel

#### Step 3: Create Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

#### Step 4: Import Your Project
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your repository: **"chez-amis-bar-and-grill"** (or your repo name)
3. Click **"Import"**

#### Step 5: Configure Project Settings
Vercel will auto-detect Next.js, but verify:

**Framework Preset:** Next.js  
**Root Directory:** `./` (default)  
**Build Command:** `npm run build` (auto-detected)  
**Output Directory:** `.next` (auto-detected)  
**Install Command:** `npm install` (auto-detected)

**Environment Variables:** (if you have any)
- Add any API keys or secrets here
- For now, you likely don't need any

#### Step 6: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://chez-amis-bar-and-grill.vercel.app`

**✅ Your site is now live!** Test it at the provided URL.

---

### PART 3: Connect GoDaddy Domain

#### Step 7: Add Domain in Vercel
1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Enter your GoDaddy domain (e.g., `chezamis.com` or `www.chezamis.com`)
3. Click **"Add"**
4. Vercel will show you DNS records to configure

#### Step 8: Configure DNS in GoDaddy

**Option A: Use Vercel Nameservers (Recommended - Easier)**

1. **In GoDaddy:**
   - Log in to GoDaddy at **godaddy.com**
   - Click on your **profile/account icon** (top right)
   - Click **"My Products"** or **"All Products and Services"**
   - Find your domain in the list
   - Click the **three dots (⋯)** next to your domain
   - Select **"Manage DNS"** (NOT "Manage" or "Domain Portfolio")
   - If you see "Domain Portfolio", look for a **"DNS"** button or tab
   - Scroll down to find **"Nameservers"** section
   - Click **"Change"** next to Nameservers
   - Select **"Custom"** (not "GoDaddy Nameservers")
   - Delete existing nameservers and add Vercel nameservers:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Click **"Save"**
   - Wait for confirmation message

2. **In Vercel:**
   - Go back to Vercel → **"Settings"** → **"Domains"**
   - Click **"Configure"** next to your domain
   - Select **"Use Vercel DNS"**
   - Follow the prompts

**Option B: Use GoDaddy DNS (Keep GoDaddy Nameservers)**

1. **In Vercel:**
   - Go to **"Settings"** → **"Domains"**
   - Click **"Configure"** next to your domain
   - Select **"Use External DNS"**
   - Vercel will show you DNS records to add

2. **In GoDaddy:**
   - Log in to GoDaddy
   - Go to **"My Products"** → Find your domain
   - Click **three dots (⋯)** → **"Manage DNS"**
   - If you see "Domain Portfolio", click **"DNS"** tab or button
   - Scroll to **"Records"** section (or "DNS Records")
   - Click **"Add"** to create new records
   - Add these records (Vercel will provide exact values):

     **For Root Domain (chezamis.com):**
     ```
     Type: A
     Name: @
     Value: [Vercel IP address]
     TTL: 600
     ```

     **For WWW (www.chezamis.com):**
     ```
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     TTL: 600
     ```

   - Click **"Save"** for each record

#### Step 9: Wait for DNS Propagation
- DNS changes can take **15 minutes to 48 hours** to propagate
- Usually takes **1-2 hours**
- You can check status at: https://dnschecker.org

#### Step 10: Verify Domain Connection
1. In Vercel dashboard, check domain status
2. When it shows **"Valid Configuration"**, you're done!
3. Visit your domain: `https://yourdomain.com`

---

### PART 4: SSL Certificate (Automatic)

✅ **Good News:** Vercel automatically provides SSL certificates!

- Once DNS is configured, Vercel automatically issues an SSL certificate
- Your site will be available at `https://yourdomain.com`
- Certificate renews automatically
- No action needed from you!

---

### PART 5: Final Configuration

#### Step 11: Redirect WWW to Non-WWW (or vice versa)

**In Vercel:**
1. Go to **"Settings"** → **"Domains"**
2. Add both `yourdomain.com` and `www.yourdomain.com`
3. Set one as primary (redirects the other)

#### Step 12: Update Site Metadata (Optional)

If you want to update the site title/description for SEO:
- Edit `app/layout.tsx`
- Update the `metadata` object
- Push changes to GitHub
- Vercel will auto-deploy

---

## Quick Reference: DNS Records

### If Using Vercel Nameservers:
- Just point nameservers to Vercel
- Vercel handles everything

### If Using GoDaddy DNS:
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP - check Vercel dashboard for current)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Troubleshooting

### Domain Not Connecting?
1. **Check DNS Propagation:**
   - Visit https://dnschecker.org
   - Enter your domain
   - Check if DNS records are propagated globally

2. **Verify DNS Records:**
   - In GoDaddy, check that records are correct
   - In Vercel, verify domain configuration

3. **Wait Longer:**
   - DNS can take up to 48 hours
   - Usually works within 1-2 hours

### Site Shows "Not Found"?
1. Check Vercel deployment status
2. Verify domain is added in Vercel
3. Check DNS records are correct

### SSL Certificate Not Issued?
1. Wait 5-10 minutes after DNS propagation
2. Check Vercel dashboard for certificate status
3. Contact Vercel support if issues persist

---

## Alternative Hosting Options

### If Not Using Vercel:

**1. Netlify** (Similar to Vercel)
- Free tier available
- Easy Next.js deployment
- Good alternative

**2. AWS Amplify**
- More complex setup
- Good for enterprise

**3. DigitalOcean App Platform**
- Simple deployment
- Pay-as-you-go

**4. Self-Hosted (VPS)**
- More control
- Requires server management
- Options: DigitalOcean, Linode, AWS EC2

---

## Post-Deployment Checklist

- [ ] Site is accessible at your domain
- [ ] HTTPS is working (SSL certificate active)
- [ ] WWW redirects correctly
- [ ] All pages load correctly
- [ ] Images load properly
- [ ] Forms work (if applicable)
- [ ] Mobile responsive
- [ ] Test on different browsers
- [ ] Check page speed (Google PageSpeed Insights)

---

## Cost Breakdown

**Vercel Free Tier:**
- ✅ Free for personal/small projects
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic SSL

**Vercel Pro ($20/month):**
- Better for production
- More bandwidth
- Team features
- Priority support

**GoDaddy Domain:**
- Usually $10-15/year
- You already have this

**Total Estimated Cost:**
- **Free Option:** $0/month (just domain renewal)
- **Pro Option:** ~$20/month + domain

---

## Next Steps After Deployment

1. **Set up Google Analytics** (optional)
2. **Submit to Google Search Console**
3. **Set up email** (if needed)
4. **Configure backups** (Vercel auto-backs up)
5. **Monitor performance** (Vercel Analytics)

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** support@vercel.com
- **GoDaddy Support:** https://www.godaddy.com/help

---

**Ready to deploy?** Follow the steps above, and your site will be live in about 30 minutes!

**Last Updated:** December 7, 2024

