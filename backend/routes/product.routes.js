const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createProduct);

router.route('/:limit').get(getAllProducts);
router
  .route('/:slug')
  .delete(authCheck, adminCheck, deleteProduct)
  .get(getSingleProduct)
  .put(authCheck, adminCheck, updateProduct);
module.exports = router;
