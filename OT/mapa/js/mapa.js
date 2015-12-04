function initialize(){map=new google.maps.Map(document.getElementById("map-canvas"),{zoom:7,center:{lat:19.3907336,lng:-99.1436126},styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#112251"}]},{featureType:"administrative.land_parcel",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f3ebe2"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{saturation:"23"},{color:"#fffcf7"},{visibility:"on"}]},{featureType:"landscape",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"landscape",elementType:"labels.text.fill",stylers:[{color:"#112251"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"simplified"},{lightness:"39"}]},{featureType:"poi.business",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"poi.government",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.school",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#ede5d7"}]},{featureType:"road",elementType:"labels.icon",stylers:[{weight:"0.20"},{visibility:"simplified"}]},{featureType:"road.highway",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{invert_lightness:!0},{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.station.airport",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"transit.station.bus",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"transit.station.rail",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"water",elementType:"all",stylers:[{color:"#c9e4f3"},{visibility:"on"}]}]}),map2=new google.maps.Map(document.getElementById("distritosXareaPOP"),{center:{lat:19.42808,lng:-99.14316},zoom:8,styles:[{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"},{lightness:"65"}]},{featureType:"administrative.locality",elementType:"all",stylers:[{hue:"#2c2e33"},{saturation:7},{lightness:19},{visibility:"on"}]},{featureType:"landscape",elementType:"all",stylers:[{hue:"#ffffff"},{saturation:-100},{lightness:100},{visibility:"simplified"}]},{featureType:"poi",elementType:"all",stylers:[{hue:"#ffffff"},{saturation:-100},{lightness:100},{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{hue:"#008eff"},{saturation:-93},{lightness:31},{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{hue:"#bbc0c4"},{saturation:-93},{lightness:31},{visibility:"on"}]},{featureType:"road.arterial",elementType:"labels",stylers:[{hue:"#bbc0c4"},{saturation:-93},{lightness:-2},{visibility:"simplified"}]},{featureType:"road.local",elementType:"geometry",stylers:[{hue:"#e9ebed"},{saturation:-90},{lightness:-8},{visibility:"simplified"}]},{featureType:"transit",elementType:"all",stylers:[{hue:"#e9ebed"},{saturation:10},{lightness:69},{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{visibility:"simplified"},{saturation:"-30"},{lightness:"50"}]}]}),cargaReg()}function trimer(a){return a.replace(" ","")}function cargaReg(a,e,t){void 0!=t&&tags.push(t);var i="METRO",o="LINDAVISTA",s=e,r="0",l="",n="";"Todas"==o?(l="http://10.105.116.52:9090/getDivisionByName/geoJson/"+i,llave="Division-"+trimer(i),n="todas",obtieneAreasDivis(llave,l,n)):"Todas"!=o&&("1"==r?tags.length>0&&(l="http://10.105.116.52:9090/telmex/necropsia/reporte/distrito",llave="Distritos-"+trimer(o),obtieneDistrics(llave,l,s)):"0"==r?(l="http://10.105.116.52:9090/getAreaByName/geoJson/"+o,llave="Area-"+trimer(o),n="sola",obtieneAreasDivis(llave,l,n)):"2"==r&&(llave="Area-"+trimer(o),muestraDistrictsPorDemanda(s,llave))),$("#menu").is(":visible")&&$("#menu").removeClass("active")}function obtieneDistrics(a,e,t){limpiaDistricts(),limpiaDivs();var i=new google.maps.LatLngBounds;activos.indexOf(a)>=0?console.log("Ya esta..."):(testing={distritos:{name:tags,fechaInicial:"",fechaFinal:"",idArea:t}},$.when(getPromise(e,testing)).then(function(e){console.log("respuesta:"+e),dataCartografica[a]=e;for(var o=0;o<dataCartografica[a].apiResponse.length;o++){var s=dataCartografica[a].apiResponse[o].distrito.poligonos.length;if(s>=1)for(var r=0;s>r;r++){for(var l=[],n=0;n<dataCartografica[a].apiResponse[o].distrito.poligonos[r].coordenadas.length;n++){var c=new google.maps.LatLng(dataCartografica[a].apiResponse[o].distrito.poligonos[r].coordenadas[n].latitud,dataCartografica[a].apiResponse[o].distrito.poligonos[r].coordenadas[n].longitud);l.push(c),i.extend(c)}var p=dataCartografica[a].apiResponse[o].distrito.claveDistrito;dataCartografica[a].apiResponse[o].poligonosCords={},dataCartografica[a].apiResponse[o].poligonosCords[p]=l,dataCartografica[a].apiResponse[o].poligonos={},dataCartografica[a].apiResponse[o].infowindows={},dataCartografica[a].apiResponse[o].markers=[],dataCartografica[a].apiResponse[o].poligonos[p]=new google.maps.Polygon({paths:dataCartografica[a].apiResponse[o].poligonosCords[p],strokeColor:"#ff9000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35}),dataCartografica[a].apiResponse[o].poligonos[p].setMap(map);var d=function(a,e,t,i){google.maps.event.addListener(a,"click",function(a){contentInfoPoly='<div style="font-family:Arial, Helvetica, sans-serif; font-size:11px;"><div style="background-color:#CCCCCC; line-height:20px; text-align:center;"><b>Distrito </b></div><table style="width:140px; font-family:Arial, Helvetica, sans-serif; font-size:10px;"><tr><td style="text-align:right; background-color:#F2F2F2;">Velocidad:</td><td style="text-align:left;">100k</td></tr><tr><td style="text-align:right; background-color:#F2F2F2;">Facilidades:</td><td style="text-align:left;">fibra</td></tr><tr><td style="text-align:right; background-color:#F2F2F2;">PDM:</td><td style="text-align:left;">.5%</td></tr></table></div>',i.setContent(contentInfoPoly),i.setPosition(a.latLng),i.open(map)})};dataCartografica[a].apiResponse[o].infowindows[p]=new google.maps.InfoWindow({}),d(dataCartografica[a].apiResponse[o].poligonos[p],a,p,dataCartografica[a].apiResponse[o].infowindows[p]),agregaActivos(p,a,o,1,t,0,tipoUser,"distr")}}map.fitBounds(i),tags=[],$("#listaDist").html(""),activos.push(a)}))}function obtieneAreasDivis(a,e,t){var i=[],o=new google.maps.LatLngBounds;activos.indexOf(a)>=0?console.log("si la tiene"):("sola"==t&&limpiaDivs(),"todas"==t&&limpiaAreas(),$.ajax({type:"GET",url:e,dataType:"json",cache:!1,success:function(e){dataCartografica[a]=e.apiResponse[0],dataCartografica[a].markers=[],dataCartografica[a].capas={},dataCartografica[a].infowindows={},dataCartografica[a].poligonosCords={},dataCartografica[a].poligonos={},dataCartografica[a].capas[a]=new google.maps.Data,dataCartografica[a].capas[a].addGeoJson(e.apiResponse[0]);var s={fillColor:"#D0FA58",strokeWeight:1,strokeOpacity:.4,fillOpacity:.2};dataCartografica[a].capas[a].setStyle(s),dataCartografica[a].capas[a].setMap(map);for(var r=(dataCartografica[a].capas[a],0);r<dataCartografica[a].features[0].geometry.coordinates.length;r++)for(var l=0;l<dataCartografica[a].features[0].geometry.coordinates[r].length;l++){var n=new google.maps.LatLng(dataCartografica[a].features[0].geometry.coordinates[r][l][1],dataCartografica[a].features[0].geometry.coordinates[r][l][0]);i.push(n),o.extend(n)}dataCartografica[a].poligonosCords[a]=i,dataCartografica[a].poligonos[a]=new google.maps.Polygon({paths:dataCartografica[a].poligonosCords[a],strokeColor:"#D0FA58",strokeOpacity:.4,strokeWeight:1,fillColor:"#D0FA58",fillOpacity:.2});var c=function(a,e){google.maps.event.addListener(a,"click",function(a){dataCartografica[e].markers.length;contentInfoPoly='<div style="font-family:Arial, Helvetica, sans-serif; font-size:10px;"><div>'+e+"</div>",contentInfoPoly+="<div></div></div>",dataCartografica[e].infowindows[e].setContent(contentInfoPoly),dataCartografica[e].infowindows[e].setPosition(a.latLng),dataCartografica[e].infowindows[e].open(map)})};c(dataCartografica[a].capas[a],a),dataCartografica[a].infowindows[a]=new google.maps.InfoWindow({}),$("#activos").css("display","block");var p="6",d="1";"sola"==t&&agregaActivos("",a,r,"1",p,d,tipoUser,"ares"),"todas"==t&&agregaActivos("",a,r,"3",p,d,tipoUser,"divic"),map.fitBounds(o),tags=[],$("#listaDist").val(""),activos.push(a)}}))}function agregaActivos(a,e,t,i,o,s,r,l){""==a?($("#"+l).append('<li  class="activoEnlaLista"><input type="checkbox" id="'+e+'" value="'+e+'" checked onchange="toggleCapa(this.value);"/></li>'),$("#nameDistrict").append("<small> Zona de trabajo: <strong>"+e+"</small>")):""!=a&&($("#"+l).append('<li  class="activoEnlaLista"><input type="checkbox" id="'+a+'" value="'+a+'" checked onchange="toggleDistrict(this.value,\''+e+"',"+t+');"/></li>'),$("#nameDistrict").append("<small> Zona de trabajo: <strong>"+e+" - "+a+"</small>")),1==r?$("#"+l).append('<li  class="activoEnlaLista"><img src="mapa/images/necrop_icon.png" border="0" style="cursor:pointer;" id="comic_'+e+'" align="absbottom" onclick="dialogModel(\''+e+"', '"+o+"');\" /></li>"):2==r&&($("#techMenu").append('<div class="activoEnlaLista"  id="comic_'+e+'" onclick="dialogModel(\''+e+"', '"+o+"', 'tec');\" /></div>"),$("#fildersMenu").append('<div class="activoEnlaLista" id="pye_'+e+'" onclick="detalleSlideTecnos(\''+e+"', '"+o+"');\" /></div>"),$("#clientMenu").append('<div class="activoEnlaLista" id="poi_'+e+'" onclick="dialogModel(\''+e+"', '"+o+"', 'poi');\" /></div>"),$("#chartMenu").append('<div class="activoEnlaLista" id="pye_'+e+'" onclick="listadoSlideDistritos();" /></div>')),$("#flusheadorLoader").html(""),autoLoad(e,o,"tec"),""!=a&&$("#activos").css("display","block"),$("#"+l).css("display","block"),"ares"==l?$("#divic").css("display","none"):"divic"==l&&$("#ares").css("display","none")}function limpiaDistricts(){if(""!=dataCartografica)for(var a in dataCartografica){var e=a.split("-");if("Distritos"==e[0]){for(var t=0;t<dataCartografica[a].apiResponse.length;t++){for(var i in dataCartografica[a].apiResponse[t].poligonos)dataCartografica[a].apiResponse[t].poligonos[i].setMap(null);if(dataCartografica[a].apiResponse[t].markers.length>=1)for(mm=0;mm<dataCartografica[a].apiResponse[t].markers.length;mm++)dataCartografica[a].apiResponse[t].markers[mm].setMap(null)}var o=activos.indexOf(a);o>=0&&activos.splice(o,1),limpiaSemaforo()}}for(var a in dataCartograficaDistritos)for(var s in dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos)dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos[s].setMap(null);$("#distr").html("")}function limpiaAreas(){if(""!=dataCartografica)for(var a in dataCartografica){var e=a.split("-");if("Area"==e[0]){for(var t in dataCartografica[a].poligonos)dataCartografica[a].capas[t].setMap(null);if(dataCartografica[a].markers.length>=1)for(mm=0;mm<dataCartografica[a].markers.length;mm++)dataCartografica[a].markers[mm].setMap(null);var i=activos.indexOf(a);if(i>=0&&activos.splice(i,1),!$.isEmptyObject(dataNecrop[a])){for(var o in dataNecrop[a].colores){for(mm=0;mm<dataNecrop[a].colores[o].markers.length;mm++)dataNecrop[a].colores[o].markers[mm].setMap(null);var i=activos.indexOf(a+"-SemaforoNecrop");i>=0&&activos.splice(i,1)}delete dataNecrop[a]}}}$("#ares").html("")}function limpiaDivs(){if(""!=dataCartografica)for(var a in dataCartografica){var e=a.split("-");if("Division"==e[0]){for(var t in dataCartografica[a].poligonos)dataCartografica[a].capas[t].setMap(null);if(dataCartografica[a].markers.length>=1)for(mm=0;mm<dataCartografica[a].markers.length;mm++)dataCartografica[a].markers[mm].setMap(null);var i=activos.indexOf(a);if(i>=0&&activos.splice(i,1),!$.isEmptyObject(dataNecrop[a])){for(var o in dataNecrop[a].colores){for(mm=0;mm<dataNecrop[a].colores[o].markers.length;mm++)dataNecrop[a].colores[o].markers[mm].setMap(null);var i=activos.indexOf(a+"-SemaforoNecrop");i>=0&&activos.splice(i,1)}delete dataNecrop[a]}}}$("#divic").html("")}function getPromise(a,e){var t=$.ajax({method:"POST",url:a,contentType:"application/json",data:JSON.stringify(e),processData:!1});return t}function limpiatodo(){limpiaDistricts(),limpiaAreas(),limpiaDivs(),dataCartografica={},dataCartograficaDistritos={},capas={},infoWindow="",infowindows={},contentInfoPoly="",poligonosCords={},poligonos={},limpiaTecnologias(),limpiaPOIs(),limpiaSemaforo(),$("#flusheadorLoader").html("<img src='images/loader_small.gif'  style='margin:0px auto;'>"),setTimeout('$("#activos").slideUp("slow")',1e3)}function toggleCapa(a){dataCartografica[a].capas[a].setMap($("#"+a).is(":checked")?map:null)}function toggleDistrict(a,e,t){if($("#"+a).is(":checked"))dataCartografica[e].apiResponse[t].poligonos[a].setMap(map);else{if(dataCartografica[e].apiResponse[t].poligonos[a].setMap(null),dataCartografica[e].apiResponse[t].markers.length>=1)for(mm=0;mm<dataCartografica[e].apiResponse[t].markers.length;mm++)dataCartografica[e].apiResponse[t].markers[mm].setMap(null);$("#necro_"+a).is(":checked")&&$("#necro_"+a).prop("checked",!1)}}function toggleDistricts(a){if($("#distritos_"+a).is(":checked"))for(var e in dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos)dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos[e].setMap(map);else for(var e in dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos)dataCartograficaDistritos[a].poligonosTodosDistritos[a].poligonos[e].setMap(null)}function toggleNecrop(a,e,t,i,o,s){if($("#necro_"+a).is(":checked")){var r=new google.maps.LatLngBounds;if("2"==i)for(mm=0;mm<dataCartografica[e].apiResponse[t].poligonosCords[a].length;mm++)r.extend(dataCartografica[e].apiResponse[t].poligonosCords[a][mm]);else if("1"==i||"3"==i)for(mm=0;mm<dataCartografica[e].poligonosCords[e].length;mm++)r.extend(dataCartografica[e].poligonosCords[e][mm]);var l=r.getCenter(),n=new google.maps.Marker({position:l,map:map,icon:"http://200.66.100.138/map/skulli.png",animation:google.maps.Animation.DROP}),c="",p=new google.maps.InfoWindow;google.maps.event.addListener(n,"click",function(){return function(){detalleSlide(a,e,o,i,s)}}(n,c,p)),"2"==i?dataCartografica[e].apiResponse[t].markers.push(n):("1"==i||"3"==i)&&dataCartografica[e].markers.push(n)}else{if("2"==i)for(mm=0;mm<dataCartografica[e].apiResponse[t].markers.length;mm++)dataCartografica[e].apiResponse[t].markers[mm].setMap(null);else if("1"==i||"3"==i)for(mm=0;mm<dataCartografica[e].markers.length;mm++)dataCartografica[e].markers[mm].setMap(null);$("#detalleSlide").is(":visible")&&$("#detalleSlide").toggle("slide",{direction:"rigth"},500)}}function muestraDistrictsPorDemanda(a,e){connectXdemanda(a,e),console.log("muestra distritos ")}function resizas(){$("#socketizable").css({visibility:"hidden"})}function resizasTec(a){$("#"+a).css({visibility:"hidden"})}function dialogModel(a,e,t){$("#comic_"+a);1==tipoUser||2==tipoUser&&("tec"==t?(loadDialog.addClass("open"),$.ajax({type:"POST",url:"mapa/ajax/contenidoComic.php",data:"llave="+a+"&are="+e,cache:!1,success:function(a){$("#tecnoDialog .inner").html(a),$("#tecnoDialog").addClass("open")}})):"poi"==t&&(loadDialog.addClass("open"),$.ajax({type:"POST",url:"mapa/ajax/contenidoComicPOI.php",data:"llave="+a+"&are="+e,cache:!1,success:function(a){$("#tecnoDialog .inner").html(a)}})))}function detalleSlide(a,e,t,i,o){$.ajax({type:"POST",url:"widgets/fechadorNecropsia.php",data:"llave="+e+"&distrito="+a+"&are="+t+"&tipo="+i+"&div="+o,cache:!1,success:function(a){$("#tecnoDialog .inner").html(a),loadDialog.addClass("open")}})}function detalleSlideTecnos(a,e){$.ajax({type:"POST",url:"mapa/widgets/tecnoCharts.php",data:"llave="+a+"&are="+e,cache:!1,success:function(a){$("#tecnoDialog .inner").html(a),loadDialog.addClass("open")}})}function muestraRegs(a){$.ajax({type:"POST",url:"mapa/ajax/comboRegs.php",data:"div="+a,cache:!1,success:function(a){$("#areasGeoTel").html(a)}})}function muestraDistritosxOPC(){$("#districtOpcGeoTelCombo").slideDown()}function muestraDistritosxArea(a){if("1"==a){var e=$("#areasGeoTel").val();urldisc="http://10.105.116.52:9090/getDistritosBySearch/"+e+"/TODO",$.ajax({type:"GET",url:urldisc,dataType:"json",cache:!1,success:function(a){htmlDist=a,$("#distritosGeoTel").autocomplete({source:htmlDist})}}),$("#distritosText").slideDown(),tags=[],$("#listaDist").html("")}else("2"==a||"0"==a)&&$("#distritosText").slideUp()}function quejasLiveMapa(){$("#btnMuestraQuejasMapa").is(":checked")?(console.log("Prendido..."),$.ajax({type:"POST",url:"mapa/realEvents/markers.php",data:"apagar=1",cache:!1,success:function(a){$("#div_"+$("#btnMuestraQuejasMapa").val()).html(a),$("#div_"+$("#btnMuestraQuejasMapa").val()).slideDown()}})):(apagaYcierra(),setTimeout('$("#div_"+$("#btnMuestraQuejasMapa").val()).html("")',400),setTimeout('$("#div_"+$("#btnMuestraQuejasMapa").val()).slideUp()',400))}function agregaDist(){if(""==$("#distritosGeoTel").val())alert("Debes escribir un nombre de distrito");else{var a=$("#distritosGeoTel").val();tags.push(a),$("#listaDist").append("<li>"+a+"</li>");var e=tags.length%3;0==e&&$("#listaDist").append("<div style='clear:both;'></div>"),$("#distritosGeoTel").val(""),$("#distritosGeoTel").focus()}}function listadoSlideDistritos(){$.ajax({type:"GET",url:"mapa/list/list.php",cache:!1,success:function(a){$("#tecnoDialog .inner").html(a),loadDialog.addClass("open")}})}function autoLoad(a,e){$.ajax({type:"POST",url:"mapa/ajax/autoload.php",data:"llave="+a+"&are="+e,cache:!1,success:function(a){$("#tecnoDialog .inner").html(a)}})}var map,map2;google.maps.event.addDomListener(window,"load",initialize);var llave="",dataCartografica={},dataCartograficaDistritos={},dataNecrop={},capas={},infoWindow="",infowindows={},contentInfoPoly="",poligonosCords={},poligonos={},markersByPolygon={},urldisc="",htmlDist="",tags=[],testing={},activos=[],dataTecnologica={},dataPOI={},mapaDin=new mapRepository,menuMapa=$("#menu");$(document).ready(function(){$("#menuWiket").hide(),$(function(){$("#accordion").accordion({heightStyle:"content",collapsible:!0})}),$("#btnMuestraQuejasMapa").change(function(){quejasLiveMapa()}),$("#menuPuller").click(function(){menuMapa.addClass("active")}),$("#menuJumper").click(function(){menuMapa.removeClass("active")}),$("#menuJumperWiket").click(function(){$("#menuWiket").toggle("slide",{direction:"rigth"},500)}),$("#menuPullerWiket").click(function(){$("#menuWiket").toggle("slide",{direction:"rigth"},500)}),$("#socketizable").draggable({containment:"#map-canvas",scroll:!1,cursor:"move",cursorAt:{top:15,left:15},handle:"div.titu"}),$("#socketizable").resizable({containment:"#map-canvas",maxWidth:1e3}),$("#necroDialog").dialog({autoOpen:!1,height:"auto",width:"auto"}),$("#iniOpcNecrop").datepicker(),$("#finiOpcNecrop").datepicker(),$("#closeLoader").click(function(){$("#tecnoDialog").removeClass("open")})});var loadDialog=$("#tecnoDialog");$(function(){function a(a){a.fadeOut(function(){a.find("img.recicla").remove().end().css("width","150px").append(trash_icon).find("img").css("height","150px").end().appendTo(t).fadeIn()})}function e(a){var e=a[0].id;a.fadeOut(function(){var a=$("ul",i).length?$("ul",i):$("<li class='widg' id='"+e+"'>").appendTo(i);$("<div class='manejador'></div>").appendTo(a),$("<div id='widgContent_"+e+"'></div>").appendTo(a),$(".widg").draggable({containment:"#map-canvas",scroll:!1,cursor:"move",cursorAt:{top:5,left:200},handle:"div.manejador"}),$.ajax({type:"POST",url:"mapa/widgets/"+e+".php",cache:!1,success:function(a){$("#widgContent_"+e).html(a)}})})}var t=$("#menuWiket"),i=$("#widgets");$contene=$("#map-canvas"),$("li",t).draggable({revert:"invalid",containment:"document",helper:"clone",cursor:"move"}),i.droppable({accept:"#gallery > li",drop:function(a,t){e(t.draggable)}}),t.droppable({accept:"#contene > li",drop:function(e,t){a(t.draggable)}})});