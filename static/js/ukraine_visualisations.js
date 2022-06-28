// Ukraine flask here 
var data = {{gj |safe}}

// Funnel in Ukraine data
function data(){
    var ukraine = d3.select("#ukraine_data");
        // chnage locations to sub-type?
        var sub_event_types = feature.properties.sub_event_type;
// 'option' - in html? - need to add in 
// look through html - where does the corresponding code go?
    sub_event_types.forEach((sub_event_type) => {
            ukraine.append("option").text(sub_event_type).property("value", sub_event_type);
        });
        // these are the locations
        var firstLocation = sub_event_types[0];
        chooseLocation(first_sub_event_type);
        plotCharts(firstsub_event_type);
    };

ukraine_data();

function optionChanged(sub_event_type) {
    chooseSample(sub_event_type);
    plotCharts(sub_event_type);
}

function chooseLocation(sub_event_type){
    (data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(sub_event_typeobj => sub_event_type == sub_event_type);
    var results = resultsarray[0]
    // create panel in html - see if this works 
    var panel = d3.select("#sub_event_type-metadata");
    panel.html("");
    Object.entries(results).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}:${value}`);
    });
};
}

// // Function
// function plotCharts(sub_event_type){
//     d3.json("ASK_DIANA.json").then((data) => {
//         var locations = data.locations;
//         var loaction_array = locations.filter(obj => obj.id == location);
//         var location_array_res = location_array[0];

//         // Bar Chart - fatalities over time?
//         //var location_id = 

//         //var yticks = 

//         //var barData = [
//             {
//                 x: location_values.slice(0,10).reverse(),
//                 y: yticks,
//                // text: (location and fatality count?)
//                 type: "bar",
//             }
//         ];
//         // create div bar in html shannon 
//         var barLayout = {title: "Civilian Fatalities: Conflict from 2018-present"};
//         Plotly.newPlot("bar", barData, barLayout);
//     }
//     )};