export function getPersonalizedInsights(
  interests,
  weather
) {
  const insights = [];

  const {
    temperature,
    rainChance,
    windSpeed,
    uvIndex
  } = weather;

  if (interests.includes("Running")) {
    if (temperature <= 30) {
      insights.push({
        icon: "🏃",
        title: "Running",
        message:
          "Good conditions for a run."
      });
    } else {
      insights.push({
        icon: "🏃",
        title: "Running",
        message:
          "It may be better to run during cooler hours."
      });
    }
  }

  if (interests.includes("Walking")) {
    if (temperature <= 32) {
      insights.push({
        icon: "🚶",
        title: "Walking",
        message:
          "A walk outdoors should be comfortable."
      });
    } else {
      insights.push({
        icon: "🚶",
        title: "Walking",
        message:
          "Consider walking in the morning or evening."
      });
    }
  }

  if (interests.includes("Photography")) {
    insights.push({
      icon: "📸",
      title: "Photography",
      message:
        rainChance >= 60
          ? "Rain may affect outdoor photography."
          : "Morning and evening can offer good outdoor light."
    });
  }

  if (interests.includes("Travel")) {
    insights.push({
      icon: "✈️",
      title: "Travel",
      message:
        rainChance >= 60
          ? "Check rain conditions before planning outdoor travel."
          : "Weather conditions can be considered for your trip."
    });
  }

  if (interests.includes("Cycling")) {
    if (
      temperature <= 30 &&
      windSpeed < 30 &&
      rainChance < 50
    ) {
      insights.push({
        icon: "🚴",
        title: "Cycling",
        message:
          "Weather looks suitable for cycling."
      });
    } else {
      insights.push({
        icon: "🚴",
        title: "Cycling",
        message:
          "Consider cycling during cooler or calmer hours."
      });
    }
  }

  if (interests.includes("Nature")) {
    insights.push({
      icon: "🌳",
      title: "Nature",
      message:
        rainChance >= 60
          ? "Rain may affect outdoor nature activities."
          : "Outdoor nature activities can be planned around the weather."
    });
  }

  if (interests.includes("Outdoor Fitness")) {
    if (
      temperature <= 30 &&
      uvIndex < 7 &&
      rainChance < 50
    ) {
      insights.push({
        icon: "🏋️",
        title: "Outdoor Fitness",
        message:
          "Conditions are suitable for outdoor exercise."
      });
    } else {
      insights.push({
        icon: "🏋️",
        title: "Outdoor Fitness",
        message:
          "Try exercising during cooler or less sunny hours."
      });
    }
  }

  if (interests.includes("Outdoor Study")) {
    insights.push({
      icon: "📚",
      title: "Outdoor Study",
      message:
        temperature <= 30 &&
        rainChance < 40
          ? "You can consider studying outdoors during comfortable hours."
          : "Indoor study may be more comfortable today."
    });
  }

  return insights;
}