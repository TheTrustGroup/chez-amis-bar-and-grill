# 🗺️ GoDaddy DNS Navigation Guide

## Problem: Getting Redirected to "Domain Portfolio"

If GoDaddy takes you to "Domain Portfolio" instead of DNS settings, follow these steps:

---

## ✅ Correct Navigation Path

### Method 1: From Domain Portfolio Page

1. **You're on "Domain Portfolio" page**
2. **Find your domain** in the list
3. **Look for one of these buttons:**
   - **"DNS"** button (usually on the right)
   - **"Manage DNS"** link
   - **Three dots (⋯)** menu → Select "Manage DNS"
4. **Click it** to go to DNS management

### Method 2: Direct Path

1. Log in to **godaddy.com**
2. Click your **profile icon** (top right corner)
3. Click **"My Products"** or **"All Products and Services"**
4. Find your domain in the list
5. Click the **three dots (⋯)** next to your domain name
6. Select **"Manage DNS"** from the dropdown menu

### Method 3: Search Bar

1. At the top of GoDaddy, use the **search bar**
2. Type your domain name
3. Click on it when it appears
4. Look for **"DNS"** tab or button
5. Click it

---

## 📍 What You Should See

Once you're in the **correct DNS page**, you should see:

- ✅ **"Records"** section with A, CNAME, MX records
- ✅ **"Nameservers"** section
- ✅ **"Add"** button to create new records
- ✅ **"Edit"** and **"Delete"** options for existing records

**You should NOT see:**
- ❌ "Domain Portfolio" as the main page
- ❌ Just a list of domains
- ❌ "Transfer" or "Renew" options only

---

## 🎯 Quick Visual Guide

```
GoDaddy Dashboard
    ↓
My Products / All Products
    ↓
Your Domain (in list)
    ↓
Three Dots (⋯) Menu
    ↓
"Manage DNS" ← CLICK THIS
    ↓
DNS Management Page ✅
```

---

## 🔧 If You Still Can't Find It

### Alternative: Use Direct URL

Try this direct URL format (replace `yourdomain.com`):
```
https://dcc.godaddy.com/manage/yourdomain.com/dns
```

### Contact GoDaddy Support

If you still can't access DNS settings:
1. Call GoDaddy: **1-480-505-8877**
2. Or use live chat on their website
3. Ask: "I need to access DNS settings for my domain"

---

## 📝 Step-by-Step: Changing Nameservers

Once you're on the DNS page:

1. **Scroll down** to find **"Nameservers"** section
2. Click **"Change"** button
3. Select **"Custom"** (not "GoDaddy Nameservers")
4. **Delete** the existing nameservers (usually 2-4 entries)
5. **Add new nameservers:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Click **"Save"**
7. Wait for confirmation: "Nameservers updated successfully"

---

## 📝 Step-by-Step: Adding DNS Records

If using GoDaddy DNS (not nameservers):

1. On DNS page, find **"Records"** section
2. Click **"Add"** button
3. Select record type:
   - **A record** for root domain (@)
   - **CNAME** for www subdomain
4. Fill in:
   - **Name:** `@` (for root) or `www` (for www)
   - **Value:** IP address or CNAME (from Vercel)
   - **TTL:** 600 (or leave default)
5. Click **"Save"**
6. Repeat for each record needed

---

## ⚠️ Common Issues

### Issue 1: "Domain Portfolio" Keeps Appearing
**Solution:** Look for "DNS" button/tab on that page, or use the three dots menu

### Issue 2: Can't Find "Manage DNS"
**Solution:** Try clicking directly on your domain name, then look for DNS tab

### Issue 3: DNS Page Looks Different
**Solution:** GoDaddy updated their interface - look for "DNS" or "DNS Management" tab

### Issue 4: Changes Not Saving
**Solution:** 
- Make sure you're logged in
- Clear browser cache
- Try different browser
- Wait a few minutes and try again

---

## 🎥 Visual Reference

**What the DNS page should look like:**
```
┌─────────────────────────────────────┐
│  DNS Management                     │
├─────────────────────────────────────┤
│                                     │
│  Nameservers                        │
│  [Change] button                    │
│                                     │
│  Records                            │
│  ┌─────────┬──────┬─────────────┐  │
│  │ Type    │ Name │ Value       │  │
│  ├─────────┼──────┼─────────────┤  │
│  │ A       │ @    │ 76.76.21.21 │  │
│  │ CNAME   │ www  │ cname...    │  │
│  └─────────┴──────┴─────────────┘  │
│                                     │
│  [+ Add] button                     │
└─────────────────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] I can see "DNS Management" or "DNS" page
- [ ] I can see "Records" section
- [ ] I can see "Nameservers" section
- [ ] I can add/edit/delete records
- [ ] Changes save successfully

---

## 🆘 Still Stuck?

1. **Take a screenshot** of what you see
2. **Note the exact page title** (top of browser)
3. **Try incognito/private browsing** mode
4. **Use a different browser** (Chrome, Firefox, Safari)
5. **Contact GoDaddy support** with your domain name

---

**Remember:** You need to be on the **DNS Management** page, not the Domain Portfolio page!

**Last Updated:** December 7, 2024

