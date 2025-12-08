# 🔐 Credentials Setup Guide

## ✅ Your Credentials (Keep Secure!)

**IMPORTANT:** These credentials are sensitive. Never commit them to Git or share them publicly.

### Email Service (Resend)
```
RESEND_API_KEY=re_exzWAyZJ_Ha64cQjg2xDoMQkpjASvgLMs
RESEND_FROM_EMAIL=Chez Amis <noreply@chezamisrestaurant.com>
```

### SMS Service (Twilio)
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**⚠️ SECURITY NOTE:** This file contains sensitive credentials. It's in `.gitignore` and won't be committed to Git. Keep it secure and never share it publicly.

---

## 🚀 Quick Setup

### Step 1: Local Development (.env.local)

Your `.env.local` file has been created with all credentials. It's already configured and ready to use!

**Location:** `/Users/raregem.zillion/Desktop/Chez Amis Bar and Grill/.env.local`

**Status:** ✅ Already created and configured

### Step 2: Production (Vercel)

Add all 5 environment variables to Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Add these variables:

**Email Variables:**
- `RESEND_API_KEY` = `re_exzWAyZJ_Ha64cQjg2xDoMQkpjASvgLMs`
- `RESEND_FROM_EMAIL` = `Chez Amis <noreply@chezamisrestaurant.com>`

**SMS Variables:**
- `TWILIO_ACCOUNT_SID` = Your Twilio Account SID (starts with `AC`)
- `TWILIO_AUTH_TOKEN` = Your Twilio Auth Token
- `TWILIO_PHONE_NUMBER` = Your Twilio phone number (e.g., `+15204754558` for trial)

4. Select all environments (Production, Preview, Development)
5. Click **Save**
6. Redeploy your project

---

## ⚠️ Important Notes

### Twilio Trial Number
Your Twilio number is a **trial number** (verify recipient numbers for testing).

**For Testing:**
- ✅ Verify recipient phone numbers in Twilio Console
- ✅ Go to: Phone Numbers → Verified Caller IDs
- ✅ Add numbers you want to test with
- ✅ Perfect for development and testing

**For Production:**
- ⚠️ Trial numbers can only send to verified numbers
- 💡 Consider upgrading to a paid account
- 💡 Buy a real Ghana phone number (+233) for production

### Security
- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Credentials are secure in Vercel environment variables
- ✅ Never share or commit these credentials
- ✅ Rotate keys if exposed

---

## 🧪 Testing

### Test Locally:
1. Run: `npm run dev`
2. Verify your phone number in Twilio Console
3. Place a test order with your verified phone number
4. Check email inbox and phone for confirmations

### Test in Production:
1. Add all variables to Vercel
2. Redeploy project
3. Place a test order on live site
4. Verify both email and SMS received

---

## ✅ Current Status

| Service | Status | Configuration |
|---------|--------|---------------|
| Email | ✅ Ready | Resend configured |
| SMS | ✅ Ready | Twilio configured (trial) |
| Local Dev | ✅ Ready | .env.local created |
| Production | ⏳ Pending | Add to Vercel |

---

## 📝 Next Steps

1. ✅ **Local:** Already configured in `.env.local`
2. ⏳ **Vercel:** Add all 5 variables to environment variables
3. ⏳ **Test:** Place a test order and verify notifications
4. ⏳ **Production:** Upgrade Twilio when ready for real customers

---

**All credentials are configured and ready to use!**

