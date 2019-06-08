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
    var trace4 = {
        x: dataset.ward,
        y: dataset.hh_with_children_2011,
        name: "2011 Households with Children",
        type: "scatter",
        mode: "markers",
        marker: {
            color: "red",
            symbol: "circle",
            size: 10
            },            
    }

    var data = [trace3, trace4];
    var layout = {
        xaxis: { title: "Ward" },
        yaxis: { title: "Characteristic"},
        title: "Households with Children"
    };
    Plotly.newPlot("plot", data, layout);
});

function getData(values){
    var datay1 = [];
    var datay2 = [];
    var color1 = [];
    var color2 = [];
    var symbol1 = [];
    var symbol2 = [];
    var name1 = [];
    var name2 = [];
    //fill the array as a function of the selected dataset
    switch (values) {
        case "dataset3": 
            datay1 = dataset.owned_2016;
            datay2 = dataset.owned_2011;
            color1 = "green";
            color2 = "dark blue";
            symbol1 = "diamond";
            symbol2 = "circle";
            name1 = "2016 Households with Owned Homes";
            name2 = "2011 Households with Owned Homes";
        break;
        case "dataset2":
            datay1 = dataset.rental_2016;
            datay2 = dataset.rental_2011;
            color1 = "green";
            color2 = "dark blue";
            symbol1 = "diamond";
            symbol2 = "circle";
            name1 = "2016 Households with Rental Homes";
            name2 = "2011 Households with Rental Homes"
        break;
        case "dataset1":
            datay1 = dataset.hh_with_children_2016;
            datay2 = dataset.hh_with_children_2011;
            color1 = "green";
            color2 = "dark blue";
            symbol1 = "diamond";
            symbol2 = "circle";
            name1 = "2016 Households with Children";
            name2 = "2011 Households with Children";
    }
    drawPlot(datay1, datay2, color1, color2, symbol1, symbol2, name1, name2)
}

function drawPlot(datay1, datay2, color1, color2, symbol1, symbol2, name1, name2){  
    Plotly.purge("plot");
    var trace5 = {
            x: dataset.ward,
            y: datay1,
            name: name1,
            type: "scatter",
            mode: "markers",
            marker: {
                color: color1,
                symbol: symbol1,
                size: 10
                },
            };
        var trace6 = {
            x: dataset.ward,
            y: datay2,
            name: name2,
            type: "scatter",
            mode: "markers",
            marker: {
                color: color2,
                symbol: symbol2,
                size: 10
                },
            };


    // Define the plot layout
    var data = [trace5, trace6];
    var layout = {
        xaxis: { title: "Ward" },
        yaxis: { title: "Characteristic"},
        title: `${name}`
    }
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("plot", data, layout);
};