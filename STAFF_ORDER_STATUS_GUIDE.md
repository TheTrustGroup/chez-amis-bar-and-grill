# Staff Guide: How to Update Order Status

**For Restaurant Staff**  
**Last Updated:** December 7, 2025

---

## 📍 Where to Update Order Status

### **Option 1: Admin Web Interface** ✅ **RECOMMENDED**

**URL:** `https://www.chezamisrestaurant.com/admin/order-status`

**Steps:**
1. Open your web browser
2. Navigate to: `https://www.chezamisrestaurant.com/admin/order-status`
3. Fill in the order details:
   - Order ID (e.g., "CAG-1234")
   - Customer Name
   - Customer Phone
   - Customer Email
   - Order Type (Dine In / Takeaway / Delivery)
   - Select new status
4. Click "Update Order Status"
5. Customer will automatically receive notifications

**Features:**
- ✅ Easy-to-use form interface
- ✅ Real-time notification status
- ✅ Success/error messages
- ✅ Works on desktop and mobile

---

### **Option 2: API Endpoint** (For POS Systems or Custom Integration)

**URL:** `POST /api/orders/[orderId]/status`

**Example:**
```bash
curl -X POST https://www.chezamisrestaurant.com/api/orders/CAG-1234/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "ready",
    "customerPhone": "+2330243952339",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "orderType": "takeaway"
  }'
```

**See:** `API_ORDER_STATUS_ENDPOINT.md` for detailed API documentation

---

## 📋 Order Status Options

### **1. Preparing** 🔄
- **When to use:** When kitchen starts preparing the order
- **Customer receives:** Email notification
- **Message:** "Your order is now being prepared"

### **2. Ready** ✅
- **When to use:** When order is ready for pickup/delivery
- **Customer receives:** Email + SMS notification
- **Message:** "Your order is ready!"
- **Applies to:** Takeaway and Delivery orders only

### **3. Out for Delivery** 🚚
- **When to use:** When delivery driver leaves with the order
- **Customer receives:** Email + SMS notification
- **Message:** "Your order is out for delivery. Expected arrival: [time]"
- **Applies to:** Delivery orders only
- **Note:** Include estimated delivery time

### **4. Delivered** 📦
- **When to use:** When order has been delivered
- **Customer receives:** No notification (order complete)

### **5. Cancelled** ❌
- **When to use:** When order is cancelled
- **Customer receives:** No notification

---

## 🎯 Step-by-Step Workflow

### **For Takeaway Orders:**

1. **Order Placed** → Customer receives confirmation (automatic)
2. **Kitchen starts** → Update status to "Preparing"
3. **Order ready** → Update status to "Ready"
   - Customer receives email + SMS: "Your order is ready for pickup"
4. **Customer picks up** → Update status to "Delivered"

### **For Delivery Orders:**

1. **Order Placed** → Customer receives confirmation (automatic)
2. **Kitchen starts** → Update status to "Preparing"
3. **Order ready** → Update status to "Ready"
   - Customer receives email + SMS: "Your order is ready"
4. **Driver leaves** → Update status to "Out for Delivery"
   - Customer receives email + SMS: "Your order is out for delivery. Expected arrival: [time]"
5. **Order delivered** → Update status to "Delivered"

### **For Dine-In Orders:**

1. **Order Placed** → Customer receives confirmation (automatic)
2. **Kitchen starts** → Update status to "Preparing"
3. **Order ready** → Update status to "Ready" (no notification sent for dine-in)
4. **Order served** → Update status to "Delivered"

---

## 💡 Quick Reference

| Status | Email | SMS | When to Use |
|--------|-------|-----|-------------|
| **Preparing** | ✅ | ❌ | Kitchen starts preparing |
| **Ready** | ✅ | ✅ | Order ready (takeaway/delivery) |
| **Out for Delivery** | ✅ | ✅ | Driver leaves (delivery only) |
| **Delivered** | ❌ | ❌ | Order completed |
| **Cancelled** | ❌ | ❌ | Order cancelled |

---

## ⚠️ Important Notes

1. **Customer Email Required:** Make sure to include customer email for email notifications to work
2. **Order Type Matters:** 
   - "Ready" notifications only sent for takeaway/delivery
   - "Out for Delivery" notifications only sent for delivery orders
3. **Estimated Time:** Include estimated delivery time when updating to "Out for Delivery"
4. **Phone Format:** Use full international format (e.g., "+2330243952339")

---

## 🆘 Troubleshooting

### **Customer didn't receive notification?**

1. **Check notification status** in the response after updating status
2. **Verify customer email** is correct
3. **Check customer phone** format (must include country code)
4. **Verify Resend API** is configured (for emails)
5. **Verify Twilio** is configured (for SMS)

### **Can't access admin page?**

- Make sure you're using the correct URL: `/admin/order-status`
- Check your internet connection
- Contact IT support if issues persist

---

## 📞 Support

For technical issues or questions:
- **Email:** chez@chezamisrestaurant.com
- **Phone:** +233 024 395 2339

---

## ✅ Best Practices

1. **Update status promptly** - Keep customers informed
2. **Use correct order ID** - Double-check before submitting
3. **Include accurate information** - Customer name, phone, email
4. **Provide estimated times** - Especially for delivery orders
5. **Check notification status** - Verify customers were notified

---

**Remember:** Every status update sends automatic notifications to customers, keeping them informed throughout the order process!

