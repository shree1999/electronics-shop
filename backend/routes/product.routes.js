const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const {
  createProduct,
  getAllProducts,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createProduct);

router.route('/:limit').get(getAllProducts);

module.exports = router;
