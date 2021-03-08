import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";

const UserProtected = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id);

      next();
    } catch (error) {
      return res.json({ message: "token invalid" });
    }
  } else {
    return res.json({ message: "token invalid" });
  }
});

const SellerProtected = (req, res, next) => {
  // console.log(req.user && req.user.isSeller === "true");
  if (req.user && req.user.isSeller === "true") {
    next();
  } else {
    return res.send({ message: "not autorized seller account" });
  }
};

export { UserProtected, SellerProtected };
