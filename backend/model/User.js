import mongo from "mongoose";
import bcrypt from "bcryptjs";

const buyerSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isSeller: {
      type: String,
      default: false,
    },
    purchesMedician: [{ type: mongo.Schema.Types.ObjectId, ref: "Madicine" }],
  },
  { timestamps: true }
);

buyerSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
buyerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongo.model("User", buyerSchema);
export default User;
