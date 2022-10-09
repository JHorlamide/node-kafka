import express from "express";
import Books from "./model";

const router = express.Router();

router.post("/books", async (req, res) => {
  const book = await new Books({ ...req.body });
  await book.save();
  res.status(201).send(book);
});

export default router;
