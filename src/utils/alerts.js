export function getWeatherAlerts(weather) {
  const alerts = [];

  const {
    temperature,
    rainChance,
    windSpeed,
    uvIndex
  } = weather;

  if (temperature >= 40) {
    alerts.push({
      level: "danger",
      icon: "🌡️",
      title: "Extreme Heat",
      message:
        "Very high temperatures are expected. Avoid prolonged outdoor activity and stay hydrated."
    });
  } else if (temperature >= 35) {
    alerts.push({
      level: "warning",
      icon: "🔥",
      title: "High Temperature",
      message:
        "Temperatures are high. Consider planning outdoor activities during cooler hours."
    });
  }

  if (rainChance >= 70) {
    alerts.push({
      level: "danger",
      icon: "🌧️",
      title: "High Rain Probability",
      message:
        "Rain is likely. Consider adjusting outdoor plans."
    });
  } else if (rainChance >= 50) {
    alerts.push({
      level: "warning",
      icon: "🌦️",
      title: "Possible Rain",
      message:
        "There is a significant chance of rain today."
    });
  }

  if (windSpeed >= 40) {
    alerts.push({
      level: "danger",
      icon: "💨",
      title: "Strong Winds",
      message:
        "Strong winds may affect outdoor activities."
    });
  } else if (windSpeed >= 25) {
    alerts.push({
      level: "warning",
      icon: "🌬️",
      title: "Elevated Wind",
      message:
        "Wind speeds may make some outdoor activities uncomfortable."
    });
  }

  if (uvIndex >= 8) {
    alerts.push({
      level: "danger",
      icon: "☀️",
      title: "Very High UV",
      message:
        "UV levels are high. Consider limiting prolonged direct sun exposure."
    });
  } else if (uvIndex >= 6) {
    alerts.push({
      level: "warning",
      icon: "🌞",
      title: "High UV",
      message:
        "UV levels are elevated during stronger sunlight hours."
    });
  }

  return alerts;
}