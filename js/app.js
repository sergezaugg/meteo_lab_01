

const weatherContainer = document.querySelector("#weather-panels");

// Create one weather panel
function createWeatherPanel(name, latitude, longitude) {

    const panel = document.createElement("section");
    panel.className = "panel weather-panel";

    panel.innerHTML = `


        <div class="panel-layout">

            <div class="location-inputs">
                <label>
                    Latitude
                    <input type="number" data-role="latitude"
                        value="${latitude}" step="0.001">
                </label>

                <label>
                    Longitude
                    <input type="number" data-role="longitude"
                        value="${longitude}" step="0.001">
                </label>
            </div>

            <div class="panel-heading">
                <div>
                    <h2>${name}</h2>
                </div>

                <button type="button" data-role="refresh">
                    Refresh data
                </button>
            </div>

        </div>




        <div class="metrics" data-role="metrics" hidden>
            <article class="metric">
                <span class="metric-label">Temperature</span>
                <strong data-role="temperature">—</strong>
            </article>

            <article class="metric">
                <span class="metric-label">Humidity</span>
                <strong data-role="humidity">—</strong>
            </article>

            <article class="metric">
                <span class="metric-label">Precipitation</span>
                <strong data-role="precipitation">—</strong>
            </article>

            <article class="metric">
                <span class="metric-label">Cloud cover</span>
                <strong data-role="cloud-cover">—</strong>
            </article>

            <article class="metric">
                <span class="metric-label">Wind speed</span>
                <strong data-role="wind">—</strong>
            </article>

            <article class="metric">
                <span class="metric-label">Wind direction</span>
                <strong data-role="wind-direction">—</strong>
            </article>
        </div>

        <p class="status" data-role="status">Loading live data...</p>
        <p class="updated" data-role="updated"></p>
    `;

    //     <details class="api-debug">
    //         <summary>API response (raw JSON)</summary>
    //         <pre data-role="api-output"></pre>
    //     </details>
    // `;

    // Get elements belonging to THIS panel only
    const get = role => panel.querySelector(`[data-role="${role}"]`);

    // Load weather data for this panel
    async function loadWeather() {

        const refreshButton = get("refresh");
        const status = get("status");

        const lat = get("latitude").value;
        const lon = get("longitude").value;

        if (lat === "" || lon === "" ||
            Number(lat) < -90 || Number(lat) > 90 ||
            Number(lon) < -180 || Number(lon) > 180) {

            status.textContent = "Please enter valid coordinates.";
            return;
        }

        refreshButton.disabled = true;
        status.textContent = "Loading live data...";
        status.classList.remove("error");

        try {
            const params = new URLSearchParams({
                latitude: lat,
                longitude: lon,
                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "precipitation",
                    "cloud_cover",
                    "wind_speed_10m",
                    "wind_direction_10m"
                ].join(",")
            });

            const url = `https://api.open-meteo.com/v1/forecast?${params}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();
            const current = result.current;
            const units = result.current_units;

            // Update metrics
            get("temperature").textContent =
                `${current.temperature_2m} ${units.temperature_2m}`;

            get("humidity").textContent =
                `${current.relative_humidity_2m} ${units.relative_humidity_2m}`;

            get("precipitation").textContent =
                `${current.precipitation} ${units.precipitation}`;

            get("cloud-cover").textContent =
                `${current.cloud_cover} ${units.cloud_cover}`;

            get("wind").textContent =
                `${current.wind_speed_10m} ${units.wind_speed_10m}`;

            get("wind-direction").textContent =
                `${current.wind_direction_10m} ${units.wind_direction_10m}`;

            // // Display raw JSON
            // get("api-output").textContent =
            //     JSON.stringify(result, null, 2);

            get("metrics").hidden = false;

            status.textContent = "Successfully retrieved data.";

            get("updated").textContent =
                `Observation: ${current.time} · Retrieved: ${new Date().toLocaleTimeString()}`;

        } catch (error) {
            console.error(error);
            status.textContent = "Could not load weather data.";
            status.classList.add("error");
            get("api-output").textContent = error.message;
        } finally {
            refreshButton.disabled = false;
        }
    }

    // Refresh button belongs to this panel
    get("refresh").addEventListener("click", loadWeather);

    // Initial API request
    loadWeather();

    return panel;
}


// Instantiate weather panels
weatherContainer.append(
    createWeatherPanel("Site 1", 46.948, 7.447),
    createWeatherPanel("Site 2", 47.3769, 8.5417),
    createWeatherPanel("Site 3", 46.2044, 6.1432),
    createWeatherPanel("Site 4", 47.5596, 7.5886)
);




