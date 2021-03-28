const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
  listProducts,
  productsCount,
  productStarRating,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createProduct).get(productsCount);

router.route('/:limit').get(getAllProducts);

router.get('/single/:slug', getSingleProduct);

router
  .route('/:slug')
  .delete(authCheck, adminCheck, deleteProduct)
  .put(authCheck, adminCheck, updateProduct);

router.route('/all').post(listProducts);

router.put('/rating/:id', authCheck, productStarRating);

module.exports = router;
