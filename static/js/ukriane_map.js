// call flask 
  var data = {{gj |safe}}

  var myMap = L.map("my_map", {
  center: [50.45, 30.52],
  zoom: 6
});

// add in tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Kiev city marker 
var marker = L.marker([50.45, 30.5], {
    draggable: false,
    title: "Kiev"
}).addTo(myMap);
marker.bindPopup("Kiev, Ukraine")

// add in geoJSON 
L.geoJson(data).addTo(myMap);



// // add in json 
// axios.get('http://127.0.0.1:5000/api/v1.0/ukrGeoJson')
//             .then(response => {
//                 L.geoJson(response.data, {
//                     pointToLayer: function (feature, latlng) {
//                         return L.circleMarker(latlng);
//                     }}
//                     )}).addTo(myMap);
//                 L.geoJSON(response.data, {}).addTo(map);


//var url = "http://127.0.0.1:5000/api/v1.0/ukrGeoJson"

// Get request using D3
//d3.json(geojson).then(function(data) {
    // function styleInfo (feature) {
    //     return {
    //         opacity: 1,
    //         fillOpacity: 1,
    //         fillColor: "red",
    //         color: "red",
    //         radius: 100,
    //         stroke: true,
    //         weight: 0.5
    //             }};

    // L.geoJSON(data, {
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng);
    //     },
    //     style: styleInfo,
    //     onEachFeature: function(feature, layer) {
    //         layer.bindPopup("Location: " + feature.properties.location + "<br>Sub-Event Type: " + feature.properties.sub_event_type "<br>Fatalities: " + feature.properties.fatalities)}
        
    //     }).addTo(myMap);

    
    // add markers to locations using lat and long 
    // for(var i=0; i < locations.length; i++) {
    // for(var key in jsondata.("NAME OF LAT & LNG")) {
    // //     var latLng = L.latLng([jsondata.("NAME OF LAT & LNG")].x, [jsondata.("NAME OF LAT & LNG")y]);
    //     L.circles(latLng, {icon: enciv} {
    //         fillOpactity: 0.75,
    //         // do we want to change the color based on sub event type / fatality count?
    //         color = orange, 
    //         fillColour: orange,
    //         radius: 50 
    //         // here I think I need to re loop through to find the corresponding location name to latlong?
    //     }).bindPopup(`<h1>${location[i].}</h1> <hr> <h3> WHAT ELSE DO WE WANT HERE?</h3>`).addTo(myMap);
    
    // // locationlayer 
    // var locations = L.layerGrouup([latLng]);

    // count of event type civilian violence 

    // count of fatalities 

    // Layer control 
    
    // L.control.layers()

    