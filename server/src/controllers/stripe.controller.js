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

    router.post('/webhook', (req, res) => {
      const event = req.body;
      if (event.type === 'payment_intent.succeeded') {
        fulfillOrder(event.data.object.line_items);
      } else {
        res.status(500);
      }
      res.status(200).end();
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const fulfillOrder = async (lineItems) => {
  console.log(lineItems);
};


export default router;
