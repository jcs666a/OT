// JavaScript Document

	
	var markersPOI = [];
	//var resultt ="";
	var dataMapas = {};
	
	function traetePoisAllCategories(are, idllave){
		
	for(var idllave in dataPOI){
		
		for(var tecId in dataPOI[idllave].poi){
		
			//setTimeout('console.log(tecId)',5000);
											
													
											
									if (dataPOI[idllave].poi[tecId].markers.length <= 0){// si la tecnologia ya se pinto en el mapa y esta en el arreglo global de tecnologias...
								
										var url = "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/search/pois/by/franquicia/"+tecId+"";
												
											$("#loaderPOI_"+are).html("<div style='width:100%; text-align:center;'><img src='images/loader_small.gif' style='margin:0px auto;'></div>");
											
											$.ajax({
												   method: "GET",
												   url: url,
												   contentType: "application/json",
												   data: "",
												   sync: true,
												   processData: false,
												   success: function(html){
														
														var resultt = html;
															
														$("#loaderPOI_"+are).html("");
														
															
														if (resultt.apiResponse.length != 0){	////   verificamos si existen datos que pintar sobre el mapa
															//barremos la respuesta para agrupar los resultados en un objeto de tecnologia
																	
																	
																	for (var k = 0; k < resultt.apiResponse.length; k++){
																		
																			//var distritoo = resultt.apiResponse[k].idDistrito;
																			var centro = new google.maps.LatLng(resultt.apiResponse[k].latitud, resultt.apiResponse[k].longitud);
																			var distritoDsc = resultt.apiResponse[k].franquicia.franquicia;
																			var domicilio = resultt.apiResponse[k].domicilio;
																			var telefono = resultt.apiResponse[k].numeroLinea;
																			var perfil = resultt.apiResponse[k].perfil;
																			var sucursal = resultt.apiResponse[k].sucursal;
																			var velBRAS = resultt.apiResponse[k].velBRAS;
																			var velConf = resultt.apiResponse[k].velConf;
																			if ($.isEmptyObject(resultt.apiResponse[k].equipoAcceso)){
																				var equipoAcceso ="N/A";
																				var idequipoAcceso = "N/A";
																			}else{
																				var equipoAcceso = resultt.apiResponse[k].equipoAcceso.equipo;
																				var idequipoAcceso = resultt.apiResponse[k].equipoAcceso.id;
																			}
																			
																			if ($.isEmptyObject(resultt.apiResponse[k].equipoAccesoTecnologia)){
																				var equipoAccesoTecnologia  = "N/A";
																			}else{
																				var equipoAccesoTecnologia  = resultt.apiResponse[k].equipoAccesoTecnologia.tecnologia;
																			}
																			var idSitio = resultt.apiResponse[k].idSitio;
																			
																			
																			var marker = new google.maps.Marker({position: centro,
																				 map: map,
																				 icon: 'http://200.66.100.138/map/poiOrange.png'//,
																				//animation: google.maps.Animation.DROP
																			});	
																			
																			dataPOI[idllave].poi[tecId].markers.push(marker);
																			$("#opcPoi_"+tecId).attr('checked',true);
																			//markersPOI.push(marker);
																			//dataTecnologica[idllave].tecnologia[1].dsc="";
																			//dataTecnologica[idllave].tecnologia[1].dsc=etiquetaTec;	
											
																				
																				
																			// ponemos infowindow a cada marcador
																			
																				var content = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:11px;">'+
																								'<div style="background-color:#CCCCCC; line-height:20px; text-align:center;"><b>'+distritoDsc+'</b></div>'+
																								'<table style="width:300px; font-family:Arial, Helvetica, sans-serif; font-size:10px;">'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">Domicilio:</td><td style="text-align:left;">'+domicilio+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">Tel:</td><td style="text-align:left;">'+telefono+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">Perfil:</td><td style="text-align:left;">'+perfil+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">sucursal:</td><td style="text-align:left;">'+sucursal+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">equipoAccesoTecnologia:</td><td style="text-align:left;">'+equipoAccesoTecnologia+' ID:'+idequipoAcceso+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">equipoAcceso:</td><td style="text-align:left;">'+equipoAcceso+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">velBRAS:</td><td style="text-align:left;">'+velBRAS+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2;">velConf:</td><td style="text-align:left;">'+velConf+'</td></tr>'+
																									'<tr><td style="text-align:right; background-color:#F2F2F2; text-align:center;" colspan="2">'+
																											'<div style="color:#FF8000; cursor:pointer; font-size:12px;" onclick="muestraRadius(\''+resultt.apiResponse[k].latitud+'\',\''+resultt.apiResponse[k].longitud+'\',\''+idllave+'\',\''+tecId+'\',\''+idSitio+'\');">Ver distritos cercanos a 300mts</div>'+
																									'</td></tr>'+
																								'</table></div>';
																					
																				var infowindow = new google.maps.InfoWindow();
																				google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
																					return function() {
																					   infowindow.setContent(content);
																					   infowindow.open(map,marker);
																					};
																				})(marker,content,infowindow));	
																				
											
																				
											
											
																			//$("#wigTeno_"+idTecnolog).html('<img src="images/widgetIconSmall.png" style="cursor:pointer;" onclick="abreWidgetTecnos(\''+idllave+'\',\''+idTecnolog+'\');" />');
											
											
																	}	/// fin del barrido 		
															
															
																activos.push(idllave + "-POIid-"+tecId);
																
															}else{
																$("#loaderPOI_"+are).html("<div style='text-align:center;'> No existen datos <div>");
															}
															
															
													}
												});				
														
														
												}else{
													//console.log("ya estaba...");	
													if ($("#opcPoi_"+tecId).is(':checked')) {
														
														for (mm = 0; mm < dataPOI[idllave].poi[tecId].markers.length; mm++) {
															dataPOI[idllave].poi[tecId].markers[mm].setMap(map);
														}
														
														activos.push(idllave + "-POIid-"+tecId);
														
													}else{
														for (mm = 0; mm < dataPOI[idllave].poi[tecId].markers.length; mm++) {
															dataPOI[idllave].poi[tecId].markers[mm].setMap(null);
														}
														
														var indiceElemento = activos.indexOf(idllave + "-POIid-"+tecId)
														if (indiceElemento >=0){
															activos.splice(indiceElemento,1);
														}			
													}
												} //////// FIN DE SI LOS MARKERS DE ESTA TECNOLOGIA YA ESTAN SETEADOS
														
			
			}
	}
	
}




	/*function promesa(url,are){
		//console.log("promesa ---> url:" + url + " data:" + data);
		$("#loaderPOI_"+are).html("<div style='width:100%; text-align:center;'><img src='images/loader_small.gif' style='margin:0px auto;'></div>");
		var request = $.ajax({
			   method: "GET",
			   url: url,
			   contentType: "application/json",
			   data: "",
			   processData: false
		});		
		return request;
	}*/
	
		
	function muestraRadius(lat, lon, idllave, tecId, idSitio){
			//console.log("longitud radius--->" + dataPOI[idllave].poi[tecId].radius.length);
		if ($.isEmptyObject(dataPOI[idllave].poi[tecId].radius[idSitio])){
				
				var centro = new google.maps.LatLng(lat, lon);
				var cityCircle = new google.maps.Circle({
				  strokeColor: '#F7BE81',
				  strokeOpacity: 0.8,
				  strokeWeight: 1,
				  fillColor: '#F7BE81',
				  fillOpacity: 0.35,
				  map: map,
				  center: centro,
				  radius: 200
				});	
			
			dataPOI[idllave].poi[tecId].radius[idSitio] = cityCircle;
			
		}else{
			
			dataPOI[idllave].poi[tecId].radius[idSitio].setMap(null);
			dataPOI[idllave].poi[tecId].radius[idSitio] = {};		

		}
		
	}
	
	
	
	