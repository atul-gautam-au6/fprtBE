import asyncHandler from "express-async-handler";
import Madicine from "../model/medicine.js";
import User from "../model/User.js";

//get all medicine
//get route
//route => /medicine/allmedicine
const getAllmedicine = asyncHandler(async (req, res) => {
  const getMedicine = await Madicine.find().populate("user");
  res.status(200).json(getMedicine);
});

//add new madicine
//post route
//secure by seller account
//route=>/medicine/addMadicine
//asume that validate all feilds
const AddnewMadicine = asyncHandler(async (req, res) => {
  const { name, price, Categorytype, image, qty } = req.body;
  const newmedicine = await Madicine.create({
    name,
    price,
    Categorytype,
    image,
    qty,
    user: req.user,
  });
  // console.log(userupdate);
  const medCreate = (await newmedicine).save();
  if (medCreate) {
    res.status(201).json({ message: "medicine create succes check the list" });
  } else {
    res.status(404);
  }
});

//update medicine
//put route
//secure by seller
//route /medicine/updateMedicine
//asume that validate all feilds
const updateMedicine = asyncHandler(async (req, res) => {
  const { id, name, price, Categorytype, image, qty } = req.body;
  if (id) {
    const medicine = await Madicine.findOne({
      $and: [{ _id: id }, { user: req.user.id }],
    });
    if (medicine) {
      medicine.name = name || medicine.name;
      medicine.price = price || medicine.price;
      medicine.Categorytype = Categorytype || medicine.Categorytype;
      medicine.image = image || medicine.image;
      medicine.qty = qty || medicine.qty;
      await medicine.save();
      return res
        .status(200)
        .json({ message: "medicine update success got to list" });
    } else {
      res
        .status(404)
        .json({ message: "medicine not found or this is not your medicine" });
    }
  } else {
    res.status(202).json("something error||");
  }
});

//purches medician
//secure by user
//post route
//route

const addPurches = asyncHandler(async (req, res) => {
  const userDetails = await User.findById(req.user._id);
  if (userDetails) {
  } else {
    res.status(404).json({ message: "user Not found" });
  }
});

export { updateMedicine, AddnewMadicine, getAllmedicine };
