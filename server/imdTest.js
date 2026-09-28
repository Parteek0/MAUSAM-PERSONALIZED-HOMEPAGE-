const url =
  "https://mausam.imd.gov.in/api/current_wx_api.php?id=42105";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`IMD API error: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log("IMD DATA:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error("IMD CONNECTION ERROR:");
    console.error(error.message);
  });