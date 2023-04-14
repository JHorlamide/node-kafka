import express from "express";
import Books from "./model.js";
import producer from "./service/kafka.service.js";

const router = express.Router();

router.post("/api/books", async (req, res) => {
  const payloads = [
    {
      topic: "test_topic",
      partition: 0,
      messages: JSON.stringify(req.body),
    },
  ];

  producer.send(payloads, async (error, data) => {
    if (error) {
      return console.log(error);
    }

    const book = new Books({ ...req.body });
    await book.save();

    res.status(201).json({ status: true, data: book });
  });
});

export default router;
