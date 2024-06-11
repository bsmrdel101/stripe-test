import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { default as Stripe } from 'stripe';
const DOMAIN = 'http://localhost:3001';
const stripe = new Stripe(process.env.STRIPE_KEY);


const router = express.Router();
router.use(express.json());

/**
 * @base_path /api/stripe
*/

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: products || [],
      mode: 'payment',
      billing_address_collection: 'auto',
      success_url: `${DOMAIN}/`,
      cancel_url: `${DOMAIN}/`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.json({type: 'application/json'}), async (req, res) => {
  const event = req.body;
  console.log('YAY!!!:', event.type);

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const sessionWithLineItems = paymentIntent.expand = ['line_items'];
      // const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      //   event.data.object.id,
      //   {
      //     expand: ['line_items'],
      //   }
      // );
      const lineItems = sessionWithLineItems.line_items;
      fulfillOrder(lineItems);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.status(200).end();
});

const fulfillOrder = async (lineItems) => {
  console.log(lineItems);
};


export default router;
