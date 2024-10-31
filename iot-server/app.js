import express from "express";
import mongoose from "mongoose";
import sensorRoutes from "./routes/sensorRoutes.js";
import dotenv from "dotenv";
import client from "./mqttClient.js";
import measurementRoutes from "./routes/measurementRoutes.js";

dotenv.config();

const uriStr = process.env.CONNECTION_STRING;
const port = 3000;

const app = express();

mongoose
  .connect(uriStr)
  .then(() => console.log("Connect MongoDB Successfully!"))
  .catch((error) => console.error("Connect Error:", error));

app.use(express.json());

app.use("/api/sensor", sensorRoutes);
app.use("/api/measurement", measurementRoutes);

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
