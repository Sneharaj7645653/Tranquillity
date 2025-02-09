let map;
let currentMarker = null;

function initializeMap() {
    map = L.map("map").setView([20.5937, 78.9629], 5); // Default view set to India
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 14);

            // Adding the "You Are Here" marker
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("You Are Here")
                .openPopup();
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to focus the map on the entered location
function goToEnteredLocation() {
    const locationInput = document.getElementById("location-input").value;
    if (!locationInput) {
        alert("Please enter a location.");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                map.setView([lat, lon], 14);

                // Marking the entered location
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }
                currentMarker = L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup(`Location: ${locationInput}`)
                    .openPopup();

                // Clear old list or table if present
                clearCleanAirTable();
            } else {
                alert("Location not found. Please try another search.");
            }
        })
        .catch((error) => {
            console.error("Error fetching location data:", error);
            alert("Unable to find the location. Please try again later.");
        });
}

const API_KEY = "f0d392a5cfbb84601dff2507b0b7f4764bcd3dfb";

// Function to fetch air quality for a specific location
function fetchAirQualityForLocation() {
    const locationInput = document.getElementById("location-input").value;

    // If no location input, use current marker's coordinates
    if (!locationInput && currentMarker) {
        const { lat, lng } = currentMarker.getLatLng(); // Get coordinates from the marker
        fetchAirQualityByCoordinates(lat, lng); // Fetch air quality by coordinates
        return;
    }

    // If location input is provided, fetch air quality by location name
    if (!locationInput) {
        alert("Please enter a location or use 'Find My Location' first.");
        return;
    }


    const url = `https://api.waqi.info/feed/${encodeURIComponent(locationInput)}/?token=${API_KEY}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "ok" && data.data.aqi) {
                const { city, aqi } = data.data;
                const { geo } = city;

                // Update map
                map.setView([geo[0], geo[1]], 14);

                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }

                // Display air quality
                currentMarker = L.marker([geo[0], geo[1]])
                    .addTo(map)
                    .bindPopup(`Location: ${city.name}<br>Air Quality Index (AQI): ${aqi}`)
                    .openPopup();
            } else {
                alert("No air quality data available for this location.");
            }
        })
        .catch((error) => {
            console.error("Error fetching air quality data:", error);
            alert("Unable to fetch air quality. Please try again later.");
        });
}
// Function to fetch air quality data by coordinates
function fetchAirQualityByCoordinates(lat, lng) {
    const url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${API_KEY}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "ok" && data.data.aqi) {
                const { aqi } = data.data;

                // Update map and marker
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }
                currentMarker = L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`Air Quality Index (AQI): ${aqi}`)
                    .openPopup();
            } else {
                alert("No air quality data available for this location.");
            }
        })
        .catch((error) => {
            console.error("Error fetching air quality data:", error);
            alert("Unable to fetch air quality. Please try again later.");
        });
}
// Haversine formula to calculate distance between two lat/lon points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to find clean air spaces nearby
function findCleanAirLocations() {
    if (!currentMarker) {
        alert("Please use 'Find My Location' or first 'Go to Location' to set a location.");
        return;
    }

    const { lat, lng } = currentMarker.getLatLng(); // Get current location from the map
    const nearbySearchUrl = `https://api.waqi.info/map/bounds/?latlng=${lat - 1},${lng - 1},${lat + 1},${lng + 1}&token=${API_KEY}`;

    fetch(nearbySearchUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "ok" && data.data.length > 0) {
                const cleanLocations = data.data
                    .filter((location) => {
                        const distance = calculateDistance(lat, lng, location.lat, location.lon);
                        return location.aqi && distance <= 100; // Filter locations within 100 km radius
                    })
                    .sort((a, b) => a.aqi - b.aqi) // Sort by AQI (ascending, cleanest first)
                    .slice(0, 5); // Get top 5 clean locations

                // Clear old list or table before creating a new one
                clearCleanAirTable();

                cleanLocations.forEach((location) => {
                    const { lat, lon, station, aqi } = location;
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(
                            `Location: ${station.name}<br>AQI: ${aqi} (Cleaner air)`
                        );
                });

                // Center the map on the cleanest location
                if (cleanLocations.length > 0) {
                    const { lat, lon } = cleanLocations[0];
                    map.setView([lat, lon], 12);
                } else {
                    alert("No clean locations found within 100 km.");
                }

                // Generate the dynamic table
                generateCleanAirTable(cleanLocations, lat, lng);
            } else {
                alert("No air quality data available for nearby locations.");
            }
        })
        .catch((error) => {
            console.error("Error fetching nearby air quality data:", error);
            alert("Unable to find clean air spaces. Please try again later.");
        });
}

// Function to clear the table of clean air locations
function clearCleanAirTable() {
    const tableContainer = document.getElementById("clean-air-table-container");
    if (tableContainer) {
        tableContainer.innerHTML = ""; // Clear existing table content
    }
}

function generateCleanAirTable(cleanLocations, userLat, userLng) {
    let tableContainer = document.getElementById("clean-air-table-container");

    if (!tableContainer) {
        // Create the container if it doesn't exist
        tableContainer = document.createElement("div");
        tableContainer.id = "clean-air-table-container";
        tableContainer.style.marginTop = "20px";
        const footer = document.querySelector("footer");
        footer.parentNode.insertBefore(tableContainer, footer);
    }

    // Clear existing table content
    tableContainer.innerHTML = "";

    // Create the table element
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.display = "table";
    table.style.textAlign = "left";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Location", "AQI", "Distance (km)", "Directions"].forEach((heading) => {
        const th = document.createElement("th");
        th.textContent = heading;
        th.style.border = "1px solid #ccc";
        th.style.padding = "8px";
        th.style.backgroundColor = "#f9f9f9";
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    cleanLocations.forEach((location) => {
        const { station, aqi, lat, lon } = location;
        const distance = calculateDistance(userLat, userLng, lat, lon).toFixed(2);

        const row = document.createElement("tr");

        // Add Location, AQI, and Distance columns
        [station.name, aqi, distance].forEach((value, index) => {
            const td = document.createElement("td");
            td.textContent = value;
            td.style.border = "1px solid #ccc";
            td.style.padding = "8px";
            if (index === 1) {
                // Style AQI column based on value
                td.style.backgroundColor = aqi <= 50 ? "#d4edda" : aqi <= 100 ? "#fff3cd" : "#f8d7da";
            }
            row.appendChild(td);
        });

        // Add Directions column
        const directionsTd = document.createElement("td");
        const link = document.createElement("a");
        link.textContent = "Get Directions";
        link.href = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lon}`;
        link.target = "_blank"; // Open link in a new tab
        link.style.color = "#007bff";
        link.style.textDecoration = "none";
        link.style.padding = "8px";
        directionsTd.appendChild(link);
        directionsTd.style.border = "1px solid #ccc";
        directionsTd.style.padding = "8px";
        row.appendChild(directionsTd);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}
document.addEventListener("DOMContentLoaded", initializeMap);