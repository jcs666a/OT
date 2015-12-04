<?php

$apagar = $_POST["apagar"];

?>

<script>
		
		//VARIABLE DE CONEXION SOCKETIO
		var socketio = "";
		var markers = [];
		var path = [];
		var paths = [];
		var myLatlng = "";
		var bermudaTriangle = "";
		
		
		
		
		
		//CONEXION A SOCKETIO
		function getConnection(){
			//console.log("entra de nuevo");
			socketio = new io.connect("http://10.105.116.52:9290");
			socketio.connect();
			//console.log("conectado io");
			socketio.on('connect', function(){
				console.log("conectado");
				$("#estadoQuejasRT").html("<b>Runing...</b>");
				$("#estadoQuejasRT").css("color","#5FB404");
			});
			

			
			socketio.on('message', function(res){

				if (res.resGeoCoding != "010"){
					if (res.resGeoCoding != "-1"){
					
						var lon = res.longitud.toString();
						var lat = res.latitud.toString();
						var nom = res.nombre.toString();
						var dir = res.descripcionDireccion.toString();
						var cop = res.descCope.toString();
						var dsc = res.descripcionPunto.toString();
						
						//console.log("latitud: "+ lat);
						//console.log("longitud: "+ lon);
					
						myLatlng = new google.maps.LatLng(lat,lon);
						
						var marker = new google.maps.Marker({position: myLatlng,
						  map: map,
						  animation: google.maps.Animation.DROP
						});
						
						markers.push(marker);
						console.log('marcadores_totales-->' + markers.length);
			
 						var content = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:10px;"><div style="background-color:#CCCCCC; line-height:20px; text-align:center;">'+dsc+'</div><table style="width:300px; font-family:Arial, Helvetica, sans-serif; font-size:10px;"><tr><td>Nombre:</td><td>'+nom+'</td></tr><tr><td>Direcci&oacute;n:</td><td>'+dir+'</td></tr><tr><td>Cope:</td><td>'+cop+'</td></tr></table></div>'; 
						var infowindow = new google.maps.InfoWindow();
						
						google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
							return function() {
							   infowindow.setContent(content);
							   infowindow.open(map,marker);
							};
						})(marker,content,infowindow)); 

						
						for(var key in dataCartografica) { 
															
							var color = "";
							
							if (google.maps.geometry.poly.containsLocation(myLatlng, dataCartografica[key].poligonos[key])) {

								dataCartografica[key].markers.push(marker);
								var contaquej = dataCartografica[key].markers.length;
								color = obtieneColor(contaquej);
								
								var featureStyle = {
									fillColor: color,
									strokeWeight: 1,
									strokeOpacity: 0.4,
									fillOpacity: 0.3
								}
								dataCartografica[key].capas[key].setStyle(featureStyle);
								
							}else{
								//console.log("lat: " + lat + " lon:" + lon);
								
							}	
													
						}
						
					}				
				}
			});
			
		}
		

			function obtieneColor(quejas){
				if (quejas >=1 && quejas<=4){
					color = '#F7FE2E';
				}else{
					if (quejas >=5 && quejas<=9){
						color = '#FF8000';
					}else{
						if (quejas >=10 && quejas<=15){
							color = '#B45F04';
						}else{
							if (quejas >=15){
								color = '#B43104';
							}
						}
					}	
				}
				return color;
			}

		
		function desConnection(){
			socketio.disconnect();
			console.log("desconectado");
			$("#estadoQuejasRT").html("<b>Stopped</b>");
			$("#estadoQuejasRT").css("color","#B40431");			
		}

		function clearMarkers() {
		  for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		  }
		  markers = [];
		}
		
		function apagaYcierra(){
			console.log("apagando...");
			desConnection();		
			clearMarkers();
		}
		
		


</script>

<?php if ($apagar==1){?>
        
        <table style="border:#999999 solid 1px; width:100%; background-color:#FFFFFF; padding:5px; margin-bottom:5px;">
            <tr>
                <td>
                    <input type="button" value="Iniciar" id="btnIni" onClick="getConnection();" />
                </td>
                <td>
                    <input type="button" value="Detener" id="btnFin" onClick="desConnection();" />
                </td>
                <td>
                    <input type="button" value="Limpiar" id="btnLimp" onClick="clearMarkers();" />
                </td>
                <td>
                    <div id="estadoQuejasRT" style="width:60px;"></div>
                </td>        
            </tr>
        </table>
<?php } ?>
