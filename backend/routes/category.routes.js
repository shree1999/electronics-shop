const express = require("express");

const { authCheck, adminCheck } = require("../middlewares/auth.middleware");
const {
  createCategory,
  readCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
} = require("../controllers/category.controller");

const router = express.Router();

router
  .route("/")
  .post(authCheck, adminCheck, createCategory)
  .get(authCheck, adminCheck, getAllCategories);

router
  .route("/:slug")
  .get(authCheck, adminCheck, readCategory)
  .put(authCheck, adminCheck, updateCategory)
  .delete(authCheck, adminCheck, removeCategory);

module.exports = router;
