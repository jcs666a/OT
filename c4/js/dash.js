new gnMenu(document.getElementById('gn-menu'));
var l=window.location.hash.substr(1),
	map,abrNu=0,
	dis_o_col,
	marcadores=[],
	ubicalosFirst=1,
	intervalLider,
	intervaloMarcadores,
	todosdiv="",
	viendo='',
	infoWindow,
	nvoDivi=0,
	nvoArea=0,
	ForDistritos,
	ForColonias,
	RegionesUser=[],
	RegionesCR=[],
	reintento,
	online,
	GA,
	barras,
	fieldersG,
	pie,
	dataVentaGA=[],
	dataNventGA=[],
	CampsInRepo=[],
	CampsVrRepo=[],
	arrCaliente=[],
	repChecks=0,
	DesDate='',
	HasDate='',
	mstraUsrTi={k:'',i:'',r:'',n:''},
	veoTit=w-$("#gn-menu li.gn-trigger").width()-$("#gn-menu li.sal").width()-1,
	dG=$('.principal .ui-autocomplete-input'),
	aG=$('.principal .busca'),
	tablaFielders=$('#tablaFielders').DataTable({language:{url:"../js/esp.json"},"pageLength":50});
if(w>700)veoTit=veoTit-$("#gn-menu li.titulo").width()-60;
$('li.veo').width(veoTit);
if(misRegiones[0]=='Todas las campañas')$(".gn-menu li:eq(4),.gn-menu li:eq(5),.gn-menu li:eq(6)").remove();
if(Rol=='Lider Promotor')$(".gn-menu li:eq(2) .gn-submenu").remove();
$('#wraper').height(h);window.addEventListener("resize",altura);
function altura(){
	w=window.innerWidth;
	h=window.innerHeight-60-49;
	if(w<700)
		veoTit=w-$("#gn-menu li.gn-trigger").width()-$("#gn-menu li.sal").width()-1;
	else
		veoTit=w-$("#gn-menu li.gn-trigger").width()-$("#gn-menu li.titulo").width()-$("#gn-menu li.sal").width()-61;
	$('#wraper').height(h);
	$('li.veo').width(veoTit);
}
if(l=="34fTRc"){window.location.hash='';sessionStorage.setItem('u','ñ{ṕdfT');
window.location.replace(window.location.href.slice(0,-1));}
if(sessionStorage.getItem('u')!='ñ{ṕdfT')salir();
Highcharts.createElement('link',{href: '//fonts.googleapis.com/css?family=Lato:400,300',rel:'stylesheet',type:'text/css'},null,document.getElementsByTagName('head')[0]);
Highcharts.theme={
	colors:["#FFBF00","#00bbfa","#FAEBBE","#6B5000","#008F6D","#0A4D84","#9B1457"],
	chart:{backgroundColor:'rgba(0,0,0,0)',style:{fontFamily:"'Lato', sans-serif"}},
	title:{style:{color:'#00bbfa',fontSize:'20px'}},
	tooltip:{backgroundColor:'#fff',style:{color:'#333'}},
	plotOptions:{series:{dataLabels:{color:'#333',style:{fontSize:'15px',fontWeight:'300',textShadow:false}}}}
};Highcharts.setOptions(Highcharts.theme);
function connect(){
//	var socket=new SockJS('http://10.105.116.187:8080/messaging');
	var socket=new SockJS('http://187.217.179.35:8080/messaging');
//	var socket=new SockJS('http://10.105.116.207:8080/messaging');
	stompClient=Stomp.over(socket);
	stompClient.debug=null
	stompClient.connect({},function(frame){
		clearInterval(reintento);
		stompClient.subscribe('/topic/reporte/campaña', function(greeting){
			console.log(greeting);
			muestraGraficoReal('H');
		});
		stompClient.subscribe('/topic/reporte/contratacion', function(greeting){
			console.log(greeting);
			var x=jQuery.parseJSON(greeting.body);creaMapaCaliente();
			creanotificacion('Nuevo contrato','Para la región '+x.region,'','','');
		});
	});
	if(typeof reintento==='undefined')
		setTimeout(function(){
			reintento=setInterval(function(){connect()},20000);
		},3000);
}
function sendMail(){
	$.when(promesas.Mail(9)).done(function(x){
		console.log(x);
	});
}
function creaMapa(s,t){
	function estilos(){
		var estilo=[{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
		if(s=="Green")
			estilo=[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c6eee7"},{"visibility":"on"}]}];
		else if(s=="Blanco")
			estilo=[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f1eede"},{"saturation":"-42"},{"lightness":"40"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#88cddf"},{"visibility":"on"}]}];
		else if(s=="Aquamarina")
			estilo=[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"color":"#c8e8d2"},{"lightness":"1"},{"gamma":"0.93"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#1e693a"},{"gamma":"1.24"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#97c3ac"},{"visibility":"simplified"},{"lightness":"0"},{"gamma":"2.00"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#7ce9d9"},{"lightness":"-22"},{"gamma":"1.321"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}];
		else if(s=="Night Cop")
			estilo=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];
		else if(s=="Night Blue")
			estilo=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]}];
		else if(s=="Blue")
			estilo=[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];
		map=new google.maps.Map(document.getElementById('gmap'),{
			zoomControl:true,
			zoom:6,
			center:{lat:19.3907336,lng:-99.1436126},
			styles:estilo
		});
		map.data.addListener('click',function(e){
			var bounds=new google.maps.LatLngBounds();
			procesaPoints(e.feature.getGeometry(),bounds.extend,bounds);
			map.fitBounds(bounds);
		});
	}
	$.when(estilos()).done(function(x){
		if(viendo=='Divisiones')creaDivsAreas('Si','','.principal');
		else if(viendo=='Areas')creaAreas('Si','','.principal');
		else if(viendo=='Distrito' && t=="")buscaFielders();
		else if(viendo=='Distrito' && t=="S")rePintoMapa();
		centraMapa();
	});
}
function limpiaPoligonos(){
	map.data.forEach(function(feature){
		map.data.remove(feature);
	});
}
function limpiaMarcadores(){
	for(var i=0; i<marcadores.length; i++){marcadores[i].setMap(null);}
	marcadores=[];ubicalosFirst=1;
}
function procesaPoints(geometry,callback,thisArg){
	if (geometry instanceof google.maps.LatLng)
		callback.call(thisArg,geometry);
	else if (geometry instanceof google.maps.Data.Point)
		callback.call(thisArg,geometry.get());
	else
		geometry.getArray().forEach(function(g){procesaPoints(g,callback,thisArg);});
}
function setColores(){
	map.data.setStyle(function(feature){
		return({
			fillColor:feature.getProperty('color'),
			strokeOpacity:1,
			strokeWeight:1
		});
	});
	centraMapa();
}
function centraMapa(){
	var bounds=new google.maps.LatLngBounds();
	map.data.addListener('addfeature',function(e){
		procesaPoints(e.feature.getGeometry(),bounds.extend,bounds);
		map.fitBounds(bounds);
	});
}
function pintaPoligonos(gj){
	limpiaPoligonos();
	map.data.addGeoJson(gj);
	setColores();
}
function creaDivsAreas(t,z,y){
	var p=$(y+' .divisiones').find("option").filter(":selected").text(),
		u=$(y+' .divisiones').val();
	$.when(
		promesas.divisiones(p,u,misRegiones)
	).done(function(x){
		x=jQuery.parseJSON(x);
		if(x.hasOwnProperty("errorMessage"))
			creanotificacion('Error:',
				x.errorMessage,'','','error');
		else{
			if(t=='Si')pintaPoligonos(x.mapa); // ERROR en METRO???
		}
		if(z=='Si')$(y+" .areas").append(x.areas);
		$("#loading").hide();
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error:','No se recibió respuesta del servicio de para obtener poligonos de las divisiones.',error,textStatus,'error');
	});
}
function creaAreas(t,z,y){
	var p=$(y+' .areas').find("option").filter(":selected").text(),
		u=$(y+' .areas').val();
	$.when(
		promesas.areas(p,u)
	).done(function(x){
		x=jQuery.parseJSON(x);
		if(x.hasOwnProperty("errorMessage"))
			creanotificacion('Error:',
				x.errorMessage,'','','error');
		else
			if(t=='Si')pintaPoligonos(x);
		$("#loading").hide();
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error:','No se recibió respuesta del servicio de para obtener poligonos de las areas.',error,textStatus,'error');
	});
}
function liderLogin(){
	var ubicandoFiLid=[];
	limpiaPoligonos();
	function datosFielders(r){ var Pi;
		Pi=promesas.fieldersA(r);
		return Pi;
	}
	function PintaPolis(gj){
		map.data.addGeoJson(gj);
		setColores();
	}
	function areas(p,u){
		p=p.toUpperCase();
		$.when(
			promesas.areas(p,u)
		).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error:',
					x.errorMessage,'','','error');
			else
				PintaPolis(x);
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error:','No se recibió respuesta del servicio de para obtener poligonos de las areas.',error,textStatus,'error');
		});
	}
	function pintaFil(){
		limpiaMarcadores();
		$.when(promesas.UbicaFiel(ubicandoFiLid)).done(function(x){
			x=jQuery.parseJSON(x);
			var infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'}),
				i=0,datosMarker,centro;
			if(x.Error!='')
				creanotificacion('Error:',x.errorMessage,'','','error');
			else
				$.each(x.r[0],function(i,f){
					var Pts=f.createAt.split('-'),
						feN;feN=Pts[2].substring(0,4)+'-'+Pts[1]+'-'+Pts[0]+' '+Pts[2].substring(5,13);
					if(ubicalosFirst==1)
						creanotificacion(f.nombre+', ubicado...',f.latitud+', '+f.longitud+'<br/>'+dateFormat(feN,"fullDate")+' a las '+dateFormat(feN,"shortTime"),'','','');
					datosMarker='<div>'+
						'<h3>'+f.nombre+'</h3>'+
						'<p>Expediente: <b>'+f.expediente+'</b><br />Visto el '+dateFormat(feN,"fullDate")+' a las '+dateFormat(feN,"shortTime")+'</p>'+
						'</div>';
					centro=new google.maps.LatLng(f.latitud,f.longitud);
					marcadores[i]=new google.maps.Marker({
						position:centro,
						map:map,
						title:f.nombre,
						icon:'../img/geo_a.png',
						html:datosMarker
					});
					marcadores[i].addListener('click', function(){
						infowindow.setContent(this.html);
						infowindow.open(map, this);
					});
					i++;
				});
		});
	}
	function startFiel(region){
		$.when(
			datosFielders(region)
		).done(function(x){
			x=jQuery.parseJSON(x);
			if($.inArray(x[0][0],ubicandoFiLid)<0)
				ubicandoFiLid.push(x[0][0]);
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error:','No se recibió respuesta del servicio de para obtener los datos de los fielders buscados.',error,textStatus,'error');
		});
	}
	$.when(
		$.each(misRegiones,function(i,v){
			var r=v.split('-'),
				s=regisdivareas(v);
			startFiel(r[0]+'-'+r[1]+'-');
			areas(s.area,r[1]);
		})
	).done(function(x){
		setTimeout(function(){
			pintaFil();
		},5000);
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error:','No se recibió respuesta del servicio de para obtener los datos de los fielders buscados.',error,textStatus,'error');
	});
}
function limpiaTablaG(){
	$('#tablaFielders tbody').html('');
	$('#tablaFielders thead').html('');
}
function muestraUsuarios(){
	tablaFielders.destroy();
	limpiaTablaG();
	$('#ctable h2').text('').hide();
	$('#tablaFielders thead').append('<tr>'+
		'<th>Nombre</th>'+
		'<th>Rol</th>'+
		'<th>Región</th>'+
		'<th></th>'+
	'</tr>');
	function metelosTodos(x){
		if(x!=null && x!='null'){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage")){
				console.log(x.url);
				creanotificacion('Error','<b>'+x.errorMessage,'','','error');
				$.when(
					mstraUsrTi={k:'',i:'',r:'',n:''},
					$('#tablaFielders tbody').append('<tr><td></td><td></td><td></td><td></td></tr>')
				).done(function(){
					tablaFielders=$('#tablaFielders').DataTable({
						language:{url:"../js/esp.json"},columnDefs:[{orderable:false,targets:[3]}],"pageLength":50
					});
					$('#ctable').addClass('s');
					$('#calendar,#reportes').removeClass('s');
					$('#top,#generico').addClass("open");
					$('#generico').addClass("openB");
					$("#loading").hide();
				});
			}
			else{ var muetralo=1;
				$.when(
					$.each(x.u,function(i,a){
						muetralo=1;
						if(idRol!='6' && mstraUsrTi.k=='')
							if(a.role=='7')
								muetralo=0;
						if(muetralo==1){
							var reg='',areg=[];
							if(a.hasOwnProperty("regiones")){
								$.each(a.regiones,function(il,al){
									var il=regisdivareas(al);
									 reg=reg+il.region+'<br />';
									 if(a.role==5)
									 	al=al.substring(0,1);
									 if(a.role==6)
									 	al=al.substring(0,4);
									 areg.push(al);
								});
							}
							var cdc='<a data=\'{"x":"Eliminar","idUser":'+a.idUsuario+',"nombre":"'+a.nombre+'"}\' title="Eliminar a '+a.nombre+'"><i class="fa fa-trash"></i></a>',
								adc='<a data=\'{"x":"Sacar","idUser":"'+a.idUsuario+'"}\' title="Cerrar sesión de '+a.nombre+'"><i class="fa fa-unlock-alt"></i></a>',
								msj='<a data=\'{"x":"Mensaje","regid":"'+a.gcm+'","idUser":'+a.idUsuario+',"nombre":"'+a.nombre+'"}\' title="Enviar mensaje a '+a.nombre+'"><i class="fa fa-comment"></i></a>',
								use='<a data=\'{"x":"MuestraUsers","rol":"'+a.role+'","regs":"'+areg+'","idUser":'+a.idUsuario+',"nombre":"'+a.nombre+'","creg":"'+reg+'"}\' title="Mostrar usuarios de '+a.nombre+'"><i class="fa fa-users"></i></a>';
							if(a.idUsuario==8) cdc='';
							if(a.role<5) adc='';
							if(a.role!=7) msj='';
							if(idRol==6 || a.role==4 || a.role==8 || a.role==7) use='';
							$('#tablaFielders tbody').append('<tr><td>'+
								a.nombre+'</td><td>'+
								perfiles(a.role)+'</td><td>'+
								reg+'</td><td>'+
								'<a data=\'{"x":"Editar","y":1,"role":"'+a.role+'","idUser":"'+a.idUsuario+'","GCM":"'+a.gcm+'"}\' title="Editar a '+a.nombre+'"><i class="fa fa-pencil-square"></i></a>'+
								msj+
								adc+
								cdc+
								use+
								'</td></tr>');
						}
					})
				).done(function(){
					tablaFielders=$('#tablaFielders').DataTable({
						language:{url:"../js/esp.json"},columnDefs:[{orderable:false,targets:[3]}],"pageLength":50
					});
					$('#ctable').addClass('s');
					$('#calendar,#reportes').removeClass('s');
					$('#top,#generico').addClass("open");
					$('#generico').addClass("openB");
					$("#loading").hide();
				});
			}
		}
		else{
			$('#ctable').addClass('s');
			$('#calendar,#reportes').removeClass('s');
			$('#top,#generico').addClass("open");
			$('#generico').addClass("openB");
			$("#loading").hide();
			tablaFielders=$('#tablaFielders').DataTable({
				language:{url:"../js/esp.json"},columnDefs:[{orderable:false,targets:[5]}],"pageLength":50
			});
		}
	}
	if(mstraUsrTi.k==''){
		$('#ctable h2').html('').hide();
		$.when(promesas.GetFielrs(misRegiones,Rol)).done(function(x){metelosTodos(x);});
	}
	else if(mstraUsrTi.k==6){
		$('#ctable h2').html('<a href="#" class="bakUsers">Regresar</a>Usuarios del Lider '+mstraUsrTi.n+
			'<span class="sub">'+mstraUsrTi.c+'</span>').show();
		$.when(promesas.GetLiders(mstraUsrTi.r,2)).done(function(x){metelosTodos(x);});
	}
	else if(mstraUsrTi.k==5){
		$('#ctable h2').html('<a href="#" class="bakUsers">Regresar</a>Usuarios del Director '+mstraUsrTi.n+
			'<span class="sub">'+mstraUsrTi.c+'</span>').show();
		$.when(promesas.GetLiders(mstraUsrTi.r,1)).done(function(x){metelosTodos(x);});
	}
}
function creaMapaCaliente(){
	var mapB,heatmap,a=[];
	initMap();
	function initMap(){
		mapB=new google.maps.Map(document.getElementById('calor'),{
			zoom:9,
			center:{lat:19.3907336,lng:-99.1436126},
			disableDefaultUI:true,
			zoomControl:true
		});
		arrCaliente=[];
		$.when(promesas.getRealCont(CampsVrRepo)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("puntos"))
				metePoints(x);
		});
	}
	function metePoints(x){
		$.when(
			$.each(x.puntos,function(k,v){
				a.push(v)
			})
		).done(function(){
			getPoints();
		});
	}
	function getPoints(){
		$.when(
			$.each(a,function(k,v){
				arrCaliente.push(new google.maps.LatLng(v[0],v[1]))
			})
		).done(function(){
			heatmap=new google.maps.visualization.HeatmapLayer({
				data:arrCaliente,
				map:mapB
			});
			heatmap.set('radius', heatmap.get('radius') ? null:15);
			heatmap.set('opacity', heatmap.get('opacity') ? null:0.9);
		});
	}
}
function muestraGraficoReal(H){
	var lis=[],wer='area';dataVentaGA=[];dataNventGA=[];
	if(H!=''){ lis.push('todas');wer='hArea';}else lis=CampsVrRepo;
	if(typeof GA!=='undefined' && GA!=''){
		GA.destroy();
		GA='';
	}
	function meteX(x){
		$.when(
			$.each(x.FV,function(k,v){
				var a=k.split('.');
				dataVentaGA.push([Date.UTC(a[0],a[1],a[2]),v]);
			}),
			$.each(x.NV,function(k,v){
				var a=k.split('.');
				dataNventGA.push([Date.UTC(a[0],a[1],a[2]),v]);
			})
		).done(function(){ // Contratos nuevos vs contratos ofrecidos
			GA=new Highcharts.Chart({
				credits:{enabled:false},
				chart:{renderTo:wer,zoomType:'x'},
				title:{text:''},
				subtitle:{text:''},
				xAxis:{type:'datetime'},
				yAxis:{title:{text:'Contratos'}},
				legend:{
					enabled:true
				},
				plotOptions:{
					area:{
						marker:{
							enabled:false,
							symbol:'circle',
							radius:6,
							states:{hover:{enabled:true}}
						}
					}
				},
				series:[{
					type:'area',
					name:'No concretados',
					data:dataNventGA
				},{
					type:'area',
					name:'Realizados',
					data:dataVentaGA
				}]
			});
	//			GA=$('#area').highcharts();
	/*			dataNventGA.push([]);
			dataVentaGA.push([]);
			GA.series[0].setData(dataNventGA);
			GA.series[1].setData(dataVentaGA); */
		});
	}
	$.when(promesas.getRealcInt(lis,misRegiones)).done(function(x){
		x=jQuery.parseJSON(x);
		if(x.Error!='')
			creanotificacion('Error','<b>'+x.Error,'','','error');
		else
			meteX(x);
	});
}
function addSeries(x){
	$.each(x.nuevos,function(k,v){
		if(k=='' || k==null || k=='null')
			barras.addSeries({name:'Libres',data:[v[0],v[1]]});
		else
			barras.addSeries({name:CampsInRepo[k],data:[v[0],v[1]]});
	});
}
function grafMetas(){
	var mi=0,ma=0;
	function getRandomInt(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	$('#metas').empty();
	for(var i=1;i<5;i++){
		ma=getRandomInt(100,300);
		mi=getRandomInt(0,ma);
		$.when(
			$('#metas').append('<div id="graf'+i+'" class="mets"></div>')
		).done(function(){
			$('#graf'+i).highcharts({
				credits:{enabled:false},
				chart:{
					type: 'solidgauge',
					alignTicks: false,
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},
				title:{
					text:'Dish fin '+i
				},
				pane:{
					startAngle:-150,
					endAngle:30,
					background:{
						backgroundColor:'#fff',
						innerRadius: '60%',
						outerRadius: '100%',
						shape:'arc'
					}
				},
				yAxis: [{
						min: 0,
						max: ma,
						tickPosition: 'outside',
						lineColor: '#00BBFA',
						lineWidth: 2,
						minorTickPosition: 'outside',
						tickColor: '#00BBFA',
						minorTickColor: '#00BBFA',
						tickLength: 5,
						minorTickLength: 5,
						labels: {
							distance: 12,
							rotation: 'auto'
						},
						offset:2,
						endOnTick: false
					}
				],
				series:[{
					name:'Contratos',
					data:[mi],
					dataLabels:{
						formatter:function(){
							return '<span style="color:#339">' + this.y + ' de '+ma+'</span>';
						},
						backgroundColor:'#fff',
						x:-10,
						y:-20
					}
				}],
				tooltip:{enabled:false}
			});
		});
	}
}
function creaOtrosGraficos(x){
	var dataPie=[],dataFielderSerie=[],dataFielderVentas=[];
	if(x.hasOwnProperty("regiones"))
		$.when(
			barras=new Highcharts.Chart({
				credits:{enabled:false},
				chart:{renderTo:'barras',height:500,type:'column'},
				title:{text:'Contratos por tipo de campaña'},
				subtitle:{text:''},
				xAxis:{categories:['Contratos nuevos','Sin contratar'],crosshair:true},
				yAxis:{min:0,title:{text:''}},
				tooltip:{
					headerFormat:'<span style="font-size:10px">{point.key}</span><table>',
					pointFormat:'<tr><td style="color:{series.color};padding:0">{series.name}: </td>'+
					'<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
					footerFormat:'</table>',
					shared:true,
					useHTML:true
				},
				plotOptions:{column:{pointPadding:0.2,borderWidth:0}},
				series:[]
			}),
			$.each(x.regiones,function(k,v){
				var name='Libre';
				if(v.name!='' && v.name!=null && v.name!='null'){
					name=regisdivareas(v.name);name=name['region'];}
				var vv={'name':name,'y':v.y};
				dataPie.push(vv);
			}),
			$.each(x.fielders,function(k,v){
				if(k=='' || k==null || k=='null'){k='Libre';v.name='Libre';}
				dataFielderSerie.push(k);
				dataFielderVentas.push(v);
			})
		).done(function(){
			addSeries(x);
//			grafMetas(); Hacer metas...
			var dataPi={name:'Contratos',data:dataPie};
			pie=new Highcharts.Chart({
				credits:{enabled:false},
				chart:{renderTo:'pie',type:'pie',height:470,margin:[0,0,0,0],
					spacingTop:0,spacingBottom:0,spacingLeft:0,spacingRight:0,
					options3d:{enabled:true,alpha:45,beta:0}
				},
				title:{text:'Contratos nuevos por región'},
				subtitle:{text:''},
				plotOptions:{
					pie:{
						allowPointSelect:true,
						depth:35,
						dataLabels:{enabled:false},
						showInLegend:true
					}
				},
				series:[dataPi]
			});
			fieldersG=new Highcharts.Chart({
				credits:{enabled:false},
				chart:{renderTo:'fielders',type:'bar',height:320},
				title:{text:'Ventas por Fielder'},
				subtitle:{text:''},
				xAxis:{
					categories:dataFielderSerie,
					title:{text:null}
				},
				yAxis:{
					min:0,
					title:{text:''},
					labels:{overflow:'justify'}
				},
				plotOptions:{bar:{dataLabels:{enabled:true}}},
				legend:{
					layout:'vertical',
					align:'right',
					verticalAlign:'top',
					x:-40,
					y:80,
					floating:true,
					borderWidth:1,
					backgroundColor:'#FFFFFF',
					shadow:true
				},
				credits:{enabled:false},
				series:[{
					name:'Ventas',
					data:dataFielderVentas
				}]
			});
		});
	else{
		$('#reportes .titulos .sub').html('Sin datos para graficar en la campaña seleccionada');
		$('#reportes .titulos a').hide();
		barras.destroy();
		pie.destroy();
	}
}
function muestraReportes(){
	$('#calendar,#ctable').removeClass('s');
	$('#top,#generico').addClass("open");
	$('#generico').addClass("openB");
	$("#loading").hide();
	$('#reportes').addClass('s');
	var fA='2016-01-01',
		fB='2016-02-11',
		fechasR={a:function(){$('#fechas').html('<label>Desde: <input type="text" class="DesDate" readonly="readonly" value="'+DesDate+'" /></label>'+
			'<label>Hasta: <input type="text" class="HasDate" readonly="readonly" value="'+HasDate+'" /></label><button>Mostrar</button>');}};
	CampsVrRepo=[];
	$('#reportes .camps input[type=checkbox]:checked').each(function(){
		CampsVrRepo.push($(this).val());
	})
	$.when(promesas.GetCampas(),fechasR.a()).done(function(x){
		x=jQuery.parseJSON(x[0]);
		if(repChecks==0){
			$('#reportes .camps label').not('.todas').remove();
			CampsInRepo=[];
			$.each(x,function(k,v){
				CampsInRepo[v.id]=v.titulo;
				$('#reportes .camps').append('<label><input type="checkbox" value="'+v.id+'" /><span>'+v.titulo+'</span></label>');
			});
		}
		$("#fechas .DesDate").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+2);$("#fechas .HasDate").datepicker("option","minDate",ini)}});
		$("#fechas .HasDate").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+0);$("#fechas .DesDate").datepicker("option","maxDate",ini)}});
		muestraGraficoReal('');
		creaMapaCaliente();
		repChecks=1;
		b();
	});
	function b(){
		$('#reportes .titulos a').hide();
		$('#reportes .titulos .sub').html('Selecciona un rango de fechas para mostrar los gráficos');
		if($("#fechas .DesDate").val()!='' && $("#fechas .HasDate").val()!=''){
			$.when(promesas.getRcInt(CampsVrRepo,DesDate,HasDate)).done(function(x){
				x=jQuery.parseJSON(x);
				$('#reportes .titulos .sub').html('Mostrando estadísticos de rango seleccionado');
				$('#reportes .titulos a').show();
				creaOtrosGraficos(x);
			});
		}
	}
}
function menuReportes(v){
	var t=0,c=1;
	function cM(){
		if(c>=t || v=='todas' || c==1){
			$('#reportes .camps label input[type=checkbox]').prop("checked",false);
			$('#reportes .camps label.todas input[type=checkbox]').prop("checked",true);
		}
		else{
			$('#reportes .camps .todas input[type=checkbox]').prop("checked",false);
		}
	}
	function rectMenu(){
		$.when(cM()).done(function(){
			muestraReportes();
		});
	}
	$.when(
		$('#reportes .camps input').each(function(){
			if($(this).is(':checked'))
				c++;
			t++;
		})
	).done(function(){
		rectMenu();
	});
}
function preparaImagen(i){
	var tipo=i.files[0].type,
		tama=i.files[0].size/1000000;
	var corr=["image/jpeg","image/jpg"];
	if(!((tipo==corr[0]) || (tipo==corr[1]) || (tipo==corr[2]))){
		creanotificacion('Error','La imagen no se subirá porque no es un archivo JPG o JPEG tu tipo de archivo es <b>'+tipo+'</b>','','','error');
		alert('tipo de archivo incorrecto '+tipo);
	}
	else if(tama>.6){
		creanotificacion('Error','La imagen no se subirá porque excede el tamaño de <b>0.6Mb</b>, tu imagen tiene un tamaño de <b>'+tama+'Mb</b>','','','error');
	}
	else{
		var FR=new FileReader();
		FR.onload = function(e){
			$('.edUS fieldset img').attr("src",e.target.result);
		};
		FR.readAsDataURL(i.files[0]);
	}
}
function muestraCalendario(){
	$('#top,#generico').addClass("open");
	$('#generico').addClass("openB");
	$("#loading").hide();
	$('#ctable,#reportes').removeClass('s');
	$('#calendar').addClass('s');
	var selecta=false;
	if(Rol=='Lider Promotor')selecta=true;
	var calendario=$('#calendar').fullCalendar({
		header:{left:'prev,next today',center:'title',right:'month,basicWeek,basicDay'},
		businessHours:true,
		lang:'es',
		selectable:selecta,
		selectHelper:selecta,
		select:function(event){
			console.log(event);
/*			if(Rol=='Lider Promotor')formCalendarA('',start);calendario.fullCalendar('unselect');
			$.when(promesas.campById(data.id)).done(function(x){
				x=jQuery.parseJSON(x);
				$.extend(data,x);
				editarCampana(data);
			}); */
		},
		eventLimit:false,
		editable:selecta,
		eventDrop:function(event,delta,revertFunc){
//			if(Rol=='Lider Promotor')updateEvent(event.start.format(),event.end.format(),event,'Drop');
		},
		eventResize:function(event,delta,revertFunc){
//			if(Rol=='Lider Promotor')updateEvent(event.start.format(),event.end.format(),event,'Resize');
		},
		eventClick:function(calEvent,jsEvent,view){
			if(Rol=='Lider Promotor'){
				var data;
				$.when(
					data={x:"AddFieldersC",id:calEvent.idActividad,"region":calEvent.region,"titulo":calEvent.titulo}
				).done(function(){
					AddFieldersC(data);
				});
			}
			else{
				var data={x:"EditarCamp",id:calEvent.idActividad};
				$.when(promesas.campById(calEvent.idActividad)).done(function(x){
					x=jQuery.parseJSON(x);
					$.extend(data,x);
					editarCampana(data);
				});
			}
		}
	});
	calendario.fullCalendar('removeEvents');
	function GetCampasMias(){
		$.when(promesas.GetCRdCam(misRegiones)).done(function(x){ //Region del lider..., falta createAt, linea 575 functions.php lj.m,-/5tD
			x=jQuery.parseJSON(x);
			if(x.Error!='') creanotificacion('Error 404:',x.Error,'','','error');
			else if(x.Sin!='') creanotificacion('Sin regiones',x.Sin,'','','advertencia');
			else $.each(x.Regiones,function(i,v){
				calendario.fullCalendar('renderEvent',{
						title:v.titulo+ ' ('+v.fecha_inicio+' | '+v.fecha_fin+')',
						titulo:v.titulo,
						start:v.fecha_inicio,
						end:v.fecha_fin,
						region:v.region,
						allDay:true,
						backgroundColor:'#'+v.color,
						borderColor:'#f3f3f3',
						idActividad:v.id_C
					},
					true
				);
			});
		});
	}
	if(Rol=='Lider Promotor')
		GetCampasMias();
	else
		$.when(promesas.GetCampas()).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error','<b>'+x.errorMessage,'','','error');
			else{
				$.each(x,function(i,v){
					calendario.fullCalendar('renderEvent',{
							title:v.titulo+ ' ('+v.fecha_inicio+' | '+v.fecha_fin+')',
							titulo:v.titulo,
							start:v.fecha_inicio,
							end:v.fecha_fin,
							allDay:true,
							backgroundColor:'#'+v.color,
							borderColor:'#f3f3f3',
							idActividad:v.id
						},
						true
					);
				});
			}

		});

}
function updateEvent(s,d,e,f){
	var ndate,
		ini=new Date(s),
		fin=new Date(d),
		tod=new Date();
	if(ini.setHours(0,0,0,0)<tod.setHours(0,0,0,0)){
		creanotificacion('Error al modificar evento',
			'La fecha que seleccionaste como comienzo, ya ha pasado, por lo que no se actualizó el evento.',
			'','','error');
		muestraCalendario();
	}
	else{
		ini.setDate(ini.getDate()+1);
		fin.setDate(fin.getDate());
		if(f=='Drop') ndate=ini;else if(f=='Resize') ndate=fin;
		ndate=dateFormat(ndate,"fullDate");
		$.when(promesas.UpdCalAct(e.idActividad,e.idCR,s,d,e.meta,e.titulo,e.descripcion)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.Response.errorCode<0)
				creanotificacion('Error al modificar '+e.title,x.Response.errorMessage,'','','error');
			else if(f=='Drop')
				creanotificacion('Cambio la fecha de '+e.title,'El evento '+e.title+' ahora comienza el '+ndate,'','','');
			else if(f=='Resize')
				creanotificacion('Cambio duración de '+e.title,'El evento '+e.title+' ahora termina el '+ndate,'','','');
			else if(f=='Formul')
				creanotificacion('Actualización de '+e.title,'El evento '+e.title+' fue actualizado correctamente','','','');
			muestraCalendario();
			$(".ui-dialog-content").dialog("close");
		});
	}
}
function addDays(d,y){
	var result=new Date(d);
	result.setDate(result.getDate()+y);
	return result;
}
function formCalendarA(a,b){
	var edi='',cam='',tit='',des='',met='',fro='',has='',but='',bat='',vfrom,tod=new Date();
	a=='' ? a='No' : null;
	b=='' ? b='No' : null;
	$('#loading').show();
	if(a!='No'){
		edi=a.idActividad;
		cam=a.idCR;
		tit=a.titulo;
		des=a.descripcion;
		met=a.meta;
		fro=a.from;
		has=a.to;
		bat='<button class="datos addFieldersCalendarAct">Agregar fielders</button>';
		but='<button class="datos delCalendarAct" data="'+a.idActividad+'">Eliminar</button>';
	}
	if(b!='No'){
		b=new Date(b);
		if(b.setHours(0,0,0,0)<tod.setHours(0,0,0,0)){
			fro=dateFormat(addDays(tod,1),"isoDate");
			has=dateFormat(addDays(tod,2),"isoDate");
		}
		else{
			fro=dateFormat(addDays(b,1),"isoDate");
			has=dateFormat(addDays(b,2),"isoDate");
		}
	}
	function getmiscampas(){
		$.when(promesas.GetCRdCal(misRegiones)).done(function(x){ //Region del lider...
			x=jQuery.parseJSON(x);console.log(x); // porque estoy mandando 1-0-0-0 por ejemplo...
			if(x.Error!='') creanotificacion('Error 404:',x.Error,'','','error');
			else if(x.Sin!='') creanotificacion('Sin regiones',x.Sin,'','','advertencia');
			else $.each(x.Regiones,function(i,v){
				var sel=' ',
					rer=regisdivareas(v.region);
				if(cam==v.id_CR)sel=' selected="selected" ';
				$('.edUS fieldset select.camp').append('<option'+sel+'value="'+v.id_CR+','+v.region+'">'+rer.region+' '+v.titulo+'</option>');
			});
			$('#loading').hide();
		});
	}
	var size=600,read='',disa='',save='<button class="datos" type="submit">Guardar</button>';
	if(w<740) size=300;
	if(Rol!='Lider Promotor'){save='';bat='';disa=' disabled="disabled"';read=' readonly="readonly"';}
	if(Rol=='Administrador' || Rol=='Lider Promotor' || Rol=='Director'){}else but='';
	$.when(
		dialogos('<form class="edUS" title="Crear meta de campaña" data="AddCalendarEvent">'+
			'<fieldset><input type="hidden" class="editando" value="'+edi+'" />'+
				'<label>Campaña: <select'+disa+' class="camp"></select></label>'+
				'<label>Título: <input type="text"'+read+' class="titulo" value="'+tit+'" /></label>'+
				'<label>Descripción: <input type="text"'+read+' class="descripcion" value="'+des+'" /></label>'+
				'<label>Meta: <input type="text"'+read+' id="meta" class="meta" value="'+met+'" /></label>'+
				'<label>Desde: <input type="text" class="fromDate" readonly="readonly" value="'+fro+'" /></label>'+
				'<label>Hasta: <input type="text" class="toDate" readonly="readonly" value="'+has+'" /></label>'+bat+but+
				save+
			'</fieldset>'+
		'</form>',size)
	).done(function(x){
		if(Rol=='Lider Promotor'){
			var meta=new LiveValidation('meta');meta.add(Validate.Presence).add(Validate.Numericality,{onlyInteger:true});
			$(".edUS .fromDate").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
				var ini=new Date(selected);ini.setDate(ini.getDate()+2);$(".edUS .toDate").datepicker("option","minDate",ini);
			}});
			tod.setDate(tod.getDate()+1);$(".edUS .fromDate").datepicker("option","minDate",tod);
			$(".edUS .toDate").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
				var ini=new Date(selected);ini.setDate(ini.getDate()+0);$(".edUS .fromDate").datepicker("option","maxDate",ini)}});
			$(".edUS .toDate").datepicker("option","minDate",tod);
		}
		getmiscampas();
	});
}
function AddCalendarEvent(b,c,s,e,m,t,d,i){
	if(c!='' && s!='' && e!='' && m!='' && t!=''){
		if(i=='')
			$.when(promesas.AddCalAct(c,s,e,m,t,d)).done(function(x){
				x=jQuery.parseJSON(x);
				if(x.Error!=''){
					b.addClass('bad').removeClass('guardando');
					creanotificacion('Error',x.Error,'','','error');
				}
				else{
					muestraCalendario();
					b.addClass('ok').removeClass('guardando');
				}
			});
		else{
			var event={idActividad:i,idCR:c,meta:m,title:t,titulo:t,descripcion:d};
			updateEvent(s,e,event,'Formul');
		}
	}
	else
		creanotificacion('No se creó evento','Uno o más campos requeridos están vacios, por favor llénalos e intentalo nuevamente.','','','advertencia');
	setTimeout(function(){b.removeClass('bad').removeClass('ok').removeClass('guardando');},1500);
}
function AddCalendarFielder(c,d,i){
	dialogos('<form class="FielderCalTarea" data="FielderCalTarea" title="Fielders asignados a tarea '+i+' de campaña">'+
		'<fieldset>'+
			'<input type="hidden" class="id_campana" value="'+c+'" />'+
			'<input type="hidden" class="id_calenda" value="'+i+'" />'+
		'</fieldset>'+
	'</form>',620);
	function meteFielders(x){
		x=jQuery.parseJSON(x);
		$.each(x.Dentro,function(k,v){
			$('select.den').append('<option value='+v.idFielder+' cfr="'+v.id+'">'+v.nombre+'</option>');
		});
		$.each(x.Fuera,function(k,v){
			$('select.fue').append('<option value='+v.idUsuario+' cfr="">'+v.nombre+'</option>');
		});
	}
	function pasoB(x){
		$.when(meteFielders(x)).done(function(){$("#loading").hide();});
	}
	$.when(promesas.GetACalFi(i,misRegiones,d)).done(function(x){
		$('.FielderCalTarea fieldset').append(
			'<label class="fuera">Disponibles:<select class="fue" multiple></select><a>Agregar</a></label>'+
			'<label class="dentro">En campaña:<select class="den" multiple></select><a>Eliminar</a></label>');
		pasoB(x);
	});
}
function muestraCampanas(){
	tablaFielders.destroy();
	limpiaTablaG();
	$('#ctable h2').text('').hide();
	if(Rol=='Lider Promotor')
		$('#tablaFielders thead').append('<tr>'+
			'<th>Título</th>'+
			'<th>Códigos</th>'+
			'<th>Meta</th>'+
			'<th></th>'+
		'</tr>');
	else
		$('#tablaFielders thead').append('<tr>'+
			'<th>Título</th>'+
			'<th>Códigos</th>'+
			'<th>Meta</th>'+
			'<th>Inicio</th>'+
			'<th>Fin</th>'+
			'<th></th>'+
		'</tr>');
	function creaTablaYa(t,o){
		tablaFielders=$('#tablaFielders').DataTable({
			language:{url:"../js/esp.json"},columnDefs:[{orderable:false,targets:[t]}],order:[[o,"asc"]],"pageLength":50
		});
		$('#ctable').addClass('s');
		$('#calendar,#reportes').removeClass('s');
		$('#top,#generico').addClass("open");
		$('#generico').addClass("openB");
		$("#loading").hide();
	}
	function GetCampasMias(){
		$.when(promesas.GetCRdCam(misRegiones)).done(function(x){ //Region del lider..., falta createAt, linea 575 functions.php lj.m,-/5tD
			x=jQuery.parseJSON(x);
			if(x.Error!='') creanotificacion('Error 404:',x.Error,'','','error');
			else if(x.Sin!='') creanotificacion('Sin regiones',x.Sin,'','','advertencia');
			else $.each(x.Regiones,function(i,a){
				$('#tablaFielders tbody').append('<tr><td>'+
					a.titulo+'</td><td>'+
					a.tcode+'<br />'+
					a.campaigncode+'<br />'+
					a.offercode+'</td><td>'+
					a.meta+'</td><td>'+
					'<a data=\'{"x":"AddFieldersC","id":'+a.id_C+',"region":"'+a.region+'","titulo":"'+a.titulo+'"}\' title="Añadir Fielders a campaña '+a.titulo+'"><i class="fa fa-users"></i></a>'+
					'</td></tr>');
			});
			creaTablaYa(3,0);
		});
	}
	if(Rol=='Lider Promotor')
		GetCampasMias();
	else
		$.when(promesas.GetCampas()).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error','<b>'+x.errorMessage,'','','error');
			else{
				$.each(x,function(i,a){
					$('#tablaFielders tbody').append('<tr><td>'+
						a.titulo+'</td><td>'+
						a.tcode+'<br />'+
						a.campaigncode+'<br />'+
						a.offercode+'</td><td>'+
						a.meta+'</td><td>'+
						a.fecha_inicio+'</td><td>'+
						a.fecha_fin+'</td><td>'+
						'<a data=\'{"x":"EditarCamp'+
							'","id":"'+a.id+'"}\' title="Editar campaña '+a.titulo+'"><i class="fa fa-pencil-square"></i></a>'+
						'<a data=\'{"x":"AddRegionesC","id":'+a.id+',"titulo":"'+a.titulo+'"}\' title="Añadir Regiones a campaña '+a.titulo+'"><i class="fa fa-compass"></i></a>'+
						'<a data=\'{"x":"EliminarCamp","id":'+a.id+',"titulo":"'+a.titulo+'"}\' title="Eliminar campaña '+a.titulo+'"><i class="fa fa-trash"></i></a>'+
						'</td></tr>');
				});
			}
			creaTablaYa(5,3);
		});
}
function buscaFielders(){
	var region,IdsFielders=[];
	function datosFielders(r){ var Pi;
		if(dis_o_col=='todos') Pi=promesas.fieldersA(r);
		else Pi=promesas.fieldersR(r);
		return Pi;
	}
	function clearTabla(f){
		if(dis_o_col!='colonias')
			tablaFielders.destroy();
		limpiaTablaG();
		$('#tablaFielders thead').append('<tr>'+
			'<th>Nombre</th>'+
			'<th>Expediente</th>'+
			'<th></th>'+
		'</tr>');
		var li=0;
		$.each(f,function(i,a){
			var ase='<a data=\'{"x":"Mensaje","regid":"'+a[11]+'","idUser":'+a[0]+',"nombre":"'+a[2]+'"}\' title="Enviar mensaje a '+a[2]+'"><i class="fa fa-comment"></i></a>'+
				'<a data=\'{"x":"Editar","y":2,"idUser":'+a[0]+',"GCM":"'+a[11]+'"}\' title="Editar regiones de '+a[2]+'"><i class="fa fa-pencil-square"></i></a>'+
				'<a data=\'{"x":"Sacar","idUser":'+a[0]+'}\' title="Cerrar la sesión de '+a[2]+'"><i class="fa fa-unlock-alt"></i></a>'+
				'<a data=\'{"x":"Eliminar","idUser":'+a[0]+',"nombre":"'+a[2]+'"}\' title="Eliminar cuenta de '+a[2]+'"><i class="fa fa-trash"></i></a>';
			IdsFielders.push(a[0]); if(misRegiones[0]=='Todas las campañas') ase='';
			$('#tablaFielders tbody').append('<tr><td>'+a[2]+'</td><td>'+a[5]+'</td><td>'+ase+'</td></tr>');
			li++;
		});
		if(li>0)$(".broadcast").show();else $(".broadcast").hide();
		if(misRegiones[0]=='Todas las campañas')$(".broadcast").hide();
	}
	function encuentraFielders(is){
		$.when(promesas.UbicaFiel(is)).done(function(x){
			x=jQuery.parseJSON(x);
			var infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'}),
				i=0,datosMarker,centro;
			if(x.Error!='')
				creanotificacion('Error:',x.errorMessage,'','','error');
			else
				$.each(x.r[0],function(i,f){
					var Pts=f.createAt.split('-'),
						feN;feN=Pts[2].substring(0,4)+'-'+Pts[1]+'-'+Pts[0]+' '+Pts[2].substring(5,13);
					if(ubicalosFirst==1)
						creanotificacion(f.nombre+', ubicado...',f.latitud+', '+f.longitud+'<br/>'+dateFormat(feN,"fullDate")+' a las '+dateFormat(feN,"shortTime"),'','','');
					datosMarker='<div>'+
						'<h3>'+f.nombre+'</h3>'+
						'<p>Expediente: <b>'+f.expediente+'</b><br />Visto el '+dateFormat(feN,"fullDate")+' a las '+dateFormat(feN,"shortTime")+'</p>'+
						'</div>';
					centro=new google.maps.LatLng(f.latitud,f.longitud);
					marcadores[i]=new google.maps.Marker({
						position:centro,
						map:map,
						title:f.nombre,
						icon:'../img/geo_a.png',
						html:datosMarker
					});
					marcadores[i].addListener('click', function(){
						infowindow.setContent(this.html);
						infowindow.open(map, this);
					});
					i++;
				});
		});
	}
	function pintaFielders(f){
		var s=[];
		f=jQuery.parseJSON(f);
		limpiaMarcadores();
		$.when(clearTabla(f)).done(function(x){
			tablaFielders=$('#tablaFielders').DataTable({language:{url:"../js/esp.json"},columnDefs:[{orderable:false,targets:[2]}],"pageLength":50});
			if(IdsFielders.length>0){
				encuentraFielders(IdsFielders);
				clearInterval(intervaloMarcadores);
				intervaloMarcadores=setInterval(function(){
					limpiaMarcadores();
					encuentraFielders(IdsFielders);
					ubicalosFirst=2;
				},30000);
			}
			$('#generico').removeClass('openB');
			$('#ctable').addClass('s');
			$('#calendar,#reportes').removeClass('s');
			$("#loading").hide();
		})
	}
	function pintaDistritos(){
		$.when(promesas.Fdistritos(ForDistritos,nvoArea)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error:',
					x.errorMessage,'','','error');
			else
				pintaPoligonos(x);
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error:','No se recibió respuesta del servicio de para pintar los distritos.',error,textStatus,'error');
		});
	}
	if(todosdiv=='principal'){
		var val=$('.principal .ui-autocomplete-input').val();
//		$('#mapa').dialog('option','title',val);
		$('#top,#generico').addClass("open");
		if(dis_o_col=='distritos'){
			region=nvoDivi + '-' + nvoArea + '-' + val+'-0';
			ForDistritos=val;
		}
		else if(dis_o_col=='colonias'){
			region=nvoDivi + '-' + nvoArea + '-0-' + val;
			ForColonias=val;
		}
		else if(dis_o_col=='todos'){
			region=nvoDivi + '-' + nvoArea + '-';
			val=regisdivareas(nvoDivi + '-' + nvoArea + '-0');
//			$('#mapa').dialog('option','title',val['area']);
		}
		else{
			dis_o_col='';
			$('#ctable h2').html('No has seleccionado un área o distrito, no hay contenido para mostrar').show();
			$('#ctable').addClass('s');
			$('#calendar,#reportes').removeClass('s');
			$("#loading").hide();
			limpiaTablaG();
			$('#tablaFielders thead').append('<tr>'+
				'<th>Nombre</th>'+
				'<th>Expediente</th>'+
				'<th></th>'+
			'</tr>');
		}
		if(dis_o_col!=''){console.log(region);
			$.when(
				datosFielders(region)
			).done(function(x){
				var xreg=region=regisdivareas(region);
				$('#ctable h2').html('<span>'+xreg.region+'</span>'+
					'<button class="broadcast" title="Enviar mensaje a todos en la región seleccionada" alt="Enviar mensaje a todos en la región seleccionada">Broadcast</button>').show();
				pintaFielders(x);
				if(dis_o_col=='distritos')pintaDistritos();
			}).fail(function(jqXHR,textStatus,error){
				creanotificacion('Error:','No se recibió respuesta del servicio de para obtener los datos de los fielders buscados.',error,textStatus,'error');
			});
		}
	}
}
function rePintoMapa(){
	var region,IdsFielders=[];
	function datosFielders(r){ var Pi;
		if(dis_o_col=='todos') Pi=promesas.fieldersA(r);
		else Pi=promesas.fieldersR(r);
		return Pi;
	}
	function clearTabla(f){$.each(f,function(i,a){IdsFielders.push(a[0]);});}
	function encuentraFielders(is){
		$.when(promesas.UbicaFiel(is)).done(function(x){
			x=jQuery.parseJSON(x);
			var infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'}),
				i=0,datosMarker,centro;
			if(x.Error!='')
				creanotificacion('Error:',x.errorMessage,'','','error');
			else
				$.each(x.r[0],function(i,f){
					var Pts=f.createAt.split('-'),
						feN;feN=Pts[2].substring(0,4)+'-'+Pts[1]+'-'+Pts[0]+' '+Pts[2].substring(5,13);
					datosMarker='<div>'+
						'<h3>'+f.nombre+'</h3>'+
						'<p>Expediente: <b>'+f.expediente+'</b><br />Visto el '+dateFormat(feN,"fullDate")+' a las '+dateFormat(feN,"shortTime")+'</p>'+
						'</div>';
					centro=new google.maps.LatLng(f.latitud,f.longitud);
					marcadores[i]=new google.maps.Marker({
						position:centro,
						map:map,
						title:f.nombre,
						icon:'../img/geo_a.png',
						html:datosMarker
					});
					marcadores[i].addListener('click', function(){
						infowindow.setContent(this.html);
						infowindow.open(map, this);
					});
					i++;
				});
		});
	}
	function pintaFielders(f){
		var s=[];
		f=jQuery.parseJSON(f);
		limpiaMarcadores();
		$.when(clearTabla(f)).done(function(x){
			if(IdsFielders.length>0){
				encuentraFielders(IdsFielders);
				clearInterval(intervaloMarcadores);
				intervaloMarcadores=setInterval(function(){
					limpiaMarcadores();
					encuentraFielders(IdsFielders);
				},30000);
			}
		})
	}
	function pintaDistritos(){
		$.when(promesas.Fdistritos(ForDistritos,nvoArea)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error:',
					x.errorMessage,'','','error');
			else
				pintaPoligonos(x);
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error:','No se recibió respuesta del servicio de para pintar los distritos.',error,textStatus,'error');
		});
	}
	var val=$('.principal .ui-autocomplete-input').val();
	if(dis_o_col=='distritos')
		region=nvoDivi + '-' + nvoArea + '-' + val+'-0';
	else if(dis_o_col=='colonias')
		region=nvoDivi + '-' + nvoArea + '-0-' + val;
	else if(dis_o_col=='todos')
		region=nvoDivi + '-' + nvoArea + '-';
	$.when(
		datosFielders(region)
	).done(function(x){
		pintaFielders(x);
		if(dis_o_col=='distritos')
			pintaDistritos();
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error:','No se recibió respuesta del servicio de para obtener los datos de los fielders buscados.',error,textStatus,'error');
	});
}
function mensajeUnico(i,r,n){ //id,reggcm,nombre
	function conversa(){
		$.when(promesas.Conversas(i)).done(function(x){
			x=jQuery.parseJSON(x);
			var clas='noread';
			$.each(x,function(i,v){
				clas='noread';
				if(v.status==true) clas='read';
				$('.histMsg').append('<p class="'+clas+'"><span>'+v.createAt+'</span> '+v.mensaje+'</p>');
			});
		});
	}
	if(i!='' && r!='' && n!=''){
		$.when(dialogos('<form class="msjU" title="Enviar mensaje a '+n+'">'+
			'<fieldset>'+
				'<div class="histMsg"></div>'+
				'<textarea placeholder="Escribe tu mensaje..."></textarea>'+
				'<input type="hidden" class="rgid" value="'+r+'" />'+
				'<input type="hidden" class="usid" value="'+i+'" />'+
				'<button type="submit">Enviar</button>'+
			'</fieldset>'+
		'</form>','')).done(function(){
			conversa();
		});
	}
	else{
		var reg=$('#ctable h2 span').text();
		dialogos('<form class="msjA" title="Enviar mensaje a todos en '+reg+'">'+
			'<fieldset>'+
				'<textarea placeholder="Escribe tu mensaje..."></textarea>'+
				'<button type="submit">Enviar</button>'+
			'</fieldset>'+
		'</form>','');
	}
	$("#loading").hide();
}
function meteRegionaCR(asig){
	var region=nvoDivi + '-' + nvoArea + '-0-0',btn=asig.parent().find('.busca'),id_edit=asig.parent().parent().find('.id_editado').val();
	if(!!~jQuery.inArray(region,RegionesCR)){
		creanotificacion('No se agregó región','Ya se encunetra asignada la región que intentas agregar a la campaña.','','','');
	}
	else{
		$.when(promesas.RegAddCR(id_edit,region)).done(function(x){x=JSON.parse(x);
			RegionesCR.push(region);region=regisdivareas(region);
			asig.append("<a data-id='"+x[0].id+"' data='"+region.original+"'>"+region.regionT+"</a>");
		});
	}
	setTimeout(function(){ btn.removeClass('guardando'); },500);
}
function agregaRegFielder(dist,asig,empl,rgcm,y,rol){
	var region='',btn=asig.parent().find('.busca');
	if(dist==""){
		creanotificacion('No se agregó región','No escribiste ningún texto para poder agregar una región al usuario.','','','advertencia');
		setTimeout(function(){ btn.removeClass('guardando'); },500);
	}
	else{
		if(dist=='smpr')
			region=nvoDivi + '-' + nvoArea + '-0-0';
		else if(dis_o_col=='distritos'){
			if(!!~jQuery.inArray(dist,jQuery.parseJSON(ForDistritos)))
				region=nvoDivi + '-' + nvoArea + '-' + dist+'-0';
		}
		else if(dis_o_col=='colonias'){
			if(!!~jQuery.inArray(dist,jQuery.parseJSON(ForColonias)))
				region=nvoDivi + '-' + nvoArea + '-0-' + dist;
		}
		if(region!=''){
			$('#loading').show();
			if(!!~jQuery.inArray(region,RegionesUser)){
				creanotificacion('No se agregó región','El promotor ya esta asignado a la región que intentas asignar.',
				'','','');
				setTimeout(function(){ $('#loading').hide();btn.removeClass('guardando'); },500);
			}
			else{
				region=regisdivareas(region);
				$.when(promesas.addRegion(empl,idBoss,region.original,rgcm,region.region,rol)).done(function(x){
					x=jQuery.parseJSON(x);
					if(x.hasOwnProperty("errorSinMensaje")){
						creanotificacion('Error',x.errorSinMensaje,'','','error');
						btn.removeClass('guardando').addClass('bad');
					}
					else{
						if(x.hasOwnProperty("errorMessage"))
							creanotificacion('No se envió mensaje',x.errorMessage+':<br /><b>'+x.error+'</b><br /><br /><b>id:</b> '+x.multicast_id,'','','advertencia');
						if(x.hasOwnProperty("error_curl"))
							creanotificacion('Error',x.error_curl,'','','error');
						btn.removeClass('guardando').addClass('ok');
						RegionesUser.push(region.original);
						asig.append("<a data='"+region.original+"'>"+region.regionT+"</a>");
						if(y==1)muestraUsuarios();
						$('fieldset .asignadas').removeClass('disabled');
					}
					setTimeout(function(){ btn.removeClass('bad').removeClass('ok');$('#loading').hide(); },1500);
				});
			}
		}
		else{
			creanotificacion('No se agregó región','La región o colonia que intentas agregar no existe en nuestra base de datos, no se agregará al usuario, intentalo nuevamente.',
			'','','advertencia');
			setTimeout(function(){ btn.removeClass('guardando'); },800);
		}
	}
}
function nuevoUsuario(){
	var dire='<option value="5">Director</option>',
		admi='<option value="4">Administrador</option>',
		dise='<option value="8">Diseño</option>',
		lide='<option value="6">Lider Promotor</option>',
		prom='<option value="7">Promotor</option>',
		formaB='',nvByLider='',forma='',
		size=750;abrNu=0;
	if(w<740) size=300;
	if(idRol=="6"){
		dire='';admi='';dise='';lide='';nvByLider='Si';
		formaB='<fieldset><h4>Añadir región:</h4>'+
			'<label>División<select class="divisiones"></select></label>'+
			'<label>Área<select class="areas" disabled="disabled"></select></label>'+
			'<label>Distrito/Colonia<select class="distritos" disabled="disabled">'+
			'<option value="0"> --- </option>'+
			'<option value="1">Distritos</option>'+
			'<option value="3">Colonias</option>'+
			'</select></label>'+
			'<label class="busca">Agregar<input type="text" class="ui-autocomplete-input" value="" /></label>'+
			'</fieldset>';
	}
	else if(idRol=="5"){
		dire='';admi='';dise='';nvByLider='Si';
		formaB='<fieldset><h4>Añadir región:</h4>'+
			'<label>División<select class="divisiones"></select></label>'+
			'<label>Área<select class="areas" disabled="disabled"></select></label>'+
			'<label>Distrito/Colonia<select class="distritos" disabled="disabled">'+
			'<option value="0"> --- </option>'+
			'<option value="1">Distritos</option>'+
			'<option value="3">Colonias</option>'+
			'</select></label>'+
			'<label class="busca">Agregar<input type="text" class="ui-autocomplete-input" value="" /></label>'+
			'</fieldset>';
	}
	else{
		prom='';
		if(idRol==5){dire='';admi='';dise='';}
	}
	forma='<form class="edUS" data="Usuarios" title="Nuevo usuario">'+
	'<fieldset><h4>Información:</h4>'+
	'<input type="hidden" class="nuevoByLider" value="'+nvByLider+'" />'+
	'<input type="hidden" class="id_editado" value="ZZ" />'+
	'<input type="hidden" class="id_gcm" value="" />'+
	'<input type="hidden" class="y" value="1" />'+
	'<label>Nombre<input type="text" class="nombre" value="" /></label>'+
	'<label>Expediente<input type="text" class="expediente" value="" /></label>'+
	'<label>Correo<input type="text" id="mail" class="mail" value="" /></label>'+
	'<label>Usuario<input type="text" class="usuario" value="" /></label>'+
	'<label>Contraseña<input type="password" id="passB" class="passwd" value="" placeholder="******" autocomplete="off" /></label>'+
	'<label>Confirmar<input type="password" id="pass" class="passwdB" value="" placeholder="******" autocomplete="off" /></label>'+
	'<label>Perfil<select class="rol">'+dire+admi+dise+lide+prom+'</select></label>'+
	formaB+
	'<button class="datos">Guardar usuario</button>'+
	'</fieldset>'+
	'</form>';
	$.when(dialogos(forma,size)).done(function(x){
		var mail=new LiveValidation('mail');mail.add(Validate.Email);
		var pass=new LiveValidation('pass');pass.add(Validate.Confirmation,{match:'passB'});
		selectDivisiones('.edUS fieldset label');
		$("#loading").hide();
	});
}
function paletaColores(cola){
	$(".color").spectrum({color:'#'+cola,showInput:true,className:"full-spectrum",showInitial:true,showPalette:true,showSelectionPalette:true,
		clickoutFiresChange:false,maxSelectionSize:10,preferredFormat:"hex",localStorageKey:"spectrum.demo",
		move:function(color){},
		show:function(){},
		beforeShow:function(){},
		hide:function(color){$(".color").val(color.toHexString());},
		change:function(){},
		palette:[
			["rgb(0,0,0)","rgb(67,67,67)","rgb(102,102,102)",
			"rgb(204,204,204)","rgb(217,217,217)","rgb(255,255,255)"],
			["rgb(152,0,0)","rgb(255,0,0)","rgb(255,153,0)","rgb(255,255,0)","rgb(0,255,0)",
			"rgb(0,255,255)","rgb(74,134,232)","rgb(0,0,255)","rgb(153,0,255)","rgb(255,0,255)"],
			["rgb(230,184,175)","rgb(244,204,204)","rgb(252,229,205)","rgb(255,242,204)","rgb(217,234,211)",
			"rgb(208,224,227)","rgb(201,218,248)","rgb(207,226,243)","rgb(217,210,233)","rgb(234,209,220)",
			"rgb(221,126,107)","rgb(234,153,153)","rgb(249,203,156)","rgb(255,229,153)","rgb(182,215,168)",
			"rgb(162,196,201)","rgb(164,194,244)","rgb(159,197,232)","rgb(180,167,214)","rgb(213,166,189)",
			"rgb(204,65,37)","rgb(224,102,102)","rgb(246,178,107)","rgb(255,217,102)","rgb(147,196,125)",
			"rgb(118,165,175)","rgb(109,158,235)","rgb(111,168,220)","rgb(142,124,195)","rgb(194,123,160)",
			"rgb(166,28,0)","rgb(204,0,0)","rgb(230,145,56)","rgb(241,194,50)","rgb(106,168,79)",
			"rgb(69,129,142)","rgb(60,120,216)","rgb(61,133,198)","rgb(103,78,167)","rgb(166,77,121)",
			"rgb(91,15,0)","rgb(102,0,0)","rgb(120,63,4)","rgb(127,96,0)","rgb(39,78,19)",
			"rgb(12,52,61)","rgb(28,69,135)","rgb(7,55,99)","rgb(32,18,77)","rgb(76,17,48)"]
		]
	});
}
function nuevaCampana(){
	var size=700;
	if(w<740) size=300;
	$.when(
		dialogos('<form class="edUS" data="Campanas" title="Nueva campaña" enctype="multipart/form-data">'+
		'<fieldset><h4>Información:</h4>'+
		'<input type="hidden" class="id_editado" value="ZZ" />'+
		'<label>Título<input type="text" class="titulo" value="" /></label>'+
		'<label>Comienzo<input type="text" class="fecha_inicio" readonly="readonly" value="" /></label>'+
		'<label>Fin<input type="text" class="fecha_fin" readonly="readonly" value="" /></label>'+
		'<label>Meta<input type="text" class="meta" id="meta" value="" /></label>'+
		'<label>tCode<input type="text" class="tcode" value="" /></label>'+
		'<label>CampaignCode<input type="text" class="campaigncode" value="" /></label>'+
		'<label>OfferCode<input type="text" class="offercode" value="" /></label>'+
		'<label>Descripción<input type="text" class="descripcion" value="" /></label>'+
		'<label class="colores">Color: <input type="text" class="color" value="#cccccc" /></label>'+
		'<label>Imagen <input type="file" multiple name="imagen" class="imagen" /></label>'+
		'<button class="datos">Guardar campaña</button>'+
		'</fieldset>'+
		'</form>',size)
	).done(function(x){
		var meta=new LiveValidation('meta');meta.add(Validate.Presence).add(Validate.Numericality,{onlyInteger:true});
		$(".edUS .fecha_inicio").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+2);$(".edUS .fecha_fin").datepicker("option","minDate",ini)}});
		$(".edUS .fecha_fin").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+0);$(".edUS .fecha_inicio").datepicker("option","maxDate",ini)}});
		paletaColores();$("#loading").hide();});
}
function creaEditaCampForm(d){
	var img='',size=700;
	if(d.hasOwnProperty("img")){
		if(d.img!='')
			img='<img src="../imgCamps/'+d.img+'" alt="Imagen de '+d.titulo+'" title="Imagen de '+d.titulo+'" />';
	}
	if(w<740) size=300;
	dialogos('<form class="edUS" data="Campanas" title="Editando campaña '+d.titulo+'" enctype="multipart/form-data">'+
		'<fieldset>'+
			'<input type="hidden" class="id_editado" value="'+d.id+'" />'+
			'<label>Título<input type="text" class="titulo" value="'+d.titulo+'" /></label>'+
			'<label>Comienzo<input type="text" class="fecha_inicio" readonly="readonly" value="'+d.fecha_inicio+'" /></label>'+
			'<label>Fin<input type="text" class="fecha_fin" readonly="readonly" value="'+d.fecha_fin+'" /></label>'+
			'<label>Meta<input type="text" class="meta" id="meta" value="'+d.meta+'" /></label>'+
			'<label>tCode<input type="text" class="tcode" value="'+d.tcode+'" /></label>'+
			'<label>CampaignCode<input type="text" class="campaigncode" value="'+d.campaigncode+'" /></label>'+
			'<label>OfferCode<input type="text" class="offercode" value="'+d.offercode+'" /></label>'+
			'<label>Descripción<input type="text" class="descripcion" value="'+d.descripcion+'" /></label>'+
			'<label class="colores">Color: <input type="text" class="color" value="'+d.color+'" /></label>'+
			img+
			'<label>Imagen <input type="file" multiple name="imagen" class="imagen" /></label>'+
			'<button class="datos">Guardar cambios</button>'+
		'</fieldset>'+
	'</form>',size);
	return d.color
}
function editarCampana(d){
	$.when(creaEditaCampForm(d)).done(function(x){
		var meta=new LiveValidation('meta');meta.add(Validate.Presence).add(Validate.Numericality,{onlyInteger:true});
		$(".edUS .fecha_inicio").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+2);$(".edUS .fecha_fin").datepicker("option","minDate",ini)}});
		$(".edUS .fecha_fin").datepicker({monthNames:meses,dayNamesMin:diaM,dateFormat:'yy-mm-dd',onSelect:function(selected){
			var ini=new Date(selected);ini.setDate(ini.getDate()+0);$(".edUS .fecha_inicio").datepicker("option","maxDate",ini)}});
		paletaColores(x);$("#loading").hide();
	});
}
function AddRegionesC(d){
	var size='';
	if(w<740) size=300;
	dialogos('<form class="edUS arc" data="AddRegionesCampanas" title="Regiones asignadas a campaña '+d.titulo+'">'+
	'<fieldset style="display:none;">'+
	'<input type="hidden" class="id_editado" value="'+d.id+'" />'+
	'</fieldset><fieldset><h4>Añadir región:</h4>'+
	'<label>División<select class="divisiones"></select></label>'+
	'<label>Área<select class="areas" disabled="disabled"></select></label>'+
	'<button class="busca">Añadir región</button>'+
	'<h4>Regiones asignadas:</h4>'+
	'<h5>Seguro deseas eliminar esta región: <a class="CRsi">Si</a> / <a>No</a></h5>'+
	'<div class="asignadas"></div>'+
	'</fieldset>'+
	'</form>',size);
	$.when(promesas.GetCRdCam(d.id)).done(function(x){
		x=jQuery.parseJSON(x);
		RegionesCR=[];
		selectDivisiones('.edUS fieldset label');
		if(x.Error!='') creanotificacion('Error 404:',x.Error,'','','error');
		else if(x.Sin!='') creanotificacion('Sin regiones',x.Sin,'','','advertencia');
		else $.each(x.Regiones,function(i,v){
			RegionesCR.push(v.Region);
			region=regisdivareas(v.Region);
			$('.edUS fieldset .asignadas').append("<a data-id='"+v.id_CR+"' data='"+region.original+"'>"+region.regionT+"</a>");
		});
		$("#loading").hide();
	});
}
function AddFieldersCC(idCR,misR,Regi){
	$('#loading').show();
	$('.edUS .fuera,.edUS .dentro').remove();
	function meteFielders(x){
		x=jQuery.parseJSON(x);
		$.each(x.Dentro,function(k,v){
			$('select.den').append('<option value='+v.idUsuario+' cfr="'+v.idCFR+'">'+v.nombre+'</option>');
		});
		$.each(x.Fuera,function(k,v){
			$('select.fue').append('<option value='+v.idUsuario+' cfr="">'+v.nombre+'</option>');
		});
	}
	function pasoB(x){
		$.when(meteFielders(x)).done(function(){$("#loading").hide();});
	}
	$.when(promesas.GetAllCFR(idCR,misR,Regi)).done(function(x){
		$('.edUS .id_editado').after(
			'<label class="fuera">Disponibles:<select class="fue" multiple></select><a>Agregar</a></label>'+
			'<label class="dentro">En campaña:<select class="den" multiple></select><a>Eliminar</a></label>');
		pasoB(x);
	});
}
function AddFieldersC(d){ var size=620;$('#loading').show();if(w<740) size=300;
	function pasoY(Px){
		Px=jQuery.parseJSON(Px);
		var idCR='',ii=0,Regi='';
		$.when(
			$.each(Px.Regiones,function(k,v){
				var R=regisdivareas(v.Region);
				if(ii==0){
					idCR=v.id_CR;Regi=v.Region;
					$('.edUS .id_editado').val(idCR);
					$('.edUS .ids_crs').append('<option selected="selected" value="'+v.id_CR+','+v.Region+'">Region: '+R.region+'</option>');
				}
				else
					$('.edUS .ids_crs').append('<option value="'+v.id_CR+','+v.Region+'">Region: '+R.region+'</option>');
				ii++;
			})
		).done(function(){AddFieldersCC(idCR,misRegiones,Regi);});
	}
	function pasoX(){$.when(promesas.RegFroCam(d.id,misRegiones)).done(function(Px){pasoY(Px);});}
	$.when(
		dialogos('<form class="edUS" data="FieldersCampanas" title="Fielders en '+d.titulo+'">'+
			'<fieldset>'+
			'<select class="ids_crs"></select>'+
			'<input type="hidden" class="id_campana" value="'+d.id+'" />'+
			'<input type="hidden" class="id_editado" value="" />'+
			'</fieldset>'+
			'</form>',size)
	).done(function(){pasoX();});
}
$(document).on("change",".edUS .ids_crs",function(){
	var reg=$(this).val();
	reg=reg.split(',');
	$('.id_editado').val(reg[0]);
	AddFieldersCC(reg[0],misRegiones,reg[1]);
});
function editarUsuario(e){ //id,reggcm,nombre
	var regs='',r_d='',r_a='',r_l='',r_p='',r_q='',spr=' smpr',smpr='smpr',tRegs=0;
	RegionesUser=[];
	function meteReg(d){
		if(d!=null){
			if(d.Regiones!=''){
				$.each(d.Regiones,function(i,a){
					var laregi=regisdivareas(a);
					RegionesUser.push(a);
					regs=regs+'<a data="'+a+'">'+laregi.regionT+'</a>';
					tRegs++;
				});
			}
		}
		else d={nombre:'',expediente:'',usuario:'',role:''};
		if(e.GCM==null || e.GCM=='null')e.GCM='';
		var cdc='',
			div='',
			are='',
			dis='';
		if(e.role==5){
			r_d=' selected="selected"';
		}
		else if(e.role==4){
			r_a=' selected="selected"';
		}
		else if(e.role==6){
			r_l=' selected="selected"';
		}
		else if(e.role==7){
			r_p=' selected="selected"';
			spr='';smpr='';
		}
		else if(e.role==8){
			r_q=' selected="selected"';
		}
		if(e.idUser==8)
			cdc=' style="display:none;"';
		var size=750;
		if(w<740) size=300;
		var dire='<option value="5"'+r_d+'>Director</option>',
			admi='<option value="4"'+r_a+'>Administrador</option>',
			dise='<option value="8"'+r_q+'>Diseño</option>',
			lide='<option value="6"'+r_l+'>Lider Promotor</option>',
			prom='<option value="7"'+r_p+'>Promotor</option>';
		abrNu=0;
		if(idRol=="6"){
			dire='';admi='';dise='';lide='';}
		else prom='';
		var forma='<form class="edUS'+spr+'" data="Usuarios" title="Editando a '+d.nombre+'">'+
			'<fieldset><h4>Información:</h4>'+
			'<input type="hidden" class="id_editado" value="'+e.idUser+'" />'+
			'<input type="hidden" class="id_gcm" value="'+e.GCM+'" />'+
			'<input type="hidden" class="y" value="'+e.y+'" />'+
			'<label>Nombre<input type="text" class="nombre" value="'+d.nombre+'" /></label>'+
			'<label>Expediente<input type="text" class="expediente" value="'+d.expediente+'" /></label>'+
			'<label>Correo<input type="text" id="mail" class="mail" value="'+d.correo+'" /></label>'+
			'<label>Usuario<input type="text" class="usuario" value="'+d.usuario+'" /></label>'+
			'<label>Contraseña<input type="password" id="passB" class="passwdB" value="" placeholder="******" autocomplete="off" /></label>'+
			'<label>Confirmar<input type="password" id="pass" class="passwd" value="" placeholder="******" autocomplete="off" /></label>'+
			'<label'+cdc+'>Perfil<select class="rol">'+dire+admi+dise+lide+prom+'</select></label>'+
			'<button class="datos">Guardar datos</button></fieldset>',
		formaB='<fieldset><h4>Añadir región:</h4>'+
			'<label>División<select class="divisiones"></select></label>'+
			'<label>Área<select class="areas" disabled="disabled"></select></label>'+
			'<label>Distrito/Colonia<select class="distritos" disabled="disabled">'+
			'<option value="0"> --- </option>'+
			'<option value="1">Distritos</option>'+
			'<option value="3">Colonias</option>'+
			'</select></label>'+
			'<label class="busca">Buscar<input type="text" class="ui-autocomplete-input" value="'+smpr+'" /></label>'+
			'<button class="busca">Añadir región</button>'+
			'<h4>Regiones asignadas:</h4>'+
			'<h5>Seguro deseas eliminar esta región: <a class="si">Si</a> / <a>No</a></h5>'+
			'<div class="asignadas">'+regs+'</div>'+
			'</fieldset>';
		if(e.role==4 || e.role==8)
			forma=forma+'</form>';
		else
			forma=forma+formaB+'</form>';
		$.when(dialogos(forma,size)).done(function(x){
			if(tRegs==1) $('fieldset .asignadas').addClass('disabled');
			var mail=new LiveValidation('mail');mail.add(Validate.Email);
			var pass=new LiveValidation('pass');pass.add(Validate.Confirmation,{match:'passB'});
			selectDivisiones('.edUS fieldset label');
		});
	}
	function B(x){
		$.when(meteReg(x)).done(function(x){$("#loading").hide();});
	}
	$.when(promesas.fielderIN(e.idUser)).done(function(x){B(jQuery.parseJSON(x));});
}
function cierraMenu(){$('nav.gn-menu-wrapper').removeClass("gn-open-part").removeClass("gn-open-all");$('li.gn-trigger a.gn-icon.gn-icon-menu').removeClass("gn-selected");}
function abreMenu(){abrNu=1;$('nav.gn-menu-wrapper').addClass("gn-open-part").addClass("gn-open-all");$('li.gn-trigger a.gn-icon.gn-icon-menu').addClass("gn-selected");}
function selectDivisiones(c){
	var P=getPromesa({pky:'46%6&fyR'});
	P.done(function(x){
		x=jQuery.parseJSON(x);
		if(x.errorMessage!=''){
			creanotificacion('Error:',x.errorMessage,'','','error');
			$(c+" .divisiones").append('<option value="0" selected>ERROR</option>');
			$(c+" .divisiones").prop("disabled",true);
		}
		else{
			if(misRegiones[0]=='Todas las regiones' || misRegiones[0]=='Todas las campañas'){}
			else{
				var arMisDivs=[];
				$.each(misRegiones,function(i,a){a=a.split('-');arMisDivs.push(a[0]);});
			}
			$(c+" .divisiones").append('<option value="0" disabled selected>Division:</option>');
			$.each(x.divs,function(i,a){
				if((jQuery.inArray(a.id,arMisDivs)>=0) || (misRegiones[0]=='Todas las regiones' || misRegiones[0]=='Todas las campañas'))
					$(c+" .divisiones").append('<option value="'+a.id+'">'+a.de+'</option>');
			});
		}
	}).fail(function(jqXHR,textStatus,error){
		creanotificacion('Error:','No se recibió respuesta del servicio de para obtener las divisiones.',error,textStatus,'error');
	});
}
function DeleteCam(data){
	$.when(
		dialogos('<div id="quest" title="'+data.titulo+
		'"><h4>¿Estas seguro de querer eliminar esta campaña?</h4><span><a class="Y" data-h="eliminoCamp" data-id="'+data.id+
		'">Si</a><a class="N">No</a></span></div>',340)
	).done(function(x){$("#loading").hide();});
}
function DeleteCalAct(c,h){
	$.when(
		dialogos('<div id="quest" title="'+c+
		'"><h4>¿Estas seguro de querer eliminar esta tarea de campaña?</h4><span><a class="Y" data-h="eliminoCalAct" data-id="'+h+
		'">Si</a><a class="N">No</a></span></div>',340)
	).done(function(x){
		$("#loading").hide();
		$('#quest').on('dialogclose',function(event){$('button.datos').removeClass('guardando');});
	});
}
function inicia(){
	if(typeof google!=='undefined'){
		google.maps.event.addDomListener(window,'load',creaMapa("",""));
		$('#midatos .data .n').text(Nombre);
		$.each(misRegiones,function(i,v){
			if(v=='Todas las regiones' || v=='Todas las campañas'){
				$('#midatos .data .u').append('<i>'+v+'</i>');
			}
			else{
				var vr=regisdivareas(v);
				$('#midatos .data .u').append('<i>'+vr.region+'</i>');
			}
		});
		$('#midatos .data .r').text(Rol+', '+Usuario);
		muestraGraficoReal('H');
		selectDivisiones('.principal');
		if(idRol==6){liderLogin();intervalLider=setInterval(function(){liderLogin()},20000);}
		connect();
	}
	else{
		if(typeof online==='undefined')
			setTimeout(function(){
				$('#loading').show().removeClass('opaco');
				online=setInterval(function(){location.reload()},5000);
			},1200);
	}
}inicia();
$(document).on("change",".ChangeColorMapa",function(event){event.preventDefault();creaMapa($(this).val(),"");});
$(document).on("click",".gn-icon.gn-icon-salir",function(event){event.preventDefault();salir();});
$(document).on("change",".smpr .rol",function(){
	if(Rol!="Lider Promotor"){
		if($(this).val()==4 || $(this).val()==8)
			$(this).parent().parent().parent().find('fieldset:nth-child(2)').hide();
		else
			$(this).parent().parent().parent().find('fieldset:nth-child(2)').show();
	}
});
$(document).on("change",".divisiones",function(){
	$("#loading").show();
	var	ap=$(this),
		tc=$(this).children("option").filter(":selected").text();
	todosdiv=$(this).parent().attr('class');
	nvoDivi=$(this).val();
	dG.add(aG).removeClass("c");
	if(todosdiv=='principal'){
		$('#top,#generico').removeClass("open");
		$('#generico').removeClass("openB");
		limpiaMarcadores();viendo='Divisiones';
		clearInterval(intervaloMarcadores);
		ap.parent().find('.areas').html('').prop("disabled",false);
		ap.parent().find('.distritos').val('0').prop("disabled",true);
		creaDivsAreas('Si','Si','.principal');
	}
	else{
		if(typeof todosdiv==='undefined'){
			todosdiv=$(this).parent().parent().parent().attr('class');
			$(this).parent().parent().find('.busca').removeClass('c');
			var roleS=$(this).parent().parent().parent().find('.rol').val();
			if(roleS==5){
				$(this).parent().parent().parent().find('fieldset:nth-child(2) label:nth-child(3)').hide();
				$(this).parent().parent().parent().find('fieldset:nth-child(2) label:nth-child(4)').hide();
				if(todosdiv=='edUS arc ui-dialog-content ui-widget-content')
					$(this).parent().parent().find('.busca').addClass('c');
				else if(todosdiv=='edUS smpr ui-dialog-content ui-widget-content')
					$(this).parent().parent().find('.busca').addClass('c');
			}
			else if(todosdiv=='edUS arc ui-dialog-content ui-widget-content')
				$(this).parent().parent().find('.busca').addClass('c');
		}
		ap.parent().parent().find('.areas').html('').prop("disabled",false);
		ap.parent().parent().find('.distritos').val('0').prop("disabled",true);
		creaDivsAreas('','Si','.edUS fieldset label');
	}
});
$(document).on("change",".areas",function(){
	$("#loading").show();
	var	ap=$(this),
		tc=$(this).children("option").filter(":selected").text();
	todosdiv=$(this).parent().attr('class');
	nvoArea=$(this).val();
	dG.add(aG).removeClass("c");
	if(todosdiv=='principal'){
		$('#top,#generico').removeClass("open");
		limpiaMarcadores();viendo='Areas';
		clearInterval(intervaloMarcadores);
		ap.parent().parent().find('.distritos').val('0').prop("disabled",false);
		creaAreas('Si','Si','.principal');
	}
	else{
		if(typeof todosdiv==='undefined'){
			todosdiv=$(this).parent().parent().parent().attr('class');
			var roleS=$(this).parent().parent().parent().find('.rol').val();
			if(roleS==6){
				$(this).parent().parent().parent().find('fieldset:nth-child(2) label:nth-child(4)').hide();
				if(todosdiv=='edUS arc ui-dialog-content ui-widget-content')
					$(this).parent().parent().find('.busca').addClass('c');
				else if(todosdiv=='edUS smpr ui-dialog-content ui-widget-content'){
					$(this).parent().parent().find('button.busca').addClass('c');
					$(this).parent().parent().find('.ui-autocomplete-input').val('smpr');
				}
			}
		}
		ap.parent().parent().find('.distritos').val('0').prop("disabled",false);
		$("#loading").hide();
	}
});
$(document).on("change",".distritos",function(){
	$("#loading").show();
	var	ap=$(this),
		tc=$(this).val();
	todosdiv=$(this).parent().attr('class');
	if(todosdiv=='principal'){
		$('#ctable').removeClass('s');
		$('#calendar').removeClass('s');
		$('#top,#generico').removeClass("open");
		dG=$('.principal .ui-autocomplete-input');
		aG=$('.principal .busca');
	}
	else{
		dG=$('.edUS fieldset .ui-autocomplete-input');
		aG=$('.edUS fieldset .busca');
	}
	dG.add(aG).removeClass("c");
	dG.val('').autocomplete({ create:function(event,ui){} });
	if(tc==0){ // Nada
		$("#loading").hide();
	}
	else if(tc==1){ // Distritos
		$.when(promesas.distritos(nvoArea)).done(function(x){
			ForDistritos=x;
			x=jQuery.parseJSON(x);
			dis_o_col='distritos';
			dG.add(aG).addClass("c");
			dG.attr("placeholder","Buscar distrito").autocomplete({source:x,position:{my:"left bottom",at:"left top",collision:"flip"}});
			$("#loading").hide();
		});
	}
	else if(tc==2){ // Todos Distritos
		$('#top,#generico').addClass("open");
		$.when(promesas.distritos(nvoArea)).done(function(x){
			ForDistritos=x;
			x=jQuery.parseJSON(x);
			dis_o_col='todos';
			aG.addClass("c");
			buscaFielders();
		});
	}
	else if(tc==3){ // Colonias
		$.when(promesas.colonias(6)).done(function(x){
			ForColonias=x;
			x=jQuery.parseJSON(x);
			dis_o_col='colonias';
			dG.add(aG).addClass("c");
			dG.attr("placeholder","Buscar colonia").autocomplete({source:x,position:{my:"left bottom",at:"left top",collision:"flip"}});
			$("#loading").hide();
		});
	}
});
$(document).on("click","#ventana #close a",function(event){event.preventDefault();});
$("#ELBPRin").click(function(event){event.preventDefault();
	cierraMenu();
	todosdiv=$(this).parent().attr('class');
	$("#loading").show();
	viendo='Distrito';
	buscaFielders();
});
$(document).on("click","button.busca",function(event){event.preventDefault();
	todosdiv=$(this).parent().attr('class');
	var dist=$(this).parent().find('label .ui-autocomplete-input').val(),
		asig=$(this).parent().find('.asignadas'),
		empl=$(this).parent().parent().find('fieldset .id_editado').val(),
		y=$(this).parent().parent().find('fieldset .y').val(),
		rgcm=$(this).parent().parent().find('fieldset .id_gcm').val();
	$(this).addClass('guardando');
	if(typeof dist==='undefined')
		meteRegionaCR(asig);
	else{
		var rol=$(this).parent().parent().find('fieldset .rol').val();
		agregaRegFielder(dist,asig,empl,rgcm,y,rol);
	}
});
$(document).on("keypress",".ui-autocomplete-input",function(event){
	if(event.keyCode==13){event.preventDefault();
		todosdiv=$(this).parent().attr('class');
		if(todosdiv=='principal'){
			$("#loading").show();
			viendo='Distrito';
			buscaFielders();
		}
		else{
			var dist=$(this).parent().parent().find('label .ui-autocomplete-input').val(),
				asig=$(this).parent().parent().find('.asignadas'),
				empl=$(this).parent().parent().parent().find('fieldset .id_editado').val(),
				y=$(this).parent().parent().parent().find('fieldset .y').val(),
				rgcm=$(this).parent().parent().parent().find('fieldset .id_gcm').val(),
				rol=$(this).parent().parent().find('fieldset .rol').val();
			$(this).parent().parent().find('.busca').addClass('guardando');
			agregaRegFielder(dist,asig,empl,rgcm,y,rol);
		}
	}
});
$(document).on("click",".broadcast",function(event){event.preventDefault();$("#loading").show();mensajeUnico('','','');});
$(document).on("click","#tablaFielders tbody tr td a",function(event){event.preventDefault();
	$("#loading").show();
	var data=jQuery.parseJSON($(this).attr('data'));
	if(data.x=='Mensaje')
		mensajeUnico(data.idUser,data.regid,data.nombre);
	else if(data.x=='Editar')
		editarUsuario(data);
	else if(data.x=='Eliminar')
		$.when(
			dialogos('<div id="quest" title="Eliminar usuario">'+
			'<h4>¿Estas seguro de querer eliminar a este usuario?</h4><span><a class="Y" data-h="eliminoUsuario" data-id="'+data.idUser+
			'">Si</a><a class="N">No</a></span></div>',340)
		).done(function(x){$("#loading").hide();});
	else if(data.x=='MuestraUsers')
		$.when(
			mstraUsrTi.k=data.rol,
			mstraUsrTi.i=data.idUser,
			mstraUsrTi.r=data.regs,
			mstraUsrTi.n=data.nombre,
			mstraUsrTi.c=data.creg
		).done(function(x){muestraUsuarios();});
	else if(data.x=='Sacar')
		$.when(
			dialogos('<div id="quest" title="Cerrar sesión de usuario">'+
			'<h4>¿Estas seguro de querer cerrar la sesión de este usuario?</h4><span><a class="Y" data-h="sacoSesion" data-id="'+data.idUser+
			'">Si</a><a class="N">No</a></span></div>',340)
		).done(function(x){$("#loading").hide();});
	else if(data.x=='EditarCamp')
		$.when(promesas.campById(data.id)).done(function(x){
			x=jQuery.parseJSON(x);
			$.extend(data,x);
			editarCampana(data);
		});
	else if(data.x=='AddRegionesC'){
		AddRegionesC(data);
	}
	else if(data.x=='AddFieldersC'){
		AddFieldersC(data);
	}
	else if(data.x=='EliminarCamp'){
		DeleteCam(data);
	}
});
$(document).on("submit",".ui-dialog .msjU",function(event){event.preventDefault();
	$("#loading").show();
	var r=$(this).find('.rgid').val(),
		i=$(this).find('.usid').val(),
		t=$(this).find('textarea').val();
	if(t=='')
		creanotificacion('No se envió mensaje','No escribiste ningún texto para mandar.','','','advertencia');
	else{
		$.when(promesas.SendMesje(idBoss,r,i,t)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.hasOwnProperty("errorMessage"))
				creanotificacion('Error',x.errorMessage+':<br /><b> '+x.error+'</b><br /><br /><b>id:</b> '+x.multicast_id,'','','error');
			else if(x.hasOwnProperty("errorSinMensaje"))
				creanotificacion('No se envió mensaje',x.errorSinMensaje,'','','advertencia');
			else{
				creanotificacion('Mensaje enviado','<b>Emisor:</b> '+x.Emisor+
					'<br /><b>Receptor:</b> '+x.Receptor+
					'<br /><b>Mensaje:</b> '+x.Mensaje+
					'<br /><b>ID:</b> '+x.multicast_id+
					'<br /><b>Mensaje ID:</b> '+x.message_id,'','','');
			}
			$("#loading").hide();
			$(".ui-dialog-content").dialog("close");
		});
	}
});
$(document).on("submit",".ui-dialog .msjA",function(event){event.preventDefault();
	$("#loading").show();
	var r=[],y=[],z=[],
		t=$(this).find('textarea').val();
	function yes(x){
		if((x.hasOwnProperty("Bien"))){
			$.when(
				$.each(x.Bien,function(k,v){
					y.push('<br /><br /><b>Receptor:</b> '+v.Receptor+
						'<br /><b>ID:</b> '+v.multicast_id+
						'<br /><b>Mensaje ID:</b> '+v.message_id);
				})
			).done(function(){
				creanotificacion('Mensaje enviado','<b>Receptor:</b> '+x.Emisor+
					'<br /><b>Mensaje:</b> '+x.Mensaje+'<br><b>Usuarios:</b>'+y.join(''),'','','');
			});
		}
		if(x.hasOwnProperty("Mal")){
			$.when(
				$.each(x.Mal,function(k,v){
					z.push('<br /><br /><b>Error:</b> '+v.error+
						'<br /><b>ID:</b> '+v.multicast_id);
				})
			).done(function(){
				creanotificacion('Api de Google devolvió errores','<b>Receptor:</b> '+x.Emisor+
					'<br /><b>Mensaje:</b> '+x.Mensaje+'<br><b>Usuarios:</b>'+z.join(''),'','','error');
			});
		}
		if(x.hasOwnProperty("errorSinMensaje"))
			creanotificacion('No se envió mensaje',x.errorSinMensaje,'','','advertencia');
	}
	function f(){
		$.when(promesas.SendMsjAl(idBoss,r,t)).done(function(x){
			x=jQuery.parseJSON(x);yes(x);
			$("#loading").hide();
			$(".ui-dialog-content").dialog("close");
		});
	}
	if(t=='')
		creanotificacion('No se envió mensaje','No escribiste ningún texto para mandar.','','','advertencia');
	else{
		$.when(
			$("#tablaFielders tbody tr td:nth-child(3) a:first-child").each(function(){
				x=jQuery.parseJSON($(this).attr('data'));
				r.push({regid:x.regid,idUser:x.idUser});
			})
		).done(function(){
			f();
		});
	}
});
$(document).on("click","#reportes #fechas button",function(event){event.preventDefault();
	if($('#reportes #fechas .HasDate').val()!='' && $('#reportes #fechas .DesDate').val()!=''){
		DesDate=$('#reportes #fechas .DesDate').val();
		HasDate=$('#reportes #fechas .HasDate').val();
		muestraReportes();
	}
	else
		creanotificacion('No se graficó nada','Elige el rango de fechas para mostrar los estadísticos','','','advertencia');
});
$(document).on("click",".edUS .datos",function(event){event.preventDefault();
	var f=$(this).parent().parent().attr('data'),
		b=$(this);
	b.addClass('guardando');
	if(f=='Usuarios'){
		var n=$(this).parent().find('.nombre').val(),
			i=$(this).parent().find('.id_editado').val(),
			e=$(this).parent().find('.expediente').val(),
			u=$(this).parent().find('.usuario').val(),
			p=$(this).parent().find('.passwd').val(),
			q=$(this).parent().find('.passwdB').val(),
			r=$(this).parent().find('.rol').val(),
			s=$(this).parent().find('.mail').val(),
			y=$(this).parent().find('.y').val(),
			a=$(this).parent().find('.nuevoByLider').val();
		$('#loading').show();
		if(n!='' && u!='' && r!='' && s!='' && i!='ZZ' && p==q){
			$.when(promesas.UpdateUse(n,i,e,u,p,r,s)).done(function(x){
				console.log(x);
				if(y==1)muestraUsuarios();
				if(x==0)b.removeClass('guardando').addClass('ok');
				else b.removeClass('guardando').addClass('bad');
				setTimeout(function(){
					b.removeClass('bad').removeClass('ok');
					$(".ui-dialog-content").dialog("close");
					$('#loading').hide();
				},500);
			});
		}
		else if(n!='' && u!='' && r!='' && p!='' && s!='' && i=='ZZ' && p==q){
			var paso=0,reg='';
			if(a=='Si'){
				var aaa=$(this).parent().find('.divisiones').val(),
					aab=$(this).parent().find('.areas').val(),
					aac=$(this).parent().find('.distritos').val(),
					aad=$(this).parent().find('.ui-autocomplete-input').val();
				if(aaa!='' && aaa!=null && aab!='' && aab!=null && aac!=0 && aad!='' && aad!=null){
					if(aac==1)reg=aaa+'-'+aab+'-'+aad+'-0';
					else if(aac==3)reg=aaa+'-'+aab+'-0-'+aad;
					if(reg!='')paso=1;
				}
				else{
					creanotificacion('No se guardó el usuario',
						'Dejaste al fielder sin región, debes asignarle una para guardar el registro',
						'','','advertencia');
					b.removeClass('guardando').addClass('bad');
					$('#loading').hide();
					setTimeout(function(){b.removeClass('bad');},500);
				}
			}
			else paso=1;
			if(paso==1){
				$.when(promesas.AddingUse(n,e,u,p,r,s,reg)).done(function(x){
					x=jQuery.parseJSON(x);
					if(x.Error!=''){
						creanotificacion('Error en Akame',x.Error,'','','error');
						b.removeClass('guardando').addClass('bad');
					}
					else{
						b.removeClass('guardando').addClass('ok');
					}
					setTimeout(function(){
						b.removeClass('bad').removeClass('ok');
						$(".ui-dialog-content").dialog("close");
						$('#loading').hide();
					},500);
					if(y==1)muestraUsuarios();
				});
			}
		}
		else{ creanotificacion('No se pudo realizar tu petición',
			'Dejaste algún campo requerido en blanco, o bien, con algún dato íncorrecto.',
			'','','advertencia');
			$('#loading').hide();
			b.removeClass('guardando');
		}
	}
	else if(f=='AddRegionesCampanas'){
		alert(b);
	}
	else if(f=='AddCalendarEvent'){
		var c=$(this).parent().find('.camp').val(),
			s=$(this).parent().find('.fromDate').val(),
			e=$(this).parent().find('.toDate').val(),
			m=$(this).parent().find('.meta').val(),
			t=$(this).parent().find('.titulo').val(),
			d=$(this).parent().find('.descripcion').val(),
			i=$(this).parent().find('.editando').val();
		$('#loading').show();
		if(b.attr('class')=='datos addFieldersCalendarAct guardando'){
			var res=c.split(',');
/*			console.log(res[0]); // id CR or campaing como le puse
			console.log(res[1]); // Region
			console.log(i);		 // id calendario */
			AddCalendarFielder(res[0],res[1],i);
		}
		else if(b.attr('class')=='datos delCalendarAct guardando')
			DeleteCalAct(t,i);
		else
			AddCalendarEvent(b,c,s,e,m,t,d,i);
	}
	else{
		var i=$(this).parent().find('.id_editado').val(),
			e=$(this).parent().find('.titulo').val(),
			u=$(this).parent().find('.tcode').val(),
			p=$(this).parent().find('.campaigncode').val(),
			r=$(this).parent().find('.offercode').val(),
			d=$(this).parent().find('.descripcion').val(),
			m=$(this).parent().find('.meta').val(),
			c=$(this).parent().find('.color').val(),
			j=$(this).parent().find('.imagen'),
			k=$(this).parent().find('.fecha_inicio').val(),
			l=$(this).parent().find('.fecha_fin').val(),
			D=new FormData(),
			size=0;
		$('#loading').show();
		if(e!='' && u!='' && p!='' && r!='' && m!=''){
			if(typeof j[0].files[0]!=='undefined'){
				D.append('file',j[0].files[0]);
				size=j[0].files[0].size/1000000;
			}
			if(size>0.75){
				creanotificacion('Error',
					'No se pudo realizar tu petición debito a que el tamaño de tu imagen excede el permitido de 750Kb, por favor reemplaza tu imagen y vuelve a intentarlo.',
					'','','error');
				$('#loading').hide();
			}
			else{
				D.append('I',i);
				D.append('E',e);
				D.append('U',u);
				D.append('P',p);
				D.append('R',r);
				D.append('D',d);
				D.append('C',c);
				D.append('K',k);
				D.append('L',l);
				D.append('M',m);
				D.append('pky','g.-&3eGD');
				$.when($.ajax({url:Ñ,type:'POST',data:D,processData:false,contentType:false,})).done(function(x){
					repChecks=0;x=jQuery.parseJSON(x);
					muestraCampanas();
					if(x.Error!=''){
						b.removeClass('guardando').addClass('bad');
						creanotificacion('Mensaje',x.Error,'','','');
					}
					else{
						b.removeClass('guardando').addClass('ok');
						creanotificacion('Mensaje',x.msj,'','','');
					}
					setTimeout(function(){
						b.removeClass('bad').removeClass('ok');
						$(".ui-dialog-content").dialog("close");
						$('#loading').hide();
					},500);
				});
			}
		}
		else{ creanotificacion('No se pudo realizar tu petición',
			'Dejaste algún campo requerido en blanco, o bien, con algún dato íncorrecto.',
			'','','advertencia');
			$('#loading').hide();
			b.removeClass('guardando');
		}
	}
});
$(document).on("click",".ui-autocomplete li",function(){
	if(abrNu==1)
		setTimeout(function(){abreMenu();},150);
});
$(document).on("click",".edUS .region",function(event){event.preventDefault();
	alert('Agrega región');
});
$(document).on("change",".edUS .imagen",function(event){event.preventDefault();
	preparaImagen(this);
});
$(document).on("click","#quest span a",function(event){event.preventDefault();
	// class="Y" data-h="eliminoCamp" data-id
	var c=$(this).attr('class'),
		h=$(this).attr('data-h');
	if(c=='Y'){
		var id=$(this).attr('data-id');
		if(h=='eliminoCamp')
			$.when(
				promesas.DeleteCam(id)
			).done(function(x){
				if(x!='') creanotificacion('No se eliminó región',x,'','','error');
				muestraCampanas();
				repChecks=0;
				$('#quest').dialog("close");
			});
		else if(h=='eliminoCalAct')
			$.when(
				promesas.DelCalAct(id)
			).done(function(x){
				x=jQuery.parseJSON(x);
				if(x.Error!='') creanotificacion('No se eliminó el evento',x.Error,'','','error');
				else if(x.Ok==1) creanotificacion('Evento eliminado','Evento de calendario eliminado correctamente','','','');
				muestraCalendario();
//				$('#quest').dialog("close");
				$(".ui-dialog-content").dialog("close");
			});
		else if(h=='eliminoUsuario')
			$.when(promesas.DeleteUse(id)).done(function(x){
				muestraUsuarios();
				$('#quest').dialog("close");
			});
		else if(h=='sacoSesion')
			$.when(promesas.CierraSec(id)).done(function(x){
				$('#quest').dialog("close");
			});
		else
			alert(h);
	}
	else $('#quest').dialog("close");
});
$(document).on("click",".edUS h5 a",function(event){event.preventDefault();
	var P=$(this).parent().parent().parent().find('.id_editado').val(),
		y=$(this).parent().parent().parent().find('.y').val(),
		R=$(this).parent().parent().find('.asignadas a.eliminando').attr('data'),
		V=$(this).parent().parent().find('.asignadas a.eliminando'),
		C=$(this).attr('class');
	if(C=='si')
		$.when(promesas.RegDelete(P,R)).done(function(x){
			V.remove();
			if(y==1)muestraUsuarios();
			RegionesUser=jQuery.grep(RegionesUser,function(v){return v!=R;});
		});
	else if(C=='CRsi'){
		var I=$(this).parent().parent().find('.asignadas a.eliminando').attr('data-id');
		$.when(promesas.RegDeleteCR(I)).done(function(x){
			V.remove(); RegionesCR=jQuery.grep(RegionesCR,function(v){return v!=R;});
		});
	}
	V.removeClass('eliminando');
	$(this).parent().hide();
});
$(document).on("click",".edUS .fuera a",function(event){event.preventDefault();
	$('#loading').show();
	$('.fue :selected').each(function(i,v){
		var id=$(v).attr('value'),
			tx=$(v).text(),
			P=$('.edUS fieldset .id_editado').val();
		$.when(promesas.RegaddCFR(P,id)).done(function(x){
			x=jQuery.parseJSON(x);
			if(x.Error==''){
				$('.den').append('<option value="'+id+'" cfr="'+x.id+'">'+tx+'</option>');
				$(v).remove();
			}
			else creanotificacion('Error',x.Error,'','','error');
			$('#loading').hide();
		});
	});
});
$(document).on("click",".edUS .dentro a",function(event){event.preventDefault();
	$('#loading').show();
	$('.den :selected').each(function(i,v){
		var id=$(v).attr('value'),
			tx=$(v).text(),
			fr=$(v).attr('cfr');
		$.when(promesas.RegDelCFR(id,fr)).done(function(x){
			if(x==''){
				$('.fue').append('<option value="'+id+'">'+tx+'</option>');
				$(v).remove();
			}
			else creanotificacion('Error',x,'','','error');
			$('#loading').hide();
		});
	});
});
$(document).on("click",".FielderCalTarea .fuera a",function(event){event.preventDefault();
	$('.fue :selected').each(function(i,v){
		var id=$(v).attr('value'),
			tx=$(v).text(),
			P=$('.FielderCalTarea fieldset .id_calenda').val(),
			Q=$('.FielderCalTarea fieldset .id_campana').val();
		$('#loading').show();
		$.when(promesas.RegACalFi(Q,P,id)).done(function(x){
			x=jQuery.parseJSON(x);
			console.log(x);
			if(x.Error==''){
				$('.den').append('<option value="'+id+'" cfr="'+x.id+'">'+tx+'</option>');
				$(v).remove();
			}
			else creanotificacion('Error',x.Error,'','','error');
			$('#loading').hide();
		});
	});
});
$(document).on("click",".FielderCalTarea .dentro a",function(event){event.preventDefault();
	$('.den :selected').each(function(i,v){
		var id=$(v).attr('value'),
			tx=$(v).text(),
			fr=$(v).attr('cfr'),
			ca=$('.FielderCalTarea .id_calenda').val();
		$('#loading').show();
		$.when(promesas.RegDCalFi(fr,ca,id)).done(function(x){
			console.log(x);
			if(x!='')
				creanotificacion('Error',x,'','','error');
			else{
				$('.fue').append('<option value="'+id+'">'+tx+'</option>');
				$(v).remove();
			}
			$('#loading').hide();
		});
	});
});
$(document).on("click","#reportes .camps label span",function(event){event.preventDefault();
	var v=$(this).parent().find('input').val();
	if($(this).parent().find('input').prop("checked"))
		$(this).parent().find('input').prop("checked",false);
	else
		$(this).parent().find('input').prop("checked",true);
	menuReportes(v);
});
$(document).on("click",".edUS .asignadas a",function(event){event.preventDefault();
	var n=$("fieldset .asignadas a").length;
	if(n>1){
		$('fieldset .asignadas').removeClass('disabled');
		$(this).parent().find('a').removeClass('eliminando');
		$(this).parent().parent().find('h5').show();
		$(this).addClass('eliminando');
	}
	else $('fieldset .asignadas').addClass('disabled');
});
$(document).on("click","#ctable h2 a.bakUsers",function(event){event.preventDefault();
	event.preventDefault();
	$.when(mstraUsrTi={k:'',i:'',r:'',n:''}).done(function(){
	//	$("#mapa").dialogExtend("minimize");
//		$('#top,#generico').removeClass("open");
		$("#loading").show();
		muestraUsuarios();
	});
});

