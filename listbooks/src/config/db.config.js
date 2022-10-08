import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LIST_URL);
    console.log("Mongodb Connected");
  } catch (error) {
    console.error("Mongoose error message: ", error.message);
  }
};

export default connectDB;
