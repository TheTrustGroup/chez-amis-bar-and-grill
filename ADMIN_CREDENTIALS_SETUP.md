# Admin Dashboard Credentials Setup

## 🔐 Default Credentials

**⚠️ IMPORTANT:** These are fallback defaults. Always set environment variables in production!

**Default Username:** `chezamis_admin`  
**Default Password:** `ChezAmis2024!Secure`

**These defaults are only used if environment variables are not set.**

---

## 📋 Setting Credentials in Vercel

### Step 1: Access Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project: **chez-amis-bar-and-grill**
3. Navigate to: **Settings** → **Environment Variables**

### Step 2: Add Environment Variables

Add these two variables:

#### Variable 1: Admin Username
- **Key:** `ADMIN_USERNAME`
- **Value:** Your desired admin username (e.g., `chezamis_admin` or `admin@chezamis.com`)
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

#### Variable 2: Admin Password
- **Key:** `ADMIN_PASSWORD`
- **Value:** Your secure password (use a strong password!)
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Step 3: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger auto-deployment

---

## 🔒 Security Best Practices

### Password Requirements

✅ **Use a strong password:**
- Minimum 12 characters
- Mix of uppercase and lowercase letters
- Include numbers and special characters
- Avoid common words or patterns

### Examples of Strong Passwords:
- `ChezAmis2024!Secure`
- `Admin@Restaurant#2024`
- `ChezAmis_Bar&Grill_2024`

### Examples of Weak Passwords (DO NOT USE):
- ❌ `admin123`
- ❌ `password`
- ❌ `chezamis`
- ❌ `12345678`

---

## 🧪 Testing Credentials

### Local Development

1. Create `.env.local` file in project root:
```bash
ADMIN_USERNAME=your_username_here
ADMIN_PASSWORD=your_secure_password_here
```

2. Restart your development server:
```bash
npm run dev
```

3. Test login at: `http://localhost:3000/admin/login`

### Production

1. Set environment variables in Vercel (as described above)
2. Redeploy the application
3. Test login at: `https://www.chezamisrestaurant.com/admin/login`

---

## 🔄 Changing Credentials

### To Change Username:
1. Update `ADMIN_USERNAME` in Vercel environment variables
2. Redeploy the application

### To Change Password:
1. Update `ADMIN_PASSWORD` in Vercel environment variables
2. Redeploy the application
3. All existing sessions will remain valid until they expire (8 hours)

---

## 📝 Current Configuration

- **Session Duration:** 8 hours
- **Cookie Name:** `admin_session`
- **Cookie Security:** HTTP-only, Secure in production, SameSite: Lax

---

## ⚠️ Important Notes

1. **Never commit credentials to Git** - Always use environment variables
2. **Use different credentials for dev/staging/production** if possible
3. **Change default password immediately** in production
4. **Keep credentials secure** - Share only with authorized staff
5. **Regular password updates** - Change password periodically

---

## 🆘 Troubleshooting

### Can't Login?
- Verify environment variables are set correctly in Vercel
- Check that you've redeployed after setting variables
- Clear browser cookies and try again
- Check browser console for errors

### Forgot Password?
- Update `ADMIN_PASSWORD` in Vercel environment variables
- Redeploy the application
- Use new password to login

---

## 📞 Support

If you need help setting up credentials, contact your development team.

