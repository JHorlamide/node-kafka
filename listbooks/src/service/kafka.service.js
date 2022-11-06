import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const clientConfig = [{ topic: "test_topic", partition: 0 }];
const commitConfig = { autoCommit: false };

const consumer = new kafka.Consumer(client, clientConfig, commitConfig);


export default consumer;