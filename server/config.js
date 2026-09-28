import "dotenv/config";

export const IMD_CONFIG = {
  baseUrl: "https://api.imd.gov.in/api/v1",

  apiKey: process.env.IMD_API_KEY,

  city: "Chandigarh",

  // Chandigarh IMD station ID will be configured
  // after we verify the approved station mapping.
  stationId: null,

  enabled: true
};