console.log(data);

am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");
    
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.horizontalLayout
    }));
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legendData = [];
    var legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        //centerY: am5.p50,
        marginLeft: 20,
        y: 20,
        layout: root.verticalLayout,
        clickTarget: "none"
      })
    );
    
    var data = [{
      region: "2018",
      area: "Caribbean ",
      fatalities: 535
    }, {
      region: "2018",
      area: "Caucasus and Central Asia ",
      fatalities: 388
    }, {
      region: "2018",
      area: "Central America ",
      fatalities: 1446
    }, {
      region: "2018",
      area: "East Asia ",
      fatalities: 31
    }, {
      region: "2018",
      area: "Eastern Africa ",
      fatalities: 2350
    }, {
      region: "2018",
      area: "Europe ",
      fatalities: 42
    }, {
      region: "2018",
      area: "Middle Africa ",
      fatalities: 2468
    }, {
      region: "2018",
      area: "Middle East ",
      fatalities: 3096
    }, {
      region: "2018",
      area: "North America ",
      fatalities: 7546
    }, {
      region: "2018",
      area: "Northern Africa ",
      fatalities: 480
    }, {
      region: "2018",
      area: "South America ",
      fatalities: 4397
    }, {
      region: "2018",
      area: "South Asia ",
      fatalities: 966
    }, {
      region: "2018",
      area: "Southeast Asia ",
      fatalities: 1764
    }, {
      region: "2018",
      area: "Southern Africa ",
      fatalities: 53
    }, {
      region: "2018",
      area: "Western Africa ",
      fatalities: 4002
    }, {
      region: "2018",
      area: "Total 2018",
      fatalities: 28352
    }, {
      region: "2019",
      area: "  Caribbean",
      fatalities: 670
    }, {
      region: "2019",
      area: "  Caucasus and Central Asia",
      fatalities: 417
    }, {
      region: "2019",
      area: "  Central America",
      fatalities: 1753
    }, {
      region: "2019",
      area: "  East Asia",
      fatalities: 19
    }, {
      region: "2019",
      area: "  Eastern Africa",
      fatalities: 2779
    }, {
      region: "2019",
      area: "  Europe",
      fatalities: 39
    }, {
      region: "2019",
      area: "  Middle Africa",
      fatalities: 2610
    }, {
      region: "2019",
      area: "  Middle East",
      fatalities: 1859
    }, {
      region: "2019",
      area: "  North America",
      fatalities: 7385
    }, {
      region: "2019",
      area: "  Northern Africa",
      fatalities: 387
    }, {
      region: "2019",
      area: "  South America",
      fatalities: 3403
    }, {
      region: "2019",
      area: "  South Asia",
      fatalities: 1090
    }, {
      region: "2019",
      area: "  Southeast Asia",
      fatalities: 1421
    }, {
      region: "2019",
      area: "  Southern Africa",
      fatalities: 82
    }, {
      region: "2019",
      area: "  Western Africa",
      fatalities: 4438
    }, {
      region: "2019",
      area: "Total 2019",
      fatalities: 29863
    }, {
      region: "2020",
      area: "Caribbean",
      fatalities: 651
    }, {
      region: "2020",
      area: "Caucasus and Central Asia",
      fatalities: 831
    }, {
      region: "2020",
      area: "Central America",
      fatalities: 1109
    }, {
      region: "2020",
      area: " East Asia",
      fatalities: 9
    }, {
      region: "2020",
      area: " Eastern Africa",
      fatalities: 4286
    }, {
      region: "2020",
      area: " Europe",
      fatalities: 50
    }, {
      region: "2020",
      area: " Middle Africa",
      fatalities: 3447
    }, {
      region: "2020",
      area: " Middle East",
      fatalities: 2075
    }, {
      region: "2020",
      area: " North America",
      fatalities: 6869
    }, {
      region: "2020",
      area: " Northern Africa",
      fatalities: 533
    }, {
      region: "2020",
      area: " South America",
      fatalities: 3512
    }, {
      region: "2020",
      area: " South Asia",
      fatalities: 572
    }, {
      region: "2020",
      area: " Southeast Asia",
      fatalities: 1144
    }, {
      region: "2020",
      area: " Southern Africa",
      fatalities: 78
    }, {
      region: "2020",
      area: " Western Africa",
      fatalities: 4697
    }, {
      region: "2020",
      area: "Total 2020",
      fatalities: 33320
    },{
      region: "2021",
      area: " Caribbean ",
      fatalities: 683
    }, {
      region: "2021",
      area: " Caucasus and Central Asia ",
      fatalities: 992
    }, {
      region: "2021",
      area: " Central America ",
      fatalities: 1089
    }, {
      region: "2021",
      area: " East Asia ",
      fatalities: 20
    }, {
      region: "2021",
      area: " Eastern Africa ",
      fatalities: 5257
    }, {
      region: "2021",
      area: " Europe ",
      fatalities: 35
    }, {
      region: "2021",
      area: " Middle Africa ",
      fatalities: 3691
    }, {
      region: "2021",
      area: " Middle East ",
      fatalities: 1640
    }, {
      region: "2021",
      area: " North America ",
      fatalities: 6813
    }, {
      region: "2021",
      area: " Northern Africa ",
      fatalities: 577
    }, {
      region: "2021",
      area: " Oceania ",
      fatalities: 25
    }, {
      region: "2021",
      area: " South America ",
      fatalities: 3770
    },{
      region: "2021",
      area: " South Asia ",
      fatalities: 660
    }, {
      region: "2021",
      area: " Southeast Asia ",
      fatalities: 2444
    }, {
      region: "2021",
      area: " Southern Africa ",
      fatalities: 137
    }, {
      region: "2021",
      area: " Western Africa ",
      fatalities: 5487
    },{
      region: "2021",
      area: "Total 2021",
      fatalities: 17360
    }, {
      region: "2022",
      area: "  Caribbean ",
      fatalities: 363
    }, {
      region: "2022",
      area: "  Caucasus and Central Asia ",
      fatalities: 349
    }, {
      region: "2022",
      area: "  Central America ",
      fatalities: 442
    }, {
      region: "2022",
      area: "  East Asia ",
      fatalities: 22
    },  {
      region: "2022",
      area: "  Eastern Africa ",
      fatalities: 1488
    }, {
      region: "2022",
      area: "  Europe ",
      fatalities: 977
    }, {
      region: "2022",
      area: "  Middle Africa ",
      fatalities: 1900
    }, {
      region: "2022",
      area: "  Middle East ",
      fatalities: 744
    }, {
      region: "2022",
      area: "  North America ",
      fatalities: 2959
    }, {
      region: "2022",
      area: "  Northern Africa ",
      fatalities: 257
    }, {
      region: "2022",
      area: "  Oceania ",
      fatalities: 17
    }, {
      region: "2022",
      area: "  South America ",
      fatalities: 2211
    }, {
      region: "2022",
      area: "  South Asia ",
      fatalities: 295
    }, {
      region: "2022",
      area: "  Southeast Asia ",
      fatalities: 1375
    }, {
      region: "2022",
      area: "  Southern Africa ",
      fatalities: 49
    }, {
      region: "2022",
      area: "  Western Africa ",
      fatalities: 3912
    }, {
      region: "2022",
      area: "Total 2022",
      fatalities: 17360
    }];
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "area",
      renderer: am5xy.AxisRendererY.new(root, {
        minGridDistance: 5
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    yAxis.get("renderer").labels.template.setAll({
      fontSize: 9,
      location: 0.5
    })
    
    yAxis.data.setAll(data);
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "fatalities",
      categoryYField: "area",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal"
      })
    }));
    
    series.columns.template.setAll({
      tooltipText: "{categoryY}: [bold]{valueX}[/]",
      width: am5.percent(90),
      strokeOpacity: 0
    });
    
    series.columns.template.adapters.add("fill", function(fill, target) {
      if (target.dataItem) {
        switch(target.dataItem.dataContext.region) {
          case "2018":
            return chart.get("colors").getIndex(0);
            break;
          case "2019":
            return chart.get("colors").getIndex(1);
            break;
          case "2020":
            return chart.get("colors").getIndex(2);
            break;
          case "2021":
            return chart.get("colors").getIndex(3);
            break;
          case "2022":
            return chart.get("colors").getIndex(4);
            break;
        }
      }
      return fill;
    });
    
    series.data.setAll(data);
    
    function createRange(label, category, color) {
      var rangeDataItem = yAxis.makeDataItem({
        category: category
      });
      
      var range = yAxis.createAxisRange(rangeDataItem);
      
      rangeDataItem.get("label").setAll({
        fill: color,
        text: label,
        location: 1,
        fontWeight: "bold",
        dx: -130
      });
    
      rangeDataItem.get("grid").setAll({
        stroke: color,
        strokeOpacity: 1,
        location: 1
      });
      
      rangeDataItem.get("tick").setAll({
        stroke: color,
        strokeOpacity: 1,
        location: 1,
        visible: true,
        length: 130
      });
      
      legendData.push({ name: label, color: color });
      
    }
    
    createRange("2018", "Total 2018", chart.get("colors").getIndex(0));
    createRange("2019", "Total 2019", chart.get("colors").getIndex(1));
    createRange("2020", "Total 2020", chart.get("colors").getIndex(2));
    createRange("2021", "Total 2021", chart.get("colors").getIndex(3));
    createRange("2022", "Total 2022", chart.get("colors").getIndex(4));

    legend.data.setAll(legendData);
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      yAxis: yAxis
    }));
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(2000, 200);
    
    });