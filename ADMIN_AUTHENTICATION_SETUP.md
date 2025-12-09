# Admin Dashboard Authentication Setup

**Status:** ✅ **FULLY IMPLEMENTED**  
**Date:** December 7, 2025

---

## 🔒 Authentication System

The admin dashboard is now secured with username and password authentication.

---

## 📋 Setup Instructions

### **Step 1: Set Environment Variables**

Add these to your `.env.local` file (local development):

```bash
# Admin Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** Choose a strong password!

### **Step 2: Add to Vercel (Production)**

1. Go to: https://vercel.com/dashboard
2. Select project: **chez-amis-bar-and-grill**
3. Navigate to: **Settings** → **Environment Variables**
4. Add these variables:

**Variable 1:**
- **Key:** `ADMIN_USERNAME`
- **Value:** Your admin username
- **Environment:** ✅ Production ✅ Preview ✅ Development

**Variable 2:**
- **Key:** `ADMIN_PASSWORD`
- **Value:** Your secure password
- **Environment:** ✅ Production ✅ Preview ✅ Development

5. Click **Save**
6. Redeploy your application

---

## 🔐 Default Credentials

**⚠️ IMPORTANT:** Change these immediately!

**Default (if not set in environment):**
- Username: `admin`
- Password: `admin123`

**These are insecure defaults!** Always set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in production.

---

## 📍 Access Points

### **Login Page**
**URL:** `https://www.chezamisrestaurant.com/admin/login`

### **Protected Routes** (Require Login)
- `/admin/orders` - Orders dashboard
- `/admin/order-status` - Update order status

---

## 🔄 How It Works

1. **User visits admin route** → Redirected to login if not authenticated
2. **User enters credentials** → Validated against environment variables
3. **Session created** → Secure HTTP-only cookie set (8 hour duration)
4. **Access granted** → User can access admin routes
5. **Logout** → Session destroyed, redirected to login

---

## 🛡️ Security Features

✅ **Password Protection** - Username/password required  
✅ **Session Management** - Secure HTTP-only cookies  
✅ **Route Protection** - Middleware protects all `/admin/*` routes  
✅ **Auto-redirect** - Unauthenticated users redirected to login  
✅ **Session Duration** - 8 hours (configurable)  
✅ **Secure Cookies** - HTTP-only, secure in production  
✅ **Logout Functionality** - Clear session on logout  

---

## 🎯 Usage

### **Login:**
1. Go to `/admin/login`
2. Enter username and password
3. Click "Login"
4. Redirected to orders dashboard

### **Logout:**
1. Click "Logout" button in admin dashboard
2. Session cleared
3. Redirected to login page

### **Auto-redirect:**
- If not logged in and try to access `/admin/orders` → Redirected to `/admin/login`
- After login → Redirected back to original page

---

## 🔧 Configuration

### **Session Duration**

Default: 8 hours

To change, edit `lib/auth.ts`:
```typescript
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours
```

### **Cookie Settings**

Cookies are configured with:
- `httpOnly: true` - Not accessible via JavaScript
- `secure: true` - HTTPS only in production
- `sameSite: 'lax'` - CSRF protection
- `maxAge: 8 hours` - Session expiration

---

## 📝 API Endpoints

### **Login**
```
POST /api/admin/login
Body: { username: string, password: string }
```

### **Check Auth Status**
```
GET /api/admin/login
Returns: { authenticated: boolean }
```

### **Logout**
```
POST /api/admin/logout
```

---

## ⚠️ Security Recommendations

1. **Use Strong Passwords:**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Don't use common words

2. **Change Default Credentials:**
   - Never use default `admin/admin123` in production
   - Set unique username and password

3. **Environment Variables:**
   - Store credentials in environment variables only
   - Never commit credentials to Git
   - Use different credentials for dev/staging/production

4. **Regular Updates:**
   - Change password periodically
   - Review access logs if available

5. **Consider Additional Security:**
   - Two-factor authentication (2FA)
   - IP whitelisting
   - Rate limiting on login attempts
   - Password hashing with bcrypt (currently simple comparison)

---

## 🚀 Production Checklist

- [ ] Set `ADMIN_USERNAME` in Vercel environment variables
- [ ] Set `ADMIN_PASSWORD` in Vercel environment variables
- [ ] Use strong, unique password
- [ ] Test login functionality
- [ ] Test logout functionality
- [ ] Verify routes are protected
- [ ] Share credentials securely with authorized staff only

---

## 🆘 Troubleshooting

### **Can't login?**
1. Check environment variables are set correctly
2. Verify username and password match exactly
3. Check browser console for errors
4. Clear browser cookies and try again

### **Session expires too quickly?**
- Check `SESSION_DURATION` in `lib/auth.ts`
- Verify cookie settings

### **Redirect loop?**
- Check middleware is working correctly
- Verify cookie is being set
- Check browser allows cookies

---

## ✅ Status

**Authentication:** ✅ **IMPLEMENTED**  
**Route Protection:** ✅ **ACTIVE**  
**Session Management:** ✅ **WORKING**  
**Security:** ✅ **BASIC PROTECTION ENABLED**

---

**Next Steps:**
1. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in environment variables
2. Deploy to production
3. Test login functionality
4. Share credentials securely with authorized staff

