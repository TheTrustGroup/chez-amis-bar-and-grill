# ✅ Next Steps After Changing Nameservers

## You've Changed Nameservers - What's Next?

### Step 1: Go to Vercel (2 minutes)

1. **Open Vercel Dashboard**
   - Go to https://vercel.com
   - Log in to your account

2. **Go to Your Project**
   - Click on your project (chez-amis-bar-and-grill or whatever you named it)
   - Or go to: https://vercel.com/dashboard

3. **Open Settings**
   - Click **"Settings"** tab (top menu)
   - Or click **"Settings"** in the left sidebar

4. **Go to Domains**
   - In Settings, click **"Domains"** in the left menu
   - You'll see a list of domains (probably empty right now)

### Step 2: Add Your Domain (3 minutes)

1. **Click "Add Domain"**
   - You'll see a button or input field to add a domain
   - Type your domain (e.g., `chezamis.com`)
   - **Don't include** `www` or `http://` - just the domain name
   - Click **"Add"** or press Enter

2. **Vercel Will Check DNS**
   - It might show "Configuration needed" or "Pending"
   - This is normal - it's checking if nameservers are updated

3. **Select "Use Vercel DNS"**
   - Vercel will ask how you want to configure DNS
   - Select **"Use Vercel DNS"** (since you changed nameservers)
   - Click **"Continue"** or **"Save"**

### Step 3: Add WWW Subdomain (Optional but Recommended)

1. **Add www version too**
   - Click **"Add Domain"** again
   - Type `www.yourdomain.com` (e.g., `www.chezamis.com`)
   - Click **"Add"**

2. **Set Redirect (Optional)**
   - You can set one to redirect to the other
   - Usually: `www` redirects to non-www (or vice versa)
   - This is optional - both will work

### Step 4: Wait for DNS Propagation (1-2 hours)

**What's happening:**
- Your nameserver changes need to propagate across the internet
- This usually takes **1-2 hours** (can be up to 48 hours)
- Vercel will automatically check and update status

**How to check status:**
- In Vercel → Settings → Domains
- You'll see status next to your domain:
  - ⏳ **"Pending"** = Still waiting for DNS
  - ✅ **"Valid Configuration"** = It's working!
  - ❌ **"Configuration Error"** = Something wrong (check nameservers)

**You can check DNS propagation:**
- Go to https://dnschecker.org
- Enter your domain
- Select "NS" (Nameservers) record type
- Check if `ns1.vercel-dns.com` and `ns2.vercel-dns.com` show up globally

### Step 5: SSL Certificate (Automatic)

**Good news:** Vercel automatically provides SSL certificates!

- Once DNS is verified, Vercel will automatically issue an SSL certificate
- This usually happens within **5-10 minutes** after DNS is verified
- Your site will be available at `https://yourdomain.com`
- No action needed from you!

---

## ✅ What You Should See

### In Vercel Dashboard:

**Before DNS propagates:**
```
Domain: chezamis.com
Status: ⏳ Pending
Configuration: Waiting for DNS...
```

**After DNS propagates:**
```
Domain: chezamis.com
Status: ✅ Valid Configuration
SSL: ✅ Active
```

---

## 🎯 Quick Checklist

- [ ] Changed nameservers in GoDaddy ✅ (You did this!)
- [ ] Added domain in Vercel
- [ ] Selected "Use Vercel DNS"
- [ ] Added www subdomain (optional)
- [ ] Waiting for DNS propagation (1-2 hours)
- [ ] SSL certificate issued automatically
- [ ] Site accessible at your domain

---

## ⏰ Timeline

**Right Now:**
- Nameservers changed ✅
- Next: Add domain in Vercel (5 minutes)

**In 1-2 Hours:**
- DNS propagates
- Vercel detects nameservers
- Domain status changes to "Valid"

**In 2-3 Hours:**
- SSL certificate issued
- Site fully accessible at `https://yourdomain.com`

---

## 🆘 Troubleshooting

### "Domain not found" in Vercel
- Make sure you typed the domain correctly
- No `www`, no `http://`, just the domain name

### "Configuration Error" in Vercel
- Double-check nameservers in GoDaddy
- Make sure you saved: `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
- Wait a bit longer - DNS can take time

### "Pending" for a long time
- DNS propagation can take up to 48 hours
- Usually works within 1-2 hours
- Check dnschecker.org to see propagation status

### Site not loading after DNS propagates
- Clear browser cache
- Try incognito/private mode
- Wait 5-10 minutes for SSL certificate

---

## 🎉 You're Almost There!

**Next immediate step:**
1. Go to Vercel
2. Add your domain
3. Select "Use Vercel DNS"
4. Wait 1-2 hours
5. Your site will be live!

**You've done the hard part (changing nameservers) - the rest is easy!**

---

**Last Updated:** December 7, 2024

