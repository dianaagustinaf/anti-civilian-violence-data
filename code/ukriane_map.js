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

    // add markers to locations using lat and long 
    //for(var i=0; i < locations.length; i++) {
    for(var key in jsondata.("NAME OF LAT & LNG")) {
        var latLng = L.latLng([jsondata.("NAME OF LAT & LNG")].x, [jsondata.("NAME OF LAT & LNG")y]);
        L.circles(latLng, {icon: enciv} {
            fillOpactity: 0.75,
            // do we want to change the color based on sub event type / fatality count?
            color = orange, 
            fillColour: orange,
            radius: 50 
            // here I think I need to re loop through to find the corresponding location name to latlong?
        }).bindPopup(`<h1>${location[i].}</h1> <hr> <h3> WHAT ELSE DO WE WANT HERE?</h3>`).addTo(myMap);
    
    // locationlayer 
    var locations = L.layerGrouup([latLng]);

    // count of event type civilian violence 

    // count of fatalities 

    // sub event type?

    // Layer control 
    
    // L.control.layers()

    
    }