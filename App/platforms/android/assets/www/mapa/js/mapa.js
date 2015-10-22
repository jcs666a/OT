		var map;
		var map2;
		function initialize() {
		  //var opcionesDelMapaaaa = 
		  
		  map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 7,
			center: {lat: 19.3907336, lng: -99.1436126},
		  	styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
			});
		  
		  map2 = new google.maps.Map(document.getElementById('distritosXareaPOP'),{
			center: {lat: 19.42808, lng: -99.14316},
			zoom: 8,
			styles: [{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"lightness":"65"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#008eff"},{"saturation":-93},{"lightness":31},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":"-30"},{"lightness":"50"}]}]
		  });		    
		}
google.maps.event.addDomListener(window, 'load', initialize);		

		var llave = "";
		var dataCartografica = {};
		var dataCartograficaDistritos = {};
		var capas = {};
		var infoWindow ="";
		var infowindows = {};
		var contentInfoPoly = "";
		var poligonosCords = {};
		var poligonos = {};
		var markersByPolygon = {};
		var urldisc = "";
		var htmlDist = "";
		var tags = [];
		var testing = {};
		var activos = [];
		//var tipoUser = 2;
		var dataTecnologica ={};
		var dataPOI ={};
		var mapaDin = new mapRepository();
	

/******************************   funciones que obtienen los oligonos de areas divisiones o distritos individualmente segun el caso *********************************************/
	function trimer(str) {
        return str.replace(" ","");
	}
		
	function cargaReg(){
			
			var div = $("#divisionesGeoTel option:selected").text();
			//div = div.trim();
			var divid = $("#divisionesGeoTel").val();			
			var reg = $("#areasGeoTel option:selected").text();
			//reg = reg.trim();
			var are = $("#areasGeoTel").val();
			var opcDistrict = $("#districtOpcGeoTel").val(); 
			var url = "";
			var tipoArea = "";

			if (reg=="Todas"){
				
				url = "http://10.105.116.52:9090/getDivisionByName/geoJson/" + div;
				llave = "Division-"+trimer(div);
				tipoArea = "todas";
				obtieneAreasDivis(llave, url, tipoArea);
				
			}else if (reg != "Todas"){
				
				if (opcDistrict=="1"){
					if (tags.length > 0){
						url = "http://10.105.116.52:9090/telmex/necropsia/reporte/distrito";
						llave = "Distritos-"+trimer(reg);
						obtieneDistrics(llave, url, are);
					}else{
						alert("Debe agregar al menos un distrito para mostrar")	
					}					
				
				}else if (opcDistrict=="0"){
					url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + reg;
					llave = "Area-"+trimer(reg);
					tipoArea = "sola";
					obtieneAreasDivis(llave, url , tipoArea);
					
				}else if (opcDistrict=="2"){
					/*url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + reg;
					llave = "Area-"+reg;
					tipoArea = "sola";
					obtieneAreasDivis(llave, url , tipoArea);*/					
					llave = "Area-"+trimer(reg);
					muestraDistrictsPorDemanda(are, llave);
				}
			}
			
			if ($("#menu").is(":visible")){
			$("#menu").toggle("slide", { direction: "left" }, 500);
		}
			
	}


	function obtieneDistrics(llave, url, reg){
			limpiaDistricts();
			limpiaDivs();
			//limpiaAreas();
			
			var coordenadas = [];
			var bounds = new google.maps.LatLngBounds();
			
			//console.log("llave:" + llave + " url:" + url + " reg:" + reg);
			
			if (activos.indexOf(llave) >= 0){
				console.log("Ya esta...");
				//map.data.addGeoJson(dataCartografica[llave]);
			}else{
				//testing = {distritos:{name: tags, fechaCarga:"", idArea: reg}};
				testing = {distritos:{name: tags, fechaInicial: "", fechaFinal: "", idArea: reg}};
				//console.log("testing:" + JSON.stringify(testing));
				$.when(getPromise(url,testing))
					.then(function(response){
						console.log("respuesta:" + response);
						dataCartografica[llave] = response;
						//console.log(dataCartografica[llave].apiResponse.length);
						
						for (var i = 0; i < dataCartografica[llave].apiResponse.length; i++){
							
							var largoPol = dataCartografica[llave].apiResponse[i].distrito.poligonos.length;
							
							if (largoPol >= 1){ // SI EL POLIGONO TIENE COORDENADAS
								
								for (var j = 0; j < largoPol; j++){ // BARREMOS EL RESPONSE DEL OBJETO EN CUESTION
									
									var coordenadas = [];
									
									for (var k = 0; k < dataCartografica[llave].apiResponse[i].distrito.poligonos[j].coordenadas.length; k++){
										var coordenada = new google.maps.LatLng(dataCartografica[llave].apiResponse[i].distrito.poligonos[j].coordenadas[k].latitud, dataCartografica[llave].apiResponse[i].distrito.poligonos[j].coordenadas[k].longitud );
										coordenadas.push(coordenada);
										bounds.extend(coordenada);
									}
									
									var distrito = dataCartografica[llave].apiResponse[i].distrito.claveDistrito;
									
									dataCartografica[llave].apiResponse[i].poligonosCords = {};
									dataCartografica[llave].apiResponse[i].poligonosCords[distrito] = coordenadas;
									dataCartografica[llave].apiResponse[i].poligonos = {};
									dataCartografica[llave].apiResponse[i].infowindows = {};
									dataCartografica[llave].apiResponse[i].markers = [];
									
									dataCartografica[llave].apiResponse[i].poligonos[distrito] = new google.maps.Polygon({
										paths:dataCartografica[llave].apiResponse[i].poligonosCords[distrito],
										strokeColor: '#ff9000',
										strokeOpacity: 0.8,
										strokeWeight: 2,
										fillColor: '#FF0000',
										fillOpacity: 0.35
									});	
									
									dataCartografica[llave].apiResponse[i].poligonos[distrito].setMap(map);	
									
									var addListenersOnPolygon = function(polygon,llave, distrito, ventana) {
									  google.maps.event.addListener(polygon, 'click', function (event) {
										contentInfoPoly = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:11px;">'+
															'<div style="background-color:#CCCCCC; line-height:20px; text-align:center;"><b>Distrito </b></div>'+
															'<table style="width:140px; font-family:Arial, Helvetica, sans-serif; font-size:10px;">'+
															'<tr><td style="text-align:right; background-color:#F2F2F2;">Velocidad:</td><td style="text-align:left;">100k</td></tr>'+
															'<tr><td style="text-align:right; background-color:#F2F2F2;">Facilidades:</td><td style="text-align:left;">fibra</td></tr>'+
															'<tr><td style="text-align:right; background-color:#F2F2F2;">PDM:</td><td style="text-align:left;">.5%</td></tr>'+
															'</table></div>';
										ventana.setContent(contentInfoPoly);
										ventana.setPosition(event.latLng);
										ventana.open(map);
									  });
									}
									
									dataCartografica[llave].apiResponse[i].infowindows[distrito] = new google.maps.InfoWindow({});

									addListenersOnPolygon(dataCartografica[llave].apiResponse[i].poligonos[distrito], llave, distrito, dataCartografica[llave].apiResponse[i].infowindows[distrito]);
									
									agregaActivos(distrito, llave,i,1,reg,0,tipoUser, "distr");
									
									//$("#activos").css("display","block");
									//$("#distr").css("display","block");
									//$("#ares").css("display","none");
									//$("#divic").css("display","none");
									/*$("#distr").append('<tr><td><div style="width:60px; text-align:center;">
													   <input type="checkbox" id="'+distrito+'" value="'+distrito+'" checked onchange="toggleDistrict(this.value,\''+llave+'\','+i+');"/></td>
													   <td><div style="width:320px;">'+llave +'-'+ distrito+'</div></td></td>
													   <td style="width:100px; text-align:center;">
													   <input type="checkbox" id="necro_'+distrito+'" value="'+distrito+'" onchange="toggleNecrop(this.value,\''+llave+'\','+i+',2,'+reg+');" /></td></tr>')*/
								}
								
							} // FIN DE SIE EL POLIGONO TIENE COORDENADAS 
							
							
						}
						map.fitBounds(bounds);
						tags = [];
						$("#listaDist").html('');
						activos.push(llave);
				});	
			}
	
	}


	function obtieneAreasDivis(llave, url, tipoArea){
			
			var datas = "";
			var coordenadas = [];
			var bounds = new google.maps.LatLngBounds();
		
			if (activos.indexOf(llave) >= 0){
				console.log("si la tiene");
				//map.data.addGeoJson(dataCartografica[llave]);
				
			}else{
						
						if (tipoArea=="sola"){
							limpiaDivs();
							//limpiaDistricts();
						}
						if (tipoArea=="todas"){
							limpiaAreas();
							//limpiaDistricts();
						}
						
						
				
						$.ajax({
							type: "GET",
							url: url,
							dataType: "json",
							cache: false, 
							success: function(html){
								dataCartografica[llave] = html.apiResponse[0];
								dataCartografica[llave].markers = [];
								dataCartografica[llave].capas = {};
								dataCartografica[llave].infowindows = {};
								dataCartografica[llave].poligonosCords = {};
								dataCartografica[llave].poligonos = {};
								dataCartografica[llave].capas[llave] = new google.maps.Data();
								dataCartografica[llave].capas[llave].addGeoJson(html.apiResponse[0]);
								//map.data.addGeoJson(html.apiResponse[0]);
								var featureStyle = {
									fillColor: '#D0FA58',
									strokeWeight: 1,
									strokeOpacity: 0.4,
									fillOpacity: 0.2
								}
								dataCartografica[llave].capas[llave].setStyle(featureStyle);
								dataCartografica[llave].capas[llave].setMap(map);
								var capita = dataCartografica[llave].capas[llave];
							
								for (var i = 0; i < dataCartografica[llave].features[0].geometry.coordinates.length; i++){
									for (var j = 0; j < dataCartografica[llave].features[0].geometry.coordinates[i].length; j++){
										var coordenada = new google.maps.LatLng(dataCartografica[llave].features[0].geometry.coordinates[i][j][1], dataCartografica[llave].features[0].geometry.coordinates[i][j][0]);
										coordenadas.push(coordenada);
										bounds.extend(coordenada);
									}
								}
								
								dataCartografica[llave].poligonosCords[llave] = coordenadas;
								
								dataCartografica[llave].poligonos[llave] = new google.maps.Polygon({
									paths:dataCartografica[llave].poligonosCords[llave],
									strokeColor: '#D0FA58',
									strokeOpacity: 0.4,
									strokeWeight: 1,
									fillColor: '#D0FA58',
									fillOpacity: 0.2
								});
								
								//dataCartografica[llave].poligonos[llave].setMap(map);
								
								var addListenersOnPolygon = function(polygon,llave) {
								  google.maps.event.addListener(polygon, 'click', function (event) {
									
									var quejas = dataCartografica[llave].markers.length;
									
									contentInfoPoly = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:10px;"><div>'+llave+'</div>';
									contentInfoPoly = contentInfoPoly + '<div> Quejas:'+quejas+'</div></div>';
									dataCartografica[llave].infowindows[llave].setContent(contentInfoPoly);
			  						dataCartografica[llave].infowindows[llave].setPosition(event.latLng);
			  						dataCartografica[llave].infowindows[llave].open(map);
									
									
									
								  });  
								}
								
								addListenersOnPolygon(dataCartografica[llave].capas[llave], llave);
								
    							dataCartografica[llave].infowindows[llave] = new google.maps.InfoWindow({});
								
								$("#activos").css("display","block");
								
								var are = $("#areasGeoTel").val();
								var divisionId = $("#divisionesGeoTel").val();
								
								
								
								if (tipoArea=="sola"){
									
									agregaActivos("",llave,i,1,are,divisionId,tipoUser, "ares");
								}
								
								if (tipoArea=="todas"){
									agregaActivos("",llave,i,3,are,divisionId,tipoUser, "divic");
								}
								
								map.fitBounds(bounds);
								tags = [];
								$("#listaDist").val('');
								activos.push(llave);
							}		
						});	
			}		
	}
	
	
/***************************  FUNCION QUE AGREGA LOS ELEMENTOS ACTIVOS A LA LISTA SOBRE EL MAPA CON LAS OPCIONES POR REENGLON *******************************/	
	
	
		function agregaActivos(distrito, llave, i, tipo, are, divisionId, tipoUser, elemento){
			//$("#"+elemento).append('<table style="display:none; float:left; width:100%; margin:0px;"><tr>');
			
			if (distrito==""){
				$("#"+elemento).append('<li style="width:45px; text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista"><input type="checkbox" id="'+llave+'" value="'+llave+'" checked onchange="toggleCapa(this.value);"/></li>');
				$("#"+elemento).append('<li style="width:100px; background-color:rgba(235,248,204,0.8); text-align:left;" class="activoEnlaLista">'+llave+'</li>');
			}else if (distrito!=""){
				$("#"+elemento).append('<li style="width:60px; text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista"><input type="checkbox" id="'+distrito+'" value="'+distrito+'" checked onchange="toggleDistrict(this.value,\''+llave+'\','+i+');"/></li>');
				$("#"+elemento).append('<li style="width:100px; background-color:rgba(235,248,204,0.8); text-align:left;" class="activoEnlaLista">'+llave+'-'+distrito+'</li>');
			}
			
			
			
			if (tipoUser==1){ //// SI ES USUARIO COMERCIAL
				//$("#encabezadosActivos").append('<li style="width:80px;" class="activoEnlaLista">Necropsia</li>');
				$("#"+elemento).append('<li style="width:80px; text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista"><img src="mapa/images/necrop_icon.png" border="0" style="cursor:pointer;" id="comic_'+llave+'" align="absbottom" onclick="dialogModel(\''+llave+'\', \''+are+'\');" /></li>');
				//$("#ares").append('<td><input type="checkbox" id="necro_'+llave+'" value="'+llave+'" onchange="toggleNecrop(this.value,\''+llave+'\','+i+','+tipo+','+are+','+divisionId+');" />');
			}else if (tipoUser==2){ //// SI ES USUARIO TECNICO
				//$("#encabezadosActivos").append('<li style="width:80px;"  class="activoEnlaLista">Tecnolog&iacute;as</li>');
				$("#"+elemento).append('<li style=" text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista"><img src="mapa/images/ic_settings_input_antenna_black_18dp.png" title="Tecnologías" border="0" style="cursor:pointer;" id="comic_'+llave+'" align="absbottom" onclick="dialogModel(\''+llave+'\', \''+are+'\', \'tec\');" /></li>');
				$("#"+elemento).append('<li style=" text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista">&nbsp;&nbsp;<img src="mapa/images/ic_assignment_ind_black_18dp.png" title="Fielders" border="0" style="cursor:pointer;" id="pye_'+llave+'" align="absbottom" onclick="detalleSlideTecnos(\''+llave+'\', \''+are+'\');" /></li>');
				$("#"+elemento).append('<li style=" text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista">&nbsp;&nbsp;<img src="mapa/images/ic_accessibility_black_18dp.png" title="Clientes" border="0" style="cursor:pointer;" id="poi_'+llave+'" align="absbottom" onclick="dialogModel(\''+llave+'\', \''+are+'\', \'poi\');" /></li>');
 				$("#"+elemento).append('<li style=" text-align:center; background-color:rgba(235,248,204,0.8);" class="activoEnlaLista">&nbsp;&nbsp;<img src="mapa/images/ic_assessment_black_18dp.png" title="Distritos" border="0" style="cursor:pointer;" id="pye_'+llave+'" align="absbottom" onclick="listadoSlideDistritos();" /></li>');

			}
			
			//$("#"+elemento).append('</td></tr></table><br>');
			
			if (distrito!=""){
				$("#activos").css("display","block");
			}
			
			$("#"+elemento).css("display","block");
			
			if (elemento=="ares"){
				$("#divic").css("display","none");
			}else if (elemento=="divic"){
				$("#ares").css("display","none");
			}
		
		}


/*************************************************  FUNCIONES DE LIMPIEZA DE ELEMENTOS SEGUN EL FLUJO  *****************************************************/

		function limpiaDistricts(){
			if (dataCartografica != ""){
				for(var llave in dataCartografica){
					var str = llave.split("-");
					if (str[0]=="Distritos"){					
						for (var i = 0; i < dataCartografica[llave].apiResponse.length; i++){
							for(var distrito in dataCartografica[llave].apiResponse[i].poligonos){
								dataCartografica[llave].apiResponse[i].poligonos[distrito].setMap(null);
							}
							if (dataCartografica[llave].apiResponse[i].markers.length >= 1){
								for (mm = 0; mm < dataCartografica[llave].apiResponse[i].markers.length; mm++) {
									  dataCartografica[llave].apiResponse[i].markers[mm].setMap(null);
								}
							}							
						}
						var indiceElemento = activos.indexOf(llave)
						if (indiceElemento >=0){
							activos.splice(indiceElemento,1);
						}
					}
				}
			}
			
			for (var llave in dataCartograficaDistritos){
				for (var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
					dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(null);
				}
			}
			
		
			$("#distr").html('');
		}
		
		
		function limpiaAreas(){
			if (dataCartografica != ""){
				for(var llave in dataCartografica){
					//console.log(llave);
					var str = llave.split("-");
					if (str[0]=="Area"){
						for(var distrito in dataCartografica[llave].poligonos){
							dataCartografica[llave].capas[distrito].setMap(null);
						}
						if (dataCartografica[llave].markers.length >= 1){
							for (mm = 0; mm < dataCartografica[llave].markers.length; mm++) {
								  dataCartografica[llave].markers[mm].setMap(null);
							}
						}						
						var indiceElemento = activos.indexOf(llave)
						if (indiceElemento >=0){
							activos.splice(indiceElemento,1);
						}
					}
				}
			}
			$("#ares").html('');
		}		
		
		function limpiaDivs(){
			if (dataCartografica != ""){
				for(var llave in dataCartografica){
					var str = llave.split("-");
					if (str[0]=="Division"){					
						for(var distrito in dataCartografica[llave].poligonos){
							dataCartografica[llave].capas[distrito].setMap(null);
						}
						if (dataCartografica[llave].markers.length >= 1){
							for (mm = 0; mm < dataCartografica[llave].markers.length; mm++) {
								  dataCartografica[llave].markers[mm].setMap(null);
							}
						}						
						var indiceElemento = activos.indexOf(llave)
						if (indiceElemento >=0){
							activos.splice(indiceElemento,1);						
						}
					}
				}
			}
			$("#divic").html('');
		}		
		


		function getPromise(url, data){
			console.log("promesa ---> url:" + url + " data:" + data);
			
			var request = $.ajax({
				   method: "POST",
				   url: url,
				   contentType: "application/json",
				   data: JSON.stringify(data),
				   processData: false
			});		
			return request;
		}


/*******************************************  FUNCIONES TOOGLE PARA OCULTAR MOSTRAR ELEMENTOS DEL MAPA *******************************/

		function toggleCapa(llave){
			if ($("#"+llave).is(':checked')) {
				dataCartografica[llave].capas[llave].setMap(map);
				//dataCartografica[llave].poligonos[llave].setMap(map);
			}else{
				dataCartografica[llave].capas[llave].setMap(null);
				//dataCartografica[llave].poligonos[llave].setMap(null);
			}
		}

		function toggleDistrict(distrito, op, i){
			if ($("#"+distrito).is(':checked')) {
				dataCartografica[op].apiResponse[i].poligonos[distrito].setMap(map);
			}else{
				dataCartografica[op].apiResponse[i].poligonos[distrito].setMap(null);	
				if (dataCartografica[op].apiResponse[i].markers.length >= 1){
					for (mm = 0; mm < dataCartografica[op].apiResponse[i].markers.length; mm++) {
						  dataCartografica[op].apiResponse[i].markers[mm].setMap(null);
					}
				}
				if ($("#necro_"+distrito).is(':checked')) {
					$("#necro_"+distrito).prop( "checked", false );
				}
			}			
		}
		
		
		function toggleDistricts(llave){
			if ($("#distritos_"+llave).is(':checked')) {
				for (var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
					dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(map);
				}
			}else{
				for (var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
					dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(null);
				}				
			}			
		}		
		

		
		function toggleNecrop(distrito,llave,i,tipo, are, div){
			
			if ($("#necro_"+distrito).is(':checked')) {
			

					var bounds = new google.maps.LatLngBounds(); 
					if (tipo=="2"){
						for (mm = 0; mm < dataCartografica[llave].apiResponse[i].poligonosCords[distrito].length; mm++) {
						  bounds.extend(dataCartografica[llave].apiResponse[i].poligonosCords[distrito][mm]);
						}
					}else if(tipo=="1" || tipo=="3"){
						for (mm = 0; mm < dataCartografica[llave].poligonosCords[llave].length; mm++) {
						  bounds.extend(dataCartografica[llave].poligonosCords[llave][mm]);
						}
					}
					
					var centrino = bounds.getCenter();
					
					var marker = new google.maps.Marker({position: centrino,
					  map: map,
					  icon: 'http://200.66.100.138/map/skulli.png',
					  animation: google.maps.Animation.DROP
					});			
					
					var content="";
									
					var infowindow = new google.maps.InfoWindow();
					
					google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
						return function() {
						   detalleSlide(distrito, llave, are, tipo, div);
						};
					})(marker,content,infowindow)); 
					
					if (tipo=="2"){
						dataCartografica[llave].apiResponse[i].markers.push(marker);
					}else if(tipo=="1" || tipo=="3"){
						dataCartografica[llave].markers.push(marker);
					}
					
			}else{
				
				if (tipo=="2"){
					for (mm = 0; mm < dataCartografica[llave].apiResponse[i].markers.length; mm++) {
						  dataCartografica[llave].apiResponse[i].markers[mm].setMap(null);
					}
				}else if(tipo=="1" || tipo=="3"){
					for (mm = 0; mm < dataCartografica[llave].markers.length; mm++) {
						  dataCartografica[llave].markers[mm].setMap(null);
					}				
				}
				
				
				if ($("#detalleSlide").is(":visible")){
					$("#detalleSlide").toggle("slide", { direction: "rigth" }, 500);
				}				
				
				
			}
		}
		
