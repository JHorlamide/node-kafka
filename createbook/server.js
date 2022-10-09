import express from "express";
import kafka from "kafka-node";

import connectDB from "./src/config/db.config.js";
import Books from "./src/model.js";

const PORT = process.env.PORT || 3000;
const kafkaTopic = process.env.KAFKA_TOPIC;
const kafkaHost = process.env.KAFKA_BOOTSTRAP_SERVERS;

const app = express();
app.use(express.json({ extended: false }));

const dbsAreRunning = async () => {
  connectDB();
  const client = new kafka.KafkaClient({ kafkaHost: kafkaHost });
  const producer = new kafka.Producer(client);

  app.post("/api/books", async (req, res) => {
    producer.on("read", async () => {
      producer.send(
        [{ topic: kafkaTopic, messages: JSON.stringify(req.body) }],
        async (error, data) => {
          if (error) {
            return console.log(error);
          }

          const book = await new Books({ ...req.body });
          await book.save();
          res.status(201).send(book);
          console.log(data);
        }
      );
    });
  });
};

setTimeout(dbsAreRunning, 10000);

app.listen(PORT, () => {
  console.log(`create book server running on port ${PORT}...`);
});
