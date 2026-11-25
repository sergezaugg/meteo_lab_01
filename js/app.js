
const statusElement = document.querySelector("#status");
const dataElement = document.querySelector("#weather-data");
const updatedElement = document.querySelector("#updated");
const refreshButton = document.querySelector("#refresh-button");
const apiOutput = document.querySelector("#api-output");

function getApiUrl() {
  const latitude = document.querySelector("#latitude").value;
  const longitude = document.querySelector("#longitude").value;

  return (
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m," +
    "apparent_temperature,precipitation,rain,showers,snowfall,cloud_cover,is_day"
  );
}

async function loadWeather() {
  refreshButton.disabled = true;
  statusElement.textContent = "Loading live data...";
  statusElement.classList.remove("error");

  try {
    const response = await fetch(getApiUrl());

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();

    // Display raw JSON
    apiOutput.textContent = JSON.stringify(result, null, 2);

    // Extract current weather data
    const current = result.current;
    const units = result.current_units;

    // Update dashboard
    document.querySelector("#temperature").textContent =
      `${current.temperature_2m} ${units.temperature_2m}`;

    document.querySelector("#humidity").textContent =
      `${current.relative_humidity_2m} ${units.relative_humidity_2m}`;

    document.querySelector("#wind").textContent =
      `${current.wind_speed_10m} ${units.wind_speed_10m}`;

    document.querySelector("#precipitation").textContent =
      `${current.precipitation} ${units.precipitation}`;

    document.querySelector("#wind_direc").textContent =
      `${current.wind_direction_10m} ${units.wind_direction_10m}`;

    document.querySelector("#cloud_cov").textContent =
      `${current.cloud_cover} ${units.cloud_cover}`;

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
    apiOutput.textContent = `Error: ${error.message}`;

  } finally {
    refreshButton.disabled = false;
  }
}

// Refresh button
refreshButton.addEventListener("click", loadWeather);

// Initial load
loadWeather();



