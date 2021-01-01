const express = require("express");

const {
  getAllSubCategories,
  getSingleSubCategory,
  getAllSubs,
  createSubCategory,
  deleteSubCategory,
} = require("../controllers/sub.controller");
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/").get(getAllSubCategories);

router
  .route("/:slug")
  .get(getSingleSubCategory)
  .delete(authCheck, adminCheck, deleteSubCategory);

// this id represents categories id.
router
  .route("/:id")
  .get(getAllSubs)
  .post(authCheck, adminCheck, createSubCategory);

module.exports = router;
