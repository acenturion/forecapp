function unixTime(timeStamp)
{
	var date= new Date(timeStamp*1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	
	return hours+ ':' + minutes.substr(-2) + ':' + seconds.substr(-2);  
}

function fixLocation(location){
	var resultado = location.split("/");
	resultado = resultado[2].split("_");
	return resultado[0] + " " +resultado[1] ;
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

  function setData(){
	$.ajax({
		method:"GET",
		url: "https://api.darksky.net/forecast/a7ce4bf352c37f9df06cf2b8f8e699fc/-34.586976,-58.606536?units=auto",
		dataType: "jsonp",
		beforeSend: function(request) {
      		request.setRequestHeader("Access-Control-Allow-Origin", '*');
    	},
		success: function(response){
			$(".location").append("<p><strong>"+fixLocation(response.timezone)+"</strong></p>");
			$(".temperatura").append("<p><strong>Temperatura: "+parseInt(response.currently.temperature)+"&#186;</strong></p>");
			$(".humedad").append("<p><strong>Humedad: "+(response.currently.humidity*100)+"%</strong></p>");
		}
	});
  }

  function secretCode(){

  	const pressed = [];
	const secretCode = "mateiko"

	window.addEventListener("keyup", (e) =>{
		pressed.push(e.key);
		pressed.splice(-secretCode.length - 1, pressed.length -secretCode.length);

		console.log(pressed);

		if(pressed.join("").includes(secretCode)){
			cornify_add();
		}
	});

  }
  
  setFondo();
  setData();
  setDate();
  secretCode();

$(document).ready(function(){

	setInterval(setDate, 1000);

});
