const stripe = require('stripe')('sk_test_51L7k42Cg8QC3STLgQqGRDSRhFybKCGDDBMB3GVnpvTTP1OiPUfZBQlVLjIpFKFRoGzMY08h3QfsVFsaq9ZsGapnH00TBoMCk5L');
const express = require('express');
const app = express();
app.use(express.static('public'));
require('dotenv').config();
const bodyParser = require('body-parser');

const endpointSecret = 'whsec_b613bd7f61f940dcdbac2c390255e8cdf3a47d33051e103223bfa39a0d55ccf3';
const CLIENT_DOMAIN = 'http://localhost:3001';


const fulfillOrder = (lineItems) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
}

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NGipHCg8QC3STLg9O6GVyNN',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${CLIENT_DOMAIN}/success`,
    cancel_url: `${CLIENT_DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;

    // Fulfill the purchase...
    fulfillOrder(lineItems);
  }

  response.status(200).end();
});


app.listen(4242, () => console.log('Running on port 4242'));
