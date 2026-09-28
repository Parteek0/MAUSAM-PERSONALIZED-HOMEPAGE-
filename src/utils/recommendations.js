export function getRecommendations(
  interests,
  weather
) {
  const recommendations = [];

  const {
    temperature,
    rainChance,
    windSpeed,
    uvIndex
  } = weather;

  const hotWeather = temperature > 32;
  const highUV = uvIndex >= 7;
  const heavyRain = rainChance >= 60;
  const strongWind = windSpeed >= 30;

  if (interests.includes("Running")) {
    if (heavyRain) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "🏃",
        title: "Outdoor Run",
        time: "Rain is likely — consider an indoor workout"
      });
    } else if (
      hotWeather ||
      highUV
    ) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "🏃",
        title: "Evening Run",
        time: "Prefer cooler hours"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "🏃",
        title: "Morning Run",
        time: "7:00 AM – 8:00 AM"
      });
    }
  }

  if (interests.includes("Walking")) {
    if (heavyRain) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "🚶",
        title: "Outdoor Walk",
        time: "Rain is likely"
      });
    } else if (
      hotWeather ||
      highUV
    ) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "🚶",
        title: "Evening Walk",
        time: "6:00 PM – 7:30 PM"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "🚶",
        title: "Outdoor Walk",
        time: "Morning or evening"
      });
    }
  }

  if (interests.includes("Photography")) {
    if (heavyRain) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "📸",
        title: "Indoor Photography",
        time: "Outdoor photography may be affected by rain"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "📸",
        title: "Sunset Photography",
        time: "5:30 PM – 6:30 PM"
      });
    }
  }

  if (interests.includes("Travel")) {
    if (heavyRain || strongWind) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "✈️",
        title: "Outdoor Travel",
        time: "Check rain and wind conditions before travelling"
      });
    } else {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "✈️",
        title: "Outdoor Trip",
        time: "Weather conditions look manageable"
      });
    }
  }

  if (interests.includes("Cycling")) {
    if (
      rainChance >= 50 ||
      windSpeed >= 30
    ) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "🚴",
        title: "Cycling",
        time: "Wind or rain may make cycling uncomfortable"
      });
    } else if (
      hotWeather ||
      highUV
    ) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "🚴",
        title: "Cycling",
        time: "Prefer early morning or evening"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "🚴",
        title: "Cycling",
        time: "Morning or evening"
      });
    }
  }

  if (interests.includes("Nature")) {
    if (heavyRain) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "🌳",
        title: "Nature Walk",
        time: "Rain may affect outdoor conditions"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "🌳",
        title: "Nature Walk",
        time: "5:00 PM – 7:00 PM"
      });
    }
  }

  if (interests.includes("Outdoor Fitness")) {
    if (heavyRain) {
      recommendations.push({
        type: "Consider Later",
        className: "red-card",
        icon: "🏋️",
        title: "Outdoor Workout",
        time: "Consider an indoor workout"
      });
    } else if (
      hotWeather ||
      highUV
    ) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "🏋️",
        title: "Outdoor Workout",
        time: "Choose early morning or evening"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "🏋️",
        title: "Outdoor Workout",
        time: "Morning or evening"
      });
    }
  }

  if (interests.includes("Outdoor Study")) {
    if (
      heavyRain ||
      hotWeather
    ) {
      recommendations.push({
        type: "Possible",
        className: "yellow-card",
        icon: "📚",
        title: "Outdoor Study",
        time: "Consider a comfortable indoor location"
      });
    } else {
      recommendations.push({
        type: "Recommended",
        className: "green-card",
        icon: "📚",
        title: "Outdoor Study",
        time: "8:00 AM – 10:00 AM"
      });
    }
  }

  return recommendations.slice(0, 3);
}