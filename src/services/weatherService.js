const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export async function fetchWeather(
  stationId = "42105"
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?stationId=${encodeURIComponent(
        stationId
      )}`
    );

    if (!response.ok) {
      throw new Error(
        `Weather API returned ${response.status}`
      );
    }

    const data =
      await response.json();

    if (!data.success) {
      throw new Error(
        data.message ||
          "Weather API failed"
      );
    }

    return data;

  } catch (error) {
    console.error(
      "Failed to fetch live weather:",
      error
    );

    return {
      success: false,
      source: "IMD",
      isLive: false,
      error: true,
      message:
        "Live weather service unavailable."
    };
  }
}