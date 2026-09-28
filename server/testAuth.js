import "dotenv/config";

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

console.log("HTTP Status:", response.status);

if (response.ok) {
  console.log("JWT generated successfully.");
  console.log("Token type:", data.token_type);
  console.log("Expires in:", data.expires_in, "seconds");
  console.log("Access token received:", Boolean(data.access_token));
} else {
  console.log("IMD authentication failed:");
  console.log(data);
}