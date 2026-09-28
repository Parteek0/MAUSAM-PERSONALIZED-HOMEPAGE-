function getWindDirection(degrees) {
  if (
    degrees === null ||
    degrees === undefined ||
    degrees === ""
  ) {
    return "Unknown";
  }

  const value = Number(degrees);

  if (Number.isNaN(value)) {
    return "Unknown";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW"
  ];

  const index =
    Math.round(value / 45) % 8;

  return directions[index];
}

function getRainChance(rainfall) {
  const rain = Number(rainfall);

  if (Number.isNaN(rain)) {
    return null;
  }

  if (rain > 0) {
    return 70;
  }

  return 10;
}

function getAirQuality() {
  return {
    value: null,
    status:
      "Unavailable from current IMD endpoint"
  };
}

export function normalizeIMDWeather(data) {
  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return null;
  }

  const station = data[0];

  const temperature =
    Number(station.Temperature);

  const feelsLike =
    Number(station["Feel Like"]);

  const humidity =
    Number(station.Humidity);

  const windSpeed =
    Number(station["Wind Speed KMPH"]);

  const windDirection =
    getWindDirection(
      station["Wind Direction"]
    );

  const rainfall =
    Number(
      station["Last 24 hrs Rainfall"]
    );

  return {
    location:
      station.Station ||
      "Unknown",

    country: "India",

    station: {
      id: station["Station Id"],
      name: station.Station
    },

    observation: {
      date:
        station["Date of Observation"],
      time: station.Time
    },

    current: {
      temperature,
      feelsLike,

      condition:
        station.WEATHER_MESSAGE ||
        "Unknown",

      weatherCode:
        station["Weather Code"],

      icon:
        station.WEATHER_ICON,

      background:
        station.BACKGROUND,

      backgroundUrl:
        station.BACKGROUND_URL
    },

    atmosphere: {
      humidity,

      rainChance:
        getRainChance(rainfall),

      rainfall24h:
        rainfall,

      windSpeed,

      windDirection,

      pressure:
        Number(
          station[
            "Mean Sea Level Pressure"
          ]
        ),

      nebulosity:
        Number(station.Nebulosity)
    },

    sun: {
      sunrise: station.Sunrise,
      sunset: station.Sunset,
      moonrise: station.Moonrise,
      moonset: station.Moonset
    },

    airQuality:
      getAirQuality(),

    source: "IMD",
    isLive: true
  };
}