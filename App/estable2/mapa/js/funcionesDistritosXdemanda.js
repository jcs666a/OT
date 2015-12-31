// JavaScript Document

	var stompClient = null;
	var messagePol ="";	

   
	function connectXdemanda(are, llave) {
		
		limpiaDistricts();

		if (dataCartograficaDistritos[llave] == "" || dataCartograficaDistritos[llave] == undefined){ ///  SI NO EXISTEN LOS DATOS EN EL OBJETO  dataCartograficaDistritos
		
							dataCartograficaDistritos[llave] = {};
							dataCartograficaDistritos[llave].datosTodosDistritos = {};
							dataCartograficaDistritos[llave].poligonosTodosDistritos = {};
							dataCartograficaDistritos[llave].poligonosTodosDistritos[llave] = {};
							dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos = {};
							
							
							var dists = [];
							var polidistricts = [];
							dataCartograficaDistritos[llave].infowindows = {};
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
							   // setConnected(true);
								console.log('Connectadooooooo....... ' + frame);
								stompClient.subscribe('/user/pedorro/topic/necropsia', function(greeting){    ////  SUSCRIPCION AL SOCKET
									//showGreeting(greeting.body);
									var cuerpo = greeting.body; 
									var coordenadasDist = [];
									messagePol = JSON.parse(cuerpo);
									dists.push(messagePol);
									//console.log("REWCIBIDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:-->" + messagePol);
									var colorBaja = "";
									var bajas = 0;
									numRegistros = messagePol.numRegistros
									
									for (var i = 0; i < messagePol.data.length; i++){
										bajas = bajas + messagePol.data[i].bajasTotales;
									}
									
									if (bajas >=0 && bajas <= 7){
										colorBaja = "#C8FE2E";
									}else if (bajas >=8 && bajas <= 15){
										colorBaja = "#BBC93E";
									}else if (bajas >=16 && bajas <= 25){
										colorBaja = "#CB9D29";
									}else if (bajas >=26 && bajas <= 30){
										colorBaja = "#AB430F";
									}else if (bajas >=31 && bajas <= 40){
										colorBaja = "#770A0A";
									}else if (bajas >=41){
										colorBaja = "#3A1503";
									}
									
									
									for (var k = 0; k < messagePol.distrito.poligonos[0].coordenadas.length; k++){
										var coordenada = new google.maps.LatLng(messagePol.distrito.poligonos[0].coordenadas[k].latitud, messagePol.distrito.poligonos[0].coordenadas[k].longitud );
										coordenadasDist.push(coordenada);
										bounders.extend(coordenada);
									}
									
									
									if (contadorBounder<=5){		
											var centrino = bounders.getCenter();							
											map.fitBounds(bounders);
											contadorBounder = contadorBounder +1;
									}
									
									var poligodistrict = new google.maps.Polygon({
															paths:coordenadasDist,
															strokeColor: "#D0FA58",
															strokeOpacity: 0.6,
															strokeWeight: 1,
															fillColor: colorBaja,
															fillOpacity: 0.70
														});	
									
									poligodistrict.setMap(map);
									
									registrosCayendo = registrosCayendo + 1;
									registrosRestantes = numRegistros - registrosCayendo;
									$("#contadorcillo").html("Faltan: " + registrosRestantes + " distritos por mostrar...");
									if (registrosRestantes == 0){
										setTimeout('$("#contadorcillo").fadeOut("slow")',1000);
										//$("#activos").css("display","block");
										//$("#distr").css("display","block");
										//$("#distr").append('<tr><td><div style="width:60px; text-align:center;"><input type="checkbox" id="distritos_'+llave+'" value="'+llave+'" checked onchange="toggleDistricts(this.value);"/></td><td><div style="width:320px;">Todos los distritos '+llave +'</div></td><td style="width:100px; text-align:center;"><img src="images/widgetIcon.png" style="cursor:pointer;" onclick="abreWidgetDistritos(\''+llave+'\');" /></td></tr>');
									}
									
									var addListenersOnPolygon = function(polygon,llave, distrito) {
									  google.maps.event.addListener(polygon, 'click', function (event) {

										/*contentInfoPolyDist = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:12px;"><div><b>'+distrito+'</b></div>';
										contentInfoPolyDist = contentInfoPolyDist + '<div> Bajas Totales:'+bajas+'</div></div>';
										dataCartograficaDistritos[llave].infowindows[llave].setContent(contentInfoPolyDist);
										dataCartograficaDistritos[llave].infowindows[llave].setPosition(event.latLng);
										dataCartograficaDistritos[llave].infowindows[llave].open(map);*/
										
										if (tipoUser==1){
											detalleSlide(distrito, llave, are, "2", "0");
										}else if (tipoUser==2){
											detalleSlideTecnos(distrito, llave, are, "2", "0");
										}
										
									  });  
									}
									
									var distrito = messagePol.distrito.claveDistrito;
									
									poligonosArrayXarea.push(poligodistrict);
									dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[distrito] = poligodistrict;
									
									addListenersOnPolygon(poligodistrict, llave, distrito);
									
									dataCartograficaDistritos[llave].infowindows[llave] = new google.maps.InfoWindow({});				
									
								}); ////   FIN DE LA SUSCRIPCION AL SOCKET 
								
								irPromesasdetraer(are);
								dataCartograficaDistritos[llave].datosTodosDistritos[llave] = dists;
								//dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[llave] = poligonosArrayXarea;
								
								$("#activos").css("display","block");
								$("#distr").css("display","block");
								//$("#ares").css("display","none");
								//$("#divic").css("display","none");
								$("#distr").append('<tr><td><div style="width:60px; text-align:center;"><input type="checkbox" id="distritos_'+llave+'" value="'+llave+'" checked onchange="toggleDistricts(this.value);"/></td><td><div style="width:320px;">Todos los distritos '+llave +'</div></td><td style="width:100px; text-align:center;"><img src="mapa/images/widgetIcon.png" style="cursor:pointer;" onclick="abreWidgetDistritos(\''+llave+'\');" /></td></tr>');
								
								
						}); //// FIN DE LA CONEXION AL SOCKET
							
							
		}else{ //// SI EXISTEN LOS DATOS EN EL OBJETO dataCartograficaDistritos YA NO HACES LA CONSULTA
		
			limpiaDistricts();
		
			for (var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
				dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(map);
			}
			
			$("#activos").css("display","block");
			$("#distr").css("display","block");
			//$("#ares").css("display","none");
			//$("#divic").css("display","none");
			$("#distr").append('<tr><td><div style="width:60px; text-align:center;"><input type="checkbox" id="distritos_'+llave+'" value="'+llave+'" checked onchange="toggleDistricts(this.value);"/></td><td><div style="width:320px;">Todos los distritos '+llave +'</div></td><td style="width:100px; text-align:center;"><img src="mapa/images/widgetIcon.png" style="cursor:pointer;" onclick="abreWidgetDistritos(\''+llave+'\');" /></td></tr>');
			
		
		}///   FIN DE SI SYA EXISTEN LOS DATOS EN EL OBJETO   dataCartograficaDistritos
			
	}
	
	function irPromesasdetraer(are){
		
		testing = {idRegion:are, region:"area", to:"pedorro", "numeroRegistros": "50", fechaInicial:"", fechaFinal:""};
		var url = "http://10.105.116.52:9090/telmex/getNecropsiaDetail";
				
		$.when(promesadetraer(url,testing))
			.then(function(response){		
			});				
		}

	
	function promesadetraer(url, data){
		//console.log("promesa ---> url:" + url + " data:" + data);
		var request = $.ajax({
			   method: "POST",
			   url: url,
			   contentType: "application/json",
			   data: JSON.stringify(data),
			   processData: false
		});		
		return request;
	}		
	
	
	function disconnectXdemanda() {
		if (stompClient != null) {
			stompClient.disconnect();
		}
		setConnected(false);
		console.log("Disconnected");
	}


	function abreWidgetDistritos(llave){
		
		$("#distritos_"+llave).prop( "checked", false );
		$('#socketizable').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
		
		for (var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
			dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(map2);
		}
		
		if ( $("#tumbnailDistritsTotales").length <= 0 ) {
						$("#gallery").append('<li id="tumbnailDistritsTotales">'+
                        		'<div style="background-color:#E6E6E6; text-align:left;"><img src="mapa/images/widgetIcon.png" style="cursor:pointer; float:rigth; margin-top:4px; margin-left:5px; margin-bottom:3px;" align="absbottom"  onclick="abreWidgetDistritos(\''+llave+'\');" /> &nbsp;&nbsp;&nbsp; Distritos por &aacute;rea </div>'+
                        		'<div style="text-align:center;"><img src="mapa/images/districts.png" alt="Distritos por &aacute;rea" /></div>'+
                    		'</li>');
		}
		
		if ($("#menuWiket").is(":hidden")){
			$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			setTimeout('$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);',2000);
		}
		
	}
		
		
		
		
		