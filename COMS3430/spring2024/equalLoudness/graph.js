
var data = [{"gain":0.2, "freq":440}]

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 50},
    width = 920 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

// Add the grey background that makes ggplot2 famous
svg
  .append("rect")
  .attr("x",0)
  .attr("y",0)
  .attr("height", height)
  .attr("width", width)
  .attr("fill", "#EFEFEF")

//Read the data

  // Add X axis
  var x = d3.scaleLog()
    .domain([10, 20000])
    .range([ 0, width ])
  svg.append("g")
    .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(5,""))
    .select(".domain").remove()
  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text("Frequency");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0])
    .nice()
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
    .select(".domain").remove()
  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 20)
      .text("Sound Pressure (.gain)")

  // Customization
  svg.selectAll(".tick line").attr("stroke", "white")

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) {return x(d.freq); } )
      .attr("cy", function (d) { return y(d.gain); } )
      .attr("r", 5)

var recordButton = document.getElementById("record")
recordButton.addEventListener("click", function(){
    let gainVal = document.getElementById("gainLevel").value/100;
    let freqVal = document.getElementById("currentFreq").value;
    data.push({"gain": gainVal, "freq": freqVal});

    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.freq); } )
      .attr("cy", function (d) { return y(d.gain); } )
      .attr("r", 5)
})

var newFreq = document.getElementById("newFreq")
recordButton.addEventListener("click", function(){
  document.getElementById("currentFreq").value = Math.floor((-Math.log(Math.random())/0.9)*1000+Math.max(10, (Math.random()-0.5)*10000));
})

var exportButton = document.getElementById("export")
exportButton.addEventListener("click", function() {
  let csvData = data.map(x => x["gain"] + ", " + x["freq"]);
  const csvHeader = "data:text/csv;charset=utf-8,"
  const csvContent = csvHeader + "gain, freq\n" 
    + csvData.join("\n");
  const encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); // Required for FF
  
  link.click();
});