//Load the data
var url = "/wards";
d3.json(url).then(function(values) {
    console.log (values);

    function drawPlot(datay,color,symbol, name){        
        Plotly.purge(plot);
        var data = [{
                x: values.ward,
                y: datay,
                name: name,
                mode: "markers",
                    type: "scatter",
                    marker: {
                        color: color,
                        symbol: symbol
                        },
                    }];
        // Define the plot layout
        var layout = {
            xaxis: { title: "Ward" },
            yaxis: { title: "Characteristic" },
            title:  "2016 Ward Characteristics"
        };
        // Plot the chart to a div tag with id "plot"
        Plotly.plot("plot", data, layout);
    }

    //Get new data whenever the dropdown selection changes;
    function getData(dataset){
        console.log(dataset);
        var datay = [];
        var color = [];
        var symbol = [];
        var name = [];
        

        //fill the array as a function of the selected dataset
        switch (dataset) {
            case "dataset6":
                    var datay = values.owned_2011;
                    var color = "blue";
                    var symbol = "x";
                    var name = "2011 Households with Owned Homes";
                break;
            case "dataset5":
                    var datay = values.rental_2011;
                    var color = "blue";
                    var symbol = "circle";
                    var name = "2011 Rental Households";
                break;
            case "dataset4":
                    var datay = values.hh_with_children_2016;
                    var color = "blue";
                    var symbol = "hexagram";
                    var name = "2016 Households with Children";
                break;
            case "dataset3": 
                var datay = values.owned_2016;
                var color = "green";
                var symbol = "x";
                var name = "2016 Households with Owned Homes";
            break;
            case "dataset2":
                    var datay = values.rental_2016;
                    var color = "red";
                    var symbol = "circle";
                    var name = "2016 Rental Households";
            break;
            case "dataset1":
                var datay = values.hh_with_children_2016;
                var color = "blue";
                var symbol = "hexagram";
                var name = "2016 Households with Children";
        }
        drawPlot(datay,color,symbol, name);
    }
});
