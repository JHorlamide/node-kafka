import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.config.js";
import createBookRoute from "./src/createbook.route.js";

const PORT = process.env.PORT || 6060;
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,,PATCH",
  credentials: true,
}));
app.use(express.json());
app.use(express.json({ extended: false }));
app.use(createBookRoute);

function onError(error) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}

const main = async () => {
  try {
    await connectDB();
    console.log("createBook: connected to database...");
  } catch (error) {
    onError(error);
  }
};

main();

app.listen(PORT, () => {
  console.log(`Createbook service running on port ${PORT}...`);
});
