/**
 * Online payment (card / mobile money) is not integrated yet.
 * When true, checkout only records "pay-later" (cash or card on arrival / on delivery).
 *
 * Set `NEXT_PUBLIC_PAYMENT_ON_DELIVERY_ONLY=false` in `.env` when payment integration is live.
 * Default: pay-on-delivery only (unset or any value other than the string "false").
 */
export const PAYMENT_ON_DELIVERY_ONLY =
  process.env.NEXT_PUBLIC_PAYMENT_ON_DELIVERY_ONLY !== "false"
