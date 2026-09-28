export function getWeatherIcon(condition) {
  const value = condition.toLowerCase();

  if (value.includes("thunder")) {
    return "⛈️";
  }

  if (value.includes("heavy rain")) {
    return "🌧️";
  }

  if (value.includes("rain")) {
    return "🌦️";
  }

  if (value.includes("cloud")) {
    return "☁️";
  }

  if (value.includes("fog") || value.includes("mist")) {
    return "🌫️";
  }

  if (value.includes("snow")) {
    return "❄️";
  }

  if (value.includes("storm")) {
    return "🌩️";
  }

  if (value.includes("clear") || value.includes("sunny")) {
    return "☀️";
  }

  return "🌤️";
}