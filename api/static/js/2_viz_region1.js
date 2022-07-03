//console.log(data);

var myMap = L.map("my_map", {
    center: [48.31, 22.59],
    zoom: 4
});

// tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Color
function chooseColor(country) {                   
    if (country == "Ukraine") {
        return "black";
    } else {
        return "orange";
    }
}

//Size / Radius
function markerSize(number) {
    if (number==0) {
        number=1
    }
    return Math.sqrt(number) * 4;
  }

var markers = {
    //opacity: 0.7,       // onEachFeature
    //fillOpacity: 0.7,
    color: "orange",
    //fillColor: "orange",
    //radius: 5,
    stroke: true,
    weight: 0.5
};


L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markers);
    },
    onEachFeature: function (feature, layer) {

        layer.on({
            mouseover: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillOpacity:0.8
                })
            },

            mouseout: function (event) {
                layer = event.target;
                layer.setStyle({
                    fillOpacity:0.5
                })
            }

            //click: zoomToFeature
            });

        layer.setStyle({
            radius: markerSize(parseInt(feature.properties.fatalities)),
            fillColor: chooseColor(feature.properties.country)
        })

        layer.bindPopup("<h5> Location: " + feature.properties.location
            + "</h5> <br> Event Date: " + feature.properties.event_date
            + "<br>Sub-Event Type: " + feature.properties.sub_event_type
            + "<br>Fatalities: " + feature.properties.fatalities
            + "<br>Notes: " + feature.properties.notes)
    }
}).addTo(myMap);


// let group = L.markerClusterGroup();
// myMap.addLayer(group);

/////////////////////////////////////////////// Bar Plot 

// Data

var featuresData = data["features"]
var year = []
var fatalities = []
var subEventType = []


for (i=0; i< featuresData.length; i++){
    year.push(featuresData[i]['properties']['year']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));
    subEventType.push(featuresData[i]['properties']['sub_event_type']);          
}

function barPlot() {

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

barPlot()

// Pie Plot 

// for (i=0; i< featuresData.length; i++){
//     subEventType.push(featuresData[i]['properties']['sub_event_type']);
//     fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));          
// }

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