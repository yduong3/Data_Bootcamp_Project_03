var dataset = "";
d3.json("/wards", function(values) {
    dataset=values
    // console.log(dataset)
    // console.log(values)
    var trace3 = {
        x: dataset.ward,
        y: dataset.hh_with_children_2016,
        name: "2016 Households with Children",
        type: "scatter",
        mode: "markers",
        marker: {
            color: "blue",
            symbol: "square",
            size: 10
            },
    };

    var data = [trace3];
    var layout = {
        xaxis: { title: "Ward" },
        yaxis: { title: "Characteristic"},
        title: "2016 Households with Children"
    };
    Plotly.newPlot("plot", data, layout);
});

function getData(values){
    var datay = [];
    var color = [];
    var symbol = [];
    var name = [];
    //fill the array as a function of the selected dataset
    switch (values) {
        case "dataset6":
                datay = dataset.owned_2011;
                color = "green";
                symbol = "diamond";
                name = "2011 Households with Owned Homes";
            break;
        case "dataset5":
                datay = dataset.rental_2011;
                color = "red";
                symbol = "circle";
                name = "2011 Rental Households";
            break;
        case "dataset4":
                datay = dataset.hh_with_children_2011;
                color = "blue";
                symbol = "square";
                name = "2011 Households with Children";
            break;
        case "dataset3": 
            datay = dataset.owned_2016;
            color = "green";
            symbol = "diamond";
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
            symbol = "square";
            name = "2016 Households with Children";
            header = "2016 Households with Children";
    }
    drawPlot(datay, color, symbol, name)
}

function drawPlot(datay, color, symbol, name){  
    Plotly.purge("plot");
    var trace4 = {
            x: dataset.ward,
            y: datay,
            name: name,
            type: "scatter",
            mode: "markers",
            marker: {
                color: color,
                symbol: symbol,
                size: 10
                },
            };
    // Define the plot layout
    var data = [trace4];
    var layout = {
        xaxis: { title: "Ward" },
        yaxis: { title: "Characteristic"},
        title: `${name}`
    }
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
};