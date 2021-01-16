var CountryObj = [];
var StatusMissionObj = [];


d3.json("launches.json").then((data) => {
  //Create trace
  var trace1 = {
      x: data.Country,
      y: data.StatusMission,
      type: "bar",
      name: "Successful Launches"
  };
  
  //create data array for plot
  var data = [trace1];

  //define plot layout
  var layout = {
      title: "successful launches per country"
      xaxis: { title: "Country" },
      yaxis: { title: "success" }
     
  };

  //plot chart to div tage with id "plot"
  Plotly.newPlot("plot", data, layout);
});
