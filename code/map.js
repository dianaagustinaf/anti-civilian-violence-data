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
//var url = "https://api.acleddata.com/acled/read?key=zHU1Q4Hg0aShRL8YlQEP&email=shannon.sdw.watts@gmail.com&?event_type=Violence&nbsp;against&nbsp;civilians&event_type_where=%3D&event_date=2021-01-01|2022-06-22&event_date_where=BETWEEN"
var url = "https://api.acleddata.com/acled/read?key=zHU1Q4Hg0aShRL8YlQEP&email=shannon.sdw.watts@gmail.com"
////d3.json(url).then(function(response) {

d3.json("http://127.0.0.1:https://api.acleddata.com/acled/read?key=zHU1Q4Hg0aShRL8YlQEP&email=shannon.sdw.watts@gmail.com").then( data => {
    console.log(data);
    // add markers to capital cities 
});
// create 2 layers 

    // count of event type civilian violence 

    // count of fatalities 

// Layer control 
// L.control.layers()

