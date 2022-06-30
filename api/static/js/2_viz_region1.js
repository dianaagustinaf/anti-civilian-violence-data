//console.log(data);

// Arrays to hold movies by decade
fatalities_list = [];
year_list = [];

//dataok = data[]
// For loop to go through all movies
for (let i = 0; i < data.length; i++) {

  // Variable to hold current movie in loop
  const event = data[i];
  const properties = event[0].properties;
  console.log(properties);
  fatalities = properties.fatalities;
  console.log(fatalities);

  fatalities_list.push(properties.fatalities);
  year_list.push(properties.year);

};

//let country = "Ukraine";
let title = `Ukraine's Total Civilian Fatalities Per Year Plotly Chart`;

// Assign `x` and `y` values for the Plotly trace object
let trace1 = {
  x: year_list,
  y: fatalities_list,
  type: 'bar'
};

// Leave the code below unchanged
let data_plot = [trace1];

let layout = {
  title: title
};

Plotly.newPlot("plot", data_plot, layout);