const Coupon = require('../models/coupen.model');
const { asyncHandler } = require('../middlewares/async');
// create, remove, list

exports.createCoupon = asyncHandler(async (req, res, next) => {
  const { name, expiry, discount } = req.body.coupon;
  res.json(await new Coupon({ name, expiry, discount }).save());
});

exports.removeCoupon = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.id).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.listCoupon = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
