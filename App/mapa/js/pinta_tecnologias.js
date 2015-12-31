	
	var markersTec = [];
	//var resultt ="";
	var dataMapas = {};
	areaType = "" ;
	llavePinta = "";
	function traeteLasTecnologias(tecId, are, idllave, distrito){
	if (dataTecnologica[idllave].tecnologia[tecId].markers.length <= 0){// si la tecnologia ya se pinto en el mapa y esta en el arreglo global de tecnologias...
		var url = "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/distrito/"+are+"/"+distrito+"/"+tecId+"";

		$.when(promesa(url,are))
			.then(function(response){
			resultt = response;
				//console.log(response.apiResponse[0]);
			if(resultt.apiResponse[0].distritos.length == 1){
				if(resultt.apiResponse[0].distritos.length == 1){
					if ((dataTecnologicaDistrito[distrito]==undefined) || (dataTecnologicaDistrito[distrito]=="")){
	               	 	dataTecnologicaDistrito[distrito] = {};
						dataTecnologicaDistrito[distrito].tecnologia = {};										
					}
					if ((dataTecnologicaDistrito[distrito].tecnologia[tecId]==undefined) || (dataTecnologicaDistrito[distrito].tecnologia[tecId]=="")){
						dataTecnologicaDistrito[distrito].tecnologia[tecId] ={};
						dataTecnologicaDistrito[distrito].tecnologia[tecId].distrito = {};
						dataTecnologicaDistrito[distrito].tecnologia[tecId].markers = [];
					}
					var distritoo = resultt.apiResponse[0].distritos[0].idDistrito,
						centro = new google.maps.LatLng(resultt.apiResponse[0].distritos[0].centro.latitud, resultt.apiResponse[0].distritos[0].centro.longitud),
						distritoDsc = resultt.apiResponse[0].distritos[0].claveDistrito,
						etiquetaTec = resultt.apiResponse[0].distritos[0].tecnologias[0].tecnologia,
						idTecnolog = resultt.apiResponse[0].distritos[0].tecnologias[0].idTecnologia;
					}
										switch (idTecnolog) {
											case 1:
												var marker = new google.maps.Marker({position: centro,
												 	 map: map,
													 title: "",
												 	 icon: "mapa/images/tecnoMarkers/poiATM.png"
												});	
												
												dataTecnologicaDistrito[distrito].tecnologia[1].markers.push(marker);
												markersTec.push(marker);
												dataTecnologicaDistrito[distrito].tecnologia[1].dsc="";
												dataTecnologicaDistrito[distrito].tecnologia[1].dsc=etiquetaTec;
												
												var indimarker = dataTecnologicaDistrito[distrito].tecnologia[1].markers.indexOf(marker);
												marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
												google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[1].markers[indimarker], 'click', function() {
													muestraInfoxDemanda(this.getTitle(),etiquetaTec,1,idllave);
												});
												
												break;
										case 2:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiFTTH.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[2].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[2].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[2].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[2].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[2].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,2,idllave);
											});										
											break;
										case 3:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiIpDislam.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[3].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[3].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[3].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[3].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[3].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,3,idllave);
											});											
											break;
										case 4:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiND.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[4].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[4].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[4].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[4].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[4].markers[indimarker], 'click', function() {
												muestraInfoxDemanda(this.getTitle(),etiquetaTec,4,idllave);
											});										
											break;
										case 5:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiTBA.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[5].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[5].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[5].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[5].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[5].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,5,idllave);
											});											
											break;
										case 6:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiVSDLIPD.png"
											});										
											dataTecnologicaDistrito[distrito].tecnologia[6].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[6].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[6].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[6].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[6].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,6,idllave);
											});									
											break;
										case 7:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiVSDLTBA.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[7].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[7].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[7].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[7].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[7].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,7,idllave);
											});										
											break;
										case 8:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiWIMAX.png"
											});											
											dataTecnologicaDistrito[distrito].tecnologia[8].markers.push(marker);
											markersTec.push(marker);
											dataTecnologicaDistrito[distrito].tecnologia[8].dsc="";
											dataTecnologicaDistrito[distrito].tecnologia[8].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologicaDistrito[distrito].tecnologia[8].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologicaDistrito[distrito].tecnologia[8].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,8,idllave);
											});									
											break;		

				}
			}
			if (resultt.apiResponse[0].distritos.length != 0 && resultt.apiResponse[0].distritos.length != 1){	////   verificamos si existen datos que pintar sobre el mapa
						for (var k = 0; k < resultt.apiResponse[0].distritos.length; k++){
							
								var distritoo = resultt.apiResponse[0].distritos[k].idDistrito;
								var centro = new google.maps.LatLng(resultt.apiResponse[0].distritos[k].centro.latitud, resultt.apiResponse[0].distritos[k].centro.longitud);
								var distritoDsc = resultt.apiResponse[0].distritos[k].claveDistrito;
									var etiquetaTec = resultt.apiResponse[0].distritos[k].tecnologias[0].tecnologia;
									var idTecnolog = resultt.apiResponse[0].distritos[k].tecnologias[0].idTecnologia;
									
	
									switch (idTecnolog) {
										case 1:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiATM.png"
											});	
											
											dataTecnologica[idllave].tecnologia[1].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[1].dsc="";
											dataTecnologica[idllave].tecnologia[1].dsc=etiquetaTec;
											
											var indimarker = dataTecnologica[idllave].tecnologia[1].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[1].markers[indimarker], 'click', function() {
												muestraInfoxDemanda(this.getTitle(),etiquetaTec,1,idllave);
											});
											
											break;
										case 2:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiFTTH.png"
											});											
											dataTecnologica[idllave].tecnologia[2].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[2].dsc="";
											dataTecnologica[idllave].tecnologia[2].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[2].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[2].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,2,idllave);
											});										
											break;
										case 3:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiIpDislam.png"
											});											
											dataTecnologica[idllave].tecnologia[3].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[3].dsc="";
											dataTecnologica[idllave].tecnologia[3].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[3].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[3].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,3,idllave);
											});											
											break;
										case 4:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiND.png"
											});											
											dataTecnologica[idllave].tecnologia[4].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[4].dsc="";
											dataTecnologica[idllave].tecnologia[4].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[4].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[4].markers[indimarker], 'click', function() {
												muestraInfoxDemanda(this.getTitle(),etiquetaTec,4,idllave);
											});										
											break;
										case 5:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiTBA.png"
											});											
											dataTecnologica[idllave].tecnologia[5].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[5].dsc="";
											dataTecnologica[idllave].tecnologia[5].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[5].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[5].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,5,idllave);
											});											
											break;
										case 6:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiVSDLIPD.png"
											});										
											dataTecnologica[idllave].tecnologia[6].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[6].dsc="";
											dataTecnologica[idllave].tecnologia[6].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[6].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[6].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,6,idllave);
											});									
											break;
										case 7:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiVSDLTBA.png"
											});											
											dataTecnologica[idllave].tecnologia[7].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[7].dsc="";
											dataTecnologica[idllave].tecnologia[7].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[7].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[7].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,7,idllave);
											});										
											break;
										case 8:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "mapa/images/tecnoMarkers/poiWIMAX.png"
											});											
											dataTecnologica[idllave].tecnologia[8].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[8].dsc="";
											dataTecnologica[idllave].tecnologia[8].dsc=etiquetaTec;	
											
											var indimarker = dataTecnologica[idllave].tecnologia[8].markers.indexOf(marker);
											marker.title = indimarker + "|" + distritoo + "|" + distritoDsc;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[8].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,8,idllave);
											});									
											break;											
									}


								$("#wigTeno_"+idTecnolog).html('<img src="mapa/images/widgetIconSmall.png" style="cursor:pointer;" onclick="abreWidgetTecnos(\''+idllave+'\',\''+idTecnolog+'\');" />');
								

						}	/// fin del barrido 		
				
					
					activos.push(idllave + "-tenoid-"+tecId);
					
				}else{
					$("#loader_"+are).html("<div style='text-align:center;'> No existen datos <div>");
				}
				
				$("#loader_"+are).html("");
			}).done(function(){ });				
			
			
	}else{
		//console.log("ya estaba...");	
		if ($(".opcTeno_"+tecId).is(':checked')) {
			
			for (mm = 0; mm < dataTecnologica[idllave].tecnologia[tecId].markers.length; mm++) {
				dataTecnologica[idllave].tecnologia[tecId].markers[mm].setMap(map);
			}
			
			activos.push(idllave + "-tenoid-"+tecId);
			
			$("#wigTeno_"+tecId).html('<img src="mapa/images/widgetIconSmall.png" style="cursor:pointer;" onclick="abreWidgetTecnos(\''+idllave+'\',\''+tecId+'\');" />');
			
			$("#tumbnailTecno_"+idllave+'-'+tecId).remove(); ////quita el tumbnail del menu de widgets
			$('#mapaTec_'+idllave+'-'+tecId).remove(); // quita el div de contenido del mapa dinamico
			var keyy = idllave + "-" + tecId; //recrea la llave del mapa en cuestion
			dataMapas[keyy]={}; //remueve el mapa que ya no se utilizará
			
			
		}else{
			for (mm = 0; mm < dataTecnologica[idllave].tecnologia[tecId].markers.length; mm++) {
				dataTecnologica[idllave].tecnologia[tecId].markers[mm].setMap(null);
			}
			$("#wigTeno_"+tecId).html("");
			var indiceElemento = activos.indexOf(idllave + "-tenoid-"+tecId)
			if (indiceElemento >=0){
				activos.splice(indiceElemento,1);
			}			
		}
	} //////// FIN DE SI LOS MARKERS DE ESTA TECNOLOGIA YA ESTAN SETEADOS
			
			
			
	}
	function limpiaTecnologias(){
		for (var idllave in dataTecnologica){
			for (var tecId in dataTecnologica[idllave].tecnologia){
				for (mm = 0; mm < dataTecnologica[idllave].tecnologia[tecId].markers.length; mm++) {
					dataTecnologica[idllave].tecnologia[tecId].markers[mm].setMap(null);
				}
				$("#wigTeno_"+tecId).html("");
				
				var indiceElemento = activos.indexOf(idllave + "-tenoid-"+tecId)
				if (indiceElemento >=0){
					activos.splice(indiceElemento,1);
				}					
				cierraTumb(tecId, idllave);
			}
		}

	}
	function muestraInfoxDemanda(markerIndex,etiquetaTec, tec, idllave){

		var indices = markerIndex.split("|");
		
		var content = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:11px;"><div style="background-color:#CCCCCC; line-height:20px; text-align:center;">Equipos <b>'+etiquetaTec+'</b> en el distrito: <b>'+indices[2]+'</b></div>'+ ///--> '+indices[1]+'
						'<table style="width:350px; font-family:Arial, Helvetica, sans-serif; font-size:10px;">';
						//'<tr><td style="text-align:center; background-color:#F2F2F2;"><b>#</b></td><td style="text-align:center; background-color:#F2F2F2;"><b>Nombre</b></td><td style="text-align:center; background-color:#F2F2F2;"><b>Modelo</b></td><td style="text-align:center; background-color:#F2F2F2;"><b>Clientes</b></td></tr>';
		
		
		
		var url = "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/equipos/acceso/info/"+indices[1]+"/"+ tec;
		
		$.ajax({
			   method: "GET",
			   url: url,
			   contentType: "application/json",
			   data: "",
			   sync: true,
			   processData: false,
			   success: function(html){
					
					var resultec = html;

					if (resultec.apiResponse.length != 0){
						
						
						var tipoSolucion = resultec.apiResponse[0].tipoSolucion;
						var colorOrdenEjecucion = resultec.apiResponse[0].colorOrdenEjecucion;
						var colordefondo = "";
						switch (colorOrdenEjecucion) {
								case "AMARILLO":
									colordefondo = "#FFDE00";
								break;
								case "AZUL":
									colordefondo = "#43ADF4";
								break;
								case "BLANCO":
									colordefondo = "#ffffff";
								break;
								case "NARANJA":
									colordefondo = "#ff9000";
								break;
								case "VERDE":
									colordefondo = "#7BD25B";
								break;
								default:
									colordefondo = "#F4F4F4";
						}
						
						
						content = content + '<tr><td style="background-color:'+colordefondo+'; font-size:12px; text-align:center;" colspan="5" ><b>Orden de Ejecuci&oacute;n: '+colorOrdenEjecucion+'</b></td></tr>'+
											'<tr><td style="background-color:#f2f2f2; font-size:12px; text-align:center;" colspan="5" ><b>Tipo de Soluci&oacute;n: '+tipoSolucion+'</b></td></tr>'+
											'<tr><td style="text-align:center; background-color:#F2F2F2;">#</td>'+
											//'<td style="text-align:center; background-color:#F2F2F2;">Tecnologia</td>'+
											'<td style="text-align:center; background-color:#F2F2F2;">Nombre</td>'+
											'<td style="text-align:center; background-color:#F2F2F2;">Modelo</td>'+
											'<td style="text-align:center; background-color:#F2F2F2;">Clientes</td></tr>';						
						
						
						if (resultec.apiResponse[0].tecnologias[0].items.length > 0){
						
							for (var i = 0; i < resultec.apiResponse[0].tecnologias[0].items.length; i++ ){
										var contadd = i+1;
										content = content + '<tr><td style="text-align:center;" ><b>'+contadd+'</b></td>'+
											'<td style="text-align:left;">'+resultec.apiResponse[0].tecnologias[0].items[i].equipoAcceso+'</td>'+
											'<td style="text-align:left;">'+resultec.apiResponse[0].tecnologias[0].items[i].modelo+'</td>'+
											'<td style="text-align:left;">'+resultec.apiResponse[0].tecnologias[0].items[i].numClientes+'</td></tr>';
							}
						}else{
							content = content + '<tr><td style="text-align:center; color:#B40404;" colspan="5"><b>No hay informaci&oacute;n para mostrar!</b></td></tr>';
						}
						
					}else{
						content = content + '<tr><td style="text-align:center; color:#B40404;" colspan="5"><b>No hay información para mostrar!</b></td></tr>';
					}
					
					content = content + '</table></div>';		
					
			
					var infoWindow = new google.maps.InfoWindow({
						content: content
					});
					
					infoWindow.open(map, dataTecnologica[idllave].tecnologia[tec].markers[indices[0]]);					
					
			   }
						
		});
					 

		   
	}

	
	function promesa(url,are){
		
		$("#loader_"+are).html("<div style='width:100%; text-align:center;'><img src='mapa/images/loader_small.gif' style='margin:0px auto;'></div>");

		//setTimeout('console.log("promesa ---> url:" + url + " data:" + data)',50000);
		
		var request = $.ajax({
			   method: "GET",
			   url: url,
			   contentType: "application/json",
			   data: "",
			   processData: false
		});		
		return request;
	}
	
	
	
	
	function abreWidgetTecnos(llave,idtecn){
		var boundersTecss = new google.maps.LatLngBounds();
		
		$('#map-canvas').append('<div id="mapaTec_'+llave+'-'+idtecn+'"></div>');
		$('#mapaTec_'+llave+'-'+idtecn).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
		$('#mapaTec_'+llave+'-'+idtecn).addClass("mapaDin");		
		
		
			var keyy = llave + "-" + idtecn; 
	  		dataMapas[keyy] ={};
	  		dataMapas[keyy].mapa ={};
			dataMapas[keyy].mapa[idtecn] ={};
			
			
		   var mapota = new google.maps.Map(document.getElementById("mapaTec_"+llave+"-"+idtecn), {
			zoom: 7,
			center: {lat: 19.3907336, lng: -99.1436126}
			});
		   
		   dataMapas[keyy].mapa[idtecn] = mapota;
		   dataMapas[keyy].mapa[idtecn].setMap;
		   
		   var divsito = 'mapaTec_'+llave+'-'+idtecn;
		   
		   $('#mapaTec_'+llave+'-'+idtecn).append('<div class="tituTec" style="line-height:40px; min-width:100%; background-color:#336699; font-family:Arial, Helvetica, sans-serif; color:#FFFFFF; text-align:left; position:relative; font-size:18px; z-index:3;">'+
									'<img src="mapa/images/move_icon.png" border="0" style="cursor:pointer; float:left; margin-right:7px; margin-left:10px; margin-top:10px;"> '+llave+'-'+dataTecnologica[llave].tecnologia[idtecn].dsc +
									'<img src="mapa/images/closeBtnSmall.png" border="0" onClick="resizasTec(\''+divsito+'\');" style="cursor:pointer; float:right; margin-right:7px; margin-top:7px;" align="absmiddle"></div>');
			
			/*$( '#mapaTec_'+llave+'-'+idtecn ).draggable({ 
				containment: "#map-canvas", scroll: false,
				cursor: "move", cursorAt: { top: 15, left: 15 },
				handle: "div.tituTec"
				//snap: "map-canvas"
			})*/
		
		for (var i=0; i <= dataTecnologica[llave].tecnologia[idtecn].markers.length -1; i++){
			dataTecnologica[llave].tecnologia[idtecn].markers[i].setMap(dataMapas[keyy].mapa[idtecn]);
			var coordenada = new google.maps.LatLng(dataTecnologica[llave].tecnologia[idtecn].markers[i].position.G, dataTecnologica[llave].tecnologia[idtecn].markers[i].position.K );
			//boundersTecss.extend(coordenada);
		}
		//dataMapas[keyy].mapa[idtecn].fitBounds(boundersTecss);
		
		
		$("#opcTeno_"+idtecn).prop( "checked", false );
		
		if ( $('#tumbnailTecno_'+llave +'-'+idtecn).length <= 0 ) {
						$("#gallery").append('<li id="tumbnailTecno_'+llave+'-'+idtecn+'">'+
                        		'<div style="background-color:#E6E6E6; text-align:left;"><table style="width:100%; margin:0px; padding:0px;" cellpadding="0" cellspacing="0" ><tr>'+
								'<td><img src="imapa/mages/widgetIcon.png" style="cursor:pointer; float:rigth; margin-top:4px; margin-left:5px; margin-bottom:3px;" align="absbottom"  onclick="abreWidgetTecnos(\''+llave+'\',\''+idtecn+'\');" /></td> '+
								'<td>&nbsp;&nbsp;&nbsp; ' + dataTecnologica[llave].tecnologia[idtecn].dsc + '</td>'+
								'<td style="text-align:right;"><image src="mapa/images/closeVerySmall.png" style="margin-right:5px; cursor:pointer;" onclick="cierraTumb(\''+idtecn+'\',\''+llave+'\');" /></td></tr></table></div>'+
                        		'<div style="text-align:center;"><img src="mapa/images/tumb-'+idtecn+'.png" alt="Distritos por &aacute;rea" /></div>'+
                    		'</li>');
		}
		
		if ($("#menuWiket").is(":hidden")){
			$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			setTimeout('$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);',2000);
		}
		
		
		var indiceElemento = activos.indexOf(llave + "-tenoid-"+idtecn);
		if (indiceElemento >=0){
			activos.splice(indiceElemento,1);
		}
		
		
	}	
	
	

	function cierraTumb(idtecn, llave){
		//console.log("id->" + idtecn + " llave-->" + llave);
		$("#tumbnailTecno_"+llave+'-'+idtecn).remove(); ////quita el tumbnail del menu de widgets
		$('#mapaTec_'+llave+'-'+idtecn).remove(); // quita el div de contenido del mapa dinamico
		var keyy = llave + "-" + idtecn; //recrea la llave del mapa en cuestion
		dataMapas[keyy]={}; //remueve el mapa que ya no se utilizará
		$("#opcTeno_"+idtecn).prop( "checked", false ); // quita el check a la opción de la tecnologia
		$("#wigTeno_"+idtecn).html(""); //quita el icono de esportar a widget de la tecnologia en cuestion
		var indiceElemento = activos.indexOf(llave + "-tenoid-"+idtecn); // recrea el indice del elemento activo
		if (indiceElemento >=0){ ///// retiramos de los elementos activos
			activos.splice(indiceElemento,1);
		}
	}
	
	function pintaAll( i, llaveStuff, areStuff,distritoStuff){
		c = i + 1;
		traeteLasTecnologias( ''+c+'',''+areStuff+'',''+llaveStuff+'',''+distritoStuff+'');
	}