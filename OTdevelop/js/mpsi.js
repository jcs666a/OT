var map,
	infowindow,
	PointsClientes=[],
	PointsTecnolos=[],
	filtrosMapa,
	centro,
	cualesPinto='Clientes',
	PointsTienda=[],
	h=$(window).height();
function startMapa(){
	map=new google.maps.Map(document.getElementById('map-canvas'),{
		zoom:18,
		disableDefaultUI:true,
		zoomControl:true,
		center:{lat:19.3907336,lng:-99.1436126},
		styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
	});
	infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'});
	filtrosMapa={"Distritos":[],"Areas":[],"UD":[],"PA":[],"PD":[],"FirstTime":"SI"};
	$('#map-canvas').height(h-50-40);

	var bounds=new google.maps.LatLngBounds();
	map.data.addListener('addfeature',function(e){
		procesaPoints(e.feature.getGeometry(),bounds.extend,bounds);
		map.fitBounds(bounds);
	});

	creaFiltroTecs();
	//pintaAreas();
	pintaDistritos();
	pintaClientes();
	newPosition();
	pintaTienda();
  //PutInMapCamp();

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
function limpiaPosition(){
  for(var i=0; i<miposicion.length; i++){miposicion[i].setMap(null);}
  miposicion=[];
}
function centraMapa(){

}
function newPosition(){
	limpiaPosition();
	centro = new google.maps.LatLng(latitude,longitude);
	miposicion[0]=new google.maps.Marker({
		position:centro,
		map:map,
		title:"Mi posición",
		icon:"css/img/assets/myPosition.png"
	});
}
function procesaPoints(geometry,callback,thisArg){
	if (geometry instanceof google.maps.LatLng)
		callback.call(thisArg, geometry);
	else if (geometry instanceof google.maps.Data.Point)
		callback.call(thisArg, geometry.get());
	else
		geometry.getArray().forEach(function(g){procesaPoints(g, callback, thisArg);});
}
function pintaAreas(){
	if(fielderPols.hasOwnProperty("Areas")){
		$.each(fielderPols.Areas,function(i,a){
			if(filtrosMapa.FirstTime=="NO"){
				if(jQuery.inArray(i,filtrosMapa.PA)!=-1)
					map.data.addGeoJson(a);
			}
			else
				map.data.addGeoJson(a);
		});
		setColores();
	}else console.log('No existen areas que pintar...');
}
function pintaDistritos(){
	if(fielderPols.hasOwnProperty("Distritos")){
		$.each(fielderPols.Distritos,function(i,a){
			if(filtrosMapa.FirstTime=="NO"){
				if(jQuery.inArray(i,filtrosMapa.PD)!=-1)
					map.data.addGeoJson(a);
			}
			else
				map.data.addGeoJson(a);
		});
		setColores();
	}else console.log('No existen distritos que pintar...');
}
function userCenter(){
	map.setCenter(centro);
}
report = {};
function registraCliente(t){
	var insert = document.getElementById('mapReport').getElementsByClassName('holder')[0];
	if(t == undefined){
		report = {};
		$("#mapReport ").addClass('open');
		insert.innerHTML = '<div class="holderSelect">'+
		'<h3>¿Que tipo de cliente visita?</h3>'+
		'<div data-step="0" data-type="si" onclick="registraCliente(this)">'+
		'<div class="cliente"></div>'+
		'<p>Cliente Telmex</p>'+
		'</div>'+
		'<div data-step="0" data-type="no" onclick="registraCliente(this)">'+
		'<div class="no-cliente"></div>'+
		'<p>No es Cliente Telmex</p>'+
		'</div>'+
		'</div>';
		var tope = fielderPols.Distritos.zds0002.geometry.coordinates[0],
			obj = [];
		for(var i = 0; i <= tope.length; i++){
			obj[i]={'lat':tope[i][1], 'lng': tope[i][2]};
		}
		console.log(obj);
		var triangleCoords = [
    {lat: 19.43605056414299, lng: -99.16780114173889},
    {lat: 19.43273201090518, lng: -99.16841268539429},
    {lat: 19.435514339097825, lng: -99.16520476341248},
    {lat: 19.43605056414299, lng: -99.16780114173889}
  ];
 var polygon = new google.maps.Polygon({
    paths: triangleCoords
  });
		getName(polygon);
	}
	else{
		var step = t.dataset.step,
			r = t.dataset.type;
		if(step == 0){
			report[step] = r;
			document.getElementById('closeReport').style.display = "none";
			constructor(step);
		}
		if(step == 1){
			var nombre = document.getElementById('nameSend').value,
				telefono = document.getElementById('telefonoSend').value,
				direccion = document.getElementById('direccion').value,
				geo = document.getElementById('geoSend').value,
				obj ={'nombre':nombre, 'telefono':telefono, 'direccion': direccion, 'geo':geo};
			report[step] = obj;
        $.ajax({
            url: 'http://10.105.116.52:9090/telmex/add/clientegeo',
            method: 'POST',
            data: JSON.stringify({'latitud': latitude, 'longitud': longitude, 'idFielder': userId}),
            dataType: 'application/json',
            success: function (data) {
                console.log(data);
            },
        });
			if(r == undefined){
				constructor(step);
			}
			else{
				repo(report);
			}
		}
		if(step == 2){
			var size  = $("#dataFor input").length,
				type = [];
			for(var i = 0; i <= size-1; i++){
				var value = document.getElementById("dataFor").childNodes;
					value = value[i].value;
				type.push(value);
				report[step] = type;
			}
			if(r == undefined){
				constructor(step);
			}
			else{
				repo(report);
			}
		}
		if(step == 3){
			console.log("actividad despues de contratacion");
		}
	}

	function constructor(s){
		s = parseInt(s)+1;
		if(s == 1){
			insert.innerHTML = '<div class="holderSelect">'+
			'<div class="getData">'+
				'<h3>Llena los datos para contratar</h3>'+
				'<div class="group">'+
					'<input type="text" id="nombre" id="nameSend" /><span class="highlight"></span><span class="bar"></span>'+
					'<label><i class="fa fa-user"></i> Nombre</label>'+
				'</div>'+
				'<input type="text" name="telefono" id="telefonoSend" placeholder="Telefono" />'+
				'<div class="textcontent">'+
					'<textarea name="direccion" id="direccion" disabled  class="ok"></textarea>'+
					'<button id="btn" onclick="editText()"><i class="fa fa-pencil"></i></button>'+
				'</div>'+
				'<input type="hidden" name="geo" id="geoSend" value="'+latitude+','+longitude+'"/>'+
				'<p onclick="registraCliente(this)"  data-step="1" data-type="end" class="end">Terminar <i class="fa fa-times"></i></p>'+
				'<p data-step="1" onclick="registraCliente(this)">siguiente <i class="fa fa-check"></i></p>'+
			'</div>'+
		'</div>';
			var geocoder = new google.maps.Geocoder;
			geocodeLatLng(geocoder, map, infowindow);
		}
		if(s == 2){
			var content = '';
			for(var i = 0; i<= ObjectSize(fielderCamp)-1; i++){
				content = content + '<div class="camp" data-camp="'+fielderCamp[i].campaigncode+'">'+
				'<h3>'+fielderCamp[i].titulo+'</h3>'+
				'<p>'+fielderCamp[i].descripcion+'</p>'+
				'</div>';
			}
			insert.innerHTML = '<div class="holderSelect">'+
			'<div class="getData">'+
			'<h3>Campañas disponibles.</h3>'+
			''+content+''+
			'<div id="dataFor"></div>'+
			'<p onclick="registraCliente(this)"  data-step="2" data-type="end" class="end">Terminar <i class="fa fa-times"></i></p>'+
			'<p  data-step="2" onclick="registraCliente(this)" >Continuar <i class="fa fa-check"></i></p>'+
			 '</div>'+
			'</div>';
			$(".camp").click(function(event) {
				var id = this.dataset.camp;
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$("#"+id).remove();
				}
				else{
				$("#dataFor").append('<input type="hidden" class="formSend" id="'+id+'" value="'+id+'"/>')
				$(this).addClass('active');
				}
			});
		}
		if(s == 3){
			$("#mapReport .holder").load("contrataciones.html");
		}
	//fin funcion
	function ObjectSize(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	}
}
	function geocodeLatLng(geocoder, map, infowindow) {
	  var latlng = {lat: latitude, lng: longitude};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
				document.getElementById('direccion').innerHTML = String(results[0].formatted_address);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
}
	function editText(){
		var element = document.getElementById('direccion');
		if(element.classList.contains('ok')){
			masterAlert("Por favor edita la dirección correctamente");
			element.classList.remove('ok');
			element.disabled = false;
			element.classList.add('edit');
		}
	}

$(document).on("click",".btnCliente",function(event){
	alert($(this).attr('telefono'));
});
var cc = {},
	nam = 0;
function pintaClientes(){
	var x=0,muestralo,fClientes={},puntoColor;
	function metoElPunto(c,x,k){
		cc[nam] = c;
		if(c.tcode!='' && (c.vivo==true || c.vivo=='t')){
			puntoColor='amarillo.png';
			var centrob=new google.maps.LatLng(c.latitud,c.longitud),oAdic='',pAdic='';
			if(c.ofertaAdicional!=null && c.ofertaAdicional!='null' && c.ofertaAdicional!='')
				oAdic='<p><b>Oferta</b>: '+c.ofertaAdicional+'</p>';
			if(c.producto!=null && c.producto!='null' && c.producto!='')
				pAdic='<p><b>Producto</b>: '+c.producto+'</p>';
			PointsClientes[x]=new google.maps.Marker({
				position:centrob,
				map		: map,
				title	: c.cliente,
				icon	: "css/img/assets/"+puntoColor,
				image	: c.imagen,
				html	:
					'<div class="title">'+
						c.cliente+
					'</div>'+
					'<div style="margin:0 0 10px 0;"><b>Distrito</b>: '+k+'<br><br>'+
					'<b>Campaña</b>: '+c.titulo+'<br><b>Descripción</b>: '+c.descripcion+'<br><br>'+
					'<b>Domicilio</b>: '+c.direccion+'<br><b>Teléfono</b>: '+c.telefono+'</div>'+
					oAdic+pAdic+
					'<a class="btnCtnMap" onclick="mercaCrossModul('+nam+');">Contratación</a>'
			});
			PointsClientes[x].addListener('click',function(){
				console.log(this.image);
				infowindow.setContent(this.html);
				infowindow.open(map,this);
			});
		}
		else if(c.vivo==true || c.vivo=='t'){
			puntoColor='verde.png';
			var centrob=new google.maps.LatLng(c.latitud,c.longitud),oAdic='',pAdic='';
			if(c.ofertaAdicional!=null && c.ofertaAdicional!='null' && c.ofertaAdicional!='')
				oAdic='<p><b>Oferta</b>: '+c.ofertaAdicional+'</p>';
			if(c.producto!=null && c.producto!='null' && c.producto!='')
				pAdic='<p><b>Producto</b>: '+c.producto+'</p>';
			PointsClientes[x]=new google.maps.Marker({
				position:centrob,
				map		: map,
				title	: c.cliente,
				icon	: "css/img/assets/"+puntoColor,
				html	:
					'<div class="title">'+
						c.cliente+
					'</div>'+
					'<div style="margin:0 0 10px 0;"><b>Distrito</b>: '+k+'<br><br>'+
					'<b>Campaña</b>: '+c.titulo+'<br><b>Descripción</b>: '+c.descripcion+'<br><br>'+
					'<b>Domicilio</b>: '+c.direccion+'<br><b>Teléfono</b>: '+c.telefono+'</div>'+
					oAdic+pAdic+
					'<a class="btnCtnMap" onclick="mercaCrossModul('+nam+');">Contratación</a>'
			});
			PointsClientes[x].addListener('click',function(){
				infowindow.setContent(this.html);
				infowindow.open(map,this);
			});
		}
		else if(c.vivo==false || c.vivo=='f'){
			puntoColor='rojo.png';
			var centrob=new google.maps.LatLng(c.latitud,c.longitud);
			PointsClientes[x]=new google.maps.Marker({
				position:centrob,
				map		: map,
				title	: c.cliente,
				icon	: "css/img/assets/"+puntoColor,
				html	:
					'<div style="margin:0 0 10px 0;"><b>Distrito</b>: '+k+'<br><br>'+
					'<b>Domicilio</b>: '+c.direccion+'<br>'+
					'<a class="btnCtnMap" data-direccion="'+c.direccion+'" onclick="salesIframe(this)">Contratación</a>'
			});
			PointsClientes[x].addListener('click',function(){
				infowindow.setContent(this.html);
				infowindow.open(map,this);
			});
		}
		else console.log(c);
		nam++;
	}
	$.when(
		$.each(filtrosMapa.UD,function(i,a){
			a=a.split(',');
			var aa=a[2],
				ab=a[3];
			var jn={[aa]:ab};
//			if(fClientes.hasOwnProperty(aa))
//				$.extend(fClientes,{[aa]:'All'});
//			else
				$.extend(fClientes,{[aa]:ab});
		})
	).done(function(){
		if(fielderRegs.hasOwnProperty('Areas')){
			$.each(fielderRegs.Areas,function(i,a){
				if(!a.Distritos){}else{
					$.each(a.Distritos,function(k,b){
						muestralo="No";
						if(fClientes.hasOwnProperty(k)){
							if(fClientes[k]=='U')
								cualesPinto='Clientes';
							else if(fClientes[k]=='N')
								cualesPinto='No Clientes';
							else if(fClientes[k]=='All')
								cualesPinto='Todos';
							else if(fClientes[k] == 'D')
								cualesPinto = 'Cliente Dirigido';
							muestralo="Si";
						}
						else if(filtrosMapa.FirstTime=="SI")
							muestralo="Si";
						if(muestralo=="Si"){
							if(cualesPinto == 'No Clientes' && filtrosMapa.FirstTime!="SI"){
								if(b.NoClientes == null || b.NoClientes == undefined){
	 									b.NoClientes = 0;
	 								}
								if(b.NoClientes.length>0){
									$.each(b.NoClientes,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
							}
							else if(cualesPinto == 'Clientes' && filtrosMapa.FirstTime!="SI"){
								if(b.Clientes == null || b.Clientes == undefined){
										b.Clientes = 0;
								}
								if(b.Clientes.length>0){
									$.each(b.Clientes,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
							}
							else if(cualesPinto == 'Cliente Dirigido' && filtrosMapa.FirstTime!="SI"){
								if(b.clienteDirigido == null || b.clienteDirigido == undefined){
	 									b.clienteDirigido = 0;
	 								}
								if(b.clienteDirigido.length>0){
									$.each(b.clienteDirigido,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
							}
							else if(cualesPinto == 'Todos' || filtrosMapa.FirstTime=="SI"){
								if(b.Clientes == null || b.Clientes == undefined){
										b.Clientes = 0;
								}
								if(b.Clientes.length>0){
									$.each(b.Clientes,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
								if(b.NoClientes == null || b.NoClientes == undefined){
	 									b.NoClientes = 0;
	 								}
								if(b.NoClientes.length>0){
									$.each(b.NoClientes,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
							if(b.clienteDirigido == null || b.clienteDirigido == undefined){
 									b.clienteDirigido = 0;
 								}
								if(b.clienteDirigido.length>0){
									$.each(b.clienteDirigido,function(j,c){
										metoElPunto(c,x,k);
										x++;
									});
								}
							}
						}
					});
				}
			});
		}else console.log('No hay Áreas que pintar');
	});
}
function pintaTecnologias(){
	var x=0,
		muestralo,
		muestraloB,
		muestraloC,
		fTecsis='Distritos',
		arreglo=[],
		arregloB=[];
	if(filtrosMapa.Areas.length!==0){
		fTecsis='Areas';
		$.each(filtrosMapa.Areas,function(i,a){
			a=a.split(',');
			arreglo.push(a[1]);
			arregloB.push(a[2]);
		});
	}
	else if(filtrosMapa.Distritos.length!==0){
		$.each(filtrosMapa.Distritos,function(i,a){
			a=a.split(',');
			arreglo.push(a[2]);
		});
	}
	$.each(fielderTecs,function(i,a){
		muestralo='Si';
		if(fTecsis=='Areas'){
			if(jQuery.inArray(i,arreglo)<0)
				muestralo="No";
		}
		if(muestralo=='Si'){
			$.each(a,function(j,b){
				muestraloC='Si';
				if(fTecsis=='Distritos'){
					if(jQuery.inArray(j,arreglo)<0)
						muestraloC="No";
				}
				if(j!='PorTipo')
					if(muestraloC=='Si'){
						$.each(b,function(k,c){
							muestraloB='Si';
							if(fTecsis=='Areas'){
								if(jQuery.inArray(k,arregloB)<0)
									muestraloB="No";
							}
							else{
								if(jQuery.inArray("D,"+i+","+j+","+k,filtrosMapa.Distritos)<0)
									muestraloB="No";
							}
							if(muestraloB=='Si'){
								$.each(c.centros,function(l,d){
									var centrob=new google.maps.LatLng(d.latitud,d.longitud);
									PointsTecnolos[x]=new google.maps.Marker({
										position:centrob,
										map		: map,
										title	: k,
										icon	: "css/img/assets/tecnoMarkers/"+c.imagen,
										ide		: c.id,
										idDist	: c.idDistrito,
										distri	: j
									});
									PointsTecnolos[x].addListener('click',function(){
										muestrameDatosTecnologia(this);
									});
									x++;
								});
							}
						});
					}
			});
		}
	});
}
function muestrameDatosTecnologia(punto){
	var content='<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;">'+
					'<div style="background-color:#CCCCCC;line-height:20px;text-align:center;">Equipos <b>'+punto.title+'</b> en el distrito: <b>'+punto.distri+'</b></div>'+
					'<table style="font-size:10px;">',
		datos={ pDf:'9kl*ñ1"',
				ID:punto.ide,
				DS:punto.idDist};
	var p=getPromesa(datos);
	p.done(function(data){
		var resultec=jQuery.parseJSON(data);
		if(resultec.apiResponse.length!=0){
			var tipoSolucion=resultec.apiResponse[0].tipoSolucion,colordefondo="#F4F4F4",
				colorOrdenEjecucion=resultec.apiResponse[0].colorOrdenEjecucion;
			switch(colorOrdenEjecucion){
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
			}
			content = content + '<tr><td style="background-color:'+colordefondo+';text-align:center;" colspan="4"><b>Orden de Ejecuci&oacute;n: '+colorOrdenEjecucion+'</b></td></tr>'+
				'<tr><td style="background-color:#f2f2f2;text-align:center;" colspan="4" ><b>Tipo de Soluci&oacute;n: '+tipoSolucion+'</b></td></tr>'+
				'<tr style="background-color:#f2f2f2;"><td>#</td>'+
				'<td>Nombre</td>'+
				'<td>Modelo</td>'+
				'<td>Clientes</td></tr>';
			if (resultec.apiResponse[0].tecnologias[0].items.length > 0){
				for (var i = 0; i < resultec.apiResponse[0].tecnologias[0].items.length;i++){
					var contadd = i+1;
					content = content + '<tr><td style="padding:0 5px;" ><b>'+contadd+'</b></td>'+
						'<td style="padding:0 5px;">'+resultec.apiResponse[0].tecnologias[0].items[i].equipoAcceso+'</td>'+
						'<td style="padding:0 5px;">'+resultec.apiResponse[0].tecnologias[0].items[i].modelo+'</td>'+
						'<td style="padding:0 5px;">'+resultec.apiResponse[0].tecnologias[0].items[i].numClientes+'</td></tr>';
				}
			}else
			content = content + '<tr><td style="text-align:center;color:#B40404;" colspan="4"><b>No hay informaci&oacute;n para mostrar!</b></td></tr>';
		}else
			content = content + '<tr><td style="text-align:center;color:#B40404;" colspan="4"><b>No hay información para mostrar!</b></td></tr>';
		content = content + '</table></div>';
		infowindow.setContent(content);
		infowindow.open(map,punto);
	}).fail(function(jqXHR,textStatus,error){
		alert(error, textStatus);
	});
}
function creaFiltroTecs(){
	$("#nameDistrict #loadInMap #areaZone").html('');
	$("#nameDistrict #loadInMap #distZone").html('');
	$.each(fielderTecs,function(i,a){
		$.each(a,function(j,b){
			if(j=='PorTipo')
				$.each(b,function(k,c){
					if(k=='Distritos')
						$.each(c,function(l,d){
							var newTec='',
								newRow='<div class="row checked" area="'+i+'" distrito="'+l+'">'+
										'<input class="todo" name="'+l+'" type="checkbox" value="1" checked="checked" />'+
										'<label class="abre">'+b.AreaName+', <b>'+l+'</b></label>'+
										'<div class="filters">'+
											'<div class="Usuarios">'+
												'<label area="'+i+'" class="userFilter checked"><input name="D,'+i+','+l+',U" type="checkbox" class="filtroUsuarios" value="1" checked="checked" />Usuarios</label>'+
												'<label area="'+i+'" class="userFilter checked"><input name="D,'+i+','+l+',N" type="checkbox" class="filtroNoUsuarios" value="1" checked="checked"/>No usuarios</label>'+
												'<label area="'+i+'" class="userFilter checked"><input name="D,'+i+','+l+',D" type="checkbox" class="filtroDirigidos" value="1" checked="checked"/>Dirigidas</label>'+
											'</div>'+
											'<div class="Tecnologias">'+
												'<h4>Tecnologías:</h4>';
							$.each(d,function(m,e){
								newTec=newTec+'<label area="'+i+'" class="'+m+'"><input name="D,'+i+','+l+','+m+'" class="tecno" type="checkbox" value="'+e+'"/>'+m+'</label>';
							});
							$("#nameDistrict #loadInMap #distZone").append(newRow+newTec+'</div></div></div>');
						});
					/*else if(k=='EnArea'){
						var newTec='',
							newRow='<div class="row" area="'+i+'">'+
										'<input class="todo" name="'+i+'" type="checkbox" value="'+b.AreaName+'" />'+
									'<label class="abre">'+b.AreaName+'</label>'+
									'<div class="filters">'+
										'<div class="Tecnologias">'+
											'<h4>Tecnologías:</h4>';
										'<div class="Usuarios">'+
											'<label area="'+i+'" class="userFilter checked"><input name="A,'+i+',U" type="checkbox" class="filtroUsuarios" value="1" checked="checked" />Usuarios</label>'+
											'<label area="'+i+'" class="userFilter"><input name="A,'+i+',N" type="checkbox" class="filtroNoUsuarios" value="1" />No usuarios</label>'+
										'</div>'+

						$.each(c,function(m,e){
							newTec=newTec+'<label area="'+i+'" class="'+m+'"><input name="A,'+i+','+m+'" class="tecno" type="checkbox" value="'+e+'"/>'+m+'</label>';
						});
						$("#nameDistrict #loadInMap #areaZone").append(newRow+newTec+'</div></div></div>');
					}*/
				});
		});
	});
}
function limpiatodo(a){
	limpiaTecnologias();
	limpiaClientes();
	limpiaPoligonos();
	filtrosMapa.Distritos=[];
	filtrosMapa.Areas=[];
	filtrosMapa.UD=[];
	filtrosMapa.PA=[];
	filtrosMapa.PD=[];
	filtrosMapa.FirstTime="NO";
	if(a==true)
		$("#areaZone,#distZone").find(':checkbox').each(function(){
			$(this).parent().removeClass("checked");
			$(this).prop('checked','');
		});
}
function limpiaTecnologias(){
	for(var i=0; i<PointsTecnolos.length; i++){PointsTecnolos[i].setMap(null);}
	PointsTecnolos=[];
}
function limpiaClientes(){
	for(var i=0; i<PointsClientes.length; i++){PointsClientes[i].setMap(null);}
	PointsClientes=[];
}
function limpiaPoligonos(){
	map.data.forEach(function(feature){
		map.data.remove(feature);
	});
}
function marcaCheckBoxes(a,b,c,e){
	if(a=='areaZone'){
		$("#areaZone .row[area='"+b+"']").find(':checkbox').each(function(){
			if(c=='Checked'){
				$(this).parent().addClass("checked").removeClass("med");
				$(this).prop('checked',true);
			}
			else if(c=='UnChecked'){
				$(this).parent().removeClass("checked").removeClass("med");
				$(this).prop('checked','');
			}
		});
	}
	else if(a=='distZone'){
		$("#distZone .row[distrito='"+b+"']").find(':checkbox').each(function(){
			if(c=='Checked'){
				$(this).parent().addClass("checked");
				$(this).prop('checked',true);
			}
			else if(c=='UnChecked'){
				$(this).parent().removeClass("checked");
				$(this).prop('checked','');
			}
		});
	}
	$.when(meteFiltro()).done(function(){
		pintaAreas();
		pintaDistritos();
		pintaClientes();
		pintaTecnologias();
	});
}
function meteFiltro(){
	var clients,counts=0;
	limpiatodo(false);
	function haceCosas(){
		$('#distZone .row .filters .Tecnologias :checkbox').each(function(){
			if(this.checked)
				filtrosMapa.Distritos.push($(this).attr('name'));
		});
		$('#areaZone .row .filters .Tecnologias :checkbox').each(function(){
			if(this.checked)
				filtrosMapa.Areas.push($(this).attr('name'));
		});
		$('#distZone .row .filters .Usuarios :checkbox').each(function(){
			if(this.checked){
				if($(this).attr('class')=='filtroUsuarios'){clients='Clientes';counts++;}
				if($(this).attr('class')=='filtroNoUsuarios'){clients='NoClientes';counts++;}
				if($(this).attr('class')=='filtroDirigidos'){clients='clienteDirigido';counts++;}
				filtrosMapa.UD.push($(this).attr('name'));
			}
		});
		$('#distZone .row input.todo:checkbox').each(function(){
			if(this.checked)
				filtrosMapa.PD.push($(this).attr('name'));
		});
		$('#areaZone .row input.todo:checkbox').each(function(){
			if(this.checked)
				filtrosMapa.PA.push($(this).val());
		});
	}
	$.when(haceCosas()).done(function(){
		if(counts>1)
			cualesPinto='Todos';
		else if(clients=='Clientes')
			cualesPinto='Clientes';
		else if(clients=='NoClientes')
			cualesPinto='No Clientes';
		else if(clients=='clienteDirigido')
			cualesPinto='Cliente Dirigido';
	});
}
$(document).on("change","#nameDistrict #loadInMap .row :checkbox",function(){
	loadingMap(true);
	var a=$(this).parent().parent().attr('id'),
		b=$(this).attr('name'),
		d='';
	if(typeof a==='undefined'){
		a=$(this).parent().parent().parent().parent().parent().attr('id');
		if(a=='areaZone') a='SubArea';
		else a='SubDistrito';
		b=$(this).attr('name');
	}
	else if(a=='distZone')
		d=$(this).parent().attr('area');
	if($(this).is(':checked')){
		$(this).parent().addClass("checked");
		marcaCheckBoxes(a,b,'Checked',d);
	}
	else{
		$(this).parent().removeClass("checked");
		marcaCheckBoxes(a,b,'UnChecked',d);
	}
	loadingMap(false);
});
$(document).on("click","#nameDistrict .inner,#nameDistrict #loadInMap .row label.abre",function(){
	var uso=$(this).parent();
	$('#loadInMap #distZone .row,#loadInMap #areaZone .row').not(uso).each(function(){
		$(this).removeClass("open");
	});	$(this).parent().toggleClass("open");
});
$(document).on("click","#circule",function(){
	$(this).add('#map-menu').add('#overMenuMap').toggleClass("open");
});
$(document).on("click","#closeGeneric",function(){
	$('#genericLoad').toggleClass("open");
});
$(document).on("click","#flushTodo",function(){
	limpiatodo(true);
	$('#circule,#map-menu,#overMenuMap').toggleClass("open");
});
$(document).on("click","#navegacionMenu",function(){
	registraCliente();
});
$(document).on("click","#centraUsuario",function(){
	userCenter();
});
$(document).on("click", "#closeReport",function(){
	$("#mapReport").removeClass('open');
});
$(document).on("click","#chartMenu",function(){
	$('#circule,#map-menu,#overMenuMap').toggleClass("open");
	$("#genericLoad .inner").empty();
	var XY={
		Abre:function(){
			$("#genericLoad").addClass('open');
			$("#genericLoad .inner").append('<div id="regresaChart">'+
				'<div id="linearChart"></div>'+
				'<div id="containerPay"></div>'+
			'</div>');
		},
		grafica:function(){
			$.when(
				this.payChart('TecTot')
			).done(function(x){
				XY.payChart('');
			});
		},
		payChart:function(tipo){
			var totalATM=0,totalFTTH=0,totalIPDSLAM=0,totalTBA=0,totalVDSLTBA=0,totalND=0,totalVDSLIPD=0,totalWIMAX=0,
				idTecc,totaltecnologias,datos,titulo='Porcentajes de equipos por tecnologia en: ',div='#containerPay';
			if(fielderGrap.hasOwnProperty("TecTot")){
				if(tipo=='TecTot') datos=fielderGrap.TecTot;
				else{
					datos=fielderGrap.TecDist;
					titulo='Distritos por tecnologia en: ';
					div='#linearChart';
				}
				$.each(datos,function(k,a){
					for(var i=0;i<a.length;i++){
						idTecc=a[i].idTecnologia;
						switch(idTecc){
							case 1:
								totalATM=a[i].totalByArea;
								break;
							case 2:
								totalFTTH=a[i].totalByArea;
								break;
							case 3:
								 totalIPDSLAM=a[i].totalByArea;
								break;
							case 4:
								 totalND=a[i].totalByArea;
								break;
							case 5:
								 totalTBA=a[i].totalByArea;
								break;
							case 6:
								totalVDSLIPD=a[i].totalByArea;
								break;
							case 7:
								 totalVDSLTBA=a[i].totalByArea;
								break;
							case 8:
								totalWIMAX=a[i].totalByArea;
								break;
						}
					}
					totaltecnologias=totalATM+totalFTTH+totalIPDSLAM+totalTBA+totalVDSLTBA+totalND+totalVDSLIPD+totalWIMAX;
					if(totaltecnologias>=1){
						$(div).highcharts({
							credits:{enabled:false},
							chart:{type:'pie'},
							title:{
								text:titulo+k,
								style:{fontWeight:'bold',},
								align:'left',x:0
							},
							tooltip:{pointFormat:'{series.name}: <b>{point.percentage:.1f}%</b>'},
							plotOptions:{
								pie:{
									allowPointSelect:true,
									cursor:'pointer',
									dataLabels:{
										enabled:true,
										format:'<b>{point.name}</b>: {point.percentage:.1f} %'
									},	showInLegend:true
								}
							},
							navigation:{buttonOptions:{enabled:false}},
							series:[{
								name: "Porcentaje",
								colorByPoint: true,
								data:[{
									name: "ATM ("+totalATM+")",
									y: totalATM,
									color: '#C8FE2E'
								},{
									name: "FTTH ("+totalFTTH+")",
									y: totalFTTH,
									sliced: true,
									selected: true,
									color: '#FF8000'
								},{
									name: "IPDSLAM ("+totalIPDSLAM+")",
									y: totalIPDSLAM,
									color: '#0080FF'
								},{
									name: "ND ("+totalND+")",
									y: totalND,
									color: '#8000FF'
								},{
									name: "TBA ("+totalTBA+")",
									y: totalTBA,
									color: '#B40404'
								},{
									name: "VDS LIPD ("+totalVDSLIPD+")",
									y: totalVDSLIPD,
									color: '#FF00FF'
								},{
									name: "VDS LTBA ("+totalVDSLTBA+")",
									y: totalVDSLTBA,
									color: '#01DFD7'
								},{
									name: "WIMAX ("+totalWIMAX+")",
									y: totalWIMAX,
									color: '#FFBF00'
								}]
							}]
						});
					}
					else $(div).html('No existen datos en'+k+'.');
				});
			} else console.log('No existen datos para graficar');
		}
	};
	$.when(
		XY.Abre()
	).done(function(x){
		XY.grafica();
	});
});
$(document).on("change","#clienteOnoTelmex",function(){
	var c,d;
	c=this.checked?' &nbsp; &nbsp; Es usuario Telmex':' &nbsp; &nbsp; No es usuario Telmex';
	d=this.checked?'Teléfono':'Teléfono (opcional)';
	$('.ubicaNuevoCliente .telefono').attr('placeholder',d);
	$('label.onoffswitch-label').html(c);
});
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
			idFielder:fielderInfo.Datos.UserID,
			latitud:latitude,
			longitud:longitude,
			telefono:telefono,
			estado:cliente,
			nombre:nombre,
			direccion:direccion
		}
		var p=getPromise(url_serv+"telmex/add/clientegeo",datos);
		p.done(function(data){$('#genericLoad').removeClass('open');}).fail(function(jqXHR,textStatus,error){alert(error, textStatus);});
	}
	else
		alert('El nombre y la dirección son campos requeridos.');
});
function doneRepo(){
	var value = document.getElementById('reason').value;
		reportText('¡gracias los datos estan siendo procesados!',"alert");
		report["razon"] = value;
		setTimeout(function(){
			document.getElementById('mapReport').classList.remove('open');
		}, 5000);
		attachCal(report);
}
function reportText(text, type){
	var insert = document.getElementById('textRepo');
	insert.innerHTML = "<p>"+text+"</p>";
	insert.classList.add('open');
	insert.classList.add(type);
	setTimeout(function(){
		insert.classList.remove('open');
		insert.classList.remove(type);
	}, 4000);
}
function repo(){
	var insert = document.getElementById('mapReport').getElementsByClassName('holder')[0];
		insert.innerHTML ='<div class="holderSelect"> '+
		'<div class="porFinal"><h3>¿Por que finaliza?</h3>'+
		'<div class="getData">'+
			'<select name="" id="reason">'+
				'<option value="sin datos">selecione un motivo</option>'+
				'<option value="No contrató">No contrató</option>'+
				'<option value="Desea más información vía Tecmarketing">Desea más información vía Tecmarketing</option>'+
				'<option value="Desea más información vía correo electrónico.">Desea más información vía correo electrónico.</option>'+
				'<option value="No desea el servicio">No desea el servicio</option>'+
				'<option value="Ya tiene el servicio">Ya tiene el servicio</option>'+
				'<option value="Prefiere servicio con otro proveedor">Prefiere servicio con otro proveedor</option>'+
				'<option value="Renta, tarifa o costo elevado">Renta, tarifa o costo elevado</option>'+
				'<option value="No se encuentra el decisor(Con agenda)">No se encuentra el decisor(Con agenda)</option>'+
				'<option value="No se encuentra el decisor(Sin agenda)">No se encuentra el decisor(Sin agenda)</option>'+
				'<option value="Ya tuvo el servicio y canceló">Ya tuvo el servicio y canceló</option>'+
				'<option value="Cliente satisfecho con servicio actual">Cliente satisfecho con servicio actual</option>'+
				'<option value="Desea servicio en otra línea">Desea servicio en otra línea</option>'+
				'<option value="Servicio no compatible/No convive con servicios activos">Servicio no compatible/No convive con servicios activos</option>'+
				'<option value="Plan excede necesidades">Plan excede necesidades.</option>'+
				'<option value="Prefiere hacer contratación por otro canal de venta">Prefiere hacer contratación por otro canal de venta</option>'+
				'<option value="Datos incompletos">Datos incompletos</option>'+
				'<option value="Cliente cambió de domicilio">Cliente cambió de domicilio</option>'+
				'<option value="Cliente no estaba en domicilio">Cliente no estaba en domicilio</option>'+
				'<option value="Domicilio no localizado">Domicilio no localizado</option> '+
			'</select>'+
			'<p onclick="doneRepo()">finalizar <i class="fa fa-check"></i></p>'+
		'</div></div>'+
	'</div>';
}
function attachCal(report){
	var hoy = new Date(),
		d = hoy.getDate(),
		m = hoy.getMonth(),
		y = hoy.getFullYear();
	if(fielderCalendar[y]){
		if(fielderCalendar[y][m]){}
		else
			fielderCalendar[y][m]={};
		if(fielderCalendar[y][m][d]){
			fielderCalendar[y][m][d].asignacion[ObjectSize(fielderCalendar[y][m][d].asignacion)] = {};
			var insert = fielderCalendar[y][m][d].asignacion;
			insert[0] = report[0];
			insert[ObjectSize(insert)] = report[1];
			if(report[2])
				insert[ObjectSize(insert)] = report[2];
		}
		else{
			fielderCalendar[y][m][d] = {};
			var insert = fielderCalendar[y][m][d];
			insert["metas"] = {};
			insert["asignacion"] = {};
			attachCal(report);
		}
	}
	else
		fielderCalendar[y]={};
}
function getName(pol,index){
	var latlng = new google.maps.LatLng(19.538309,-99.124570);
	if (google.maps.geometry.poly.containsLocation(latlng, pol)) {
		alert("si esta " +index);
		repotBox("<div data-steep='1'></div>");
	}else{
		alert("no esta " +index);
		repotBox("<div data-steep='1' data-distrito="+index+"></div>");
	}
}
function pintaTienda(){
	var x=0,muestralo;
	$.each(fielderTien,function(k,v){
		$.each(v,function(j,tienda){
			var centrob=new google.maps.LatLng(tienda.Lat,tienda.Lon);
			PointsTienda[x]=new google.maps.Marker({
				position:centrob,
				map		: map,
				title	: tienda.Tienda,
				icon	: "css/img/assets/fav_icon.png",
				html	:
					'<div style="text-align:center;font-weight:bold;margin:0 0 10px 0;font-size:15px;"><b>Tienda</b>: '+
						tienda.Tienda+
					'</div>'+
					'<div style="margin:0 0 10px 0;"><b>Domicilio</b>: '+tienda.Domicilio+'<br><br>'+
					'<b>Horario</b>: '+tienda.Horario+'<br><b>Horario de cajero: </b>'+tienda.HorarioCajero+'</div>'
			});
			PointsTienda[x].addListener('click',function(){
				infowindow.setContent(this.html);
				infowindow.open(map,this);
			});
			x++;
		});
	});
}

function loadingMap(v){
	loading = document.getElementById('loadingMap').classList;
	if(v == true){
		loading.add('open');
	}
	if(v == false){
		setTimeout(function(){
			loading.remove('open');
		},1000);
	}
}
function salesIframe(t){
	d = t.dataset.direccion;
	document.getElementById('iframeDisplay2').innerHTML = '<iframe src="https://187.217.179.35:81/new?fielder='+userId+'&domicilio='+d+'" allowtransparency="true"></iframe>';
	iframeMethod('iframeDisplay2');
}
