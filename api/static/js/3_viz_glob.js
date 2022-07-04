//console.log(data);

var myMap = L.map("my_map", {
    center: [23.05, -1.22],
    zoom: 2,
    minZoom: 2
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
    return Math.sqrt(number) * 1.5;
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

        layer.bindPopup("<h5> Location: " + feature.properties.country
            + "</h5> <br> Fatalities: " + feature.properties.fatalities
        )
    }
}).addTo(myMap);


////////////////////////////////////   PIE

var featuresData = data["features"]
var country = []
var fatalities = []


for (i=0; i< featuresData.length; i++){
    country.push(featuresData[i]['properties']['country']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));          
}

function piePlot() {

    pieData = [
        {
            values: fatalities,
            labels: country,
            type: "pie",
            textinfo: 'none',
            insidetextorientation: "radial"
        }
    ];

    var pieLayout = { 
        title: "Fatalities by Country 2022"};
    // plot
    Plotly.newPlot("pie", pieData, pieLayout);

};

piePlot()