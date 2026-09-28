export function generateDayPlan(
  interests,
  weather
) {
  const plan = [];

  const {
    temperature,
    rainChance,
    windSpeed,
    uvIndex
  } = weather;

  const heavyRain = rainChance >= 60;
  const hotWeather = temperature > 32;
  const highUV = uvIndex >= 7;
  const strongWind = windSpeed >= 30;

  if (interests.includes("Running")) {
    if (heavyRain) {
      plan.push({
        time: "Indoor",
        icon: "🏃",
        activity: "Indoor Workout",
        reason:
          "Rain is likely, so an indoor workout is a safer option."
      });
    } else {
      plan.push({
        time:
          hotWeather || highUV
            ? "6:30 PM"
            : "7:00 AM",
        icon: "🏃",
        activity:
          hotWeather || highUV
            ? "Evening Run"
            : "Morning Run",
        reason:
          hotWeather || highUV
            ? "Cooler hours may provide more comfortable conditions."
            : "Temperature and weather conditions are suitable for running."
      });
    }
  }

  if (interests.includes("Walking")) {
    plan.push({
      time:
        heavyRain || hotWeather || highUV
          ? "6:00 PM"
          : "8:00 AM",
      icon: "🚶",
      activity: "Outdoor Walk",
      reason:
        heavyRain
          ? "Plan the walk after rainfall if conditions improve."
          : hotWeather || highUV
          ? "Evening conditions may be more comfortable."
          : "Weather conditions are suitable for an outdoor walk."
    });
  }

  if (interests.includes("Photography")) {
    plan.push({
      time: "5:30 PM",
      icon: "📸",
      activity: "Photography",
      reason:
        heavyRain
          ? "Rain may affect outdoor photography. Consider indoor photography."
          : "Evening light can provide good conditions for photography."
    });
  }

  if (interests.includes("Travel")) {
    plan.push({
      time: "10:00 AM",
      icon: "✈️",
      activity: "Travel",
      reason:
        heavyRain || strongWind
          ? "Check updated weather conditions before travelling."
          : "Weather conditions look manageable for travel."
    });
  }

  if (interests.includes("Cycling")) {
    plan.push({
      time:
        heavyRain || strongWind
          ? "Later"
          : hotWeather || highUV
          ? "6:30 AM"
          : "7:00 AM",
      icon: "🚴",
      activity: "Cycling",
      reason:
        heavyRain
          ? "Rain may make cycling unsafe."
          : strongWind
          ? "Strong winds may make cycling uncomfortable."
          : hotWeather || highUV
          ? "Early morning can provide cooler conditions."
          : "Weather conditions are suitable for cycling."
    });
  }

  if (interests.includes("Nature")) {
    plan.push({
      time: "5:00 PM",
      icon: "🌳",
      activity: "Nature Walk",
      reason:
        heavyRain
          ? "Consider postponing until outdoor conditions improve."
          : "Evening conditions can be suitable for a nature activity."
    });
  }

  if (interests.includes("Outdoor Fitness")) {
    plan.push({
      time:
        hotWeather || highUV
          ? "7:00 AM"
          : "8:00 AM",
      icon: "🏋️",
      activity: "Outdoor Workout",
      reason:
        heavyRain
          ? "Rain may affect outdoor exercise. Consider an indoor workout."
          : hotWeather || highUV
          ? "Morning is preferable because temperatures and UV may be lower."
          : "Conditions are suitable for outdoor exercise."
    });
  }

  if (interests.includes("Outdoor Study")) {
    plan.push({
      time: "9:00 AM",
      icon: "📚",
      activity: "Outdoor Study",
      reason:
        heavyRain || hotWeather
          ? "Indoor study may be more comfortable."
          : "Conditions are suitable for studying outdoors."
    });
  }

  return plan.slice(0, 5);
}