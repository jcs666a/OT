var div_eli_region,li_eli_region,gcm_reg_usr_id,idDelJefe;
function regisdivareas(region){
	var res=region.split("-"),
		regiones=[];
	if(res[2]===undefined)
		res[2]=0;
	if(res[3]===undefined)
		res[3]=0;
	if(res[0]==1){
		regiones['division']='Metro';
		if(res[1]==1) regiones['area']='Acapulco';
		if(res[1]==2) regiones['area']='Balbuena';
		if(res[1]==3) regiones['area']='Chilpancingo';
		if(res[1]==4) regiones['area']='Cuautitlan-Morelos';
		if(res[1]==5) regiones['area']='Ermita-Tlahuac';
		if(res[1]==6) regiones['area']='Lindavista';
		if(res[1]==7) regiones['area']='Lomas';
		if(res[1]==8) regiones['area']='Mixcoac';
		if(res[1]==9) regiones['area']='Morelos';
		if(res[1]==10)regiones['area']='Satélite';
		if(res[1]==11)regiones['area']='Sotelo';
		if(res[1]==12)regiones['area']='Texcoco-Zaragoza';
		if(res[1]==13)regiones['area']='Toluca';
		if(res[1]==14)regiones['area']='Universidad';
		if(res[1]==15)regiones['area']='Valle-San Juán';
	}
	else if(res[0]==2){
		regiones['division']='Norte';
		if(res[1]==16)regiones['area']='Aguascalientes';
		if(res[1]==17)regiones['area']='Celaya';
		if(res[1]==18)regiones['area']='Ciudad Victoria';
		if(res[1]==19)regiones['area']='Irapuato';
		if(res[1]==20)regiones['area']='León';
		if(res[1]==21)regiones['area']='Matamoros';
		if(res[1]==22)regiones['area']='Monterrey 1';
		if(res[1]==23)regiones['area']='Monterrey 2';
		if(res[1]==24)regiones['area']='Monterrey Foraneas';
		if(res[1]==25)regiones['area']='Nuevo Laredo';
		if(res[1]==26)regiones['area']='Querétaro';
		if(res[1]==27)regiones['area']='Reynosa';
		if(res[1]==28)regiones['area']='Sabinas';
		if(res[1]==29)regiones['area']='Saltillo';
		if(res[1]==30)regiones['area']='San Luis Potosí';
		if(res[1]==31)regiones['area']='Tampico';
		if(res[1]==32)regiones['area']='Torreón';
		if(res[1]==33)regiones['area']='Zacatecas';
	}
	else if(res[0]==3){
		regiones['division']='Occidente';
		if(res[1]==34)regiones['area']='Chihuahua';
		if(res[1]==35)regiones['area']='Ciudad Juárez';
		if(res[1]==36)regiones['area']='Ciudad Obregón';
		if(res[1]==37)regiones['area']='Colima';
		if(res[1]==38)regiones['area']='Culiacán';
		if(res[1]==39)regiones['area']='Durango';
		if(res[1]==40)regiones['area']='Guadalajara Centro';
		if(res[1]==41)regiones['area']='Guadalajara Oriente';
		if(res[1]==42)regiones['area']='Guadalajara Poniente';
		if(res[1]==43)regiones['area']='Hermosillo';
		if(res[1]==44)regiones['area']='Jalisco';
		if(res[1]==45)regiones['area']='La Paz';
		if(res[1]==46)regiones['area']='Los Mochis';
		if(res[1]==47)regiones['area']='Mazatlan';
		if(res[1]==48)regiones['area']='Morelia';
		if(res[1]==49)regiones['area']='Nogales';
		if(res[1]==50)regiones['area']='Puerto Vallarta';
		if(res[1]==51)regiones['area']='Tepic';
		if(res[1]==52)regiones['area']='Zamora';
	}
	else if(res[0]==4){
		regiones['division']='Sur';
		if(res[1]==53)regiones['area']='Campeche';
		if(res[1]==54)regiones['area']='Cancún';
		if(res[1]==55)regiones['area']='Coatzacoalcos';
		if(res[1]==56)regiones['area']='Córdoba';
		if(res[1]==57)regiones['area']='Jalapa';
		if(res[1]==58)regiones['area']='Mérida';
		if(res[1]==59)regiones['area']='Oaxaca';
		if(res[1]==60)regiones['area']='Pachuca';
		if(res[1]==61)regiones['area']='Poza Rica';
		if(res[1]==62)regiones['area']='Puebla';
		if(res[1]==63)regiones['area']='Tlaxcala-Puebla';
		if(res[1]==64)regiones['area']='Tuxtla Guitierrez';
		if(res[1]==65)regiones['area']='Veracrúz';
		if(res[1]==66)regiones['area']='Villahermosa';
		if(res[1]==70)regiones['area']='Tlaxcala';
	}
	else if(res[0]==5){
		regiones['division']='Telnor';
		if(res[1]==67)regiones['area']='Ensenada';
		if(res[1]==68)regiones['area']='Mexicali';
		if(res[1]==69)regiones['area']='Tijuana';
	}
	regiones['distrito']='';
	regiones['colonia']='';
	if(res[2]!=0)
		regiones['distrito']=res[2];
	if(res[3]!=0)
		regiones['colonia']=res[3];
	if(res[2]!=0 && res[3]==0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[2];
		regiones['regionT']='<span>Distrito:</span> ' + regiones['division'] + '-' + regiones['area'] + '-' + res[2];
	}
	else if(res[2]==0 && res[3]==0){
		regiones['region']=regiones['division'] + '-' + regiones['area'];
		regiones['regionT']='<span>Área:</span> ' + regiones['division'] + '-' + regiones['area'];
	}
	else if(res[2]==0 && res[3]!=0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[3];
		regiones['regionT']='<span>Colonia:</span> ' + regiones['division'] + '-' + regiones['area'] + '-' + res[3];
	}
	else if(res[2]!=0 && res[3]!=0){
		regiones['region']=regiones['division'] + '-' + regiones['area'] + '-' + res[3] + '-' + res[2];
		regiones['regionT']='<span>Distrito/Colonia:</span> ' + regiones['division'] + '-' + regiones['area'] + '-' + res[3] + '-' + res[2];
	}
	regiones['original']=region;
	return regiones;
}
function validar(string){
	for(var i=0,output='',validos="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,. ";i<string.length;i++)
		if(validos.indexOf(string.charAt(i))!= -1)
			output += string.charAt(i);
	return output;
}
function overlayClose(){
	$("#overlay").fadeOut('fast');
}
function quitame(li){
	li_eli_region=li;
	div_eli_region=li.parent().parent().find('.mensaje_elimina');
	$(div_eli_region).show();
}
$(function(){
	$(document).on("change",".divisionesGeoTel",function(){
		var	op=$(this).val(),
			ap=$(this),
			tc=$(this).children("option").filter(":selected").text();
		todosdiv=$(this).parent().parent().parent().attr('id');
		nvoDivi=op;
		if(todosdiv=='filter-box'){
			$('#container_mensajes,#showUP').hide();
			ap.parent().parent().parent().find('.listaDist').html('');
		}
		else
			$(this).parent().parent().find(".distritosText").removeClass('ya');
		var divisiones=$.ajax({
			url:"ajax/registro.php",
			method:"POST",
			data:"div=" + op,
			select:ap
		});
		divisiones.done(function(msg){
			$(ap).parent().parent().next('div').slideDown();
			$(ap).parent().parent().next('div').next('div').hide();
			$(ap).parent().parent().next('div').next('div').next('div').hide();
			$(ap).parent().parent().next('div').find('select').children().remove().end().append(msg);
		});
		divisiones.fail(function(jqXHR,textStatus){
			alert( "Request failed: " + textStatus );
		});
/*		$.ajax({
			type:"GET",
			url: "mapa.php?tipo=division&cual=" + tc,
			success:function(data,a,b){
//				console.log(data);
				var mapaareap=JSON.parse(data);
				console.log(mapaareap); */
/*				$("#mapaggg").gmap3({
					polygon:{
						options:{
							strokeColor: "#FFFF00",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#FFFF00",
							fillOpacity: 0.35,
							paths:mapaareap
						}
					} 
				}); */
/*			},
			error: function(jqXHR, textStatus, error){
				console.log(error, jqXHR, textStatus);
			}
		}); */
	});
	$(document).on("change",".areasGeoTel",function(){
		nvoArea=$(this).val();
		todosdiv=$(this).parent().parent().parent().attr('id');
		$(this).parent().parent().next('div').find(".districtOpcGeoTel").val('0');
		$(this).parent().parent().next('div').slideDown();
		$(this).parent().parent().next('div').next('div').find(".distritosGeoTel").val('');
		if(todosdiv!='fcambiar_distro')
			$(this).parent().parent().next('div').next('div').slideUp();
		if(todosdiv=='filter-box'){
			$('#container_mensajes,#showUP').hide();
			$(this).parent().parent().parent().find('.listaDist').html('');
		}
		else
			$(this).parent().parent().find(".distritosText").removeClass('ya');
	});
	$(document).on("change",".districtOpcGeoTel",function(){
		var op=$(this).val(),
			ap=$(this),
			ar=$(this).parent().parent().parent().find('.areasGeoTel').val(),
			dG=$(this).parent().parent().parent().find('.distritosGeoTel'),
			lD=$(this).parent().parent().parent().find('.listaDist'),
			dT=$(this).parent().parent().parent().find('.distritosText'),
		region='',
		urldis=ip_services + '/getDistritosBySearch/'+ar+'/TODO',
		urlcol=ip_services + '/telmex/necropsia/getNecropsiaColoniaByArea/'+ar;
		todosdiv=$(this).parent().parent().parent().attr('id');
		dG.autocomplete({ create:function(event,ui){} });
		dG.val('');
		if(todosdiv=='filter-box'){
			$('#container_mensajes,#showUP').hide();
			lD.html('');
		}
		else
			dT.addClass('ya');
		$('#container_mensajes').hide();
		if(op == "1"){
			$.ajax({
				type:"GET",
				url: urldis,
				dataType:"json",
				success:function(html){
					dG.attr("placeholder","Buscar distrito").autocomplete({source:html});
				}
			});
			$(this).parent().parent().next('div').slideDown();
			dis_o_col='distritos';
		}
		else if(op=="3"){
			$.ajax({
				type:"GET",
				url: urlcol,
				dataType:"json",
				cache:false,
				success:function(html){
					dG.attr("placeholder","Buscar colonia").autocomplete({source:html.apiResponse});
				}
			});
			$(this).parent().parent().next('div').slideDown();
			dis_o_col='colonias';
		}
		else if(op=="2"){
			var region_solo_area=nvoDivi + '-' + nvoArea + '-';
			$("#showUP").fadeIn('fast',function(){
				$.ajax({
					type:"GET",
					url:ip_services + "/telmex/get/usuariosarea/" + region_solo_area,
					success:function(data,a,b){
						var datos=data.apiResponse[0],
							conte=$("#showUP"),
							title=$("#showUP div h2.text_h2"),
							devic=$("#showUP ul.devices");
						var cntos=Object.keys(datos).length;
						$("#showUP ul.devices li").not(':first').remove();
						if(cntos>0){
							title.html('Dispositivos Registrados: <span>' + cntos + '</span>');
							jQuery.each(datos,function(i,item){
								devic.append(
									'<li>' +
										'<form id="' + item[0] + '" name="" method="post">' +
											'<label class="blue-text">Nombre:</label>' +
											'<span class="sempleado black-text"> ' + item[2] + '</span>' +
											'<div class="clear"></div>' +
											'<label class="blue-text">Exp:</label>' +
											'<span class="sexp black-text"> ' + item[5] + '</span>' +
											'<div class="clear"></div>' +
											'<div class="send_container">' +
												'<textarea rows="3" id="mensaje" name="message" placeholder="Mensaje"></textarea>' +
												'<input type="hidden" class="IDform" name="Id" value="' + item[0] + '"/>' +
												'<input type="hidden" class="regIDform" name="regId" value="' + item[9] + '"/>' +
												'<button class="btn waves-effect waves-light red darken-1 mensajes" type="submit">Enviar' +
													'<i class="mdi-content-send right white-text"></i>' +
												'</button> &nbsp; ' +
												'<button class="btn waves-effect waves-light green accent-4 triggerOverlay editar">Reasignar' +
													'<i class="mdi-navigation-refresh right white-text"></i>' +
												'</button>' +
											'</div>' +
										'</form>' +
									'</li>');
							});
						}
						else{
							$('#container_mensajes').hide();
							title.html('No se encontraron dispositivos de esa región');
						}
					},
					error: function(jqXHR, textStatus, error){
					}
				});
			});
/*			dT.slideUp();
			var xarreglo=[]; // xarreglo.push("Kiwi");
			$.ajax({
				type:"GET",
				url:urldis
			}).done(function(html){
				var totalI=html.length;
				creaDevices(html,totalI);
			}).fail(function(jqXHR,textStatus){
				console.log(error, jqXHR, textStatus);
			});
			function meteAxArreglo(ids,arrr){
				ids=parseInt(ids);
				xarreglo[ids]=arrr;
			}
			function creaXarreglo(){
				var conte=$("#showUP"),
					title=$("#showUP div h2.text_h2"),
					devic=$("#showUP ul.devices")
					mi=0;
				$("#showUP ul.devices li").not(':first').remove();
				$.each(xarreglo,function(i,item){
					if(item!==undefined)
						mi++;
					devic.append(item);
				});
				if(mi==0){
					$('#container_mensajes').hide();
					title.html('No se encontraron dispositivos de esa región');
				}
				else
					title.html('Dispositivos Registrados: <span>' + mi +'</span>');
				conte.fadeIn();
			}
			function creaDevices(html,totalI){
				$.each(html,function(i,atem){
					region=nvoDivi + '-' + nvoArea + '-' + atem + '-0';
					var xi=i;
					$.ajax({
						type:"GET",
						url:ip_services + "/telmex/get/usuariosregion/" + region
					}).done(function(data){
						var datos=data.apiResponse[0];
							$.each(datos,function(index,item){
								var reere=regisdivareas(item[5]);
								meteAxArreglo(item[0],
									'<li>' +
										'<form id="' + item[0] + '" name="" method="post">' +
											'<label class="blue-text">Nombre:</label>' +
											'<span class="sempleado black-text"> ' + item[2] + '</span>' +
											'<div class="clear"></div>' +
											'<label class="blue-text">Exp:</label>' +
											'<span class="sexp black-text"> ' + item[5] + '</span>' +
											'<div class="clear"></div>' +
											'<div class="send_container">' +
												'<textarea rows="3" id="mensaje" name="message" placeholder="Mensaje"></textarea>' +
												'<input type="hidden" class="IDform" name="Id" value="' + item[0] + '"/>' +
												'<input type="hidden" class="regIDform" name="regId" value="' + item[9] + '"/>' +
												'<button class="btn waves-effect waves-light red darken-1 mensajes" type="submit">Enviar' +
													'<i class="mdi-content-send right white-text"></i>' +
												'</button> &nbsp; ' +
												'<button class="btn waves-effect waves-light green accent-4 triggerOverlay editar">Reasignar' +
													'<i class="mdi-navigation-refresh right white-text"></i>' +
												'</button>' +
											'</div>' +
										'</form>' +
									'</li>');
							});
							if(xi===totalI-1)
								creaXarreglo();
					}).fail(function(jqXHR,textStatus){
						console.log(error, jqXHR, textStatus);
					});
				});
			} */
		}
		else dT.slideUp();
	});
	$(document).on("click","small.agregarDistrito",function(){
		var dist=$(this).parent().find('.distritosGeoTel').val(),
			divi=$(this).parent(),
		  region,reer,
		elformul=$(this).parent().parent(),
		todosdiv=$(this).parent().parent().attr('id');
		if (dist==""){
			alert("Debes escribir un nombre de distrito");
		}else{
			$(this).parent().find('.distritosGeoTel').val("");
			$(this).parent().find('.distritosGeoTel').focus();
			if(dis_o_col=='distritos')
				region=nvoDivi + '-' + nvoArea + '-' + dist+'-0';
			else if(dis_o_col=='colonias')
				region=nvoDivi + '-' + nvoArea + '-0-' + dist;
			reer=regisdivareas(region);
			if(todosdiv=='filter-box'){
				$(this).parent().find('.listaDist').html("<li>"+dist+"</li>");
				$(this).parent().find(".listaDist > li").hide();
				$('#container_mensajes').find('h3.header span').html(reer.region);
				$('#container_mensajes').find('textarea').val('');
				$('#container_mensajes').slideDown();
				$('#container_mensajes').find('h3.header span').click(function(event){
					$('#container_mensajes').hide();
				});
				$("#showUP").fadeIn('fast',function(){
					$.ajax({
						type:"GET",
						url:ip_services + "/telmex/get/usuariosregion/" + region,
						success:function(data,a,b){
							var datos=data.apiResponse[0],
								conte=$("#showUP"),
								title=$("#showUP div h2.text_h2"),
								devic=$("#showUP ul.devices");
							var cntos=Object.keys(datos).length;
							$("#showUP ul.devices li").not(':first').remove();
							if(cntos>0){
								title.html('Dispositivos Registrados: <span>' + cntos + '</span>');
								jQuery.each(datos,function(i,item){
									devic.append(
										'<li>' +
											'<form id="' + item[0] + '" name="" method="post">' +
												'<label class="blue-text">Nombre:</label>' +
												'<span class="sempleado black-text"> ' + item[2] + '</span>' +
												'<div class="clear"></div>' +
												'<label class="blue-text">Exp:</label>' +
												'<span class="sexp black-text"> ' + item[5] + '</span>' +
												'<div class="clear"></div>' +
												'<div class="send_container">' +
													'<textarea rows="3" id="mensaje" name="message" placeholder="Mensaje"></textarea>' +
													'<input type="hidden" class="IDform" name="Id" value="' + item[0] + '"/>' +
													'<input type="hidden" class="regIDform" name="regId" value="' + item[9] + '"/>' +
													'<button class="btn waves-effect waves-light red darken-1 mensajes" type="submit">Enviar' +
														'<i class="mdi-content-send right white-text"></i>' +
													'</button> &nbsp; ' +
													'<button class="btn waves-effect waves-light green accent-4 triggerOverlay editar">Reasignar' +
														'<i class="mdi-navigation-refresh right white-text"></i>' +
													'</button>' +
												'</div>' +
											'</form>' +
										'</li>');
								});
							}
							else{
								$('#container_mensajes').hide();
								title.html('No se encontraron dispositivos de esa región');
							}
						},
						error: function(jqXHR, textStatus, error){
						}
					});
				});
			}
			else if(todosdiv=='fcambiar_distro'){
				var laregi=regisdivareas(region),
					idEmpleado=$(elformul).find('#id-usuario').val();
				$(elformul).addClass('cambiando');
				if(gcm_reg_usr_id!='' && region!='' && idDelJefe!='' && idEmpleado!=''){
					function envia_mensaje(){
						$.ajax({
							method:"POST",
							url:"edit_b.php",
							data:{
								idJefe:idDelJefe,
								empleado:idEmpleado,
								distrito:region,
								regIDform:gcm_reg_usr_id
							}
						}).done(function(msg){
							$(elformul).removeClass('cambiando');
							$(elformul).find('.listaDist').append("<li reg='" + region + "'>"+laregi.region+"</li>");
						}).fail(function(jqXHR,textStatus){
							alert(textStatus + " " + jqXHR['status'] + ', ' + jqXHR['statusText']);
						});
					}
					function crea_region(){
						var upnreg={idUsuario:{idUsuario:idEmpleado},regionTrabajo:region};
						$.ajax({
							type:"POST",
							url:ip_services + "/telmex/add/region",
							data:JSON.stringify(upnreg),
							contentType:"application/json",
							dataType:"json",
							success:function(data,a,b){
								envia_mensaje();
							},
							error:function(jqXHR,textStatus,error){
								alert(textStatus + ' - ' + error + ' - ' + jqXHR);
							}
						});
					}
					$.post("postgre.php?hago=3",{
						id:idEmpleado,
						reg:region
					}).done(function(data){
						var ex=parseInt(data);
						if(ex==0)
							crea_region();
						else{
							$(elformul).removeClass('cambiando');
							$('#notificaciones').append('<div class="tn">' +
									'<h2>Notificación:</h2>' +
									'<p>Ya estaba asignado a ' + laregi.region + '</p>' +
									'<div class="tn-progress"></div>' +
								'</div>');
							setTimeout(function(){$("#notificaciones").empty();},5000);
						}
					}).fail(function(jqXHR,textStatus,error){
						console.log(textStatus + ' - ' + error + ' - ' + jqXHR);
					});
				}
				else alert('Selecciona un distrito para cambiar al usuario.');

			}
			else{
				var laregi=regisdivareas(region);
				$(this).parent().find('.listaDist').append("<li reg='" + region + "'>"+laregi.region+"</li>");
			}
		}
		$(this).parent().find(".listaDist > li").click(function(event){
//			$(this).remove();
			quitame($(this));
		});
	});
	$("#homeLoading").on("submit",function(event){
		event.preventDefault();
		if($("#usr").val()=="" || $("#pwd").val()==""){
			alert("Debes escribir un usuario y un password");
		}else{
			var usuario=$("#usr").val(),
				clave=$("#pwd").val();
			try{
				$.ajax({
					type:"GET",
					url: ip_services + "/telmex/get/user/"+usuario+"/"+clave,
					success:function(data,a,b){
						var respuesta = data;
						if(respuesta.errorMessage!= null){
							$('#login-wrapper div.inner').addClass('error');
							setTimeout(function(){$('#login-wrapper div.inner').removeClass('error');},2500);
						}
						else{
							window.location="loginP.php?us=" + respuesta.apiResponse[0].nombre +
											"&ni=" + respuesta.apiResponse[0].role.idRole +
											"&idJefe=" + respuesta.apiResponse[0].idUsuario;
						}
					},
					error: function(jqXHR, textStatus, error){
						$('#login-wrapper div.inner').addClass('error');
						setTimeout(function(){
							$('#login-wrapper div.inner').removeClass('error');
						},2500);
					},
					dataType: 'json'
				});
			}catch(error){
			};
		}
	});
});