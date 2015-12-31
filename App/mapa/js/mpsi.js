var map,
	infowindow,
	PointsClientes=[],
	PointsTecnolos=[],
	filtrosMapa,
	centro;
function startMapa(){
	map=new google.maps.Map(document.getElementById('map-canvas'),{
		zoom:9,
		disableDefaultUI:true,
		zoomControl:true,
		center:{lat:19.3907336,lng:-99.1436126},
		styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3ebe2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#fffcf7"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#112251"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"39"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ede5d7"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.20"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}]
	});
	infowindow=new google.maps.InfoWindow({content:'Espere por favor, cargando...'});
	filtrosMapa={"Distritos":[],"Areas":[],"UD":[],"PA":[],"PD":[],"FirstTime":"SI"};
/*	map.data.addListener('click',function(e){
		var bounds=new google.maps.LatLngBounds();
		procesaPoints(e.feature.getGeometry(),bounds.extend,bounds);
		map.fitBounds(bounds);
	}); */ //En phablet son pequeños los iconos y es dificil dar clic, por eso deshabilité esta función...
	creaFiltroTecs();
	pintaAreas();
	pintaDistritos();
	pintaClientes();
	newPosition();
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
	var bounds=new google.maps.LatLngBounds();
	map.data.addListener('addfeature',function(e){
		procesaPoints(e.feature.getGeometry(),bounds.extend,bounds);
		map.fitBounds(bounds);
	});
}
function newPosition(){
	limpiaPosition();
	centro = new google.maps.LatLng(latitude,longitude);
	miposicion[0]=new google.maps.Marker({
		position:centro,
		map:map,
		title:"Mi posición",
		icon:"mapa/images/myPosition.png"
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
	$.each(fielderPols.Areas,function(i,a){
		if(filtrosMapa.FirstTime=="NO"){
			if(jQuery.inArray(i,filtrosMapa.PA)!=-1)
				map.data.addGeoJson(a);
		}
		else
			map.data.addGeoJson(a);
	});
	setColores();
}
function pintaDistritos(){
	$.each(fielderPols.Distritos,function(i,a){
		if(filtrosMapa.FirstTime=="NO"){
			if(jQuery.inArray(i,filtrosMapa.PD)!=-1)
				map.data.addGeoJson(a);
		}
		else
			map.data.addGeoJson(a);
	});
	setColores();
}
function userCenter(){
	map.setCenter(centro);
}
function registraCliente(){
	$("#genericLoad .inner").html('<form class="ubicaNuevoCliente" method="post" action="#">'+
		'<fieldset>'+
			'<h3>Almacenar ubicación</h3>'+
			'<div class="onoffswitch">'+
				'<input soy="formulario" type="checkbox" name="clienteOnoTelmex" class="onoffswitch-checkbox" id="clienteOnoTelmex">'+
				'<label class="onoffswitch-label" for="clienteOnoTelmex"> &nbsp; &nbsp; No es usuario Telmex</label>'+
			'</div>'+
			'<input type="text" placeholder="Teléfono (opcional)" name="telefono" class="telefono" value="" />'+
			'<input type="text" placeholder="Nombre" name="nombre" class="nombre" value="" />'+
			'<input type="text" placeholder="Dirección" name="direccon" class="direccion" value="" />'+
			'<button type="submit">Guardar</button>'+
		'</fieldset>'+
	'</form>');
	$("#goTo").removeClass('open');
	$("#genericLoad").addClass('open');
}
function pintaClientes(){
	var x=0,muestralo,fClientes=[];
	$.each(filtrosMapa.UD,function(i,a){
		a=a.split(',');
		fClientes.push(a[2]);
	});
	$.each(fielderRegs.Areas,function(i,a){
		$.each(a.Distritos,function(k,b){
			muestralo="Si";
			if(filtrosMapa.FirstTime=="NO")
				if(jQuery.inArray(k,fClientes)<0)
					muestralo="No";
			if(muestralo=="Si"){
				if(b.Clientes.length>0){
					$.each(b.Clientes,function(j,c){
						var centrob=new google.maps.LatLng(c.Latitud,c.Longitud);
						PointsClientes[x]=new google.maps.Marker({
							position:centrob,
							map		: map,
							title	: c.Cliente,
							icon	: "mapa/images/client.png",
							html	:
								'<div style="text-align:center;font-weight:bold;margin:0 0 10px 0;font-size:15px;">'+
									c.Cliente+
								'</div>'+
								'<div style="margin:0 0 10px 0;">'+c.CampoA+'<br>'+c.CampoB+'<br>'+c.CampoC+'<br><b>Distrito</b>: '+k+'<br>'+
								'<b>Telefono</b>: '+c.Telefono+'</div>'+
								'<div><b>tCode</b>: '+c.tcode+'<br><b>Campaña</b>: '+c.idCampana+'<br><b>Oferta</b>: '+c.idOferta+'</div>'
						});
						PointsClientes[x].addListener('click',function(){
							infowindow.setContent(this.html);
							infowindow.open(map,this);
						});
						x++;
					});
				}
			}
		});
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
										icon	: "mapa/images/tecnoMarkers/"+c.imagen,
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
												'<label area="'+i+'" class="userFilter"><input name="D,'+i+','+l+',N" type="checkbox" class="filtroNoUsuarios" value="1" />No Usuarios</label>'+
											'</div>'+
											'<div class="Tecnologias">'+
												'<h4>Tecnologías:</h4>';
							$.each(d,function(m,e){
								newTec=newTec+'<label area="'+i+'" class="'+m+'"><input name="D,'+i+','+l+','+m+'" class="tecno" type="checkbox" value="'+e+'"/>'+m+'</label>';
							});
							$("#nameDistrict #loadInMap #distZone").append(newRow+newTec+'</div></div></div>');
						});
					else if(k=='EnArea'){
						var newTec='',
							newRow='<div class="row" area="'+i+'">'+
										'<input class="todo" name="'+i+'" type="checkbox" value="'+b.AreaName+'" />'+
									'<label class="abre">'+b.AreaName+'</label>'+
									'<div class="filters">'+
										'<div class="Usuarios">'+
											'<label area="'+i+'" class="userFilter checked"><input name="A,'+i+',U" type="checkbox" class="filtroUsuarios" value="1" checked="checked" />Usuarios</label>'+
											'<label area="'+i+'" class="userFilter"><input name="A,'+i+',N" type="checkbox" class="filtroNoUsuarios" value="1" />No Usuarios</label>'+
										'</div>'+
										'<div class="Tecnologias">'+
											'<h4>Tecnologías:</h4>';
						$.each(c,function(m,e){
							newTec=newTec+'<label area="'+i+'" class="'+m+'"><input name="A,'+i+','+m+'" class="tecno" type="checkbox" value="'+e+'"/>'+m+'</label>';
						});
						$("#nameDistrict #loadInMap #areaZone").append(newRow+newTec+'</div></div></div>');
					}
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
	limpiatodo(false);
	$('#distZone .row .filters .Tecnologias :checkbox').each(function(){
		if(this.checked)
			filtrosMapa.Distritos.push($(this).attr('name'));
	});
	$('#areaZone .row .filters .Tecnologias :checkbox').each(function(){
		if(this.checked)
			filtrosMapa.Areas.push($(this).attr('name'));
	});
	$('#distZone .row .filters .Usuarios :checkbox').each(function(){
		if(this.checked)
			filtrosMapa.UD.push($(this).attr('name'));
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
$(document).on("change","#nameDistrict #loadInMap .row :checkbox",function(){
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
});
$(document).on("click","#nameDistrict .inner,#nameDistrict #loadInMap .row label.abre",function(){
	var uso=$(this).parent();
	$('#loadInMap #distZone .row,#loadInMap #areaZone .row').not(uso).each(function(){
		$(this).removeClass("open");
	});	$(this).parent().toggleClass("open");
});
$(document).on("click","#circule",function(){
	$(this).add('#map-menu').toggleClass("open");
});
$(document).on("click","#closeGeneric",function(){
	$('#genericLoad').toggleClass("open");
});
$(document).on("click","#flushTodo",function(){
	limpiatodo(true);
	$('#circule,#map-menu').toggleClass("open");
});
$(document).on("click","#navegacionMenu",function(){
	registraCliente();
});
$(document).on("click","#centraUsuario",function(){
	userCenter();
});
$(document).on("click","#chartMenu",function(){
	var XY={
		Abre:function(){
			$("#genericLoad").addClass('open')
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