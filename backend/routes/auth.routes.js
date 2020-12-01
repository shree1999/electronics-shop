import express from "express";

import { getUserAuth } from "../controllers/auth.controllers.js";
const router = express.Router();

router.route("/").get(getUserAuth);

export default router;
