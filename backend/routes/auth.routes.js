const express = require("express");

const {
  createOrUpdateUser,
  getCurrentUser,
} = require("../controllers/auth.controllers.js");
const { authCheck, adminCheck } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/", authCheck, createOrUpdateUser);
router.post("/me", authCheck, getCurrentUser);
router.post("/me/admin", [authCheck, adminCheck], getCurrentUser);

module.exports = router;
