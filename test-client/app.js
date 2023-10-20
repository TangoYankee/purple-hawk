const apiBasePath = 'http://localhost:3000';

/* Uncomment the test path of interest */

// const testPath = 'community-district'
const testPath = 'community-district/10'

window.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const response = await fetch(`${apiBasePath}/geojson/${testPath}`);
    const spatial = await response.json();
    L.geoJSON(spatial).addTo(map);
})
