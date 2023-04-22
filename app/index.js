import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import csv from "csv-parser";
import fs from "fs";

const app = express();
const port = process.env.PORT;

async function parseData(req, res) {
  try {
    const parsedArray = [];
    const sampleData = fs.createReadStream("sample.csv");

    sampleData
      .pipe(csv())
      .on("data", (data) => {
        parsedArray.push(data);
      })
      .on("end", () => {
        res.status(200).json(parsedArray);
      });

    sampleData.on("error", (err) => {
      res.status(404);
    });
  } catch (err) {
    res.status(500);
  }
}

app.get("/", cors(), parseData);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
