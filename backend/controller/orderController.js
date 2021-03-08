import asyncHandler from "express-async-handler";
import Madicine from "../model/medicine.js";
import Order from "../model/order.js";

//asume that thats the final payment api
//secure by user
//post route
//route

const orderComplete = asyncHandler(async (req, res) => {
  const { medicineId, qty } = req.body;
  //user buy multipleitems by id like [{id:'12',qty:'1'}]
  //asume that this project are available in the plateform
  const medicineDetails = await Madicine.findById(medicineId);

  // medicineDetails.map(async (i, index) => {
  const newOrder = await Order.create({
    user: req.user.id,
    orderItems: [{ qty: qty, medicine: medicineId }],

    shippingAddress: req.body.address || req.user.address,
    paymentMethod: req.body.paymentMethod,
    isPaid: req.body.isPaid,
    isDelivered: req.body.isDelivered,
  });
  const orderComplete = await newOrder.save();

  res.status(200).json({ message: "order payment complete" });
});

//get our  order
//secure by user
//post route
const getOrderByUser = asyncHandler(async (req, res) => {
  const getOrder = await Order.find({ user: req.user.id }).populate("user");
  // .populate({ path: "orderItems", populate: { path: "medicine" } });
  res.json(getOrder);
});

export { orderComplete, getOrderByUser };
