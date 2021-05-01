const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

const { orders, orderStatus } = require('../controllers/admin.controller');

const router = express.Router();
// routes
router.get('/orders', authCheck, adminCheck, orders);
router.put('/order-status', authCheck, adminCheck, orderStatus);

module.exports = router;
