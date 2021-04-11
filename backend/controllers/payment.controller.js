const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentForUsers = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'inr',
    description: 'payment for the e-shop',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
