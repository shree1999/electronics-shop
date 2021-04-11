const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: 'Nmae is required',
      minlength: [6, 'Too short'],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

const Coupen = mongoose.model('Coupon', couponSchema);

module.exports = Coupen;
