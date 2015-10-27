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
			center: {lat: 19.3907336, lng: -99.1436126},
			styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
		  });		  
		  
		}

google.maps.event.addDomListener(window, 'load', initialize);	

	
	var respp = "";

	function irPromesaPOI(are){
		//console.log("entra promesa");
		//testing = {idRegion:are, region:"area", to:"pedorro", "numeroRegistros": "20", fechaInicial:"", fechaFinal:""};
		var url = "http://10.105.116.52:9090/telmex/infraestructura/direcciones/geo/codificadas";
				
		$.when(promesitaPOI(url))
			.then(function(response){
				console.log(response);
				respp = response;
				
				var coordenadasDist=[];
				
				for (var i=0; i < respp.apiResponse.length-1; i++){
				
					for (var j=0; j < respp.apiResponse[i].puntos.length-1; j++){
					
						var coordenada = new google.maps.LatLng(respp.apiResponse[i].puntos[j][3], respp.apiResponse[i].puntos[j][4]);
						
						var marker = new google.maps.Marker({position: coordenada,
						  map: map,
						  icon: {
							  path: google.maps.SymbolPath.CIRCLE,
							  scale: 5, //tamaño
							  strokeColor: '#688A08', //color del borde
							  strokeWeight: 1, //grosor del borde
							  fillColor: '#C8FE2E', //color de relleno
							  fillOpacity:1// opacidad del relleno
							}
						});
						
						coordenadasDist.push(coordenada);
					
					
						var content = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:10px;">'+
										'<div style="background-color:#CCCCCC; line-height:20px; text-align:center;">'+respp.apiResponse[i].direccion.descripcionAsset+'</div>'+
										'<table style="width:300px; font-family:Arial, Helvetica, sans-serif; font-size:10px;"><tr>'+
										'<td>Dirección:</td><td>'+respp.apiResponse[i].direccion.direccionFromArchivo+'</td></tr>'+
										'<tr><td>Tienda:</td><td>'+respp.apiResponse[i].direccion.tienda+'</td></tr>'+
										'<tr><td>No.Tienda:</td><td>'+respp.apiResponse[i].direccion.noTienda+'</td></tr>'+
										'</table></div>'; 
										
						var infowindow = new google.maps.InfoWindow();
						
						google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
							return function() {
							   infowindow.setContent(content);
							   infowindow.open(map,marker);
							};
						})(marker,content,infowindow)); 
					
					
					}
				
				}
				
				
				
				
				
			});				
	}

	
	function promesitaPOI(url, data){
		//console.log("envio de promesa ---> url:" + url + " data:" + data);
		var request = $.ajax({
			   method: "GET",
			   url: url,
			   contentType: "application/json",
			   data: "",
			   processData: false
		});		
		return request;
	}	


irPromesaPOI();

</script>







<div id="map-canvas"></div>








