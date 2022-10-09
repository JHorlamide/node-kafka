import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CREATE_URL);
    console.log("Mongodb connected");
  } catch (error) {
    console.error("Mongoose error message: ", error.message);
  }
};

export default connectDB;
