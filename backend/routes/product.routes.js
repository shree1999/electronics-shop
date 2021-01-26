const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const { createProduct } = require('../controllers/product.controller');

const router = express.Router();

router.route('/').post(authCheck, adminCheck, createProduct);

module.exports = router;