/***************************************Funciones que muestran todos los distritos por socket *************************************************/

		function muestraDistrictsPorDemanda(are, llave){
			//$('#socketizable').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
			connectXdemanda(are, llave);
			
		}
		
		function resizas(){
			$('#socketizable').css({visibility: "hidden"});
		}
		
		function resizasTec(elemento){
			$('#'+elemento).css({visibility: "hidden"});
		}		
		

/****************************************************   INICIALIZANDO  ***********************************************************************/



	$(document).ready(function(){
			
			$("#menu").hide();
			$("#menuWiket").hide();
			
			$(function() {
				$( "#accordion" ).accordion({
				  heightStyle: "content",
				  collapsible: true
				});
			  });			
			
			
			$('#btnMuestraQuejasMapa').change(function(){
				quejasLiveMapa();
			});	

			$('#menuPuller').click(function(){
				$("#menu").toggle("slide", { direction: "left" }, 500);
			});	
			$('#menuJumper').click(function(){
				$("#menu").toggle("slide", { direction: "left" }, 500);
			});
			

			$('#menuJumperWiket').click(function(){
				$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			});			
			$('#menuPullerWiket').click(function(){
				$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			});	
			
			$('#menuPullerSlide').click(function(){
				$("#detalleSlide").toggle("slide", { direction: "rigth" }, 500);
			});				
			
			$('#escondedorActivos').click(function(){
			  $( "#contenedorActivos" ).slideToggle( "slow", function() {
				// Animation complete.
			  });
			});
			
			$( "#socketizable" ).draggable({ 
				containment: "#map-canvas", scroll: false,
				cursor: "move", cursorAt: { top: 15, left: 15 },
				handle: "div.titu"
				//snap: "map-canvas"
			})
			
			$("#socketizable").resizable({
				containment: "#map-canvas",
				maxWidth: 1000,
			});
	
			//var targett = $(this);
			$( "#necroDialog" ).dialog({ 
				autoOpen: false,
				height: "auto",
    			width: "auto"
				//position: { my: "left top", at: "left bottom", of: button }
			});
			
			$( "#tecnoDialog" ).dialog({ 
				autoOpen: false,
				height: "auto",
    			width: "auto"
				//position: { my: "left top", at: "left bottom", of: button }
			});			

			$( "#iniOpcNecrop" ).datepicker();
			$( "#finiOpcNecrop" ).datepicker();
	
		});


