import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import generateToken from "../utils/generateToken.js";

//user signUp
//post route
//route=> /user/signup
//asume that validate all feilds
const UserSignUp = asyncHandler(async (req, res) => {
  const { name, email, password, contact, isSeller } = req.body;
  const userexist = await User.findOne({ email });
  if (!userexist) {
    const newUser = User.create({
      name,
      email,
      password,
      contact,
      isSeller,
    });

    const userCreate = (await newUser).save();
    if (userCreate) {
      res.json({ message: "user create success" });
    } else {
      res
        .status(500)
        .json({ message: "User Create Failled,some server error" });
    }
  } else {
    res.status(404).json({ Message: "user already there" });
  }
});

//user signIn
//post Route
//route=>/user/signin
//asume that validate all feilds

const UserSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        isSeller: user.isSeller,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ message: "Invalid email and password" });
    }
  } else {
    res.status(404).json({ message: "all feilds are required" });
  }
});

export { UserSignin, UserSignUp };
