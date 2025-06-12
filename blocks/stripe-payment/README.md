# Stripe Payment Drop-in

A Stripe payment integration for Adobe EDS storefronts that automatically handles payment processing in checkout flows.

## Installation and usage

### 1. Add the drop-in to your EDS storefront

Copy the `stripe-payment` folder to your EDS project's `blocks/` directory.

### 2. Import the drop-in in your checkout block:

A boilerplate EDS storefront uses the `commerce-checkout` drop-in which is located under
`blocks/commerce-checkout/commerce-checkout.js`. If you are using this drop-in at your
storefront, you will need to extend it so that the Stripe drop-in is integrated into
the checkout.

First, import the Stripe drop-in:

```javascript
import {
  renderStripePaymentMethod,
  handleStripePayment,
  validateStripePayment,
} from '../stripe-payment/stripe-payment.js';
```

Next, find the payment methods renderer and add a slot for the `oope_stripe` payment method code:

```javascript
CheckoutProvider.render(PaymentMethods, {
  slots: {
    Methods: {
      oope_stripe: {
        render: renderStripePaymentMethod,
      },
    },
  },
})
```

Finally, extend your `handlePlaceOrder` method to call the Stripe drop-in methods:

```javascript
CheckoutProvider.render(PlaceOrder, {
  handlePlaceOrder: async ({ cartId, code }) => {
    if (code === 'oope_stripe') {
      if (!validateStripePayment()) { return; }
      await handleStripePayment(cartId);
    }
    await orderApi.placeOrder(cartId);
  },
})
```

## Styling

Customize the appearance by modifying `blocks/stripe-payment/stripe-payment.css`.