/************************************ FUNCIONES DE LOS DIALOGMODELS DEPENDIENDO EL TIPO CLIENTE **************************************/

		function dialogModel(llave,are,tipoComic){


			var targett = $("#comic_"+llave);

			if (tipoUser==1){
			
				$('#necroDialog').dialog( 'open' );
				var myDialogX = targett.position().left + 115; 
				var myDialogY = targett.position().top + 85; 
				$('#necroDialog').dialog( 'option', 'position', [myDialogX, myDialogY] );			
			
			}else if (tipoUser==2){
				
				if (tipoComic=="tec"){
						//console.log("TEC");
						$('#tecnoDialog').dialog( 'open' );
						var myDialogX = targett.position().left + 115; 
						var myDialogY = targett.position().top + 85; 
						$('#tecnoDialog').dialog( 'option', 'position', [myDialogX, myDialogY] );			
						
						
						$.ajax({
							type: "POST",
							url: "mapa/ajax/contenidoComic.php",
							data: "llave=" + llave +  "&are=" + are,
							cache: false, 
							success: function(html){
								$("#tecnoDialog").html(html);
							}		
						});	
						
				}else if (tipoComic=="poi"){
						//console.log("POI");
						$('#tecnoDialog').dialog( 'open' );
						var myDialogX = targett.position().left + 175; 
						var myDialogY = targett.position().top + 85; 
						$('#tecnoDialog').dialog( 'option', 'position', [myDialogX, myDialogY] );			
						
						
						$.ajax({
							type: "POST",
							url: "mapa/ajax/contenidoComicPOI.php",
							data: "llave=" + llave +  "&are=" + are,
							cache: false, 
							success: function(html){
								$("#tecnoDialog").html(html);
							}		
						});					
				
				}
			}
				
		}

