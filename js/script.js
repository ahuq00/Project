// step 1: fetch the data
async function fetchData() {
	var jsonData = [];
  
	const apiURL =
	  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02";
	const response = await fetch(apiURL);
	jsonData = await response.json();
  
	return jsonData;
  }
  
  // step 2: manipulating the data
  function getMagnitudes(earthquakeData) {
	// inside each ed we need ed.properties.mag
	const manipulatedData = earthquakeData.map((ed) => ed.properties.mag);
	// console.log(manipulatedData);
	return manipulatedData;
  }
  
  function plotGraph(magnitudes) {
	var trace = {
	  x: magnitudes,
	  type: "histogram",
	};
	var plotdata = [trace];
  
	var layout = {
	  title: "Magnitude Histogram",
	  xaxis: { title: "Magnitude" },
	  yaxis: { title: "Count" },
	};
  
	Plotly.newPlot("magnitude_histogram", plotdata, layout);
  }
  
  
  async function master() {
	const data = await fetchData();
	const s = getMagnitudes(data.features);
	plotGraph(s);
  }
  