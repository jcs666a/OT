// JavaScript Document


	
	
	

	
	var markersTec = [];
	var resultt ="";
	var dataMapas = {};
	
	function traeteLasTecnologias(tecId, are, idllave){
		

	if (dataTecnologica[idllave].tecnologia[tecId].markers.length <= 0){// si la tecnologia ya se pinto en el mapa y esta en el arreglo global de tecnologias...

		var url = "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/distrito/"+are+"/"+tecId+"";
				
		$.when(promesa(url,are))
			.then(function(response){
				
			
			
			  resultt = response;
				
			if (resultt.apiResponse[0].distritos.length != 0){	////   verificamos si existen datos que pintar sobre el mapa
				//barremos la respuesta para agrupar los resultados en un objeto de tecnologia
						
						
						//dataTecnologica[idllave] = {};
						
						for (var k = 0; k < resultt.apiResponse[0].distritos.length; k++){
							
								var distritoo = resultt.apiResponse[0].distritos[k].idDistrito;
								//var idDistrito = resultt.apiResponse[0].distritos[k].idDistrito
								var centro = new google.maps.LatLng(resultt.apiResponse[0].distritos[k].centro.latitud, resultt.apiResponse[0].distritos[k].centro.longitud);
								var distritoDsc = resultt.apiResponse[0].distritos[k].claveDistrito;
									//dataTecnologica[idllave].tecnologia[idTecnolog].markers = []
								
								//for (var j = 0; j < resultt.apiResponse[0].distritos[k].tecnologias.length; j++){
								
									var etiquetaTec = resultt.apiResponse[0].distritos[k].tecnologias[0].tecnologia;
									var idTecnolog = resultt.apiResponse[0].distritos[k].tecnologias[0].idTecnologia;
									
	
									switch (idTecnolog) {
										case 1:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
												 title: "",
											 	 icon: "images/tecnoMarkers/poiATM.png"
											});	
											
											dataTecnologica[idllave].tecnologia[1].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[1].dsc="";
											dataTecnologica[idllave].tecnologia[1].dsc=etiquetaTec;
											
											var indimarker = dataTecnologica[idllave].tecnologia[1].markers.indexOf(marker);
											marker.title = indimarker;
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[1].markers[indimarker], 'click', function() {
												muestraInfoxDemanda(this.getTitle(),etiquetaTec,1,idllave,distritoo);
											});
											
											break;
										case 2:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiFTTH.png"
											});											
											dataTecnologica[idllave].tecnologia[2].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[2].dsc="";
											dataTecnologica[idllave].tecnologia[2].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[2].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,2,idllave,distritoo);
											});										
											break;
										case 3:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiIpDislam.png"
											});											
											dataTecnologica[idllave].tecnologia[3].markers.push(marker);
											//dataTecnologica[idllave].tecnologia[3].markers[distritoDsc]={};
											//dataTecnologica[idllave].tecnologia[3].markers[distritoDsc]=marker;
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[3].dsc="";
											dataTecnologica[idllave].tecnologia[3].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[3].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,3,idllave,distritoo);
											});											
											break;
										case 4:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiND.png"
											});											
											dataTecnologica[idllave].tecnologia[4].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[4].dsc="";
											dataTecnologica[idllave].tecnologia[4].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[4].markers[indimarker], 'click', function() {
												muestraInfoxDemanda(this.getTitle(),etiquetaTec,4,idllave,distritoo);
											});										
											break;
										case 5:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiTBA.png"
											});											
											dataTecnologica[idllave].tecnologia[5].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[5].dsc="";
											dataTecnologica[idllave].tecnologia[5].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[5].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,5,idllave,distritoo);
											});											
											break;
										case 6:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiVSDLIPD.png"
											});										
											dataTecnologica[idllave].tecnologia[6].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[6].dsc="";
											dataTecnologica[idllave].tecnologia[6].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[6].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,6,idllave,distritoo);
											});									
											break;
										case 7:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	 icon: "images/tecnoMarkers/poiVSDLTBA.png"
											});											
											dataTecnologica[idllave].tecnologia[7].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[7].dsc="";
											dataTecnologica[idllave].tecnologia[7].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[7].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,7,idllave,distritoo);
											});										
											break;
										case 8:
											var marker = new google.maps.Marker({position: centro,
											 	 map: map,
											 	  icon: "images/tecnoMarkers/poiWIMAX.png"
											});											
											dataTecnologica[idllave].tecnologia[8].markers.push(marker);
											markersTec.push(marker);
											dataTecnologica[idllave].tecnologia[8].dsc="";
											dataTecnologica[idllave].tecnologia[8].dsc=etiquetaTec;	
											google.maps.event.addListener(dataTecnologica[idllave].tecnologia[8].markers[indimarker], 'click', function() {
												 muestraInfoxDemanda(this.getTitle(),etiquetaTec,8,idllave,distritoo);
											});											
											break;											
									}
									
									
									
								//}

								$("#wigTeno_"+idTecnolog).html('<img src="images/widgetIconSmall.png" style="cursor:pointer;" onclick="abreWidgetTecnos(\''+idllave+'\',\''+idTecnolog+'\');" />');
								$("#loader_"+are).html("");

						}	/// fin del barrido 		
				
				
					activos.push(idllave + "-tenoid-"+tecId);
					
				}else{
					$("#loader_"+are).html("<div style='text-align:center;'> No existen datos <div>");
				}
				
				
			});				
			
			
	}else{
		//console.log("ya estaba...");	
		if ($("#opcTeno_"+tecId).is(':checked')) {
			
			for (mm = 0; mm < dataTecnologica[idllave].tecnologia[tecId].markers.length; mm++) {
				dataTecnologica[idllave].tecnologia[tecId].markers[mm].setMap(map);
			}
			
			activos.push(idllave + "-tenoid-"+tecId);
			
			$("#wigTeno_"+tecId).html('<img src="images/widgetIconSmall.png" style="cursor:pointer;" onclick="abreWidgetTecnos(\''+idllave+'\',\''+tecId+'\');" />');
			
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



	function muestraInfoxDemanda(markerIndex,etiquetaTec, tec, idllave, distritoo){

		var content = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:11px;"><div style="background-color:#CCCCCC; line-height:20px; text-align:center;">Equipos <b>'+etiquetaTec+'</b> en el distrito: <b>'+markerIndex+'--> ID:'+distritoo+'</b></div>'+
						'<table style="width:300px; font-family:Arial, Helvetica, sans-serif; font-size:10px;">';
						
		
		$.ajax({
			   method: "GET",
			   url: "10.105.116.58",
			   contentType: "application/json",
			   data: "",
			   sync: true,
			   processData: false,
			   success: function(html){
					
					var resultt = html;

					if (resultt.apiResponse.length != 0){
						/*for (var xx = 0; xx < resultt.apiResponse[0].distritos[k].tecnologias[j].items.length; xx++ ){
									var contadd = xx+1;
									content = content + '<tr><td><b>'+contadd+'</b></td>'+
										'<td style="text-align:right; background-color:#F2F2F2;">Nombre:</td><td style="text-align:left;">'+resultt.apiResponse[0].distritos[k].tecnologias[j].items[xx].equipoAcceso+'</td>'+
										'<td style="text-align:right; background-color:#F2F2F2;">Modelo:</td><td style="text-align:left;">'+resultt.apiResponse[0].distritos[k].tecnologias[j].items[xx].modelo+'</td></tr>';
						
						}*/
						
					}else{
						content = content + '<tr><td><b>No hay información para mostrar!</b></td></tr>';
					}
			   }
						
		});
					 
		content = content + '</table></div>';		
		

	    var infoWindow = new google.maps.InfoWindow({
        	content: content
    	});
		
		infoWindow.open(map, dataTecnologica[idllave].tecnologia[tec].markers[markerIndex]);
		   
	}

	
	function promesa(url,are){
		//console.log("promesa ---> url:" + url + " data:" + data);
		$("#loader_"+are).html("<div style='width:100%; text-align:center;'><img src='images/loader_small.gif' style='margin:0px auto;'></div>");
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
									'<img src="images/move_icon.png" border="0" style="cursor:pointer; float:left; margin-right:7px; margin-left:10px; margin-top:10px;"> '+llave+'-'+dataTecnologica[llave].tecnologia[idtecn].dsc +
									'<img src="images/closeBtnSmall.png" border="0" onClick="resizasTec(\''+divsito+'\');" style="cursor:pointer; float:right; margin-right:7px; margin-top:7px;" align="absmiddle"></div>');
			
			$( '#mapaTec_'+llave+'-'+idtecn ).draggable({ 
				containment: "#map-canvas", scroll: false,
				cursor: "move", cursorAt: { top: 15, left: 15 },
				handle: "div.tituTec"
				//snap: "map-canvas"
			})
		
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
								'<td><img src="images/widgetIcon.png" style="cursor:pointer; float:rigth; margin-top:4px; margin-left:5px; margin-bottom:3px;" align="absbottom"  onclick="abreWidgetTecnos(\''+llave+'\',\''+idtecn+'\');" /></td> '+
								'<td>&nbsp;&nbsp;&nbsp; ' + dataTecnologica[llave].tecnologia[idtecn].dsc + '</td>'+
								'<td style="text-align:right;"><image src="images/closeVerySmall.png" style="margin-right:5px; cursor:pointer;" onclick="cierraTumb(\''+idtecn+'\',\''+llave+'\');" /></td></tr></table></div>'+
                        		'<div style="text-align:center;"><img src="images/tumb-'+idtecn+'.png" alt="Distritos por &aacute;rea" /></div>'+
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
	
	
	