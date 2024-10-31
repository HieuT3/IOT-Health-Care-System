import express from "express";
import Measurement from "../models/Measurement.js";

const measurementRoutes = express.Router();

measurementRoutes.get("/", async (req, res) => {
  try {
    const data = await Measurement.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

measurementRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Measurement.findById(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

measurementRoutes.post("/", async (req, res) => {
  try {
    const dataList = req.body;
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
    res.status(200).send(measurement);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

measurementRoutes.delete("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    await Measurement.deleteMany({ id: id });
    res.status(200).send("Delete Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

measurementRoutes.delete("/delete", async (req, res) => {
  try {
    await Measurement.deleteMany({});
    res.status(200).send("Delete Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

export default measurementRoutes;
