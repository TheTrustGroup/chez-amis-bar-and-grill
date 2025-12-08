# Order System Setup Guide - SMS & Email Confirmations

This guide explains how to set up the order confirmation system with SMS and email notifications.

## ✅ Features Implemented

- ✅ Order placement API endpoint (`/api/orders`)
- ✅ Email confirmation service (Resend)
- ✅ SMS confirmation service (Twilio)
- ✅ Order confirmation page with notification status
- ✅ Error handling and fallback behavior

---

## 📧 Email Service Setup (Resend)

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key
1. Navigate to **API Keys** in dashboard
2. Click **Create API Key**
3. Name it (e.g., "Chez Amis Production")
4. Copy the API key (starts with `re_`)

### Step 3: Verify Domain (Optional but Recommended)
1. Go to **Domains** in dashboard
2. Add your domain (e.g., `chezamis.com`)
3. Add DNS records as instructed
4. Wait for verification (usually 5-10 minutes)

### Step 4: Set Environment Variables
Add to your `.env.local` or Vercel environment variables:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Chez Amis <noreply@chezamis.com>
```

**Free Tier:** 3,000 emails/month

---

## 📱 SMS Service Setup (Twilio)

### Step 1: Create Twilio Account
1. Go to https://www.twilio.com
2. Sign up for a free account
3. Verify your phone number

### Step 2: Get Credentials
1. Go to **Console Dashboard**
2. Find your **Account SID** (starts with `AC`)
3. Find your **Auth Token** (click to reveal)

### Step 3: Get Phone Number
1. Go to **Phone Numbers** → **Buy a number**
2. Select **Ghana** (+233) as country
3. Choose a number (or use trial number for testing)
4. Copy the phone number (format: `+1234567890`)

### Step 4: Set Environment Variables
Add to your `.env.local` or Vercel environment variables:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Free Trial:** $15.50 credit, supports Ghana numbers

---

## 🚀 Deployment (Vercel)

### Step 1: Add Environment Variables
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all required variables:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`

### Step 2: Redeploy
1. Go to **Deployments**
2. Click **Redeploy** on latest deployment
3. Or push a new commit to trigger auto-deploy

---

## 🧪 Testing

### Test Email
1. Place a test order with a real email address
2. Check your inbox (and spam folder)
3. Verify email contains:
   - Order number
   - Order details
   - Items list
   - Payment summary

### Test SMS
1. Place a test order with a Ghana phone number (+233)
2. Check your phone for SMS
3. Verify SMS contains:
   - Order number
   - Order type
   - Total amount

### Development Mode
If environment variables are not set, the system will:
- Log to console instead of sending
- Still process the order
- Show "will be sent" status on confirmation page

---

## 🔧 Alternative Services

### Email Alternatives

**SendGrid:**
```bash
SENDGRID_API_KEY=SG.xxxxx
```

**AWS SES:**
```bash
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
```

**Mailgun:**
```bash
MAILGUN_API_KEY=xxxxx
MAILGUN_DOMAIN=mg.chezamis.com
```

### SMS Alternatives

**AWS SNS:**
```bash
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
```

**MessageBird:**
```bash
MESSAGEBIRD_API_KEY=xxxxx
```

**Vonage (formerly Nexmo):**
```bash
VONAGE_API_KEY=xxxxx
VONAGE_API_SECRET=xxxxx
```

---

## 📊 Order Flow

1. **Customer places order** → `/place-order`
2. **Order submitted** → `POST /api/orders`
3. **API processes order:**
   - Validates order data
   - Sends email confirmation (parallel)
   - Sends SMS confirmation (parallel)
   - Returns notification status
4. **Redirect to confirmation** → `/order-confirmation/[orderId]`
5. **Confirmation page shows:**
   - Order details
   - Email status (sent/failed)
   - SMS status (sent/failed)

---

## 🛡️ Error Handling

- **Email fails:** Order still placed, customer notified
- **SMS fails:** Order still placed, customer notified
- **Both fail:** Order still placed, customer can contact restaurant
- **API error:** User sees error message, can retry

---

## 💰 Cost Estimates

### Resend (Email)
- **Free:** 3,000 emails/month
- **Pro:** $20/month for 50,000 emails

### Twilio (SMS)
- **Ghana SMS:** ~$0.05-0.10 per SMS
- **100 orders/month:** ~$5-10/month
- **500 orders/month:** ~$25-50/month

---

## 📝 Customization

### Email Template
Edit: `/lib/services/email.ts`
- Modify HTML template
- Change styling
- Add restaurant branding

### SMS Message
Edit: `/lib/services/sms.ts`
- Modify message format
- Adjust character limit
- Add custom details

---

## ✅ Checklist

- [ ] Resend account created
- [ ] Resend API key added to environment
- [ ] Twilio account created
- [ ] Twilio credentials added to environment
- [ ] Twilio phone number purchased
- [ ] Environment variables set in Vercel
- [ ] Test order placed
- [ ] Email received
- [ ] SMS received
- [ ] Confirmation page shows correct status

---

## 🆘 Troubleshooting

### Email not sending
- Check `RESEND_API_KEY` is set
- Verify domain is verified (if using custom domain)
- Check Resend dashboard for errors
- Review server logs

### SMS not sending
- Check Twilio credentials are correct
- Verify phone number format (+233XXXXXXXXX)
- Check Twilio account has credits
- Review Twilio console for errors

### Both failing
- Check environment variables are set
- Verify API keys are valid
- Check network connectivity
- Review server logs for errors

---

**Need help?** Contact support or check service documentation:
- Resend: https://resend.com/docs
- Twilio: https://www.twilio.com/docs

