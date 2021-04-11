const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const User = require('../models/user.model');
const Cart = require('../models/cart.model');

exports.createPaymentForUsers = async (req, res) => {
  const { couponApplied } = req.body;

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const cart = await Cart.findOne({
    orderdBy: user._id,
  }).exec();
  // console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);
  const { cartTotal, totalAfterDiscount } = cart;
  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: 'inr',
    description: 'payment for the e-shop',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
