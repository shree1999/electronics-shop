const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const {
  createCategory,
  readCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
  getAllSubsOfCategory,
} = require('../controllers/category.controller');

const router = express.Router();

router
  .route('/')
  .post(authCheck, adminCheck, createCategory)
  .get(getAllCategories);

router
  .route('/:slug')
  .get(readCategory)
  .put(authCheck, adminCheck, updateCategory)
  .delete(authCheck, adminCheck, removeCategory);

router.route('/subs/:id').get(getAllSubsOfCategory);

module.exports = router;
