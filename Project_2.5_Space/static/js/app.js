var CountryObj = [];
var StatusMissionObj = [];

// async function chart() {
//   const dataset = await d3.json("/api/v1.0/successfullaunches")
//   // const dataset = await d3.json("assets/js/launches.json")
//   console.log(dataset)
// }

// chart()
var samplesObj=[]


function plotTopTen(samples, country){
  // Sort the objects by sample_value and then slice the top ten
  var sortedById = samples.sort((a,b) => b.Success - a.Success);
  var slicedTopTen = sortedById.slice(0,10);
  var reversedTopTen = slicedTopTen.reverse();
  
    // Trace1 for the Top Ten Data
  var trace1 = {
      y: reversedTopTen.map(row => row.Success),
      x: reversedTopTen.map(row => row.Country),
      text: reversedTopTen.map(row => row.Country),
      name: `launch`,
      marker:{
          'color': "#3b8cf5",
          // 'colorscale': 'fall'
      },
      type: "bar",
  };

  // data to be used for the plot
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
      title: `Number of Successful Launches`,
      // This is for the hover label!!!!
      hoverlabel:{
          bgcolor: "white",
          font: {color: 'red'}
      },
      margin: {
      l: 70,
      r: 70,
      t: 30,
      b: 100
      }
  };

  // Render the plot to the div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", chartData, layout);
  return reversedTopTen;
}



var statusObj=[]


function plotPie(data) {
  console.log(data);
  //Grab the data for the pie chart.
  var space_launches = data.map(d => d['Space Launches']);
  var mission_status = data.map(d => d['Mission Status']);

  var pieData = [{
    values: space_launches,
    labels: mission_status,
    type: 'pie',
    title: {
      text: "Mission Status for Space Launches",
      font: {
        color: 'red',
        size: 40,
        style: 'bold',
      },
    },
  }]
  
  var layout = {
    height: 700,
    width: 600
  }
  
  Plotly.newPlot('piechart', pieData, layout)
}

function init() {
  d3.json("/api/v1.0/successfullaunches").then((samplesData) => {
    // console.log(samplesObj);
    plotTopTen(samplesData);
    // plotBubbleChart(samplesObj);
  }).catch(function (error){
    console.log("there is something going on" + error);
  });
  d3.json("/api/v1.0/statusmission").then((statusData) => {
    plotPie(statusData);
  }).catch(function (error){
    console.log("there is something going on" + error);
  });
}

init()

// function plotCompany(launches, company){
//   // Sort the objects by sample_value and then slice the top ten
//   var sortedById = launches.sort((a,b) => b.Success - a.Success);
//   var slicedTopTen = sortedById.slice(0,10);
//   var reversedTopTen = slicedTopTen.reverse();
//     // Trace1 for the Top Ten Data
//   var trace1 = {
//       y: reversedTopTen.map(row => row.Success),
//       x: reversedTopTen.map(row => row.Company),
//       text: reversedTopTen.map(row => row.Company),
//       name: launch,
//       marker:{
//       'color': "#1F618D",
//     },
//       type: "bar",
//       orientation: "h" ,
//   };
//   // data to be used for the plot
//   var chartData = [trace1];
//   // Apply the group bar mode to the layout
//   var layout = {
//       title: 'Company with Successful Launches',
//       // This is for the hover label!!!!
//       hoverlabel:{
//           bgcolor: "white",
//           font: {color: 'purple'}
//       },
//       margin: {
//       l: 70,
//       r: 70,
//       t: 30,
//       b: 100
//       }
//   };
//   // Render the plot to the div tag with id "bar-plot"
//   Plotly.newPlot("bar-plot", chartData, layout);
//   return reversedTopTen;
// }




