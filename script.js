function fixLocation(location){
	console.log(location);
	var resultado = location.split("/");
	var lugar = resultado.pop();
	if(lugar.indexOf("_")){
		lugar = lugar.replace(/[\W_]+/g," ");
	}
	return lugar;
}

function setFondo(){

	var width = $(window).width();
	var height = $(window).height();
	var imageUrl = `https://picsum.photos/g/${width}/${height}?random`;
	$('body').css('background-image', 'url(' + imageUrl + ')');
}

 function setDate() {
    var now = new Date();
    var seconds = now.getSeconds();
    var mins = now.getMinutes();
    var hour = now.getHours();
   	
   	if(hour < 10){ hour = "0"+hour};
   	if(mins < 10){ mins = "0"+mins};
   	if(seconds < 10){ seconds = "0"+seconds};

   	$(".time").html(`<p><strong>${hour}:${mins}:${seconds}<p><strong>`);
  }

  function setData(latitud,Longitud){
	$.ajax({
		method:"GET",
		url: "https://api.darksky.net/forecast/a7ce4bf352c37f9df06cf2b8f8e699fc/"+latitud+","+Longitud+"?units=ca",
		dataType: "jsonp",
		beforeSend: function(request) {
      		request.setRequestHeader("Access-Control-Allow-Origin", '*');
    	},
		success: function(response){
			$(".location").html("<p><strong>"+fixLocation(response.timezone)+"</strong></p>");
			$(".temperatura").html("<p><strong>Temperatura: "+parseInt(response.currently.temperature)+"&#186;</strong></p>");
			$(".humedad").html("<p><strong>Humedad: "+(response.currently.humidity*100)+"%</strong></p>");
		}
	});
  }

  function secretCode(){

  	const pressed = [];
	const secretCode = "mateiko"

	window.addEventListener("keyup", (e) =>{
		pressed.push(e.key);
		pressed.splice(-secretCode.length - 1, pressed.length -secretCode.length);


		if(pressed.join("").includes(secretCode)){
			cornify_add();
		}
	});

  }

  function setGeolocation(){
  	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
       	alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude );
    setData(position.coords.latitude, position.coords.longitude);

  }
 

  setFondo();
  setData("40.586976", "-74.606536");
  setDate();
  secretCode();

$(document).ready(function(){

	setInterval(setDate, 1000);

});
