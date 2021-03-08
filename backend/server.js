import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();

//routes
import userRoute from "./routes/userRoute.js";
import medicineRoute from "./routes/medicineRoute.js";
import orderRoute from "./routes/orderRoute.js";

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/user", userRoute);
app.use("/medicine", medicineRoute);
app.use("/order", orderRoute);

app.use("/", (req, res) => {
  res.send("Api run success...");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`server started in ${process.env.NODE_ENV} on port ${PORT}`);
});