$(".titulos .xls").click(function(event){
	event.preventDefault();
	var data={'feA':DesDate,'feB':HasDate,'cam':CampsVrRepo};
	url=Object.keys(data).map(function(k){return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);}).join('&');
	window.open('../excel/?'+url,'_blank');
});
$("#losUsers").click(function(event){
	event.preventDefault();
	$.when(mstraUsrTi={k:'',i:'',r:'',n:''}).done(function(){
		cierraMenu();clearInterval(intervalLider);
	//	$("#mapa").dialogExtend("minimize");
		$('#top,#generico').removeClass("open");
		$("#loading").show();
		muestraUsuarios();
	});
});
$(".gn-icon.gn-icon-home,.gn-menu-main li.titulo img").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
	setTimeout(function(){muestraGraficoReal('H');},500);
//	$("#mapa").dialogExtend("minimize");
	$('#top,#generico').removeClass("open");
	$('#generico').removeClass("openB");
});
$(".gn-icon.gn-icon-nuser").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
//	$("#mapa").dialogExtend("minimize");
	$('#top,#generico').removeClass("open");
	$("#loading").show();
	muestraUsuarios();
	nuevoUsuario();
});
$(".gn-icon.gn-icon-campana").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
//	$("#mapa").dialogExtend("minimize");
	$('#top,#generico').removeClass("open");
	$("#loading").show();
	muestraCampanas();
});
$(".gn-icon.gn-icon-ncampana").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
	$('#top,#generico').removeClass("open");
	$("#loading").show();
	muestraCampanas();
	nuevaCampana();
});
$(".gn-icon.gn-icon-calendar").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
//	$("#mapa").dialogExtend("minimize");
	$('#top,#generico').removeClass("open");
	$("#loading").show();
	muestraCalendario();
});
$(".gn-icon.gn-icon-reportes").click(function(event){
	event.preventDefault();
	cierraMenu();clearInterval(intervalLider);
//	$("#mapa").dialogExtend("minimize");
	$('#top,#generico').removeClass("open");
	$("#loading").show();
	muestraReportes();
});
$(".gn-icon.gn-icon-mapa").click(function(event){
	cierraMenu();clearInterval(intervalLider);
	todosdiv='principal';
	$("#loading").show();
	viendo='Distrito';
	buscaFielders();
});
/*
$("#mapa").dialog({title:"Mapa C4 Telmex",height:mh,
	position:{my:"left-0 top-0",at:"left-0 top-0",of:$('#wraper')},
	modal:true,resizable:false,draggable:false,
	resize:function(event,ui){creaMapa($('.ChangeColorMapa').val(),"S");}
}).dialogExtend({
	closable:false,minimizable:false,maximizable:true,dblclick:'maximize',
	maximize:function(evt,dlg){
			$(evt.target).height($(evt.target).height()-60-38);
			$('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front').css('top','60px').css('width','+=11px');
			creaMapa($('.ChangeColorMapa').val(),"S");
		},
	restore:function(evt,dlg){creaMapa($('.ChangeColorMapa').val(),"S");},
	minimizeLocation:"right"
});
*/
var idleTime=0;
function timerIncrement(){
	idleTime=idleTime+1;
	if(idleTime>4) salir();
}
$(document).ready(function(){
	var idleInterval=setInterval(timerIncrement,60000);
	$(this).mousemove(function(e){
		idleTime=0;
	});
	$(this).keypress(function(e){
		idleTime=0;
	});
});