import express from "express";
import kafka from "kafka-node";

import connectDB from "./src/config/db.config.js";
import Books from "./src/model.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json({ extended: false }));

const dbsAreRunning = async () => {
  connectDB();
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const producer = new kafka.Producer(client);

  app.post("/api/books", async (req, res) => {
    const payloads = [
      { topic: "test_topic", messages: JSON.stringify(req.body) },
    ];

    producer.send(payloads, async (error, data) => {
      if (error) {
        return console.log(error);
      }

      console.log(data);
      const book = await new Books({ ...req.body });
      await book.save();
      res.status(201).send({ status: true, data: book });
    });
  });
};

setTimeout(dbsAreRunning, 10000);

app.listen(PORT, () => {
  console.log(`Createbook service running on port ${PORT}...`);
});
