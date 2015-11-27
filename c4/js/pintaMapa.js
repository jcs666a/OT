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
	testing={};
function initialize(){
	map = new google.maps.Map(document.getElementById('mapaggg'),{
		zoom:7,
		scrollwheel:false,
		center:{lat:19.3907336,lng:-99.1436126},
		styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
	});
}
google.maps.event.addDomListener(window,'load',initialize);
function trimer(str){ return str.replace(" ",""); }
function obtieneDistrics(llave,url,reg,dtags,color){
	limpiaDistricts();
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
						var addListenersOnPolygon = function(polygon,llave, distrito, ventana){
						  google.maps.event.addListener(polygon, 'click', function (event){
							contentInfoPoly = '<div style="font-family:Arial, Helvetica, sans-serif; font-size:10px;"><div>' + distrito + '</div>';
							ventana.setContent(contentInfoPoly);
							ventana.setPosition(event.latLng);
							ventana.open(map);
						  });
						}
						dataCartografica[llave].apiResponse[i].infowindows[distrito] = new google.maps.InfoWindow({});
						addListenersOnPolygon(dataCartografica[llave].apiResponse[i].poligonos[distrito], llave, distrito, dataCartografica[llave].apiResponse[i].infowindows[distrito]);
					}
				}
			}
			map.fitBounds(bounds);
		}
	);
}
function obtieneAreasDivis(llave,url,tipoArea,color){
	var datas="",
		coordenadas=[],
		bounds=new google.maps.LatLngBounds();
	limpiaDistricts();
	if (tipoArea=="sola") limpiaDivs();
	else if(tipoArea=="todas") limpiaAreas();
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
			var featureStyle = {
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
			var addListenersOnPolygon=function(polygon,llave){
				google.maps.event.addListener(polygon,'click',function(event){
					var quejas=dataCartografica[llave].markers.length;
					contentInfoPoly='<div><div>'+llave+'</div>';
					contentInfoPoly=contentInfoPoly + '<div> Quejas:'+quejas+'</div></div>';
					dataCartografica[llave].infowindows[llave].setContent(contentInfoPoly);
						dataCartografica[llave].infowindows[llave].setPosition(event.latLng);
						dataCartografica[llave].infowindows[llave].open(map);
				});
			}
			addListenersOnPolygon(dataCartografica[llave].capas[llave],llave);
			dataCartografica[llave].infowindows[llave] = new google.maps.InfoWindow({});
			map.fitBounds(bounds);
		}
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