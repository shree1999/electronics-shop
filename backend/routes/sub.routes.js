const express = require("express");

const {
  getAllSubCategories,
  getSingleSubCategory,
  getAllSubs,
  createSubCategory,
} = require("../controllers/sub.controller");
const { authCheck, adminCheck } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/").get(getAllSubCategories);

router.route("/:slug").get(getSingleSubCategory);

// this id represents categories id.
router
  .route("/:id")
  .get(getAllSubs)
  .post(authCheck, adminCheck, createSubCategory);

module.exports = router;
