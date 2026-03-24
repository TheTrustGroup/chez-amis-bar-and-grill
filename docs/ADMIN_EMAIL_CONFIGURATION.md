# ✅ Admin Email Configuration

**Date:** December 7, 2025  
**Status:** ✅ **CONFIGURED**

---

## 📧 Admin Email Address

**All orders and reservations are sent to:**
```
chez@chezamisrestaurant.com
```

---

## 🔧 Configuration

### **Default Configuration**
The admin email is hardcoded in the notification service to ensure all orders go to the correct address:

**File:** `lib/services/notification.service.ts`
```typescript
const adminEmail = process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'
```

### **Priority Order:**
1. **Environment Variable:** `ADMIN_EMAIL` (if set)
2. **Default:** `chez@chezamisrestaurant.com` (always used if env var not set)

---

## 📨 What Gets Sent to Admin Email

### **Order Notifications**
When a customer places an order, you receive:
- **Email:** Complete order details including:
  - Order number
  - Customer information (name, email, phone)
  - Order type (dine-in/takeaway/delivery)
  - All items with quantities and prices
  - Order details (table, time, address, etc.)
  - Payment summary (subtotal, tax, delivery fee, service charge, total)
  - Special requests
- **SMS:** Brief notification with order number and total

### **Reservation Notifications**
When a customer makes a reservation, you receive:
- **Email:** Complete reservation details including:
  - Reservation number
  - Customer information (name, email, phone)
  - Date and time
  - Number of guests
  - Seating preference
  - Occasion (if specified)
  - Special requests
- **SMS:** Brief notification with reservation number and details

---

## 🔄 How It Works

### **Order Flow:**
1. Customer places order on website
2. Order data sent to `/api/orders`
3. System sends **two notifications in parallel:**
   - Customer confirmation (to customer's email/phone)
   - Admin notification (to `chez@chezamisrestaurant.com`)

### **Reservation Flow:**
1. Customer makes reservation on website
2. Reservation data sent to `/api/reservations`
3. System sends **two notifications in parallel:**
   - Customer confirmation (to customer's email/phone)
   - Admin notification (to `chez@chezamisrestaurant.com`)

---

## ✅ Verification

### **Check Admin Email Configuration:**
The admin email is configured in:
- ✅ `lib/services/notification.service.ts` - Line 165
- ✅ Default: `chez@chezamisrestaurant.com`
- ✅ Used for all order notifications
- ✅ Used for all reservation notifications

### **Test Admin Notifications:**
1. Place a test order on the website
2. Check `chez@chezamisrestaurant.com` inbox
3. You should receive an email with order details
4. Subject line: "New Order - Chez Amis"

---

## 🔒 Security Notes

- Admin email is server-side only (not exposed to client)
- Email address is hardcoded as default (cannot be changed without code update)
- Environment variable override available for flexibility
- All admin notifications are sent automatically

---

## 📊 Notification Status

**Order Notifications:**
- ✅ Email to admin: `chez@chezamisrestaurant.com`
- ✅ SMS to admin: `+233 50 243 2037` (if configured)
- ✅ Email to customer: Customer's email
- ✅ SMS to customer: Customer's phone

**Reservation Notifications:**
- ✅ Email to admin: `chez@chezamisrestaurant.com`
- ✅ SMS to admin: `+233 50 243 2037` (if configured)
- ✅ Email to customer: Customer's email
- ✅ SMS to customer: Customer's phone

---

## 🚀 Production Checklist

- [x] Admin email hardcoded to `chez@chezamisrestaurant.com`
- [x] Order notifications configured
- [x] Reservation notifications configured
- [x] Email templates created
- [x] API routes configured
- [x] Error handling implemented
- [x] Graceful degradation (order succeeds even if email fails)

---

## 📝 Environment Variables (Optional)

If you want to override the admin email (not recommended), you can set:

```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PHONE=+1234567890
```

**Note:** The default `chez@chezamisrestaurant.com` will always be used if `ADMIN_EMAIL` is not set.

---

## ✅ Status

- ✅ **Configured and tested**
- ✅ **All orders go to:** `chez@chezamisrestaurant.com`
- ✅ **All reservations go to:** `chez@chezamisrestaurant.com`
- ✅ **Ready for production**

---

**Result:** Every order and reservation placed on the website will automatically send an email notification to `chez@chezamisrestaurant.com` with complete details.


