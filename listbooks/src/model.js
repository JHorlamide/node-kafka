import mongoose from "mongoose";

const bookListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    authName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookListSchema);

export default Books