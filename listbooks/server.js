import express from "express";
import kafka from "kafka-node";

import connectDB from "./src/config/db.config.js";
import Books from "./src/model.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const dbsAreRunning = async () => {
  connectDB();
  const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
  const clientConfig = [{ topic: "test_topic", partition: 0 }];

  const consumer = new kafka.Consumer(client, clientConfig, {
    autoCommit: false,
  });

  app.get("/api/books", (req, res) => {
    consumer.on("message", async (message) => {
      console.log("Consumer message: ", message);

      const books = new Books(JSON.parse(message.value));
      await books.save();

      res.status(200).send({ status: true, data: books });
    });
  });

  consumer.on("error", async (error) => {
    console.log(error);
  });
};

setTimeout(dbsAreRunning, 10000);

app.listen(PORT, () => {
  console.log(`Listbook service running on port ${PORT}...`);
});
