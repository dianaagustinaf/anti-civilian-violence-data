console.log(data);

// Setup map variable and view point
var myMap = L.map("map", {
    center: [49.05, 33.22],
    zoom: 2, 

});

// Add tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Add marker and customise popup
var markers = {
    opacity: 0.7,
    fillOpacity: 0.7,
    fillColor: "orange",
    color: "orange",
    radius: 4,
    stroke: true,
    weight: 0.5
};

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markers);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("<h3> Location: " + feature.properties.country
        + "</h3><br>Fatalities: " + feature.properties.fatalities
        )
    }
}).addTo(myMap);