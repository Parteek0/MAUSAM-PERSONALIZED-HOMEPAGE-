import express from "express";
import cors from "cors";

import {
  getIMDWeather,
  getIMDForecast,
  getIMDCityMapping
} from "./imdService.js";

import { normalizeIMDWeather } from "./weatherNormalizer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Mausam backend is working"
  });
});

app.get("/api/weather", async (req, res) => {
  try {
    const weather =
      await getIMDWeather(
        req.query.stationId
      );

    const normalizedWeather =
      normalizeIMDWeather(weather.raw);

    res.json({
      success: true,
      ...normalizedWeather
    });

  } catch (error) {
    console.error(
      "Weather API error:",
      error
    );

    res.status(500).json({
      success: false,
      source: "IMD",
      isLive: false,
      message: error.message
    });
  }
});

app.get("/api/forecast", async (req, res) => {
  try {
    const forecast =
      await getIMDForecast(
        req.query.stationId
      );

    res.json({
      success: true,
      source: "IMD",
      isLive: true,
      raw: forecast.raw
    });

  } catch (error) {
    console.error(
      "Forecast API error:",
      error
    );

    res.status(500).json({
      success: false,
      source: "IMD",
      isLive: false,
      message: error.message
    });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const mapping =
      await getIMDCityMapping();

    res.json(mapping);

  } catch (error) {
    console.error(
      "Location mapping error:",
      error
    );

    res.status(500).json({
      success: false,
      source: "IMD",
      isLive: false,
      message: error.message
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Mausam server running on http://localhost:${PORT}`
  );
});