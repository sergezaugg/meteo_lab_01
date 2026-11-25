const API_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=46.948" +
  "&longitude=7.447" +
  "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

const statusElement = document.querySelector("#status");
const dataElement = document.querySelector("#weather-data");
const updatedElement = document.querySelector("#updated");
const refreshButton = document.querySelector("#refresh-button");

async function loadWeather() {
  refreshButton.disabled = true;
  statusElement.textContent = "Loading live data…";
  statusElement.classList.remove("error");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();
    const current = result.current;
    const units = result.current_units;

    document.querySelector("#temperature").textContent =
      `${current.temperature_2m} ${units.temperature_2m}`;
    document.querySelector("#humidity").textContent =
      `${current.relative_humidity_2m} ${units.relative_humidity_2m}`;
    document.querySelector("#wind").textContent =
      `${current.wind_speed_10m} ${units.wind_speed_10m}`;

    dataElement.hidden = false;
    statusElement.textContent = "Successfully retrieved data from Open-Meteo.";
    updatedElement.textContent =
      `API observation time: ${current.time} · Retrieved: ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    console.error("Could not load weather data:", error);
    dataElement.hidden = true;
    statusElement.textContent =
      "Could not load the data. Check your internet connection or try again.";
    statusElement.classList.add("error");
    updatedElement.textContent = "";
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadWeather);
loadWeather();
