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

router.post('/checkout', async (req, res) => {
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
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('YAY!!!:', event.type);
      console.log(event.data.object.id);
      const sessionId = event.data.object.id;
      stripe.checkout.sessions.retrieve(
        sessionId,
        { expand: ['line_items'] }
      ).then(function(session) {
        console.log('ITEMS: ', session.line_items);
        fulfillOrder(session.line_items.data);
      }).catch(function(error) {
        console.log(error);
      });
      break;
    default:
      break;
  }
  res.status(200).end();
});

const fulfillOrder = async (lineItems) => {
  console.log(lineItems);
};


export default router;
