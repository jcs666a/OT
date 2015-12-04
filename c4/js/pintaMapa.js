var map,
	llave="",
	dataCartografica={},
	dataCartograficaDistritos={},
	capas={},
	infoWindow="",
	infowindows={},
	contentInfoPoly="",
	poligonosCords={},
	poligonos={},
	testing={},
	marcadores=[];
function creanoti(titulo,mensaje,error,textStatus,clase){
	var op=''; if(error!='') op='<p>' + error + ' ' + textStatus + '</p>';
	$('#notificaciones').append('<div class="tn ' + clase + '">' +
		'<h2>' + titulo + '</h2>' +
		'<p>' + mensaje + '</p>' + op +
		'<div class="tn-progress"></div>' +
	'</div>');
	setTimeout(function(){$('#notificaciones').find(".tn").first().remove();},5000);
}
function initialize(){
	map = new google.maps.Map(document.getElementById('mapaggg'),{
		disableDefaultUI:true,
		scrollwheel:false,
		zoomControl:true,
		zoom:7,
		center:{lat:19.3907336,lng:-99.1436126},
		styles:[{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}]
	});
}
google.maps.event.addDomListener(window,'load',initialize);
function trimer(str){ return str.replace(" ",""); }
function obtieneDistrics(llave,url,reg,dtags,color){
	limpiaDistricts();
	limpiaDivs();
	limpiaAreas();
	var coordenadas=[];
	var bounds=new google.maps.LatLngBounds();
	testing={distritos:{name: dtags, fechaInicial: "", fechaFinal: "", idArea: reg}};
	$.when(getPromise(url,testing))
		.then(function(response){
			dataCartografica[llave] = response;
			for(var i = 0; i < dataCartografica[llave].apiResponse.length; i++){
				var largoPol = dataCartografica[llave].apiResponse[i].distrito.poligonos.length;
				if(largoPol >= 1){
					for(var j = 0; j < largoPol; j++){
						var coordenadas = [];
						for(var k = 0; k < dataCartografica[llave].apiResponse[i].distrito.poligonos[j].coordenadas.length; k++){
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
							fillColor: '#' + color,
							fillOpacity: 0.35
						});
						dataCartografica[llave].apiResponse[i].poligonos[distrito].setMap(map);
					}
				}
			}
			map.fitBounds(bounds);
		}
	);
}
function obtieneAreasDivis(llave,url,color){
	var datas="",
		coordenadas=[],
		bounds=new google.maps.LatLngBounds();
	limpiaDistricts();limpiaAreas();limpiaDivs();
	$.ajax({
		type:"GET",
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
			var featureStyle={
				fillColor: '#' + color,
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
				fillColor: '#' + color,
				fillOpacity: 0.2
			});
			map.fitBounds(bounds);
		}
	});
}
function creaMarcadores(marcas){
	var todos=marcas.split(','),
		marcax=[];
	$.each(todos,function(inx,uno){
		marcax.push({"idFielder":uno});
	});
	$.ajax({
		type:"POST",
		url:ip_services + "/telmex/get/coordn",
		data:JSON.stringify(marcax),
		contentType:"application/json",
		dataType:"json"
	}).done(function(data){
		var x=data.apiResponse[0],
			centro,
			datosMarker,
			i=0,
			infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'}),
			fecha;
		$.each(x,function(index,mark){
			fecha=mark.createAt.slice(0,19);
			horas=fecha.slice(11,19);
			fecha=fecha.slice(6,10)+'-'+fecha.slice(3,5)+'-'+fecha.slice(0,2)+'T'+horas;
			fecha=new Date(fecha);
			fecha=fecha.format('h:MM:ss TT, dddd d "de" mmm "del "yyyy');
			if(ubicalosFirst==1)
				creanoti(mark.nombre+', ubicado...',mark.latitud+', '+mark.longitud+'<br/>'+fecha,'','','');
			datosMarker='<div>'+
				'<h4>'+mark.nombre+'</h4>'+
				'<p>'+fecha+'</p>'+
				'</div>';
			centro=new google.maps.LatLng(mark.latitud, mark.longitud);
			marcadores[i]=new google.maps.Marker({
				position:centro,
				map:map,
				title:mark.nombre,
				icon:'img/geo_a.png',
				html:datosMarker
			});
			marcadores[i].addListener('click', function(){
				infowindow.setContent(this.html);
				infowindow.open(map, this);
			});
			i++;
		}); // map.setCenter(centro);
	}).fail(function(jqXHR,textStatus,error){
		creanoti('Error:',
			'No se pudo conectar al servicio para recibir la ubicación de los usuarios',
			error,textStatus,'error');
	});
}
function limpiaDistricts(){
	if(dataCartografica != ""){
		for(var llave in dataCartografica){
			var str = llave.split("-");
			if (str[0]=="Distritos"){
				for (var i = 0; i < dataCartografica[llave].apiResponse.length; i++){
					for(var distrito in dataCartografica[llave].apiResponse[i].poligonos){
						dataCartografica[llave].apiResponse[i].poligonos[distrito].setMap(null);
					}
					if(dataCartografica[llave].apiResponse[i].markers.length >= 1){
						for(mm = 0; mm < dataCartografica[llave].apiResponse[i].markers.length; mm++){
							dataCartografica[llave].apiResponse[i].markers[mm].setMap(null);
						}
					}
				}
			}
		}
	}
	for(var llave in dataCartograficaDistritos){
		for(var pol in dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos){
			dataCartograficaDistritos[llave].poligonosTodosDistritos[llave].poligonos[pol].setMap(null);
		}
	}
}
function limpiaAreas(){
	if (dataCartografica!=""){
		for(var llave in dataCartografica){
			var str = llave.split("-");
			if (str[0]=="Area"){
				for(var distrito in dataCartografica[llave].poligonos){
					dataCartografica[llave].capas[distrito].setMap(null);
				}
				if (dataCartografica[llave].markers.length >= 1){
					for (mm = 0; mm < dataCartografica[llave].markers.length; mm++){
						dataCartografica[llave].markers[mm].setMap(null);
					}
				}
			}
		}
	}
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
					for (mm = 0; mm < dataCartografica[llave].markers.length; mm++){
						  dataCartografica[llave].markers[mm].setMap(null);
					}
				}
			}
		}
	}
}
function limpiaMarcadores(){
	for(var i=0; i<marcadores.length; i++){marcadores[i].setMap(null);}
	marcadores=[];
	ubicalosFirst=1;
}
function getPromise(url,data){
	var request=$.ajax({
		method:"POST",
		url:url,
		contentType:"application/json",
		data:JSON.stringify(data),
		processData:false
	});
	return request;
}