import { IMD_CONFIG } from "./config.js";

async function getIMDAccessToken() {
  const response = await fetch(
    "https://api.imd.gov.in/api/oauth/token.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: process.env.IMD_EMAIL,
        password: process.env.IMD_PASSWORD
      })
    }
  );

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(
      `IMD JWT authentication failed: ${
        data.error ||
        data.message ||
        "Unknown error"
      }`
    );
  }

  return data.access_token;
}

async function getIMDHeaders() {
  const accessToken =
    await getIMDAccessToken();

  return {
    "X-API-KEY": IMD_CONFIG.apiKey,
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/json"
  };
}

function validateStationId(stationId) {
  if (!stationId) {
    return IMD_CONFIG.defaultLocation.stationId;
  }

  const value = String(stationId).trim();

  if (!/^\d+$/.test(value)) {
    throw new Error(
      "Invalid IMD station ID."
    );
  }

  return value;
}

export async function getIMDWeather(
  stationId
) {
  if (!IMD_CONFIG.enabled) {
    return {
      success: false,
      source: "IMD",
      isLive: false,
      message: "IMD API is disabled."
    };
  }

  if (!IMD_CONFIG.apiKey) {
    throw new Error(
      "IMD_API_KEY is missing from .env"
    );
  }

  if (
    !process.env.IMD_EMAIL ||
    !process.env.IMD_PASSWORD
  ) {
    throw new Error(
      "IMD_EMAIL or IMD_PASSWORD is missing from .env"
    );
  }

  const id =
    validateStationId(stationId);

  const headers =
    await getIMDHeaders();

  const url =
    `${IMD_CONFIG.baseUrl}/current_wx?id=${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers
  });

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `IMD API returned ${response.status}: ${errorText}`
    );
  }

  const data =
    await response.json();

  return {
    success: true,
    source: "IMD",
    isLive: true,
    raw: data
  };
}

export async function getIMDForecast(
  stationId
) {
  if (!IMD_CONFIG.enabled) {
    throw new Error(
      "IMD API is disabled."
    );
  }

  if (!IMD_CONFIG.apiKey) {
    throw new Error(
      "IMD_API_KEY is missing from .env"
    );
  }

  if (
    !process.env.IMD_EMAIL ||
    !process.env.IMD_PASSWORD
  ) {
    throw new Error(
      "IMD_EMAIL or IMD_PASSWORD is missing from .env"
    );
  }

  const id =
    validateStationId(stationId);

  const headers =
    await getIMDHeaders();

  const url =
    `${IMD_CONFIG.baseUrl}/cityforecast?id=${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers
  });

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `IMD Forecast API returned ${response.status}: ${errorText}`
    );
  }

  const data =
    await response.json();

  return {
    success: true,
    source: "IMD",
    isLive: true,
    raw: data
  };
}

export async function getIMDCityMapping() {
  if (!IMD_CONFIG.enabled) {
    throw new Error(
      "IMD API is disabled."
    );
  }

  const headers =
    await getIMDHeaders();

  const url =
    `${IMD_CONFIG.baseUrl}/cityforecast_mapping`;

  const response = await fetch(url, {
    method: "GET",
    headers
  });

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `IMD City Mapping API returned ${response.status}: ${errorText}`
    );
  }

  const data =
    await response.json();

  return {
    success: true,
    source: "IMD",
    isLive: true,
    raw: data
  };
}