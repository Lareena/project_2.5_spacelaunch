// var CountryObj = [];
// var StatusMissionObj = [];

// async function chart() {
//   const dataset = await d3.json("/api/v1.0/successfullaunches")
//   // const dataset = await d3.json("assets/js/launches.json")
//   console.log(dataset)
// }

// chart()
var samplesObj=[]
d3.json("/api/v1.0/successfullaunches").then((samplesData) => {
  
  var data = samplesData;
  console.log(data);

  data.forEach(obj => samplesObj.push(obj));
  // console.log(samplesObj);
  plotTopTen(samplesObj);
  // plotBubbleChart(samplesObj);
}).catch(function (error){
  console.log("there is something going on" + error);
});

function plotTopTen(samples,country){

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
d3.json("/api/v1.0/statusmission").then((statusData) => {
  
  var data = statusData;
  console.log(data);

  data.forEach(obj => statusObj.push(obj));
  // console.log(samplesObj);
  plotPie(statusObj);
  // plotBubbleChart(samplesObj);
}).catch(function (error){
  console.log("there is something going on" + error);
});

function plotPie(statusData,country){

// Grab the data for the pie chart.

  var piedata



// d3.json("launches.json").then((data) => {
//   console.log("hello world")
  //console.log(data)
  //Create trace
  // var trace1 = {
  //     x: data.Country,
  //     y: data.StatusMission,
  //     type: "bar",
  //     name: "Successful Launches"
  // };
  
  // //create data array for plot
  // var data = [trace1];

  // //define plot layout
  // var layout = {
  //     title: "successful launches per country",
  //     xaxis: { title: "Country" },
  //     yaxis: { title: "success" }
     
  // };

  // //plot chart to div tage with id "plot"
  // Plotly.newPlot("plot", data, layout);
// });



