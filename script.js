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

	console.log("entre");
	var width = $(window).width();
	var height = $(window).height();
	var imageUrl = `https://picsum.photos/g/${width}/${height}?random`;
 	console.log(imageUrl);
	$('body').css('background-image', 'url(' + imageUrl + ')');
}

$(document).ready(function(){

	setFondo();

	//-34.586976, -58.606536
	$.ajax({
		method:"GET",
		url: "https://api.darksky.net/forecast/a7ce4bf352c37f9df06cf2b8f8e699fc/-34.586976,-58.606536?units=auto",
		dataType: "jsonp",
		beforeSend: function(request) {
      		request.setRequestHeader("Access-Control-Allow-Origin", '*');
    	},
		success: function(response){
			$(".temperatura").html("<p><strong>"+fixLocation(response.timezone)+"</strong></p>");
			$(".temperatura").append("<p><strong>"+unixTime(parseInt(response.currently.time))+"</strong></p>");
			$(".temperatura").append("<p><strong>Temperatura: "+parseInt(response.currently.temperature)+"&#186;</strong></p>");
			$(".temperatura").append("<p><strong>Humedad: "+(response.currently.humidity*100)+"%</strong></p>");
		}
	});

});


//https://picsum.photos/g/200/300?random