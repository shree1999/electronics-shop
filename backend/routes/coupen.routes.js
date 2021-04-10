const express = require('express');

const {
  createCoupon,
  listCoupon,
  removeCoupon,
} = require('../controllers/Coupen.controller');
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authCheck, adminCheck, createCoupon);

router.delete('/:id', authCheck, adminCheck, removeCoupon);

router.get('/', authCheck, listCoupon);

module.exports = router;
