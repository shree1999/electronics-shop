const express = require("express");

const {
  createOrUpdateUser,
  getCurrentUser,
} = require("../controllers/auth.controllers.js");
const { authCheck } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/", authCheck, createOrUpdateUser);
router.post("/me", authCheck, getCurrentUser);

module.exports = router;
