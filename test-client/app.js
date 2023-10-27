const apiBasePath = 'http://localhost:3000';

/* Uncomment the test path of interest */

// const testPath = 'community-district'
// const testPath = 'community-district/10'
// const testPath = 'facility'
// const testPath = 'facility/0029fead6191945fd2bc9c815defd90f'
const testPath = 'facility/0029fead6191945fd2bc9c815defd90f?bufferFt=5280'
// const testPath = 'project-area/4b50fb2e-5caa-484d-b21e-76eee9db3b68' 
// const testPath = 'project-area/4b50fb2e-5caa-484d-b21e-76eee9db3b68?bufferFt=500' 
// const testPath = 'project-area/4b50fb2e-5caa-484d-b21e-76eee9db3b68/community-district' 
// const testPath = 'project-area/4b50fb2e-5caa-484d-b21e-76eee9db3b68/community-district?bufferFt=500' 

window.addEventListener('DOMContentLoaded', async () => {
    const map = L.map('map').setView([40.74, -74.0], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    const response = await fetch(`${apiBasePath}/geojson/${testPath}`);
    const spatial = await response.json();

    L.geoJSON(spatial, {
        onEachFeature: function (feature, layer) {
        layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
        }
    }).addTo(map);
})
