import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://root:1234@database:27017/");
  } catch (error) {
    console.error("Mongoose error message: ", error.message);
  }
};

export default connectDB;
