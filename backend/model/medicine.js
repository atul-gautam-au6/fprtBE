import mongo from "mongoose";

const categoryMedicine = new mongo.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  Categorytype: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: mongo.Schema.Types.ObjectId,
    ref: "User",
  },
  qty: {
    type: Number,
    default: 3,
  },
});

const Madicine = mongo.model("medicine", categoryMedicine);
export default Madicine;
