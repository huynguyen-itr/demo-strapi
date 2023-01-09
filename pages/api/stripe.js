import Stripe from 'stripe';
import { useStateContext } from '../../lib/context';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      // res.setHeader('Allow', 'POST');
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId } = req.headers;
    const { cartItems, orderId } = req.body;

    const lineItems = cartItems.map((item) => {
      return {
        // price_data: {
        //   currency: 'usd',
        //   product_data: {
        //     name: item.name,
        //     images: [item.image.data.attributes.formats.thumbnail.url],
        //   },
        //   unit_amount: item.price * 100,
        // },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        price: 'price_1MBZxgHl9MNLIyLWs7oub0GE',
        quantity: item.quantity, 
      }
    });

    const paymentInfo = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: lineItems,
      allow_promotion_codes: true,
      // discounts: [{
      //   coupon: 'promo_1MBa1pHl9MNLIyLWiz9FeKWt',
      // }],
      success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/canceled`,
      payment_intent_data: {
        metadata: { orderId }
      }
    }

    if (userId) {
      paymentInfo.customer = userId;
    }

    const paymentSession = await stripe.checkout.sessions.create(paymentInfo);
    res.status(200).json(paymentSession);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
}
