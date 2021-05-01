const User = require('../models/user.model');
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const Coupon = require('../models/coupen.model');
const Order = require('../models/order.model');

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select('price').exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log('new cart', newCart);
  res.send({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();

  if (!cart) {
    return res.status(400).send({ error: 'No products in cart present' });
  }

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.send({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log('empty cart');
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.send(cart);
};

exports.saveAddress = async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log('COUPON', coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.status(400).send({
      error: 'Invalid coupon',
    });
  }

  if (validCoupon.expiry < new Date()) {
    return res.status(400).send({ error: 'The coupon has expired' });
  }

  console.log('VALID COUPON', validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id title price')
    .exec();

  console.log('cartTotal', cartTotal, 'discount%', validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  await Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.send({ totalAfterDiscount });
};

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderdBy: user._id,
    }).save();

    // decrementing products item count
    const bulkProductsUpdate = products.map(item => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, total_sold: +item.count } },
        },
      };
    });

    const updateProducts = await Product.bulkWrite(bulkProductsUpdate, {});

    console.log('NEW ORDER SAVED', newOrder);
    console.log('products update: ', updateProducts);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate('products.product')
    .exec();

  res.send(userOrders);
};
