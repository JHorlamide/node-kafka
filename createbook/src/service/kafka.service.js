import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

export default producer;