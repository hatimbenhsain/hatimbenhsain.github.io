var index = 0;

var canvas = d3.select("body").append("svg")
	.attr("width", 2000)
	.attr("height", 1500)


// d3.json("https://raw.githubusercontent.com/gabibranche/Mashups-Final/master/resources/Globe.json").then(function (data) {

				

// 				var group = canvas.selectAll("g")
// 					.data(data.features)
// 					.enter()
// 					.append("g");


			

// 				var projection = d3.geoMercator().scale(170).translate([1200,475]);
// 				var path = d3.geoPath().projection(projection);


// 				var areas = group.append("path")
// 					.attr("d", path)
// 					.attr("class", "area")
// 					.attr("fill", "steelblue");


dispTranslation();
		
// })
		
function dispTranslation() {

if (index < 245) {
	
	d3.json("https://raw.githubusercontent.com/gabibranche/Mashups-Final/master/resources/Globe.json").then(function (data) {

	console.log(index, ": ", data.features[index].properties.admin);

	var group = canvas.selectAll("g")
		.data([data.features[index]])
		.enter()
				
		


	var projection = d3.geoMercator().scale(500).translate([1200,475]);
	var path = d3.geoPath().projection(projection);


	var areas = group.append("path")
		.attr("d", path)
		.attr("class", "area")
		.attr("fill", "#513371");

	index++;
	setTimeout(dispTranslation, 200);

		})

	}

};
