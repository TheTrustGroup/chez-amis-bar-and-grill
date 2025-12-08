# Vercel Environment Variables Setup

## ✅ Email Service (Resend) - READY TO DEPLOY

Your Resend email service is configured. Add these to Vercel:

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your "chez-amis-bar-and-grill" project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Email Variables
Click **Add New** and add these variables:

**Variable 1:**
- **Key:** `RESEND_API_KEY`
- **Value:** `re_exzWAyZJ_Ha64cQjg2xDoMQkpjASvgLMs`
- **Environment:** Production, Preview, Development (select all)

**Variable 2:**
- **Key:** `RESEND_FROM_EMAIL`
- **Value:** `Chez Amis <noreply@chezamisrestaurant.com>`
- **Environment:** Production, Preview, Development (select all)

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger auto-deploy

---

## ✅ SMS Service (Twilio) - READY TO DEPLOY

Your Twilio SMS service is configured. Add these to Vercel:

**Variable 1:**
- **Key:** `TWILIO_ACCOUNT_SID`
- **Value:** Your Twilio Account SID (starts with `AC`)
- **Environment:** Production, Preview, Development (select all)

**Variable 2:**
- **Key:** `TWILIO_AUTH_TOKEN`
- **Value:** Your Twilio Auth Token
- **Environment:** Production, Preview, Development (select all)

**Variable 3:**
- **Key:** `TWILIO_PHONE_NUMBER`
- **Value:** Your Twilio phone number (e.g., `+15204754558` for trial, or `+233XXXXXXXXX` for Ghana)
- **Environment:** Production, Preview, Development (select all)

**Your Credentials:**
- Check your `.env.local` file locally for the actual values
- Or get from Twilio Console Dashboard
- **Note:** Your Twilio number is a trial number - verify recipient numbers for testing

---

## 🧪 Testing After Deployment

### Test Email
1. Place a test order with a real email address
2. Check inbox (and spam folder)
3. Verify email contains:
   - Order number
   - Order details
   - Items list
   - Payment summary

### Test SMS (when Twilio is configured)
1. Place a test order with a Ghana phone number (+233)
2. Check your phone for SMS
3. Verify SMS contains order number and total

---

## 📊 Current Status

- ✅ **Email Service:** Configured and ready
- ✅ **SMS Service:** Configured and ready (trial number)
- ✅ **Order API:** Implemented
- ✅ **Confirmation Page:** Shows notification status
- ✅ **Local Setup:** `.env.local` created with all credentials

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ API keys are secure in Vercel environment variables
- ✅ Never commit API keys to Git
- ✅ Rotate keys if exposed

---

## 🆘 Troubleshooting

### Email not sending?
- Check `RESEND_API_KEY` is set in Vercel
- Verify domain is verified in Resend (if using custom domain)
- Check Resend dashboard for errors
- Review Vercel function logs

### Need help?
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs

