import express from "express";
import SensorData from "../models/SensorData.js";

const sensorRoutes = express.Router();

sensorRoutes.get("/", async (req, res) => {
  try {
    const data = await SensorData.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

sensorRoutes.get("/:id", async (req, res) => {
  try {
    const data = await SensorData.findById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

sensorRoutes.post("/", async (req, res) => {
  try {
    const data = req.body;
    const sensorData = new SensorData({
      sensorType: data.sensorType,
      metric: data.metric,
      value: data.value,
    });
    const dataSaved = await sensorData.save();
    console.log(dataSaved);
    res.status(200).send(dataSaved);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

sensorRoutes.post("/add-all", async (req, res) => {
  try {
    const dataList = req.body;
    const sensorList = [];
    dataList.forEach((data) => {
      const sensorData = new SensorData({
        sensorType: data.sensorType,
        metric: data.metric,
        value: data.value,
      });
      sensorList.push(sensorData);
    });
    const dataSaved = await SensorData.insertMany(sensorList);
    console.log(dataSaved);
    res.status(200).send(dataSaved);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

sensorRoutes.delete("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    await SensorData.deleteMany({ id: id });
    res.status(200).send("Delete successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

sensorRoutes.delete("/delete", async (req, res) => {
  try {
    await SensorData.deleteMany({});
    res.status(200).send("Delete successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
});

export default sensorRoutes;
