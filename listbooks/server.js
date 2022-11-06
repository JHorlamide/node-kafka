import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.config.js";
import Books from "./src/model.js";
import bookRoute from "./src/books.route.js";
import consumer from "./src/service/kafka.service.js";

const PORT = process.env.PORT || 2000;
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,,PATCH",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bookRoute);

function onError(error) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}

async function main() {
  try {
    await connectDB();
    console.log("listBook: connected to database...");
  } catch (error) {
    onError(error);
  }

  consumer.on("message", async (message) => {
    console.log("Consumer message: ", message.value);

    const books = new Books(JSON.parse(message.value));
    await books.save();
  });

  consumer.on("error", async (error) => {
    console.log(error);
  });
}

main();

app.listen(PORT, () => {
  console.log(`Listbook service running on port ${PORT}...`);
});

// const dbsAreRunning = async () => {
//   connectDB();

//   const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
//   const clientConfig = [{ topic: "test_topic" }];
//   const commitConfig = { autoCommit: false };

//   const consumer = new kafka.Consumer(client, clientConfig, commitConfig);

//   consumer.on("message", async (message) => {
//     console.log("Consumer message: ", message);

//     const books = new Books(JSON.parse(message.value));
//     await books.save();
//   });

//   consumer.on("error", async (error) => {
//     console.log(error);
//   });
// };

// setTimeout(dbsAreRunning, 10000);
