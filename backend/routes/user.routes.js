const express = require('express');

const { authCheck } = require('../middlewares/auth.middleware');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
} = require('../controllers/user.controller');

const router = express.Router();

// /api/users

router
  .route('/user/cart')
  .post(authCheck, userCart)
  .get(authCheck, getUserCart)
  .delete(authCheck, emptyCart);

router.post('/user/order', authCheck, createOrder);

router.post('/address', authCheck, saveAddress);

router.post('/apply/coupon', authCheck, applyCouponToUserCart);

module.exports = router;
