const Order = require('../models/order.model');

//orders, orderStatus

exports.orders = async (req, res) => {
  let orders = await Order.find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec();

  res.send(orders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.send(updated);
};
