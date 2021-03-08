import mogoose from "mongoose";
import color from "colors";

const connectDB = async () => {
  try {
    const DB = process.env.MONGO_URI;
    const conn = await mogoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
