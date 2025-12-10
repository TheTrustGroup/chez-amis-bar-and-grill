# Twilio Trial Number Setup Guide

## ✅ Yes, You Can Use a Trial Number!

Twilio provides a **free trial number** that you can use for testing. Here's how to set it up:

---

## 🎯 Quick Setup Steps

### Step 1: Get Your Trial Number
1. Sign up at https://www.twilio.com (if you haven't already)
2. Go to **Console Dashboard**
3. Navigate to **Phone Numbers** → **Manage** → **Active numbers**
4. You'll see your trial number (e.g., `+15005550006` or similar)
5. Copy this number - this is your `TWILIO_PHONE_NUMBER`

### Step 2: Get Your Credentials
1. In **Console Dashboard**, find:
   - **Account SID** (starts with `AC`)
   - **Auth Token** (click to reveal)

### Step 3: Verify Phone Numbers (IMPORTANT!)
**Trial numbers can ONLY send SMS to verified phone numbers.**

1. Go to **Phone Numbers** → **Verified Caller IDs**
2. Click **Add a new Caller ID**
3. Enter the phone number you want to test with (e.g., your Ghana number: `+233XXXXXXXXX`)
4. Twilio will send a verification code
5. Enter the code to verify
6. Repeat for any other numbers you want to test

**Note:** You can verify multiple numbers, but each must be verified individually.

### Step 4: Add to Environment Variables

**For Local Development (.env.local):**
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15005550006  # Your trial number
```

**For Vercel Production:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all three variables
3. Redeploy

---

## ⚠️ Important Limitations

### Trial Number Restrictions:
- ✅ **Can send to:** Verified phone numbers only
- ❌ **Cannot send to:** Unverified phone numbers
- ✅ **Perfect for:** Testing and development
- ❌ **Not for:** Production with real customers

### What This Means:
- You can test the SMS system with your own verified phone number
- You can verify a few test numbers (friends, team members)
- You **cannot** send SMS to random customer phone numbers
- For production, you'll need to upgrade and buy a real number

---

## 🧪 Testing with Trial Number

### Test Setup:
1. Verify your phone number in Twilio
2. Place a test order with your verified phone number
3. Check your phone for SMS
4. Verify SMS contains order details

### Example Test:
```
Order Phone: +2330243952339 (your verified number)
Twilio Trial Number: +15005550006
Result: ✅ SMS will be sent
```

---

## 🚀 Upgrading for Production

When you're ready for production:

### Step 1: Upgrade Twilio Account
1. Go to **Billing** in Twilio Console
2. Add payment method
3. Upgrade from trial to paid account

### Step 2: Buy a Real Number
1. Go to **Phone Numbers** → **Buy a number**
2. Search for **Ghana** (+233)
3. Select a number
4. Purchase (usually $1-2/month)
5. Update `TWILIO_PHONE_NUMBER` in environment variables

### Step 3: Real Number Benefits
- ✅ Send to any phone number (no verification needed)
- ✅ Works with all customers
- ✅ Production-ready
- ✅ Supports Ghana (+233) numbers

---

## 💰 Cost Estimates

### Trial Account:
- **Free:** $15.50 credit included
- **SMS Cost:** ~$0.05-0.10 per SMS to Ghana
- **Credit lasts:** ~150-300 test SMS

### Paid Account:
- **Phone Number:** ~$1-2/month
- **SMS to Ghana:** ~$0.05-0.10 per SMS
- **100 orders/month:** ~$5-10/month total
- **500 orders/month:** ~$25-50/month total

---

## ✅ Recommended Approach

1. **Start with Trial:**
   - Use trial number for testing
   - Verify your phone number
   - Test the order system
   - Verify SMS works correctly

2. **Upgrade When Ready:**
   - When you're ready for real customers
   - Upgrade Twilio account
   - Buy a Ghana phone number
   - Update environment variables
   - Go live!

---

## 🆘 Troubleshooting

### SMS not sending?
- ✅ Check phone number is verified in Twilio
- ✅ Verify `TWILIO_PHONE_NUMBER` is correct
- ✅ Check Twilio account has credits
- ✅ Review Twilio console for errors

### "Unverified number" error?
- This means the recipient number isn't verified
- Add it to Verified Caller IDs in Twilio
- Or upgrade to a paid account with real number

### Need help?
- Twilio Docs: https://www.twilio.com/docs
- Twilio Support: Available in console

---

## 📝 Summary

**Yes, you can use a Twilio trial number!**

✅ **For Testing:** Perfect - verify your numbers and test
⏳ **For Production:** Upgrade and buy a real number

**Current Status:**
- Email: ✅ Configured and ready
- SMS: ⏳ Can use trial number for testing
- Production SMS: Upgrade Twilio when ready