/********FUNCIONES PARA MOSTRAR LOS SLIDES DE LAS GRAFICAS ********************************************/

		function detalleSlide(distrito, llave, are, tipo, div ){
			
			if ($("#detalleSlide").is(":hidden")){
				$("#detalleSlide").toggle("slide", { direction: "rigth" }, 500);
			}
				
			$("#graphSlide").html("<div style='width:100%; text-align:center; margin-top:300px;'><img src='mapa/images/ajax-loader.gif' style='margin:0px auto;'></div>");
			$.ajax({
				type: "POST",
				url: "widgets/fechadorNecropsia.php",
				data: "llave=" + llave + "&distrito=" + distrito + "&are=" + are + "&tipo=" + tipo + "&div=" + div,
				cache: false, 
				success: function(html){
					$("#graphSlide").html(html);
				}		
			});
		}


		function detalleSlideTecnos(llave, are ){
			
			if ($("#detalleSlide").is(":hidden")){
				$("#detalleSlide").toggle("slide", { direction: "rigth" }, 500);
			}
				
			$("#graphSlide").html("<div style='width:100%; text-align:center; margin-top:300px;'><img src='mapa/images/ajax-loader.gif' style='margin:0px auto;'></div>");
			$.ajax({
				type: "POST",
				url: "mapa/widgets/tecnoCharts.php",
				data: "llave=" + llave + "&are=" + are,
				cache: false, 
				success: function(html){
					$("#graphSlide").html(html);
				}		
			});
		}



