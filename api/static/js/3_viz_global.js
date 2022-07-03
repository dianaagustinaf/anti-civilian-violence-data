console.log(data);

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
Plotly.newPlot("pie-chart", pieData, pieLayout);

};

piePlot()
