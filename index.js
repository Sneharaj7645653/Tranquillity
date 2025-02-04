let map = L.map('map').setView([20.5937, 78.9629], 5); // Default India location
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    map.setView([lat, lon], 13);
    L.marker([lat, lon]).addTo(map).bindPopup("You are here!").openPopup();
}




// // Add a function in the script.js file to call the NoiseAPI and get the noise data. Here’s a sample code to fetch noise data using the fetch() function
// async function getNoiseData(lat, lon) {
//     const apiKey = 'YOUR_API_KEY'; // Replace with your NoiseAPI key
//     const url = `https://api.noiseapi.com/v1/noise?lat=${lat}&lon=${lon}&key=${apiKey}`;
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         // Process the data and display the noise level on the map
//         displayNoiseLevel(data);
//     } catch (error) {
//         console.error('Error fetching noise data:', error);
//     }
// }

// function displayNoiseLevel(data) {
//     // Assuming the data contains noise level info
//     const noiseLevel = data.noise_level; // Adjust according to the API's response
//     let color = 'green';
//     if (noiseLevel > 50) color = 'yellow';
//     if (noiseLevel > 70) color = 'red';

//     // Add a marker to the map with color-coded noise level
//     L.circle([data.lat, data.lon], {
//         color: color,
//         radius: 500
//     }).addTo(map).bindPopup(`Noise Level: ${noiseLevel} dB`);
// }




// //Use a geocoding API (like OpenCage or Google Geocoding API) to convert the entered location to coordinates (latitude and longitude)
// async function fetchNoiseForLocation() {
//     const location = document.getElementById("location-input").value;
//     if (!location) {
//         alert("Please enter a location.");
//         return;
//     }

//     const geoCodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=YOUR_GEOCODING_API_KEY`;
    
//     try {
//         const response = await fetch(geoCodeUrl);
//         const data = await response.json();
//         const lat = data.results[0].geometry.lat;
//         const lon = data.results[0].geometry.lng;

//         // Now, get the noise data for this location
//         getNoiseData(lat, lon);
//     } catch (error) {
//         console.error('Error fetching location data:', error);
//     }
// }



// //Here’s an example of using the Google Places API to find nearby quiet places:
// async function findNearbyQuietPlaces(lat, lon) {
//     const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=park&key=${apiKey}`;
    
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         // Display the quiet places on the map
//         data.results.forEach(place => {
//             L.marker([place.geometry.location.lat, place.geometry.location.lng])
//                 .addTo(map)
//                 .bindPopup(place.name);
//         });
//     } catch (error) {
//         console.error('Error fetching nearby places:', error);
//     }
// }


// //Example for getting latitude and longitude from current location:
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// function showPosition(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     console.log(`Latitude: ${lat}, Longitude: ${lon}`);  // You can use this lat, lon in your API calls

//     // Now use these lat, lon values to fetch noise data and nearby places
//     getNoiseData(lat, lon);
//     findNearbyQuietPlaces(lat, lon);
// }