// const ward=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
// const average2015= [70939, 80685, 110440, 141783, 126802, 87794, 72300, 59421, 71681, 92587, 66447, 69783, 119822, 79073, 80644, 233103, 82761, 77510, 105144, 104119, 151848, 167159, 87263, 96321, 261595, 109375, 145614, 90911, 100840, 105059, 82373, 123511, 80276, 80779, 67193, 89840, 72415, 69301, 78138, 72405, 79646, 81529, 74537, 108436];
// const median2015=[60352, 64543, 81839, 78617, 80076, 66350, 59339, 48445, 56283, 62210, 53939, 52967, 81931, 52821, 58180, 112882, 67701, 61863, 75795, 69504, 70815, 76002, 62640, 67909, 98418, 59984, 59430, 58881, 65610, 75904, 61575, 82966, 63879, 61000, 54317, 64909, 60079, 58202, 62875, 57626, 66168, 70764, 56856, 91360];
// const average2010=[66001, 72100, 95259, 106513, 110919, 79279, 62541, 52280, 60550, 78704, 61883, 61271, 105852, 67305, 71529, 175528, 71259, 67392, 85294, 84382, 116008, 128973, 83641, 91433, 202111, 88404, 109667, 75284, 84631, 89388, 71471, 108092, 73194, 74008, 59212, 80620, 65749, 64378, 71264, 64464, 75275, 74662, 67686, 100626];
// const median2010=[55027, 57718, 72175, 69501, 75035, 59914, 51104, 42849, 48992, 53876, 48812, 46970, 71505, 44241, 50205, 94306, 58037, 53334, 64753, 57129, 60392, 67724, 62342, 65413, 89920, 54784, 53255, 47675, 59512, 66139, 56169, 74045, 58623, 54429, 47138, 57923, 53677, 52833, 57296, 50916, 61344, 62965, 51064, 85722];
var ward = []
var incomeaverage2015 = []
var incomemedian2015 = []
var incomeaverage2010 = []
var incomemedian2010 = []

d3.json("/barplot", function(response) {

  ward = response.map(row=>row.ward)
  incomeaverage2015 = response.map(row=>row.incomeaverage2015)
  incomemedian2015 = response.map(row=>row.incomemedian2015)
  incomeaverage2010 = response.map(row=>row.incomeaverage2010)
  incomemedian2010 = response.map(row=>row.incomemedian2010)

var trace1 = {
    x: response.map(row => row.ward),
    y: response.map(row => row.incomeaverage2015),
    name: 'average',
    opacity:.75,
    offsetgroup: 1,
    type: 'bar'
  };

  var trace2 = {
    x: response.map(row => row.ward),
    y: response.map(row => row.incomemedian2015),
    name: 'median',
    offsetgroup: 1,
    opacity:.75,
    width: 0.5,
    type: 'bar'
  };
  
  var bar_data = [trace1,trace2];
  
  var layout = {
    title: 'Income by Ward',
    yaxis: {title: 'Income'},
    tickmode: "array",
    tickvals: response.map(row => row.incomeaverage2015),
    bargap:.04,
    yaxis2: {
        titlefont: {color: 'green'},
        tickfont: {color: 'green'},
        overlaying: 'y',
        bargap:.90,
        tickmode: "array",
        tickvals: response.map(row => row.incomemedian2015),
        side: 'right'
      }
  };
  
  Plotly.newPlot("barplot", bar_data, layout);
});

function getData_bar(event) {
  console.log(event)
  var data = [];
  switch (event) {
  case "dataset7":
    trace1_y = incomeaverage2015
    trace2_y = incomemedian2015
    break;
  case "dataset8":
    trace1_y = incomeaverage2010
    trace2_y = incomemedian2010
    break;
  }
  var trace1 = {
    x: ward,
    y: trace1_y,
    name: 'average',
    opacity:.75,
    offsetgroup: 1,
    type: 'bar'
  };

  var trace2 = {
    x: ward,
    y: trace2_y,
    name: 'median',
    offsetgroup: 1,
    opacity:.75,
    width: 0.5,
    type: 'bar'
  };
  
  var barswitch_data = [trace1,trace2];
  
  var layout = {
    title: 'Income by Ward',
    autosize: true,
    yaxis: {title: 'Income'},
    tickmode: "array",
    tickvals: trace1_y,
    bargap:.04,
    yaxis2: {
        titlefont: {color: 'green'},
        tickfont: {color: 'green'},
        overlaying: 'y',
        bargap:.90,
        tickmode: "array",
        tickvals: trace2_y,
        side: 'right'
      }
  };
  
  Plotly.newPlot("barplot", barswitch_data, layout);
}
