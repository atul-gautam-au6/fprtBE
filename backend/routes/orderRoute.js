import express from "express";
import {
  getOrderByUser,
  orderComplete,
} from "../controller/orderController.js";
import { UserProtected } from "../middleware/Auth.js";

const router = express.Router();

router.route("/newOrder").post(UserProtected, orderComplete);
router.route("/orderget").get(UserProtected, getOrderByUser);

export default router;
