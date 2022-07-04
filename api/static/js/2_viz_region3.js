//console.log(data);

var myMap = L.map("my_map", {
    center: [35.31, -103.59],
    zoom: 4,
    minZoom: 3
});

// tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Color
function chooseColor(country) {                   
    if (country == "Ukraine") {        // subtype event? fatalities more than ... ?
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

///////////////////////////////////// Data for bar and pie

var featuresData = data["features"]
var year = []
var fatalities = []
var subEventType = []


for (i=0; i< featuresData.length; i++){
    year.push(featuresData[i]['properties']['year']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));
    subEventType.push(featuresData[i]['properties']['sub_event_type']);          
}

yearlist = [2018,2019,2020,2021,2022]

function sumFatalities(yearraw, fatalitiesraw) {

    let fatalitieslist = [0,0,0,0,0]

    for (let i = 0; i < yearraw.length; i++) {
        const year = yearraw[i];
        const fatality = fatalitiesraw[i];

        if (year == 2018) {
            fatalitieslist[0] = fatalitieslist[0] + fatality       
        } else if (year == 2019) {
            fatalitieslist[1] = fatalitieslist[1] + fatality
        } else if (year == 2020) {
            fatalitieslist[2] = fatalitieslist[2] + fatality
        } else if (year == 2021) {
            fatalitieslist[3] = fatalitieslist[3] + fatality
        } else if (year == 2022) {
            fatalitieslist[4] = fatalitieslist[4] + fatality
        }
    }
    console.log(fatalitieslist);
    return fatalitieslist;
}

let fatalitiessumlist = sumFatalities(year,fatalities);


/////////////////////////////////////////////// Bar Plot 

function barPlot() {

    varData = [
        {
            x: yearlist,
            y: fatalitiessumlist,
            text: fatalitiessumlist.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            type: "bar",
            marker: {
                color: 'orange',
                opacity: 0.9,
                line: {
                  color: 'black',
                  width: 1.5
                }
            }
        }
    ];

    var barLayout = { 
        title: "Civilian Fatalities Over Time: 2018-2022",
        barmode: 'stack'
    };
    // plot
    Plotly.newPlot("bar", varData, barLayout);

};

barPlot()

/////////////////////////////////////////////////////// Pie Plot 

var ultimateColors = ['rgb(255, 165, 0)','rgb(0, 0, 0)', 'rgb(255, 80, 0)', 'rgb(30, 30, 167)']

function piePlot() {

    pieData = [
        {
            values: fatalities,
            labels: subEventType,
            type: "pie",
            marker: {
                colors: ultimateColors
            },
            textinfo: "label+percent",
            textposition: "outside",
            hole: .3,
            rotation: 135
        }
    ];

    var pieLayout = { 
        title: "Fatalities by Sub Event Type"
    };

    Plotly.newPlot("pie", pieData, pieLayout);

    };

piePlot()