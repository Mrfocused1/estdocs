# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payments for your EastDocs Studios booking system.

## What's Been Implemented

✅ Stripe checkout integration
✅ Dynamic price calculation based on package selection and extras
✅ Payment success/cancel pages
✅ Webhook handler for payment confirmations
✅ Booking form with 4-step wizard (Personal Info → Package → Details → Review & Pay)

## Setup Instructions

### 1. Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com) and create an account
2. Complete your business information
3. Verify your email address

### 2. Get Your Stripe API Keys

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Make sure you're in **Test mode** (toggle in the top right)
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Copy the contents from `.env.example`
3. Add your Stripe keys:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Set Up Stripe Webhooks (Important!)

Webhooks allow Stripe to notify your application when payments succeed or fail.

#### For Local Development (using Stripe CLI):

1. Install the Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to Stripe CLI:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

#### For Production:

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set the endpoint URL to: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" and add it to your production environment variables

### 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Visit [http://localhost:3000/booking](http://localhost:3000/booking)
3. Fill out the booking form
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0027 6000 3184`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC

## Payment Flow

1. User fills out 4-step booking form
2. On final step, user sees total price calculated from:
   - Base package price (£75-£155 per hour)
   - Duration (1-5+ hours)
   - Selected extras (additional cameras, 4K files, etc.)
3. User clicks "Proceed to Payment"
4. User is redirected to Stripe Checkout page
5. User enters payment details
6. On success: Redirected to `/booking/success`
7. On cancel: Redirected to `/booking?cancelled=true`
8. Webhook receives confirmation and stores booking details

## Package Pricing

- **Studio + Engineer**: £75/hour
- **Studio + Standard Editing**: £115/hour
- **Studio + Advanced Editing**: £155/hour

## Extras Pricing

- **Additional Camera**: £30/hour
- **4K Files**: £15/hour
- **Social Media Snippets**: £100 (one-time)
- **Teleprompter**: £30 (one-time)
- **Remote Guest**: £30 (one-time)

## Next Steps (TODO)

- [ ] Connect webhook to database (Supabase) to store booking data
- [ ] Send confirmation emails to customers
- [ ] Send booking notifications to studio admin
- [ ] Add booking management dashboard
- [ ] Implement refund handling
- [ ] Add subscription-based membership payments

## Troubleshooting

### "No signature provided" error
- Make sure the Stripe webhook secret is correctly set in your environment variables
- Ensure you're running `stripe listen` if testing locally

### Payment redirects to wrong URL
- Check that `NEXT_PUBLIC_BASE_URL` is set correctly in your environment variables

### Can't see payment in Stripe Dashboard
- Make sure you're in Test mode
- Check the Payments section in your Stripe Dashboard

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)

For implementation issues:
- Check the console logs for error messages
- Review the webhook logs in Stripe Dashboard
