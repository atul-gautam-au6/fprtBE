import express from "express";
import {
  AddnewMadicine,
  getAllmedicine,
  updateMedicine,
} from "../controller/mediController.js";
import { SellerProtected, UserProtected } from "../middleware/Auth.js";

const router = express.Router();

router.route("/allmedicine").get(getAllmedicine);
router
  .route("/addMadicine")
  .post(UserProtected, SellerProtected, AddnewMadicine);
router
  .route("/updateMedicine")
  .post(UserProtected, SellerProtected, updateMedicine);

export default router;
