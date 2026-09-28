export function getPersonalizationScore(
  interests,
  weather
) {
  if (interests.length === 0) {
    return 0;
  }

  const {
    temperature,
    rainChance,
    windSpeed,
    uvIndex
  } = weather;

  let score = 0;

  // User has selected activities
  score += 30;

  // Comfortable temperature
  if (
    temperature >= 18 &&
    temperature <= 30
  ) {
    score += 25;
  } else if (
    temperature >= 15 &&
    temperature <= 33
  ) {
    score += 15;
  }

  // Low chance of rain
  if (rainChance < 20) {
    score += 20;
  } else if (rainChance < 40) {
    score += 15;
  } else if (rainChance < 60) {
    score += 8;
  }

  // Comfortable wind
  if (windSpeed < 15) {
    score += 15;
  } else if (windSpeed < 25) {
    score += 10;
  } else if (windSpeed < 35) {
    score += 5;
  }

  // UV conditions
  if (uvIndex < 5) {
    score += 10;
  } else if (uvIndex < 7) {
    score += 7;
  } else if (uvIndex < 9) {
    score += 3;
  }

  return Math.min(
    Math.round(score),
    100
  );
}