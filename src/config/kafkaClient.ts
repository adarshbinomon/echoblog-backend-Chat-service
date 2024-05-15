import { Kafka, logLevel } from "kafkajs";

export const kafka =new Kafka({
    clientId:"user",
    brokers:['localhost:9092'],
    logLevel: logLevel.ERROR

})