/*******************************************************************************************************/


		function muestraRegs(op){
			$.ajax({
				type: "POST",
				url: "mapa/ajax/comboRegs.php",
				data: "div=" + op,
				cache: false, 
				success: function(html){
					$("#areasGeoTel").html(html);
				}		
			});						
		}
		
		
		function muestraDistritosxOPC(op){
			$("#districtOpcGeoTelCombo").slideDown();		
		}
		
		function muestraDistritosxArea(op){
			
			if (op == "1"){
				var ar = $("#areasGeoTel").val();
				urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+ar+'/TODO';
				$.ajax({
					type: "GET",
					url: urldisc,
					dataType: "json",
					cache: false, 
					success: function(html){
						htmlDist = html;
						$( "#distritosGeoTel" ).autocomplete({
							source: htmlDist
						});
					}
				});
				$("#distritosText").slideDown();
				tags = [];
				$("#listaDist").html('');
				
			}else if (op=="2" || op=="0"){
				//urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+op+'/TODO';
				$("#distritosText").slideUp();	
			}
			
		}		
		
		
		
		function quejasLiveMapa(){

			if ($("#btnMuestraQuejasMapa").is(':checked')) {
				console.log('Prendido...');
				$.ajax({
					type: "POST",
					url: "mapa/realEvents/markers.php",
					data: "apagar=1",
					cache: false, 
					success: function(html){
						$("#div_"+$("#btnMuestraQuejasMapa").val()).html(html);
						$("#div_"+$("#btnMuestraQuejasMapa").val()).slideDown();
					}		
				});				
			} else {
				//console.log('Unchecked');
				apagaYcierra();

				setTimeout('$("#div_"+$("#btnMuestraQuejasMapa").val()).html("")',400);
				setTimeout('$("#div_"+$("#btnMuestraQuejasMapa").val()).slideUp()',400);					
				
			}			
			
		}
		
	function agregaDist(){
		
		if ($("#distritosGeoTel").val()==""){
			alert("Debes escribir un nombre de distrito");
		}else{
		
			var dist = $("#distritosGeoTel").val();

			tags.push(dist);
			
			$("#listaDist").append("<li>"+dist+"</li>");
			var restito = tags.length % 3;
			//console.log("restito-->" + restito);
			if (restito==0){
				$("#listaDist").append("<div style='clear:both;'></div>");
			}
			
			$("#distritosGeoTel").val("");
			$("#distritosGeoTel").focus();
		}
	}



	
