
// step 1: fetch the data
async function fetchData(){
	var jsonData = []
	if(localStorage.getItem("earthquakeData") != null){
		// loading from localstorage
		jsonData = JSON.parse(localStorage.getItem("earthquakeData"))
	} else{
		const apiURL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02';
		const response = await fetch(apiURL);
		jsonData = await response.json();
		localStorage.setItem("earthquakeData", JSON.stringify(jsonData));
	}

	// console.log(jsonData);
	return jsonData;
}


// step 2: manipulating the data
function getMagnitudes(earthquakeData){ // inside each ed we need ed.properties.mag
	const manipulatedData = earthquakeData.map(ed => ed.properties.mag);
	// console.log(manipulatedData);
	return manipulatedData;
}


function plotGraph(magnitudes){
	var trace = {
	    x: magnitudes,
	    type: 'histogram',
	  };
	var plotdata = [trace];

	var layout = { 
	  title: "Magnitude Histogram", 
	  xaxis: {title: "Magnitude"}, 
	  yaxis: {title: "Count"}
	};

	Plotly.newPlot('magnitude_histogram', plotdata, layout);
}


// function parseUniqueMagTypes(data){
// 	return [ 'All', ...new Set(data.map(ed => ed.properties.magType) )];
// }

function filterByMagType(data){
	const currentSelectedMagType = document.getElementById('magtype').value
	var filteredData = data
	if(currentSelectedMagType != 'all'){
		filteredData = filteredData.filter(ed => ed.properties.magType == currentSelectedMagType)
	}
	return filteredData;
}


async function master(){

	const data = await fetchData();
	const filteredData = filterByMagType(data.features)
	const s = getMagnitudes(filteredData);
	plotGraph(s)

}