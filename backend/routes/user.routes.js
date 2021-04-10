const express = require('express');

const { authCheck } = require('../middlewares/auth.middleware');
const { userCart, getUserCart } = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/user/cart')
  .post(authCheck, userCart)
  .get(authCheck, getUserCart);

module.exports = router;
