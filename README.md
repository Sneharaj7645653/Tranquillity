# Tranquillity: Clean Air Locator

## Overview
The **Tranquillity: Clean Air Locator** is a web application that helps users find and navigate to nearby locations with better air quality. Using real-time air quality data from APIs, the application provides a curated list of cleaner locations with distance. With integrated Google Maps navigation, users can seamlessly get directions from their current location to a selected cleaner spot, promoting a healthier lifestyle.

## Features
- **Real-Time Air Quality Data**: Fetches live air quality data from reliable APIs.
- **Geolocation-Based Recommendations**: Displays nearby locations with better air quality based on user input.
- **Navigation Support**: Allows users to start navigation directly to the selected location via Google Maps.
- **Dynamic List Updates**: Automatically updates the list when a new location is entered, ensuring a clean and accurate display.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **APIs**:
  	-OpenStreetMap (via Leaflet.js): This is used for map rendering and adding markers.
	-World Air Quality Index API (WAQI): Used to fetch air quality data.
	-Nominatim API (from OpenStreetMap): Used to geocode the user’s input location.


## How It Works
1. **User Input**: Enter a starting location to search for cleaner air spots.
2. **Air Quality Data Fetching**: The app retrieves real-time air quality data for the specified area.
3. **List Generation**: Displays a list of cleaner locations with details like distance and a navigation link.
4. **Google Maps Integration**: Click the navigation link to open Google Maps and start navigating from the entered location.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/clean-air-locator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd clean-air-locator
   ```
3. Open `index.html` in a web browser to run the app.
4. Make sure to update the API keys in the JavaScript file (if required).

## Future Enhancements
- Add graphical visualizations for air quality trends.
- Integrate additional environmental data like noise levels and temperature.
- Enhance the UI with filters for customizing search results.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute to the project by submitting pull requests or reporting issues!
