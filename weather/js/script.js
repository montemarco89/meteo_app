const appKey = "ff8d7175962b90de80cf28a7d3fa2a22";

// funzione che recupera il nome della città da cercare
$( document ).ready(function() {

	$("#btn_search").on('click',function(){

        var city_name = $("#text_city").val();
		getCityWeather(city_name);

	});
	
	getLocation();
	
});

// chiamo api posizione
function getWeather(lat,lon){
	
	var apiURI= "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appKey;
	$.ajax({
		url: apiURI,
		dataType: "json",
		type: "GET",
		async: "false",
		success: function(resp) {
			
			var table = $("#tableCurrent")[0];

			console.log(apiURI);
			console.log(resp.name);
			
			// recupero il nome della città e lo stato
			$("#city").html(resp.name + ", " + resp.sys.country);
			
			// recupero la temperatura e la converto in gradi centigradi
			var cels = (resp.main.temp - 273.15);
			$("#temp").html(cels.toFixed(0) + " C&deg ");
			
			// recupero la previsione attuale e l'icona descrittiva
			$("#description").html(resp.weather[0].description);
			var iconCode =  resp.weather[0].icon;
			var iconUrl ="http://openweathermap.org/img/w/" + iconCode + ".png";
			$("#wicon").attr('src', iconUrl);

			// recupero umidità, pressione e vento
			$("#hum").html(resp.main.humidity + " % ");
			
			$("#pre").html(resp.main.pressure + " hPA ");
			
			$("#wind").html(resp.wind.speed + " Km/h ");
			
			// recupero la temperatura massima e quella minima
			var tem_mas = (resp.main.temp_max - 273.15);
			$("#max").html(tem_mas.toFixed(0) + " C&deg ");
				
			var temp_min = (resp.main.temp_min - 273.15);
			$("#min").html(temp_min.toFixed(0) + " C&deg ");

		},
		error: function(resp) {
			alert ("Error");
			clearInterval(updateInterval);
		}
	});
}

// chiede permessi posizione, ottiene coordinate
function getLocation() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			getWeather(position.coords.latitude, position.coords.longitude);
		})
		} else {
			alert("Geolocation not available");
	}
}

//cancello la text box di ricerca e la tabella

function resetTable(){
	document.getElementById('text_city').value = "";
	$("#divSearchCity").hide();

}
//meteo citta da ricercare
function getCityWeather(city_name) {

	
	var apiURI= "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + appKey;

	console.log(apiURI);
	
	$.ajax({
		url: apiURI,
		dataType: "json",
		type: "GET",
		async: "false",
		success: function(resp) {
		
			
			console.log(resp.name);
			console.log(resp.cod);

			// creo la tabella in cui inserirò tutti i valori
			var htmltable = "<table>";

			// intestazione della tabella
			htmltable += "<tr>";
			htmltable += "<th>City</th>";
			htmltable += "<th>Temperature</th>";
			htmltable += "<th>Weather</th>";
			htmltable += "<th>Umidity</th>";
			htmltable += "<th>Pressure</th>";
			htmltable += "<th>Wind</th>";
			htmltable += "<th>T.Max</th>";
			htmltable += "<th>T.Min</th>";
			htmltable += "</tr>";
			
			// recupero il nome della città cercata e il proprio stato
			htmltable += "<tr>";
			htmltable += "<td>" + resp.name + ", " + resp.sys.country + "</td>";
			
			// recupero la temperatura
			if (resp.main.temp) {
				temp = (resp.main.temp - 273.15);
				htmltable += "<td>" + (temp.toFixed(0) + " C&deg " ) + "</td>";
					
			}

			// recupero la previsione attuale e l'icona corrispondente			
			if (resp.weather[0].description) {
				
				// creo l'elemento icona
				var icon = document.createElement('icon');
				var iconCode =  resp.weather[0].icon;
				
				// stampo la previsione e recupero l'immagine attraverso l'url corrispondente
				htmltable += "<td>" + "<div>" + resp.weather[0].description + "</div>" + 
							"<div>" + "<image id='icon' src='http://openweathermap.org/img/w/" + iconCode + ".png'>" + "</div>" + "</td>";
			}

			// recupero l'umidità, la pressione e il vento
			if (resp.main.humidity) {
				htmltable += "<td>" + resp.main.humidity + " % " + "</td>";
			}
				
			if (resp.main.pressure) {

				htmltable += "<td>" + resp.main.pressure + " hPA " + "</td>";
			}

			if (resp.wind.speed){

				htmltable += "<td>" + resp.wind.speed + " Km/H " + "</td>";
			}

			// recupero la temperatura minima e quella massima
			if (resp.main.temp) {
					
				t_max = (resp.main.temp_max - 273.15)
				htmltable += "<td>" + (t_max.toFixed(0) + " C&deg " ) + "</td>";
					
				t_min = (resp.main.temp_min - 273.15)
				htmltable += "<td>" + (t_min.toFixed(0) + " C&deg ") + "</td>";
					
			}
		// chiudo la tabella	
		htmltable += "</tr>";
		htmltable += "</table>";
		$("#divSearchCity").html(htmltable);
			
		$("#divSearchCity").show();
						
		}
	
	});
	}	





		


		

	

				