/***********************************************   MANEJO DE WIDGETS   *******************************************************************************/

	$(function() {
		// there's the gallery and the trash
		var $gallery = $( "#menuWiket" ),
			$trash = $( "#widgets" );
			$contene = $( "#map-canvas" );

		$( "li", $gallery ).draggable({
			revert: "invalid",
			containment: "document",
			helper: "clone",
			cursor: "move"
		});

		$trash.droppable({
			accept: "#gallery > li",
			drop: function( event, ui ) {
				deleteImage( ui.draggable );
			}
		});
		
		$gallery.droppable({
		  accept: "#contene > li",
		  //activeClass: "custom-state-active",
		  drop: function( event, ui ) {
			recycleImage( ui.draggable );
		  }
		})		
		
		function recycleImage( $item ) {
		  $item.fadeOut(function() {
			$item
			  .find( "img.recicla" )
				.remove()
			  .end()
			  .css( "width", "150px")
			  .append( trash_icon )
			  .find( "img" )
				.css( "height", "150px" )
			  .end()
			  .appendTo( $gallery )
			  .fadeIn();
		  });
		}		
	
		//var recycle_icon = "<a href='#' title='Recycle this image' class='ui-icon ui-icon-trash'>Recycle image</a>";
		function deleteImage( $item ) {
			var idwid = $item[0].id;
			$item.fadeOut(function() {
				var $list = $( "ul", $trash ).length ?
					$( "ul", $trash ) :
					$( "<li class='widg' id='"+idwid+"'>" ).appendTo( $trash );
					$( "<div class='manejador'></div>" ).appendTo( $list );
					$( "<div id='widgContent_"+idwid+"'></div>" ).appendTo( $list );
					$( ".widg" ).draggable({ 
								containment: "#map-canvas", scroll: false,
								cursor: "move", cursorAt: { top: 5, left: 200 },
								handle: "div.manejador"								
							})	

						$.ajax({
							type: "POST",
							url: "mapa/widgets/"+idwid+".php",
							cache: false, 
							success: function(html){
								$("#widgContent_"+idwid).html(html);
							}		
						});		
			});
		}

});
	
		/*
		<img src='images/delete.png' class='recicla' />
		onclick='deleteWid(\""+idwid+"\")'
	
		function deleteWid(op){
			$("#"+op).appendTo( "#menuWiket" ).fadeIn(function() {
			  $("#"+op)
				.animate({ width: "150px" })
				.animate({ height: "150px" })
				//.css( "width", "150px")
				.html("<div style='background-color:#E6E6E6;'>Historico</div><div style='text-align:center;'><img src='images/historico.PNG' alt='Historico' /></div>")
				.draggable({
					revert: "invalid",
					containment: "document",
					helper: "clone",
					cursor: "move"
				})
				
			});	
		}	
		*/
	
function listadoSlideDistritos(){

                        if ($("#detalleSlide").is(":hidden")){
                                $("#detalleSlide").toggle("slide", { direction: "rigth" }, 500);
                        }
                          $.ajax({
                                type: "GET",
                                url: "mapa/list/list.php",
                                cache: false,
                                success: function(html){
                                	console.log(html)
                                        $("#graphSlide").html(html);
                                }
                        });


                }
