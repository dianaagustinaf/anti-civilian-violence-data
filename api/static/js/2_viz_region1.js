console.log(data);


// var data = {{ geojson|safe }};
// create map
// var layers = {
//     2018: new L.LayerGroup(),
//     2019: new L.LayerGroup(),
//     2020: new L.LayerGroup(),
//     2021: new L.LayerGroup(),
//     2022: new L.LayerGroup(),
// };

// var overlays = {
//     "2018": layers.2018,
//     "2019": layers.2019, 
//     "2020": layers.2020,
//     "2021": layers.2021,
//     "2022": layers.2022
    
// }
var myMap = L.map("my_map", {
    center: [49.05, 33.22],
    zoom: 1, 
    // layers: [
    //     layers.2018, 
    //     layers.2019, 
    //     layers.2020,
    //     layers.2021,
    //     layers.2022
    // ]
});

// Add tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// L.control.layers(null, overlays).addTo(myMap);

// // Legend to display information about map
// var info = L.control({
//     position: "bottomright"
// });

// info.onAdd = function() {
// var div = L.DomUtil.create("div", "legend");
// return div;
// };
// // Add the info legend to the map.
// info.addTo(myMap);



// loop over geojson to find radius size 
//    var fatalities = []

//     for (i=0; i< featuresData.length; i++){
//         fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));          
//     }

var markers = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "orange",
    color: "orange",
    //radius: fatalities
    radius: 3,
    stroke: true,
    weight: 0.5
};


L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markers);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Location: " + feature.properties.location
            + "<br> Event Date: " + feature.properties.event_date
            + "<br>Sub-Event Type: " + feature.properties.sub_event_type
            + "<br>Fatalities: " + feature.properties.fatalities
            + "<br>Notes: " + feature.properties.notes)
        // layer.on({
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        // click: zoomToFeature
        // });
    }
}).addTo(myMap);


// Bar Plot 
var featuresData = data["features"]
var year = []
var fatalities = []
var locations = []
var subEventType = []


for (i=0; i< featuresData.length; i++){
    year.push(featuresData[i]['properties']['year']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));          
}

function plotCharts() {

    varData = [
        {
            x: year,
            y: fatalities,
            //text: ,
            type: "bar"
        }
    ];

    var barLayout = { title: "Fatalities over time: 2018-2022" };
    // plot
    Plotly.newPlot("bar", varData, barLayout);

};

plotCharts()

// Pie Plot 

for (i=0; i< featuresData.length; i++){
    subEventType.push(featuresData[i]['properties']['sub_event_type']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));          
}

function piePlot() {

pieData = [
    {
        values: fatalities,
        labels: subEventType,
        type: "pie",
        insidetextorientation: "radial"
    }
];

var pieLayout = { 
    title: "Fatalities by Sub Event Type"};
// plot
Plotly.newPlot("pie", pieData, pieLayout);

};

piePlot()




////////////////////////////////////////////////////


// PLOTLY WITH FILTERED QUERY


// // Arrays to hold movies by decade
// fatalities_list = [];
// year_list = [];

// //dataok = data[]
// // For loop to go through all movies
// for (let i = 0; i < data.length; i++) {

//   // Variable to hold current movie in loop
//   const event = data[i];
//   const properties = event[0].properties;
//   console.log(properties);
//   fatalities = properties.fatalities;
//   console.log(fatalities);

//   fatalities_list.push(properties.fatalities);
//   year_list.push(properties.year);

// };

// //let country = "Ukraine";
// let title = `Ukraine's Total Civilian Fatalities Per Year Plotly Chart`;

// // Assign `x` and `y` values for the Plotly trace object
// let trace1 = {
//   x: year_list,
//   y: fatalities_list,
//   type: 'bar'
// };

// // Leave the code below unchanged
// let data_plot = [trace1];

// let layout = {
//   title: title
// };

// Plotly.newPlot("plot", data_plot, layout);