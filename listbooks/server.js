import express from "express";
import kafka from "kafka-node";

import connectDB from "./src/config/db.config.js";
import Books from "./src/model.js";

const PORT = process.env.PORT || 3000;
const kafkaTopic = process.env.KAFKA_TOPIC;
const kafkaHost = process.env.KAFKA_BOOTSTRAP_SERVERS;
const app = express();
app.use(express.json());

const dbsAreRunning = async () => {
  connectDB();
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHost });

  const consumer = new kafka.Consumer(client, [{ topic: kafkaTopic }], {
    autoCommit: false,
  });

  consumer.on("message", async () => {
    const books = new Books(JSON.parse(message.value));
    await books.save();
  });

  consumer.on("error", async (error) => {
    console.log(error);
  });
};

setTimeout(() => dbsAreRunning, 10000);

app.listen(PORT, () => {
  console.log(`list book server running on port ${PORT}...`);
});
