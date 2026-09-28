import { getNextSevenDays } from "../utils/forecastDates";

const forecastData = [
  {
    condition: "Partly Cloudy",
    high: 32,
    low: 24,
    rain: 20
  },
  {
    condition: "Light Rain",
    high: 30,
    low: 23,
    rain: 55
  },
  {
    condition: "Cloudy",
    high: 29,
    low: 22,
    rain: 40
  },
  {
    condition: "Partly Cloudy",
    high: 31,
    low: 23,
    rain: 25
  },
  {
    condition: "Sunny",
    high: 33,
    low: 24,
    rain: 15
  },
  {
    condition: "Scattered Rain",
    high: 30,
    low: 23,
    rain: 45
  },
  {
    condition: "Partly Cloudy",
    high: 31,
    low: 23,
    rain: 20
  }
];

const days = getNextSevenDays();

const forecast = forecastData.map((weather, index) => ({
  ...weather,
  day: index === 0 ? "Today" : days[index].weekday,
  date: days[index].date
}));

export default forecast;