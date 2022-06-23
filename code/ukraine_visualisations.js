// Ukraine flask here 


// Funnel in Ukraine data
function ukraine_data(){
    var ukraine = d3.select("#ukraine_data");

    d3.json("ASK_DIANA.json").then((data) => {
        var locations = data.locations;
// 'option' - in html? - need to add in 
// look through html - where does the corresponding code go?
        locations.forEach((location) => {
            ukraine.append("option").text(location).property("value", location);
        });
        // these are the locations
        var firstLocation = locations[0];
        chooseLocation(firstLocation);
        plotCharts(firstLocation);
    });

}

ukraine_data();

function optionChanged(location) {
    chooseSample(location);
    plotCharts(location);
}

function chooseLocation(location){
    d3.json("ASK_DIANA.json").then((data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(locationobj => location.id == location);
    var results = resultsarray[0]
    // create panel in html - see if this works 
    var panel = d3.select("#location-metadata");
    panel.html("");
    Object.entries(results).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}:${value}`);
    });
});
}

// Function
function plotCharts(location){
    d3.json("ASK_DIANA.json").then((data) => {
        var locations = data.locations;
        var loaction_array = locations.filter(obj => obj.id == location);
        var location_array_res = location_array[0];

        // Bar Chart - fatalities over time?
        var location_id = 

        var yticks = 

        var barData = [
            {
                x: location_values.slice(0,10).reverse(),
                y: yticks,
               // text: (location and fatality count?)
                type: "bar",
            }
        ];
        // create div bar in html shannon 
        var barLayout = {title: "Civilian Fatalities: Conflict from 2018-present"};
        Plotly.newPlot("bar", barData, barLayout);