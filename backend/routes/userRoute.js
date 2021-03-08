import express from "express";
import { UserSignin, UserSignUp } from "../controller/useController.js";

const router = express.Router();

router.route("/signup").post(UserSignUp);
router.route("/signin").post(UserSignin);

export default router;
