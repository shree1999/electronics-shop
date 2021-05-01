const express = require('express');

const { authCheck } = require('../middlewares/auth.middleware');
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  wishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/user.controller');

const router = express.Router();

// /api/users

router
  .route('/user/cart')
  .post(authCheck, userCart)
  .get(authCheck, getUserCart)
  .delete(authCheck, emptyCart);

router.route('/user/order').post(authCheck, createOrder).get(authCheck, orders);
router
  .route('/wishlist')
  .post(authCheck, addToWishlist)
  .get(authCheck, wishlist);

router.post('/wishlist/:productId', authCheck, removeFromWishlist);

router.post('/address', authCheck, saveAddress);

router.post('/apply/coupon', authCheck, applyCouponToUserCart);

module.exports = router;
