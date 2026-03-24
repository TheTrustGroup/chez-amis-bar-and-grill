# Local Environment Variables Template

The canonical variable list with comments is in the repo root [`.env.example`](../.env.example). Copy it to `.env.local` and fill in secrets.

## 📝 Create `.env.local` File

Create a file named `.env.local` in your project root with these variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://chezamisrestaurant.com
NEXT_PUBLIC_RESTAURANT_NAME=Chez Amis Bar and Grill
NEXT_PUBLIC_PHONE=+2330243952339
NEXT_PUBLIC_EMAIL=chez@chezamisrestaurant.com

# Email Service (Resend) - ✅ CONFIGURED
# Replace with your actual Resend API key from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Chez Amis <noreply@chezamisrestaurant.com>

# SMS Service (Twilio) - ✅ CONFIGURED
# Replace with your actual Twilio credentials (see CREDENTIALS_SETUP.md)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Admin dashboard — set ADMIN_PASSWORD in .env.local (no default)
ADMIN_PASSWORD=your_secure_password_here
ADMIN_EMAIL=chez@chezamisrestaurant.com
```

## ✅ Quick Setup

1. **Create the file:**
   ```bash
   touch .env.local
   ```

2. **Copy the template above** into `.env.local`

3. **Verify it's working:**
   ```bash
   npm run dev
   ```

4. **Test order placement** with verified phone numbers

## 🔒 Security

- ✅ `.env.local` is in `.gitignore` (won't be committed)
- ✅ Never commit this file to Git
- ✅ Keep credentials secure
- ✅ Don't share this file

## 📍 File Location

```
/Users/raregem.zillion/Desktop/Chez Amis Bar and Grill/.env.local
```

## ⚠️ Important Notes

- **Trial Number:** Your Twilio number is a trial number
- **Verify Numbers:** Must verify recipient phone numbers in Twilio Console
- **Testing:** Perfect for development and testing
- **Production:** Consider upgrading to a real number for production use

