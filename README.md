# Tranquillity

This web application allows users to record and view real-time noise levels of specific locations. By inputting a location, users can see color-coded markers on an interactive map based on noise intensity. The app also recommends nearby quiet spots like parks or libraries for a peaceful escape.

## Features

- **Real-time Noise Levels**: View noise levels of specific locations in real-time.
- **Interactive Map**: See color-coded markers on an interactive map based on noise intensity.
- **Quiet Spot Recommendations**: Get recommendations for nearby quiet spots like parks or libraries.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/tranquillity.git
    ```
2. Navigate to the project directory:
    ```sh
    cd tranquillity
    ```

### Usage

1. Open [index.html](http://_vscodecontentref_/1) in your web browser.
2. Click on "Find My Location" to get your current location and view the noise levels.
3. Enter a location in the input box and click "Check Noise Level" to view the noise levels of that location.

### API Keys

This project uses the following APIs:
- **NoiseAPI**: To fetch noise data.
- **OpenCage Geocoding API**: To convert location names to coordinates.
- **Google Places API**: To find nearby quiet places.

Replace the placeholder API keys in [index.js](http://_vscodecontentref_/2) with your own API keys.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements

- [Leaflet](https://leafletjs.com/) for the interactive map.
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles.