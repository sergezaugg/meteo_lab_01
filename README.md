# Live Data Explorer — minimal GitHub Pages demo

A minimal static website demonstrating that a GitHub Pages site can fetch live data from an external API.

## What it does

- Fetches current weather data for Bern from the Open-Meteo API.
- Displays temperature, relative humidity and wind speed.
- Includes a refresh button.
- Uses only HTML, CSS and vanilla JavaScript.
- Requires no backend and no API key.

## Run locally

Because the app uses `fetch()`, serve the folder over HTTP rather than opening `index.html` directly.

For example, with Python:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

Alternatively, use the Live Server extension in VS Code.

## Deploy to GitHub Pages

1. Create a GitHub repository and upload these files.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your `main` branch and `/ (root)` folder.
5. Save and wait for GitHub Pages to publish the site.

The API request runs in each visitor's browser. The API must allow browser requests from your site's origin (CORS).

## API

[Open-Meteo](https://open-meteo.com/) — current weather endpoint. Review its terms and usage policy before using it commercially.
