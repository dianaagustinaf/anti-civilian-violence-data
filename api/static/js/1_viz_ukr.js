
console.log("hello");
console.log(data);

// create map
var myMap = L.map("my_map", {
    center: [49.05, 33.22],
    zoom: 6
});

// Add tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// loop over geojson to find radius size 
// for(var i=0; i < data.feature.length; i++) {
//   var radius = Math.sqrt(data.feature[i].properties.fatalities)*10,
// };

var markers = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "red",
    color: "red",
    // fatality count 
    // radius: radius
    radius: 3,
    stroke: true,
    weight: 0.5
};

// shan add layer here = each year or sub event type?

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markers);
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Location: " + feature.properties.location
            + "<br> Event Date: " + feature.properties.event_date
            + "<br>Sub-Event Type: " + feature.properties.sub_event_type
            + "<br>Fatalities: " + feature.properties.fatalities)
        // layer.on({
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        // click: zoomToFeature
        // });
    }
}).addTo(myMap);




// PANEL

// Funnel in Ukraine data
function ukraine_data() {
    var ukraine = d3.select("#ukraine_data");
    // I don't think I am using the geojson correctly 
    // go over this in class 

    // change on locations
    var locations = data.feature.properties.location;

    locations.forEach((location) => {
        ukraine.append("option").text(location).property("value", location);
    });
    // these are the locations
    var firstLocation = locations[0];
    chooseLocation(first_location);
}

ukraine_data();

function optionChanged(location) {
    chooseLocation(location);
}

function chooseLocation(location) {
    (data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(locationobj => location == location);
        var results = resultsarray[0]
        // link to html panel to visulise data 
        var panel = d3.select("#location-metadata");
        panel.html("");
        Object.entries(results).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}:${value}`);
        });
    };
}


// plots

// how to funnel in geojson data to use for plots? Same issue as panel 
function plotCharts() {


    // ids, labels, values

    // data 
    varData = [
        {
            x: data.feature.properties.event_date,
            y: data.features.properties.fatalities,
            //text: ,
            type: "bar"
        }
    ];

    var barLayout = { title: "Fatalities over time: 2018-2022" };
    // plot
    Plotly.newPlot("bar", barData, barLayout);
};
