var map,
	inicial = 0,
	intervaloMarcadores,
	miposicion=[],
	dondeEstoy,
	centralosFirst=1,
	tiempo_A,
	tiempo_B,
	milisPasados,
	minusPasados,
	ubicacion_A,
	ubicacion_B;
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
			if (inicial = 0){
				cargaReg();
				inicial = 1;
			}
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
		tope = 0,
		areCarArr = [],
		clearAre = [],
		dividCarArr = [],
		clearDivId = [],
		filtroStop = 0,
		areLoadArr =[],
		push = {},
		distLoadArr =[];
	function cargaReg(divString, areaString, distString, size){
			var div = divName[tope],
				divid = divArray[tope],
				reg = areaName[tope],
				are = areaArray[tope];
				distArray.push(distString);
					cargaDist(distString, reg, are, size);
					cargaAreas(reg,are,size,divid);
				tope++;
	}
	function trimer(str) {
        return str.replace(" ","");
	}
	function cargaDist(distString, reg, are, size){
		if (size == size){
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
		for(var i = 0; i <= clear.length; i++){
			url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + clear[i];
			llave = "Area-"+trimer(clear[i]);
			tipoArea = "sola";
			obtieneAreasDivis(llave, url , tipoArea, clearAre[i], clearDivId[i]);
			autoLoad(llave,  clearAre[i], '');
		}
	}
	function knowNames(d,a){
		if(d == "1")
			divName.push("METRO");
			divArray.push(d);
		if(d == "2")
			divName.push("NORTE");
			divArray.push(d);
		if(d == "3")
			divName.push("OCCIDENTE");
			divArray.push(d);
		if(d== "4")
			divName.push("SUR");
			divArray.push(d);
		if(d== "5")
			divName.push("TELNOR");
			divArray.push(d);
		$.ajax({
			type: "GET",
			url: "http://10.105.116.52:9090/getAreaCatalog/"+d+"",
			cache: false, 
			success: function(html){
				if(a != undefined){
					b = a-1;
			 		areaName.push(html.apiResponse[b].descripcion);
			 		areaArray.push(a);
			 	}
			}, 
			error:function(){
				alert("error mapa.source linea 109");
			},		
		});	
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
						console.log( "response: "+response);
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
				$("#areaZone").append('<div><input type="checkbox" id="'+llave+'-llave" value="'+llave+'" checked onchange="toggleCapa(this.value, \''+are+'\', \''+distrito+'\');"/><label>'+llave+'</label></div>');
			}else if (distrito!=""){
				$("#distZone").append('<div><input type="checkbox" id="'+distrito+'-distrito" value="'+distrito+'" checked onchange="toggleDistrict(this.value,\''+llave+'\',\''+i+'\',\''+are+'\');"/> <label>'+llave+'-'+distrito+'</label></div>');
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
		}


//shufle capas
	function toggleCapa(llave, are, distrito){
		if ($("#"+llave+"-llave").is(':checked')) {
			$("#"+distrito).fadeIn();
			var tipoComic = "tec";
			dataCartografica[llave].capas[llave].setMap(map);
			autoLoad(llave, are, '');
			$("#clientMenu").html('<i class="fa fa-thumb-tack"></i><div class="showtitle"><small>POI</small></div><div class="activoEnlaLista" id="poi_Distritos-LINDAVISTA" onclick="dialogModel(\''+llave+'\', \''+are+'\', \''+distrito+'\', \'poi\');"></div>');
		}else{
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
			$("#"+distrito).fadeIn();
			dataCartografica[op].apiResponse[i].poligonos[distrito].setMap(map);
			autoLoad(op, are, distrito);
			$("#clientMenu").html('<i class="fa fa-thumb-tack"></i><div class="showtitle"><small>POI</small></div><div class="activoEnlaLista" id="poi_Distritos-LINDAVISTA" onclick="dialogModel(\''+llave+'\', \''+are+'\', \''+distrito+'\', \'poi\');"></div>');
		}
		else{
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
		for (var tecId in dataTecnologicaDistrito[(contentTags[i])].tecnologia){
			for (mm = 0; mm < dataTecnologicaDistrito[(contentTags[i])].tecnologia[tecId].markers.length; mm++) {
				dataTecnologicaDistrito[(contentTags[i])].tecnologia[tecId].markers[mm].setMap(null);
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

			$( "#iniOpcNecrop" ).datepicker();
			$( "#finiOpcNecrop" ).datepicker();
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
function autoLoad(llave,are, dist){
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
		switchName.find('i').removeClass('fa-chevron-down');
		switchName.find('i').addClass('fa-chevron-up');
	}
	else{
		switchName.addClass('open');
		switchName.find('i').removeClass('fa-chevron-up');
		switchName.find('i').addClass('fa-chevron-down');
	}
}
function filterOpen(id){
	var type = document.getElementById(id);
	var hasClass = type.classList.contains('select');
	if(hasClass == true){
		$(".filter").removeClass('select');
	}
	else{
		$(".filter").removeClass('select');
		var content = type.innerHTML;
		type.classList.add('select');
		$(".loadArea ul").html(content);
	}
}
function userCenter(){
	map.setCenter(centro);
}
function userLocation(type){
	limpiatodo();
	var value = type.dataset.type;
	if(value == "user"){
		$.get('http://10.105.116.52:9090/telmex/get/clientes/', function(data){
			var response = data.apiResponse[0];
			printUsers(response);
		});
	}
	if(value == "noUser"){
		alert('información no disponible');
	}
}
var sizeArray = 0;
function printUsers(r){
	for (var i = 0; i <= r.length-1; i++){
		if(r[i].latitud != null || r[i].longitud != null || r[i].cliente != null || r[i].distrito != null ){	
			for (var b = 0; b <= contentTags.length-1; b++) {
				if(contentTags[b].toUpperCase() == r[i].distrito){
					if ((push[sizeArray]==undefined) || (push[sizeArray]=="")){
						push[sizeArray]={};
						push[sizeArray].referencia={};
						push[sizeArray].calle= r[i].campoa;
						push[sizeArray].colonia= r[i].campob;
						push[sizeArray].cliente= r[i].cliente;
						push[sizeArray].telefono= r[i].telefono;
						push[sizeArray].distrito= r[i].distrito;
						push[sizeArray].latitud = r[i].latitud;
						push[sizeArray].longitud = r[i].longitud;
					}
					centro = new google.maps.LatLng(push[sizeArray].latitud, push[sizeArray].longitud);	
						push[sizeArray].referencia = new google.maps.Marker({position: centro,
						map: map,
						title: "",
						icon: "mapa/images/client.png",
						html:'<tr><td style="text-align:center;" ><b>'+push[sizeArray].cliente+'</b></td>'+
							'<br>'+
							'<td style="text-align:left;">'+push[sizeArray].calle+'</td>'+
							'<br>'+
							'<td style="text-align:left;">'+push[sizeArray].colonia+'</td>'+
							'<br>'+
						
							'<td style="text-align:left;">'+push[sizeArray].telefono+'</td></tr>',
					});
					push[sizeArray].referencia.addListener('click', function() {
						var infoWindow = new google.maps.InfoWindow({
							content: this.html
						});
						infoWindow.open(map,this);		
					});
				sizeArray++;
				}
			}
		}
	}
}
function techFilter(){
	$("#tecnoDialog").addClass('open');
}
var justOne = 0, 
	centro = "";
function currentPosition(){
		centro = new google.maps.LatLng(lastLatitude,lastLongitude);
		miposicion = new google.maps.Marker({
			position:centro,
			map:map,
			title:"",
			icon:"mapa/images/myPosition.png"
		});
			map.setCenter(centro);

}
function newPosition(){
		console.log('new position');
		limpiaMarcadores();
		centro = new google.maps.LatLng(lastLatitude,lastLongitude);
		miposicion = new google.maps.Marker({
			position:centro,
			map:map,
			title:"",
			icon:"mapa/images/myPosition.png"
		});	
}
function limpiaMarcadores(){
	for(var i=0; i<miposicion.length; i++){miposicion[i].setMap(null);}
	miposicion=[];
}
function nav(){
	$("#goTo").addClass('open');
}