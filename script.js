const coordinates = [
    [-39.40865041997067, 175.6358725082927],
    [-22.190506290467603, 132.380112251524],
    [49.59929219923462, 68.2469102172686]
];

let randomCoordinate = coordinates[Math.floor(Math.random() * coordinates.length)];
let line;

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function (e) {
    const userLat = e.latlng.lat;
    const userLng = e.latlng.lng;

    if (line) {
        map.removeLayer(line); // Remove existing line if any
    }

    line = L.polyline([randomCoordinate, [userLat, userLng]], { color: 'red' }).addTo(map); // Draw line

    const distance = calculateDistance(userLat, userLng, randomCoordinate[0], randomCoordinate[1]);

    document.getElementById('info').innerText = `Your guess is ${distance.toFixed(2)} km away from the target location.`;
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}