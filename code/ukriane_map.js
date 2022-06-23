// Creating the map object
var myMap = L.map("my_map", {
    center: [50.45, 30.52],
    zoom: 6
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Kiev city marker 
var marker = L.marker([50.45, 30.5], {
    draggable: false,
    title: "Kiev"
}).addTo(myMap);
marker.bindPopup("Kiev, Ukraine")

// add in json 

    // add markers to cities 

    // create 2 layers 

    // count of event type civilian violence 

    // count of fatalities 

    // Layer control 
    
    // L.control.layers()

