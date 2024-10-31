import mqtt from "mqtt";
import dotenv from "dotenv";
import SensorData from "./models/SensorData.js";
import Measurement from "./models/Measurement.js";

dotenv.config();

const options = {
  host: "2c41ea6628d949ec81f1c888f8ab3d76.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: process.env.USERNAME_HIVEMQ,
  password: process.env.PASSWORD_HIVEMQ,
};

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("Connect HiveMQ Cloud successfully!");
  client.subscribe("sensor-data");
});

client.on("error", (error) => {
  console.log(error);
});

client.on("message", async (topic, message) => {
  try {
    const dataList = JSON.parse(message.toString());
    const sensorListId = [];
    for (const data of dataList) {
      const sensorData = new SensorData({
        sensorType: data.sensorType,
        metric: data.metric,
        value: data.value.toString(),
      });
      await sensorData.save();
      sensorListId.push(sensorData.id);
    }
    const measurement = new Measurement({
      sensors: sensorListId,
    });
    await measurement.save();
    console.log(measurement);
  } catch (error) {
    console.log(error);
  }
});

export default client;
