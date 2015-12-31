var map,
	intervaloMarcadores,
	dondeEstoy,
	centralosFirst=1,
	tiempo_A,
	tiempo_B,
	milisPasados,
	minusPasados,
	ubicacion_A,
	ubicacion_B,
	justOne = 0,
	centro = "",
	ClientesPoints=[];
$(document).ready(function(){
	$("#circule,#navegacionMenu").click(function(event){
		if($("#circule").hasClass('open')){
	  		$("#circule").removeClass('open');
	  		$("#map-menu").removeClass('open');
	  		$("#map-menu .showtitle").css('display','none');
		}
		else{
		  $("#goTo").removeClass('open');
		  $("#circule").addClass('open');
		  $("#map-menu").addClass('open');
		  $("#map-menu .showtitle").css('display','block');
		}
	});
});
		function initialize() {
		  map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 7,
			disableDefaultUI:true,
			zoomControl: true,
			center: {lat: 19.3907336, lng: -99.1436126},
		  	styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
			});
		}
google.maps.event.addDomListener(window, 'load', initialize);		

		var llave = "";
		var dataCartografica = {};
		var dataCartograficaDistritos = {};
		var dataNecrop = {};
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
		var dataTecnologicaDistrito = {};
		var dataPOI ={};
		var mapaDin = new mapRepository();


