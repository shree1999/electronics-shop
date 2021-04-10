const Coupon = require('../models/coupen.model');

// create, remove, list

exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
  }
};

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
