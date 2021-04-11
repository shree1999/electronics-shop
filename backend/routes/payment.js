const express = require('express');

const { createPaymentForUsers } = require('../controllers/payment.controller');
const { authCheck } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/make-payment', authCheck, createPaymentForUsers);

module.exports = router;
