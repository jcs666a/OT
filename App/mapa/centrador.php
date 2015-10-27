<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
  <head>
    <title>Telmex</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<link rel="shortcut icon" href="images/favico.gif">    
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/mapa.css">
	<link rel="stylesheet" href="js/jquery-ui-1.11.4.custom/jquery-ui.css">
	<script type="text/javascript" src="js/jquery-1.10.2"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min"></script>    
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="js/funcionesDistritosXdemanda.js"></script>
    <script src="js/sockjs-0.3.4.js"></script>
    <script src="js/stomp.js"></script>    

<script>		
		var map;
		var map2;
		var centrinoe;		
		
		function initialize() {
		  
		  var opcionesDelMapaaaa = 
		  
		  map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 7,
			center: {lat: 19.3907336, lng: -99.1436126}
		  });		  
		  
		}

google.maps.event.addDomListener(window, 'load', initialize);	





	var stompClient = null;
	var messagePol ="";	

   
	function connectXdemanda() {
		
							
							var dists = [];
							var polidistricts = [];
							var contentInfoPolyDist = "";
							var poligonosArrayXarea = [];
							var bounders = new google.maps.LatLngBounds();
							var contadorBounder = 0;
							var numRegistros = 0;
							var registrosRestantes = 0;
							var registrosCayendo = 0
							//dataCartografica[llave].todosDistritos[llave] = dists;
							
							var socket2 = new SockJS('http://10.105.116.52:8080/messaging');
							stompClient = Stomp.over(socket2);            
							stompClient.connect({}, function(frame) {   ///  INICIO DE CONEXION AL SOCKET
							    //setConnected(true);
								console.log('Connectadooooooo....... ' + frame);
								
								stompClient.subscribe('/user/pedorro/topic/centroide', function(greeting){    ////  SUSCRIPCION AL SOCKET
													//showGreeting(greeting.body);
													var cuerpo = greeting.body; 
													var coordenadasDist = [];
													messagePol = JSON.parse(cuerpo);
													//dists.push(messagePol);
													
													//var colorBaja = "";
													//var bajas = 0;*/
													//numRegistros = messagePol.numRegistros
													
													var boundings = new google.maps.LatLngBounds(); 

													
													for (var k = 0; k < messagePol.poligonos[0].coordenadas.length; k++){
														var coordenada = new google.maps.LatLng(messagePol.poligonos[0].coordenadas[k].latitud, messagePol.poligonos[0].coordenadas[k].longitud );
														coordenadasDist.push(coordenada);
														boundings.extend(coordenada);
													}
													
													centrinoe = boundings.getCenter();	
													var DF = messagePol.idDistrito;
													//var coorden = centro.split(",");
													//console.log("centro---> " + centro);
													//console.log("REWCIBIDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:--> Lat: "  + centrinoe.G + " Lon: " + centrinoe.K + " distro: " + DF);
													
													var marker = new google.maps.Marker({position: centrinoe,
													  map: map,
													 // icon: 'http://200.66.100.138/map/skulli.png',
													  animation: google.maps.Animation.DROP
													});	
													
													urldisc = 'http://10.105.116.52:9090/telmex/guardarCentroideDistrito/'+DF+'/'+centrinoe.G+'/'+centrinoe.K+'/';
													//console.log(urldisc);
													$.ajax({
														type: "GET",
														url: urldisc,
														dataType: "json",
														cache: false, 
														success: function(html){
															//htmlDist = html;
															console.log("Distrito-->" + DF + " procesado!!!");
														}
													});													
													
													
													
								});
								irPromesa(6);
							});


	}



	function irPromesa(are){
		//console.log("entra promesa");
		testing = {idRegion:are, region:"area", to:"pedorro", "numeroRegistros": "20", fechaInicial:"", fechaFinal:""};
		var url = "http://10.105.116.52:9090/telmex/calcularCentroide";
				
		$.when(promesita(url,testing))
			.then(function(response){
			});				
	}

	
	function promesita(url, data){
		console.log("envio de promesa ---> url:" + url + " data:" + data);
		var request = $.ajax({
			   method: "POST",
			   url: url,
			   contentType: "application/json",
			   data: JSON.stringify(data),
			   processData: false
		});		
		return request;
	}	


connectXdemanda();

</script>







<div id="map-canvas"></div>








