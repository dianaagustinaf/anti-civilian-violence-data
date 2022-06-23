function ukraine_data(){
    var ukraine = d3.select("#ukraine_data");

    d3.json("?.json").then((data) => {
        var locations = data.locations;

        sampleNames.forEach((sample) => {
            selData.append("option").text(sample).property("value", sample);
        });
        // these are the samples
        var firstSample = sampleNames[0];
        chooseSample(firstSample);
        plotCharts(firstSample);
    });

}

selDataset();

function optionChanged(sample) {
    chooseSample(sample);
    plotCharts(sample);
}

function chooseSample(sample){
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(sampleobj => sampleobj.id == sample);
    var results = resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(results).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}:${value}`);
    });
});
}

// Function
function plotCharts(sample){
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var sample_array = samples.filter(obj => obj.id == sample);
        var sample_array_res = sample_array[0];

        // Bar Chart
        var otu_ids = sample_array_res.otu_ids;
        var otu_labels = sample_array_res.otu_labels;
        var sample_values = sample_array_res.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [
            {
                x: sample_values.slice(0,10).reverse(),
                y: yticks,
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];
        var barLayout = {title: "Top 10 "};
        Plotly.newPlot("bar", barData, barLayout);