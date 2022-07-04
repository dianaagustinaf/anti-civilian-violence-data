
//console.log("hello");
//console.log(data);

var myMap = L.map("my_map", {
    center: [49.05, 33.22],
    zoom: 6,
    minZoom: 5
});

// Add tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//Size / Radius
function markerSize(number) {
    if (number==0) {
        number=1
    }
    return Math.sqrt(number) * 4;
  }

var markers = {
    // opacity: 1,
    // fillOpacity: 1,
    fillColor: "orange",
    color: "orange",
    //radius: fatalities
    //radius: 3,
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
            radius: markerSize(parseInt(feature.properties.fatalities))
        })

        layer.bindPopup("Location: " + feature.properties.location
            + "<br> Event Date: " + feature.properties.event_date
            + "<br>Sub-Event Type: " + feature.properties.sub_event_type
            + "<br>Fatalities: " + feature.properties.fatalities
            + "<br>Notes: " + feature.properties.notes)

    }
}).addTo(myMap);


// Bar Plot 

var featuresData = data["features"]
var year = []
var fatalities = []
var subEventType = []
var event_date = []


console.log(featuresData.length)


for (i = 0; i < featuresData.length; i++) {
    year.push(featuresData[i]['properties']['year']);
    fatalities.push(parseInt(featuresData[i]['properties']['fatalities']));
    subEventType.push(featuresData[i]['properties']['sub_event_type']);
    event_date.push(featuresData[i]['properties']['event_date']);
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
    barmode: 'stack',
    title: "Fatalities over time: 2018-2022"
};
// plot
Plotly.newPlot("bar", varData, barLayout);



// Pie Plot 

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
        title: "Fatalities by Sub Event Type"
    };
    // plot
    Plotly.newPlot("pie", pieData, pieLayout);

};

piePlot()


function plotLines() {

    lineData = [
        {
            x: event_date,
            y: fatalities,
            //text: ,
            type: "scatter"
        }
    ];

    var linesLayout = { title: "Conflict Fatalities" };
    // plot
    Plotly.newPlot("lines", lineData, linesLayout);

};

plotLines()