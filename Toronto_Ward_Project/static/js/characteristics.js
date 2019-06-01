//Default plot once the page loads
//var defaultURL = "/wardCharacteristics";
//#d3.json(defaultURL).then(function(data)) {
    var values = {
        owned_2016: [ 9920, 11700, 14280, 12630, 19050, 17390, 10075, 6835, 8570, 12305,
                12735, 9225, 13885, 8020, 11705,13470,11950,9990,16710,19395,
                9245, 14110, 25760,16480, 15035, 10600, 18645, 13910, 10370,13720,
                11745,15010, 12330, 9650, 12200, 12815, 13705, 14300, 13765,13480,
                16570, 16570,10580, 16615],
        ward_2016: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,28, 29,30,   
                31, 32, 33, 34, 35, 36, 37, 38,39, 40,
                41, 42, 43, 44
            ],
        hh_with_children_2016:  [7965, 8500, 7925, 8565, 10985, 11370, 7985, 7685, 7280, 10045,
                            9765, 8610, 8835, 7710, 8770, 6715, 7705, 7580, 10920, 14450, 
                            7290,10975, 14490, 9995, 8185, 8055, 13470, 12470, 6675, 8450, 
                            7645, 8720, 8770, 8900, 8815, 7905, 9185, 9765, 8140, 9430, 
                            9360, 9320, 8235, 8450
        ],
        rental_2016: [8385, 7765, 5780, 9155,11415, 15195, 7140, 10785, 8195, 14190,
                12165, 10855, 11485, 18450, 12165, 7935, 7810, 12600, 16960, 33045,
                12925, 22330, 16040, 9305, 8550, 14825, 32250, 27890, 9765, 9840,
                10325, 10585, 10470, 13955, 11655, 8320, 9345,10385,3580, 10660,
                3295, 5555, 9080, 3415
        ]};

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

