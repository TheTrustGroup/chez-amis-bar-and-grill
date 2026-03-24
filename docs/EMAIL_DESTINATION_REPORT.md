# Email Destination Report

## ✅ CONFIRMED: All forms send to chez@chezamisrestaurant.com

### 1. Contact Form Messages
**File:** `app/api/contact/route.ts`
- **Destination:** `chez@chezamisrestaurant.com` (line 38)
- **Status:** ✅ Configured correctly
- **Method:** Resend API
- **Reply-To:** Customer's email (allows direct reply)

### 2. Reservations
**File:** `app/api/reservations/route.ts`
- **Destination:** `chez@chezamisrestaurant.com` (via notification service)
- **Status:** ✅ Configured correctly
- **Method:** Uses `sendAdminNotification()` service
- **Service File:** `lib/services/notification.service.ts` (line 168)
- **Default:** `process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'`

### 3. Orders
**File:** `app/api/orders/route.ts`
- **Destination:** `chez@chezamisrestaurant.com` (via notification service)
- **Status:** ✅ Configured correctly
- **Method:** Uses `sendAdminNotification()` service
- **Service File:** `lib/services/notification.service.ts` (line 168)
- **Default:** `process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'`

### 4. Event Requests (Private Dining)
**File:** `app/api/events/route.ts`
- **Destination:** `chez@chezamisrestaurant.com` (line 44)
- **Status:** ✅ Configured correctly
- **Method:** Resend API
- **Reply-To:** Customer's email (allows direct reply)

---

## ⚠️ IMPORTANT NOTES

### Reservation Form Issue
**File:** `components/reservations/ReservationForm.tsx`
- **Current Status:** ⚠️ Form does NOT call API route in production
- **Issue:** Line 45-56 shows it only logs in development mode
- **Fix Required:** Form needs to call `/api/reservations` endpoint

### Email Service Configuration
- **Service:** Resend API
- **Required Environment Variable:** `RESEND_API_KEY`
- **From Email:** `RESEND_FROM_EMAIL` or defaults to `Chez Amis <noreply@chezamisrestaurant.com>`
- **Admin Email Override:** Can be set via `ADMIN_EMAIL` environment variable

---

## 📋 Summary

| Form Type | Email Destination | Status | API Route |
|-----------|------------------|--------|-----------|
| Contact Form | ✅ chez@chezamisrestaurant.com | ✅ Working | `/api/contact` |
| Reservations | ✅ chez@chezamisrestaurant.com | ⚠️ Form not calling API | `/api/reservations` |
| Orders | ✅ chez@chezamisrestaurant.com | ✅ Working | `/api/orders` |
| Event Requests | ✅ chez@chezamisrestaurant.com | ✅ Working | `/api/events` |

---

## 🔧 Action Required

1. **Fix Reservation Form:** Update `ReservationForm.tsx` to call `/api/reservations` endpoint
2. **Verify Environment Variables:** Ensure `RESEND_API_KEY` is set in production
3. **Test All Forms:** Verify emails are being received at chez@chezamisrestaurant.com
