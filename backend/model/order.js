import mongo from "mongoose";

const OrderSchema = new mongo.Schema(
  {
    user: {
      type: mongo.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        qty: {
          type: Number,
          default: 1,
        },
        medicine: {
          type: mongo.Schema.Types.ObjectId,
          ref: "Madicine",
        },
      },
    ],
    shippingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
      default: "PayTm",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongo.model("Order", OrderSchema);
export default Order;
