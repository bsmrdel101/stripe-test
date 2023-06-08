const stripe = require('stripe')('sk_test_51L7k42Cg8QC3STLgQqGRDSRhFybKCGDDBMB3GVnpvTTP1OiPUfZBQlVLjIpFKFRoGzMY08h3QfsVFsaq9ZsGapnH00TBoMCk5L');
const express = require('express');
const app = express();
app.use(express.static('public'));
require('dotenv').config();

const CLIENT_DOMAIN = 'http://localhost:3001';


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


app.listen(4242, () => console.log('Running on port 4242'));