/******************************   funciones que obtienen los oligonos de areas divisiones o distritos individualmente segun el caso *********************************************/
	var divName = [],
		areaName = [],
		divArray = [],
		areaArray = [],
		contentTags = [],
		distArray =[],
		uniqueAreas = [],
		clear=[],
		limite = 0,
		triggerArea = 0,
		areCarArr = [],
		clearAre = [],
		dividCarArr = [],
		clearDivId = [],
		filtroStop = 0,
		areLoadArr =[],
		push = {},
		distLoadArr =[];
	function cargaReg(divString,areaString,distString,size){
		var div = divName[tope],
			divid = divArray[tope],
			reg = areaName[tope],
			are = areaArray[tope];
		distArray.push(distString);
			cargaDist(distString,reg,are,size);
			cargaAreas(reg,are,size,divid);
		tope++;
	}
	function trimer(str){
		return str.replace(" ","");
	}
	function cargaDist(distString,reg,are,size){
		if(size == size){
			if(distString != undefined && distString != "0"){
				contentTags.push(distString);
				autoLoad('Distritos-'+reg+'' ,are, distString);
			}
			limite++;
		}
		if(limite == size){
			for(var i = 0; i < contentTags.length; i++){
				tags.push(contentTags[i]);
			}
		url = "http://10.105.116.52:9090/telmex/necropsia/reporte/distrito";
		llave = "Distritos-"+reg;
		obtieneDistrics(llave, url, are);
		}
	}
	function cargaAreas(reg,are,size,divid){
		if(size == size){
			if(reg != undefined && reg != "0"){
				uniqueAreas.push(reg);
				areCarArr.push(are);
				dividCarArr.push(divid);
			}
			triggerArea++;
			if(triggerArea == size){
				clearArray(size);
			}
		}
	}
	function clearArray(size){
		for(var i = 0; i<= size; i++){
			var idx = $.inArray(uniqueAreas[i], clear);
			if (idx == -1) {
			  clear.push(uniqueAreas[i]);
			} else {
			  clear.splice(idx, 1);
			}
		}
		for(var i = 0; i<= size; i++){
			var idx = $.inArray(areCarArr[i], clearAre);
			if (idx == -1) {
			  clearAre.push(areCarArr[i]);
			} else {
			  clearAre.splice(idx, 1);
			}
		}
		for(var i = 0; i<= size; i++){
			var idx = $.inArray(dividCarArr[i], clearDivId);
			if (idx == -1) {
			  clearDivId.push(dividCarArr[i]);
			} else {
			  clearDivId.splice(idx, 1);
			}
		}
		for(var i = 0; i<=clear.length; i++){
			if(typeof clear[i] !== 'undefined'){
				url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + clear[i];
				llave = "Area-"+trimer(clear[i]);
				tipoArea = "sola";
				obtieneAreasDivis(llave, url , tipoArea, clearAre[i], clearDivId[i]);
				autoLoad(llave,  clearAre[i], '');
			}
		}
	}
	function knowNames(d,a){
		var area='';
			 if(a==1) area='Acapulco';
		else if(a==2) area='Balbuena';
		else if(a==3) area='Chilpancingo';
		else if(a==4) area='Cuautitlan-Morelos';
		else if(a==5) area='Ermita-Tlahuac';
		else if(a==6) area='Lindavista';
		else if(a==7) area='Lomas';
		else if(a==8) area='Mixcoac';
		else if(a==9) area='Morelos';
		else if(a==10)area='Satélite';
		else if(a==11)area='Sotelo';
		else if(a==12)area='Texcoco-Zaragoza';
		else if(a==13)area='Toluca';
		else if(a==14)area='Universidad';
		else if(a==15)area='Valle-San Juán';
		else if(a==16)area='Aguascalientes';
		else if(a==17)area='Celaya';
		else if(a==18)area='Ciudad Victoria';
		else if(a==19)area='Irapuato';
		else if(a==20)area='León';
		else if(a==21)area='Matamoros';
		else if(a==22)area='Monterrey 1';
		else if(a==23)area='Monterrey 2';
		else if(a==24)area='Monterrey Foraneas';
		else if(a==25)area='Nuevo Laredo';
		else if(a==26)area='Querétaro';
		else if(a==27)area='Reynosa';
		else if(a==28)area='Sabinas';
		else if(a==29)area='Saltillo';
		else if(a==30)area='San Luis Potosí';
		else if(a==31)area='Tampico';
		else if(a==32)area='Torreón';
		else if(a==33)area='Zacatecas';
		else if(a==34)area='Chihuahua';
		else if(a==35)area='Ciudad Juárez';
		else if(a==36)area='Ciudad Obregón';
		else if(a==37)area='Colima';
		else if(a==38)area='Culiacán';
		else if(a==39)area='Durango';
		else if(a==40)area='Guadalajara Centro';
		else if(a==41)area='Guadalajara Oriente';
		else if(a==42)area='Guadalajara Poniente';
		else if(a==43)area='Hermosillo';
		else if(a==44)area='Jalisco';
		else if(a==45)area='La Paz';
		else if(a==46)area='Los Mochis';
		else if(a==47)area='Mazatlan';
		else if(a==48)area='Morelia';
		else if(a==49)area='Nogales';
		else if(a==50)area='Puerto Vallarta';
		else if(a==51)area='Tepic';
		else if(a==52)area='Zamora';
		else if(a==53)area='Campeche';
		else if(a==54)area='Cancún';
		else if(a==55)area='Coatzacoalcos';
		else if(a==56)area='Córdoba';
		else if(a==57)area='Jalapa';
		else if(a==58)area='Mérida';
		else if(a==59)area='Oaxaca';
		else if(a==60)area='Pachuca';
		else if(a==61)area='Poza Rica';
		else if(a==62)area='Puebla';
		else if(a==63)area='Tlaxcala-Puebla';
		else if(a==64)area='Tuxtla Guitierrez';
		else if(a==65)area='Veracrúz';
		else if(a==66)area='Villahermosa';
		else if(a==70)area='Tlaxcala';
		else if(a==67)area='Ensenada';
		else if(a==68)area='Mexicali';
		else if(a==69)area='Tijuana';
		area=area.toUpperCase();
 		areaName.push(area);
 		areaArray.push(a);

		if(d== "1")
			divName.push("METRO");
		else if(d== "2")
			divName.push("NORTE");
		else if(d== "3")
			divName.push("OCCIDENTE");
		else if(d== "4")
			divName.push("SUR");
		else if(d== "5")
			divName.push("TELNOR");
		divArray.push(d);
	}
	function obtieneDistrics(llave, url, reg){		
			var coordenadas = [];
			var bounds = new google.maps.LatLngBounds();			
			if (activos.indexOf(llave) >= 0){
				console.log("Ya esta...");
			}else{
				testing = {distritos:{name: tags, fechaInicial: "", fechaFinal: "", idArea: reg}};
				$.when(getPromise(url,testing))
					.then(function(response){
						dataCartografica[llave] = response;						
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
									
									//dataCartografica[llave].apiResponse[i].infowindows[distrito] = new google.maps.InfoWindow({});
									//addListenersOnPolygon(dataCartografica[llave].apiResponse[i].poligonos[distrito], llave, distrito, dataCartografica[llave].apiResponse[i].infowindows[distrito]);
									agregaActivos(distrito, llave,i,1,reg,0,tipoUser, "distr");
									
								}
								
							}
							
							
						}
						map.fitBounds(bounds);
						tags = [];
						$("#listaDist").html('');
						activos.push(llave);
				});	
			}
	}


	function obtieneAreasDivis(llave, url, tipoArea, are,divisionId){
			
			var datas = "";
			var coordenadas = [];
			var bounds = new google.maps.LatLngBounds();
		
			if (activos.indexOf(llave) >= 0){
				console.log("si la tiene");				
			}else{
							
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
									contentInfoPoly = contentInfoPoly + '<div></div></div>';
									dataCartografica[llave].infowindows[llave].setContent(contentInfoPoly);
			  						dataCartografica[llave].infowindows[llave].setPosition(event.latLng);
			  						dataCartografica[llave].infowindows[llave].open(map);
									
									
									
								  });  
								}
								
								//addListenersOnPolygon(dataCartografica[llave].capas[llave], llave);
								
    							//dataCartografica[llave].infowindows[llave] = new google.maps.InfoWindow({});
								
								$("#activos").css("display","block");
								
								
								
								
								if (tipoArea=="sola"){
									agregaActivos("",llave,i,'1',are,divisionId,tipoUser, "ares");
								}
								
								if (tipoArea=="todas"){
									agregaActivos("",llave,i,'3',are,divisionId,tipoUser, "divic");
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
			if (distrito==""){
				$("#areaZone").append('<div class="row"><i class="fa fa-check"></i> <input type="checkbox" id="'+llave+'-llave" value="'+llave+'" checked onchange="toggleCapa(this.value, \''+are+'\', \''+distrito+'\');"/><label data-type="1" onclick="filtrar(this,\''+are+'\',\''+llave+'\');">'+llave+'</label><div class="filters"></div></div>');
			}else if (distrito!=""){
				$("#distZone").append('<div class="row"><i class="fa fa-check"></i> <input type="checkbox" id="'+distrito+'-distrito" value="'+distrito+'" checked onchange="toggleDistrict(this.value,\''+llave+'\',\''+i+'\',\''+are+'\');"/> <label data-type="2" onclick="filtrar(this,\''+are+'\',\''+llave+'\',\''+distrito+'\');">'+llave+'-'+distrito+'</label><div class="filters"></div></div>');
			}
			if (tipoUser==1){ //// SI ES USUARIO COMERCIAL
				$("#"+elemento).append('<li  class="activoEnlaLista"><img src="mapa/images/necrop_icon.png" border="0" style="cursor:pointer;" id="comic_'+llave+'" align="absbottom" onclick="dialogModel(\''+llave+'\', \''+are+'\');" /></li>');
			}else if (tipoUser==2){ //// SI ES USUARIO TECNICO       												
				$("#techMenu").append('<div class="activoEnlaLista"  id="comic_'+llave+'" onclick="techFilter();" /></div>');
				$("#fildersMenu").append('<div class="activoEnlaLista" id="pye_'+llave+'" onclick="listadoSlideDistritos();" /></div>');
				$("#clientMenu").append('<div class="activoEnlaLista" id="poi_'+llave+'" onclick="dialogModel(\''+llave+'\', \''+are+'\',\''+distrito+'\' , \'poi\');" /></div>');
 				$("#chartMenu").append('<div class="activoEnlaLista" id="pye_'+llave+'" onclick="detalleSlideTecnos(\''+llave+'\', \''+are+'\');" /></div>');
				$("#flushTodo").append('<div class="activoEnlaLista" id="pye_'+llave+'" onclick="limpiatodo();" /></div>');
			}
			$("#flusheadorLoader").html("");
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

				
		


		function getPromise(url, data){
			
			var request = $.ajax({
				   method: "POST",
				   url: url,
				   contentType: "application/json",
				   data: JSON.stringify(data),
				   processData: false
			});		
			return request;
		}
		function limpiatodo(){
			limpiaTecnologias();
			limpiaPOIs();
			clearDist();
			for(var i=0; i<ClientesPoints.length; i++){ClientesPoints[i].setMap(null);}
			ClientesPoints=[];
		}
//shufle capas
	function toggleCapa(llave, are, distrito){
		if ($("#"+llave+"-llave").is(':checked')) {
			$("#"+llave+"-llave").parent().removeClass('uncheck');
			$("#"+llave).fadeIn();
			var tipoComic = "tec";
			dataCartografica[llave].capas[llave].setMap(map);
			autoLoad(llave, are, '');
			$("#clientMenu").html('<i class="fa fa-thumb-tack"></i><div class="showtitle"><small>POI</small></div><div class="activoEnlaLista" id="poi_Distritos-LINDAVISTA" onclick="dialogModel(\''+llave+'\', \''+are+'\', \''+distrito+'\', \'poi\');"></div>');
		}else{
			$("#"+llave+"-llave").parent().addClass('uncheck');
			$("#"+llave+"-llave").parent().removeClass('open');
			$("#"+llave).fadeOut();
			dataCartografica[llave].capas[llave].setMap(null);
			for (var tecId in dataTecnologica[llave].tecnologia){
				for (mm = 0; mm < dataTecnologica[llave].tecnologia[tecId].markers.length; mm++) {
					dataTecnologica[llave].tecnologia[tecId].markers[mm].setMap(null);
				}
			}
		}
	}
	function toggleDistrict(distrito, op, i, are){
		if ($("#"+distrito+"-distrito").is(':checked')) {
			$("#"+distrito+"-distrito").parent().removeClass('uncheck');
			$("#"+distrito).fadeIn();
			dataCartografica[op].apiResponse[i].poligonos[distrito].setMap(map);
			autoLoad(op, are, distrito);
			$("#clientMenu").html('<i class="fa fa-thumb-tack"></i><div class="showtitle"><small>POI</small></div><div class="activoEnlaLista" id="poi_Distritos-LINDAVISTA" onclick="dialogModel(\''+llave+'\', \''+are+'\', \''+distrito+'\', \'poi\');"></div>');
		}
		else{
			$("#"+distrito+"-distrito").parent().addClass('uncheck');
			$("#"+distrito+"-distrito").parent().removeClass('open');
			$("#"+distrito).fadeOut();
			dataCartografica[op].apiResponse[i].poligonos[distrito].setMap(null);
			for (var tecId in dataTecnologicaDistrito[distrito].tecnologia){
				for (mm = 0; mm < dataTecnologicaDistrito[distrito].tecnologia[tecId].markers.length; mm++) {
					dataTecnologicaDistrito[distrito].tecnologia[tecId].markers[mm].setMap(null);
				}
			}
		}			
	}
function clearDist(){
	for (var i = 0; i <= contentTags.length-1; i++) {
		console.log(i);
		console.log(contentTags[i]);
		console.log( dataTecnologicaDistrito[(contentTags[i])]);
		if(dataTecnologicaDistrito[(contentTags[i])] == undefined){

		}
		else{
			for (var tecId in dataTecnologicaDistrito[(contentTags[i])].tecnologia){
				for (mm = 0; mm < dataTecnologicaDistrito[(contentTags[i])].tecnologia[tecId].markers.length; mm++) {
					dataTecnologicaDistrito[(contentTags[i])].tecnologia[tecId].markers[mm].setMap(null);
				}
			}	
		}
	}
}
function discart(tecId,area,llave,distrito,status){
	if(status.checked){
		traeteLasTecnologias(tecId,area,llave,distrito);
	}
	else{
		if(distrito == ''){
				for (mm = 0; mm < dataTecnologica[llave].tecnologia[tecId].markers.length; mm++) {
					dataTecnologica[llave].tecnologia[tecId].markers[mm].setMap(null);
				}
		}
		else{
			for (mm = 0; mm < dataTecnologicaDistrito[distrito].tecnologia[tecId].markers.length; mm++) {
				dataTecnologicaDistrito[distrito].tecnologia[tecId].markers[mm].setMap(null);
			}
		}
	}
}
		
/***************************************Funciones que muestran todos los distritos por socket *************************************************/

		function muestraDistrictsPorDemanda(are, llave){
			//$('#socketizable').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
			connectXdemanda(are, llave);
			console.log("muestra distritos ");	
		}
		
		function resizas(){
			$('#socketizable').css({visibility: "hidden"});
		}
		
		function resizasTec(elemento){
			$('#'+elemento).css({visibility: "hidden"});
		}		
		

/****************************************************   INICIALIZANDO  ***********************************************************************/
var menuMapa = $("#menu");
	$(document).ready(function(){
			
			$("#menuWiket").hide();
			
			/*$(function() {
				$( "#accordion" ).accordion({
				  heightStyle: "content",
				  collapsible: true
				});
			  });	*/		
			
			
			$('#btnMuestraQuejasMapa').change(function(){
				quejasLiveMapa();
			});	

			$('#menuPuller').click(function(){
				menuMapa.addClass('active');
			});	
			$('#menuJumper').click(function(){
				menuMapa.removeClass('active');
			});
			

			$('#menuJumperWiket').click(function(){
				$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			});			
			$('#menuPullerWiket').click(function(){
				$("#menuWiket").toggle("slide", { direction: "rigth" }, 500);
			});	
			
			/*$( "#socketizable" ).draggable({ 
				containment: "#map-canvas", scroll: false,
				cursor: "move", cursorAt: { top: 15, left: 15 },
				handle: "div.titu"
				//snap: "map-canvas"
			})*/
			
			/*$("#socketizable").resizable({
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

			$( "#iniOpcNecrop" ).datepicker();
			$( "#finiOpcNecrop" ).datepicker();*/
			$("#closeLoader").click(function(event) {
				$("#tecnoDialog").removeClass('open');
			});
			$("#closeGeneric").click(function(event) {
				$("#genericLoad").removeClass('open');
			});
			$("#closePoi").click(function(event) {
				$("#poiLoad").removeClass('open');
			});
		});


/************************************ FUNCIONES DE LOS DIALOGMODELS DEPENDIENDO EL TIPO CLIENTE **************************************/
var loadDialog = $("#tecnoDialog"),
	techSaw = 0,
	poiSaw = 0;
		function dialogModel(llave,are,dist,tipoComic){
			var targett = $("#comic_"+llave);
			if (tipoUser==1){

			}
			else if (tipoUser==2){
				if (tipoComic=="tec"){
						$.ajax({
							type: "POST",
							url: "mapa/ajax/autoload.php",
							data: "llave=" + llave +  "&are=" + are+  "&distrito=" + dist,
							cache: false, 
							success: function(html){
								$("#tecnoDialog").addClass('open');
							}		
						});		
				}
				else if (tipoComic=="poi"){
						$.ajax({
							type: "POST",
							url: "mapa/ajax/contenidoComicPOI.php",
							data: "llave=" + llave +  "&are=" + are,
							cache: false, 
							success: function(html){
								$("#poiLoad").addClass('open');
								if(poiSaw == 0){
									$("#poiLoad .inner").html(html);
									poiSaw = 1; 
								}
							}	
						});					
				
				}
			}
				
		}

/********FUNCIONES PARA MOSTRAR LOS SLIDES DE LAS GRAFICAS ********************************************/

		function detalleSlide(distrito, llave, are, tipo, div ){
			
			$.ajax({
				type: "POST",
				url: "widgets/fechadorNecropsia.php",
				data: "llave=" + llave + "&distrito=" + distrito + "&are=" + are + "&tipo=" + tipo + "&div=" + div,
				cache: false, 
				success: function(html){
					$("#genericLoad .inner").html(html);
					$("#genericLoad").addClass('open');
				}		
			});
		}


		function detalleSlideTecnos(llave, are ){
			$.ajax({
				type: "POST",
				url: "mapa/widgets/tecnoCharts.php",
				data: "llave=" + llave + "&are=" + are,
				cache: false, 
				success: function(html){

					$("#genericLoad .inner").html(html);
					$("#genericLoad").addClass('open');
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

		/*$( "li", $gallery ).draggable({
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
		})	*/	
		
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
				/*	$( ".widg" ).draggable({ 
								containment: "#map-canvas", scroll: false,
								cursor: "move", cursorAt: { top: 5, left: 200 },
								handle: "div.manejador"								
							})	*/

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
function listadoSlideDistritos(){
	$.ajax({
		type: "GET",
		url: "mapa/list/list.php",
		cache: false,
		success: function(html){
			$("#genericLoad .inner").html(html);
			$("#genericLoad").addClass('open');
		}
	});
}
function autoLoad(llave,are,dist){
	$.ajax({
		type: "POST",
		url: "mapa/ajax/autoload.php",
		data: "llave=" + llave +  "&are=" + are+  "&distrito=" +dist,
		cache: false, 
		success: function(html){
			$("#tecnoDialog .loadArea").html(html);
		}		
	});			
}
function openLayer(d){
	var switchName = $("#nameDistrict");
	if(switchName.hasClass('open')){
		switchName.removeClass('open');
		$("#nameDistrict .inner").find('i').removeClass('fa-chevron-down');
		$("#nameDistrict .inner").find('i').addClass('fa-chevron-up');
	}
	else{
		switchName.addClass('open');
		$("#nameDistrict .inner").find('i').removeClass('fa-chevron-up');
		$("#nameDistrict .inner").find('i').addClass('fa-chevron-down');
	}
}
function filterOpen(id){
	var type = document.getElementById(id);
	var hasClass = id.parentElement.classList.contains('select');
	if(hasClass == true){
		id.parentElement.classList.remove('select');
	}
	else{
		$(".filter").removeClass('select');
		id.parentElement.classList.remove('select');
		id.parentElement.classList.add('select');
	}
}
function userCenter(){
	map.setCenter(centro);
}
$(document).on("submit",".ubicaNuevoCliente",function(event){
  event.preventDefault();
  var telefono=$('.ubicaNuevoCliente .telefono').val(),
      nombre=$('.ubicaNuevoCliente .nombre').val(),
      direccion=$('.ubicaNuevoCliente .direccion').val(),
      cliente=0;
  if(nombre!='' && direccion!=''){
    if($('#clienteOnoTelmex').is(':checked'))
     cliente=1;
    var datos={
        idFielder:userID,
        latitud:thisLatitude,
        longitud:thisLongitude,
        telefono:telefono,
        estado:cliente,
        nombre:nombre,
        direccion:direccion
    }
    var p=getPromise("http://10.105.116.52:9090/telmex/add/clientegeo",datos);
		p.done(function(data){$('#genericLoad').removeClass('open');}).fail(function(jqXHR,textStatus,error){alert(error);});
  }
  else
    alert('El nombre y la dirección son campos requeridos.');
});
$(document).on("change","#clienteOnoTelmex",function(){
   	var c,d;
   	c=this.checked?' &nbsp; &nbsp; Es usuario Telmex':' &nbsp; &nbsp; No es usuario Telmex';
   	d=this.checked?'Teléfono':'Teléfono (opcional)';
    $('.ubicaNuevoCliente .telefono').attr('placeholder',d);
	$('label.onoffswitch-label').html(c);
});
function printUsers(todo,areas,distros){
	limpiatodo();
	var x=0,infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'});
	if(areas==0) areas=[0];
	if(distros==0) distros=[0];
	clearPoints();
	$.each(fielderInfo.Datos.Regiones.Areas,function(i,a){
		var y='No'; if("Distritos" in a) y='Si';
		if(((i in areas || i==areas) && a.CualesDistritos=='Todos' && distros==0) ||
			(a.CualesDistritos=='Todos' && todo==1)){
			if(a.Clientes!=0){
				$.each(a.Clientes,function(k,c){
					var centrob = new google.maps.LatLng(c.Latitud,c.Longitud);
					ClientesPoints[x]=new google.maps.Marker({
						position:centrob,
						map		: map,
						title	: "",
						icon	: "mapa/images/client.png",
						html	:
							'<div style="text-align:center;font-weight:bold;margin:0 0 10px 0;font-size:15px;">'+
								c.Cliente+
							'</div>'+
							'<div style="margin:0 0 10px 0;">'+c.CampoA+'<br>'+c.CampoB+'<br>'+c.CampoC+'<br><b>Distrito</b>: '+k+'<br>'+
							'<b>Telefono</b>: '+c.Telefono+'</div>'+
							'<div>tCode: '+c.tcode+'<br>Campaña: '+c.idCampana+'<br>Oferta: '+c.idOferta+'</div>'
					});
					ClientesPoints[x].addListener('click',function(){
						infowindow.setContent(this.html);
						infowindow.open(map, this);
					});
					x++;
				});
			}
		}
		else if((y=='Si' && areas==0) || (y=='Si' && todo==1)){
			$.each(a.Distritos,function(j,b){
				if(b.Clientes!=0){
					$.each(b.Clientes,function(k,c){
						if($.inArray(j,distros)>-1 || todo==1){
							var centrob = new google.maps.LatLng(c.Latitud,c.Longitud);
							ClientesPoints[x]=new google.maps.Marker({
								position:centrob,
								map		: map,
								title	: "",
								icon	: "mapa/images/client.png",
								html:
									'<div style="text-align:center;font-weight:bold;margin:0 0 10px 0;font-size:15px;">'+
										c.Cliente+
									'</div>'+
									'<div style="margin:0 0 10px 0;">'+c.CampoA+'<br>'+c.CampoB+'<br>'+c.CampoC+'<br><b>Distrito</b>: '+j+'<br>'+
									'<b>Telefono</b>: '+c.Telefono+'</div>'+
									'<div>tCode: '+c.tcode+'<br>Campaña: '+c.idCampana+'<br>Oferta: '+c.idOferta+'</div>'
							});
							ClientesPoints[x].addListener('click',function(){
								infowindow.setContent(this.html);
								infowindow.open(map, this);
							});
							x++;
						}
					});
				}
			});
		}
	});
	console.log(x + ' clientes pintados.');
	$("#masterLogin").fadeOut('fast');
}
function techFilter(){
	$("#tecnoDialog").addClass('open');
}
function currentPosition(){
		centro = new google.maps.LatLng(lastLatitude,lastLongitude);
		miposicion = new google.maps.Marker({
			position:centro,
			map:map,
			title:"",
			icon:"mapa/images/myPosition.png"
		});
		if(justOne==0)
			map.setCenter(centro);
		justOne=2;
}


function nav(){
	$("#goTo").addClass('open');
}
function filtrar(metadata, are, llave, distrito){
	var type = metadata.dataset.type;
	var hasClass = metadata.parentElement.classList.contains('open');
	var unCheck = metadata.parentElement.classList.contains('uncheck');
	if(hasClass == true || unCheck == true){
		metadata.parentElement.classList.remove('open');
	}
	else{
		$(".row").removeClass('open');
		metadata.parentElement.classList.add('open');
		if(type == 2){
			$("#loadInMap .open .filters").html('<div class="holder">'+
				'<div class="userFilter" onclick="userType(this,0,\''+distrito+'\');">'+
					'<p>Usuarios</p>'+
				'</div>'+
				'<div class="userFilter" onclick="disable();">'+
					'<p>No usuarios</p>'+
				'</div>'+
				'</div>'+
				'<div class="tecFilter">'+
				'<p onclick="getTech(\''+llave+'\' ,\''+are+'\', \''+distrito+'\',this);"> Filtrar tecnologias</p>'+
					'<ul id="tecnoCheck-'+distrito+'">'+
					'</ul>'+
				'</div>');
		}
		else{
			$("#loadInMap .open .filters").html('<div class="holder">'+
				'<div class="userFilter" onclick="userType(this, '+are+',0);">'+
					'<p>Usuarios</p>'+
				'</div>'+
				'<div class="userFilter" onclick="disable();">'+
					'<p>No usuarios</p>'+
				'</div>'+
				'</div>'+
				'<div class="tecFilter">'+
				'<p onclick="getTech(\''+llave+'\' ,\''+are+'\', \''+distrito+'\',this);"> Filtrar tecnologias</p>'+
					'<ul id="tecnoCheck-'+llave+'">'+
					'</ul>'+
				'</div>');	
		}
	}
}
function userType(d,area, distrito){
	var hasClass = d.classList.contains('select-filter');
	if(hasClass == true){
		d.classList.remove('select-filter');
		clearPoints();
	}
	else{
		d.classList.add('select-filter');
		var areas = [];
		var distritos = [];
		areas.push(area);
		distritos.push(distrito);
		printUsers(0,areas,distritos);
	}
}
function getTech(llave, area, distrito, d){
	var hasClass = d.parentElement.classList.contains('open');
	if(hasClass == true){
		d.parentElement.classList.remove('open');
	}
	else{
		d.parentElement.classList.add('open');		
		d.nextSibling.innerHTML="";
		$.ajax({
			type: "POST",
			url: "mapa/ajax/autoload.php",
			data: "llave=" + llave +  "&are=" + area+  "&distrito=" +distrito,
			cache: false, 
			success: function(html){
				$("#tecnoDialog .loadArea").html(html);
			}
		});		
	}
}
function disable(){
	alert('Contenido no existente.');
}
function clearPoints(){
	for(var i=0; i<ClientesPoints.length; i++){
		ClientesPoints[i].setMap(null);
	}
		ClientesPoints=[];
}