// Create a function to populate and build the dropdown options
// function buildDropdown(country){
//     var selectDropdown = d3.select("#Country");
//     for (var i = 0; i <country.length; i++){
//         selectDropdown.append("option").text(country[i]).attr("Country",country[i]);
//     }

// };

// Function to filter the records using a single id value that
// is passed from the dropdown seletion
function filterRecords(records,country){
    return records.filter(record => +record.country === +country);
    console.log(records.country === country);
}

// Function that takes the array of sample objects and selects the one 
// object using the passed id value, then it gets the sample_values array, otu_id array
// and otu_labels array and then creates a new array of objects holding all three key values
// so it can be sorted in descending order and then the top 10 objects are sliced.
// These are the used to plot a horizontal bar chart
function plotTopTen(samples,country){
    // Use the passed id to filter the array of Sample objects from the dataset
    // var focusSample = filterRecords(samples,id);
    //console.log(focusSample);
    // Grab all the values from the arrays associated with the individuals id and
    // put them into arrays
    // var otuIds = focusSample[0].otu_ids;
    // var sampleVals = focusSample[0].sample_values;
    // var otuLabels = focusSample[0].otu_labels;
     //console.log(otuIds);

     // make an array of objects so we can sort by sample values in desc order 
     // and get the top 10 objects
    //  var idResults = [];
    //  otuIds.forEach(function (id,i){ 
    //     var newObj = {};
    //     newObj.otu_id = id;
    //     newObj.sample_value = sampleVals[i];
    //     newObj.otu_label = otuLabels[i];
    //     idResults.push(newObj);
    // });

    // Sort the objects by sample_value and then slice the top ten
    var sortedById = samples.sort((a,b) => b.Success - a.Success);
    var slicedTopTen = sortedById.slice(0,10);
    var reversedTopTen = slicedTopTen.reverse();
    

      // Trace1 for the Top Ten Data
    var trace1 = {
        x: reversedTopTen.map(row => row.Success),
        y: reversedTopTen.map(row => row.Country),
        text: reversedTopTen.map(row => row.Country),
        name: `launch`,
        marker:{
            'color': "red",
            'colorscale': 'Portland'
        },
        type: "bar",
        orientation: "h"
    };

    // data to be used for the plot
    var chartData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        title: `Successful Launches`,
        hoverlabel:{
            bgcolor: "black",
            font: {color: 'white'}
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

// Function to get the metadata object using a passed id value and the 
// array of all metadata objects
function buildDemoData(metadata,id){
    // Use the passed id to filter the array of metadata objects from the dataset
    var focusMetaData = filterRecords(metadata,id);
    //console.log(focusMetaData);

    // Select the sample-metadata div and clear the html so any
    // prior <h6> elements are removed
    var selectMetaID = d3.select("#sample-metadata").html("");
    
    // iterate through the metadata object and create an <h6> html element
    // for each key:value pair
    for(let [key, value] of Object.entries(focusMetaData[0])){
        //console.log(`${key}: ${value}`);
        selectMetaID.append("h6").text(`${key}: ${value}`);
    }

    return focusMetaData;
};

// Function to take a passed id value and get all the sampledata values
// and use them to plot a bubble chart of all samples
function plotBubbleChart(samples,id){
    // Use the passed id to filter the array of Sample objects from the dataset
    // var focusSample = filterRecords(samples,id);
    //console.log(focusSample);

    // Grab all the values from the arrays associated with the individuals id and
    // put them into arrays
    // var otuIds = focusSample[0].otu_ids;
    // var sampleVals = focusSample[0].sample_values;
    // var otuLabels = focusSample[0].otu_labels;
    //console.log(otuIds);
    // console.log(samples)
    // Add scaling to the bubble sizes so they all display in the bubble chart
    // Set the maximum marker size to 100
    //  var desired_max_marker_size = 100;
    //  var size = sampleVals;
      // Trace1 for all the sample_values, otu_ids and otu_labels
    // var trace1 = {

    //     x: ["USA","Canada", "UK"],
    //     y: [200, 150, 75],
    //     text: "launch",
    //     name: `country`,
    //     mode: 'markers',
    //     // marker: {
    //     //     colorscale: "Portland",
    //     //     size: 3,
    //     //     sizeref: 2.0* Math.max(...size) / (desired_max_marker_size**2),
    //     //     sizemode: 'area'
    //     // }
    // };

    // data to be used for the plot
    // var chartData = [trace1];

    // // Apply the group bubble chart layout options including hoverlabel coloring
    // var layout = {
    //     title: `Successful Launches of Countries`,
    //     xaxis: {
    //         title:{
    //         text:"Countries"
    //     }},
    //     showlegend: false,
    //     hoverlabel:{
    //         bgcolor: "black",
    //         font: {color: 'white'}
    //     },
    //     margin: {
    //     l: 30,
    //     r: 30,
    //     t: 30,
    //     b: 100
    //     }
    // };

    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", chartData, layout);
}

// Bonus section of the assignment
// A gauge chart is added to indicate the number of scrubs per week
// function plotGaugeChart(metadata,id){
//     // Use the passed id to filter the array of Sample objects from the dataset
//     var focusMetaData = filterRecords(metadata,id);
//     //console.log(focusMetaData);

//     // the washing frequency is parsed from the object
//     var wFreq = parseFloat(focusMetaData[0].wfreq);
//     //console.log(`wFreq: ${wFreq}`);

//     // the data for the gauge chart (indicator) is created
//     var data = [
//         {
//           type: "indicator",
//           mode: "gauge+number",
//           value: wFreq,
//           title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 24 } },
//           // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//           gauge: {
//             axis: { range: [null, 10], tickwidth: 2, tickcolor: "darkblue" },
//             bar: { color: "darkblue" },
//             bgcolor: "white",
//             borderwidth: 2,
//             bordercolor: "gray",
//             steps: [
//               { range: [0, 1], color: "lightseagreen" },
//               { range: [1, 2], color: "mediumspringgreen" },
//               { range: [2, 3], color: "lightgreen" },
//               { range: [3, 4], color: "yellowgreen" },
//               { range: [4, 5], color: "darkseagreen" },
//               { range: [5, 6], color: "mediumseagreen" },
//               { range: [6, 7], color: "seagreen" },
//               { range: [7, 8], color: "forestgreen" },
//               { range: [8, 9], color: "green" },
//               { range: [9, 10], color: "darkgreen" },
//             ]
//           }
//         }
//       ];
      
//       var layout = {
//         width: 500,
//         height: 400,
//         margin: { t: 25, r: 25, l: 25, b: 25 },
//         paper_bgcolor: "white",
//         font: { color: "darkblue", family: "Arial" }
//       };
      
//       // Render the plot to the div tag with id "gauge"
//       Plotly.newPlot('gauge', data, layout);
// }

// Create empty arrays to accept the values parsed from the json file
// This is done because the variables are scoped to the d3.json function
// and they must be available to the entire  script
var samplesObj = [];
var metadataObj = [];

// Using D3 read in the samples.json file
d3.json("document.json").then((samplesData) => {
    
    var data = samplesData;
    // console.log(data);

    data.forEach(obj => samplesObj.push(obj));
    console.log(samplesObj);
    plotTopTen(samplesObj);
    // plotBubbleChart(samplesObj);
  });
//console.log(metadataObj);
//console.log(samplesObj);

// Function that is called when a new value is selected in the index.html file for
// the select with id=selDataset 
// This function refreshes the html page with new values chosen from the dropdown
function optionChanged(id){
    console.log(id),
    buildDemoData(metadataObj,id),
    plotTopTen(samplesObj,id);
    plotBubbleChart(samplesObj,id);
    plotGaugeChart(metadataObj,id);
}

// function plotSuccess(country, statusmission); {
//         // Sort the objects by sample_value and then slice the top ten
//         var sortedByCountry = statusmission.sort((a,b) => b.Success - a.Success);
       
    
//           // Trace1 for the Success Data
//         var trace1 = {
//             x: sortedByCountry.map(row => row.Success),
//             y: sortedByCountry.map(row => row.Country),
//             text: sortedByCountry.map(row => row.Country),
//             name: `launch`,
//             marker:{
//                 'color': "red",
//                 'colorscale': 'Portland'
//             },
//             type: "bar",
//             orientation: "h"
//         };
    
//         // data to be used for the plot
//         var chartData = [trace1];
    
//         // Apply the group bar mode to the layout
//         var layout = {
//             title: `Successful Launches`,
//             hoverlabel:{
//                 bgcolor: "black",
//                 font: {color: 'white'}
//             },
//             margin: {
//             l: 70,
//             r: 70,
//             t: 30,
//             b: 100
//             }
//         };
    
//         // Render the plot to the div tag with id "bar-plot"
//         Plotly.newPlot("bar-plot", chartData, layout);
//         return plotSuccess;
//     }

    
// d3.json("launches.json").then((data) => {
//     //Create trace
//     var trace1 = {
//         x: data.Country,
//         y: data.StatusMission,
//         type: "bar",
//         name: "Successful Launches"
//     };
    
//     //create data array for plot
//     var data = [trace1];

//     //define plot layout
//     var layout = {
//         title: "successful launches per country"
//         xaxis: { title: "Country" },
//         yaxis: { title: "success" }
        
//     };

//     //plot chart to div tage with id "plot"
//     Plotly.newPlot("plot", data, layout);
// });
