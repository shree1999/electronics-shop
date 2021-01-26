const express = require('express');

const {
  getAllSubCategories,
  getSingleSubCategory,
  getAllSubs,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require('../controllers/sub.controller');
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').get(getAllSubCategories);

router
  .route('/:slug')
  .get(getSingleSubCategory)
  .delete(authCheck, adminCheck, deleteSubCategory)
  .put(authCheck, adminCheck, updateSubCategory);

// this id represents categories id.
router
  .route('/:id')
  .get(getAllSubs)
  .post(authCheck, adminCheck, createSubCategory);

module.exports = router;
