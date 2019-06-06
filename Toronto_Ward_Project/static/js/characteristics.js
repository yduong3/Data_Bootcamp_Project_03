var url = "/wards";
var dataset = "";

function getData(values){
    console.log(values);
    var datay = [];
    var color = [];
    var symbol = [];
    var name = [];
    console.log(dataset)
    //fill the array as a function of the selected dataset
    switch (values) {
        case "dataset6":
                datay = dataset.owned_2011;
                color = "blue";
                symbol = "x";
                name = "2011 Households with Owned Homes";
            break;
        case "dataset5":
                datay = dataset.rental_2011;
                color = "blue";
                symbol = "circle";
                name = "2011 Rental Households";
            break;
        case "dataset4":
                datay = dataset.hh_with_children_2016;
                color = "blue";
                symbol = "hexagram";
                name = "2016 Households with Children";
            break;
        case "dataset3": 
            datay = dataset.owned_2016;
            color = "green";
            symbol = "x";
            name = "2016 Households with Owned Homes";
        break;
        case "dataset2":
            datay = dataset.rental_2016;
            color = "red";
            symbol = "circle";
            name = "2016 Rental Households";
        break;
        case "dataset1":
            datay = dataset.hh_with_children_2016;
            color = "blue";
            symbol = "hexagram";
            name = "2016 Households with Children";
    }
    drawPlot(datay, color, symbol, name)
}

function drawPlot(datay, color, symbol, name){  
    Plotly.purge(plot);
    var data = [{
            x: dataset.ward,
            y: datay,
            name: name,
            mode: "markers",
                type: "scatter",
                marker: {
                    color: color,
                    symbol: symbol,
                    size = 15
                    },
                }];
    // Define the plot layout
    var layout = {
        xaxis: { title: "Ward" },
        yaxis: { title: "Characteristic" }
    };
    // Plot the chart to a div tag with id "plot"
    Plotly.plot("plot", data, layout);
}

d3.json(url, function(values) {
    console.log (values);
    dataset = values
});
