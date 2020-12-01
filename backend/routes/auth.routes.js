const express = require("express");

const { createOrUpdateUser } = require("../controllers/auth.controllers.js");
const { authCheck } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post("/", authCheck, createOrUpdateUser);

module.exports = router;
