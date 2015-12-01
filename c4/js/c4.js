$(function(){
	var adminUsersBolean=0,
	height=$(window).height() - 60;
	function readCookie(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++){
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	function getCookie(name){
		var dc=document.cookie;
		var prefix=name + "=";
		var begin=dc.indexOf("; " + prefix);
		if(begin==-1){
			begin=dc.indexOf(prefix);
			if (begin != 0) return null;
		}
		else{
			begin+=2;
			var end=document.cookie.indexOf(";", begin);
			if(end==-1){
				end=dc.length;
			}
		}
		return unescape(dc.substring(begin + prefix.length,end));
	}
	var myCookie=getCookie("cCuatroV");
	function valida_login(){
		var json=[];
		if(myCookie!=null){
			var login_co=readCookie('cCuatroV');
			var sdfasddf=decodeURIComponent(login_co);
			var json = JSON.parse(sdfasddf);
		}
		else window.location='index.php';
		return json;
	}
	var datos_lo=valida_login();
	var tipoUser=datos_lo[2],
		idJefe=datos_lo[0],
		nombreJefe=datos_lo[1];
	$(document).on("submit","ul.devices form",function(event){
		event.preventDefault();
		var id=$(this).attr("id"),
			textarea=$(this).find('textarea'),
			mensaje=$(this).find('textarea').val(),
			regId=$(this).find('.regIDform').val();
		if(id!='' && mensaje!='' && regId!=''){
			$("ul.devices li.over").addClass('s');
			textarea.val('Enviando mensaje....');
			$.ajax({
				method:"POST",
				url:"send_message.php",
				data:{
					idJefe:idJefe,
					empleado:id,
					message:mensaje,
					regId:regId
				}
			}).done(function(msg){
				$("ul.devices li.over").removeClass('s');
				textarea.val('Mensaje enviado');
				setTimeout(function(){
					textarea.val("");
				},1000);
			}).fail(function(jqXHR,textStatus){
				textarea.val(textStatus + " " + jqXHR['status'] + ', ' + jqXHR['statusText']);
				setTimeout(function(){
					textarea.val("");
				},2000);
			});
		}
		return false;
	});
	$(document).on("click","ul.devices li form button.editar",function(event){
		event.preventDefault();
		var empleado=$(this).parent().parent().find('.sempleado').text(),
			expediente=$(this).parent().parent().find('.sexp').text(),
			formuli=$(this).parent().parent().parent(),
			idEmpleado=$(this).parent().find('.IDform').val(),
			regIDform=$(this).parent().find('.regIDform').val(),
			cuantosc=$(document).find("#showUP div h2.text_h2 span");
			gcm_reg_usr_id=$(this).parent().find('.regIDform').val();
			idDelJefe=idJefe;
			cuantos=parseInt(cuantosc.text());
		$("#loadPlace").load("edit.php", function(){
			$("#overlay").fadeIn('slow');
			$('#id-jefe').val(idJefe);
			$('#id-usuario').val(idEmpleado);
			$('#name-empleado').val(empleado);
			$('#expediente').val(expediente);
			$("#fcambiar_distro .districtOpcGeoTel option[value='2']").remove();
			$.ajax({
				type:"GET",
				url:"http://10.105.116.52:9090/telmex/get/region/" + idEmpleado,
				dataType:"json",
				success:function(html){
					var regiones_de=html.apiResponse[0];
					if(regiones_de.length>0){
						$("#fcambiar_distro").find('.distritosText').addClass('editoUser');
						$.each(regiones_de,function(index,valor){
							var laregi=regisdivareas(valor.regionTrabajo);
							$("#fcambiar_distro").find('.listaDist').append("<li reg='" + valor.regionTrabajo + "'>" + laregi.regionT + "</li>");
						});
					}
					else{
						$("#fcambiar_distro").find('.distritosText').removeClass('editoUser');
					}
					$(".listaDist li").click(function(event){
						$(".listaDist li").removeClass('sub');
						$(this).addClass('sub');
						quitame($(this));
					});
					$(".mensaje_elimina a").on("click",function(event){
						event.preventDefault();
						var opcion=$(this).attr('class'),
							region=li_eli_region.attr('reg');
						li_eli_region.removeClass('sub');
						if(opcion=='si'){
							$.ajax({
								type:"DELETE",
								url:ip_services_b + "/telmex/del/region/" + idEmpleado + "/" + region,
								success:function(data,a,b){
									li_eli_region.remove();
								},
								error:function(jqXHR,textStatus,error){
									creanotificacion('Error:',
										'No se recibió respuesta del servicio para eliminar la region del usuario.',
										error,textStatus,'error');
								}
							});
						}
						div_eli_region.hide();
					});
				},
				error:function(jqXHR,textStatus,error){
					creanotificacion('Error:',
						'No se recibió respuesta del servicio para obtener la region del usuario.',
						error,textStatus,'error');
				}
			});
			$("#fcambiar_distro").on("submit",function(event){
				event.preventDefault();
				$("#overlay").fadeOut('fast');
			});
		});
	});
/*	$("#navigation a").stop().animate({"marginLeft":"-85px"},1000);
	$("#navigation > li").hover(
		function(){
			$("a",$(this)).stop().animate({"marginLeft":"-2px"},200);
		},
		function(){
			$("a",$(this)).stop().animate({"marginLeft":"-85px"},200);
		}
	); */
	if(tipoUser==5)
		$('.mensajes').hide();
	if(tipoUser==6)
		$('.editar').hide();
	if(tipoUser==7 || tipoUser<4)
		window.location.href("./");
	$(document).on("click","#newUser",function(event){
		event.preventDefault();
		$("html,body").animate({scrollTop:180},400);
		if(adminUsersBolean==0){
			adminUsersBolean=1;
			var divadminusers=$("<div id='adminUsers'/>");
			$("#intro").before(divadminusers);
			divadminusers.load("administraUsers.php",function(){
				$("#FormNewUser").find(".districtOpcGeoTel option[value='2']").remove();
				$("#au_cierra").on("click",function(event){
					event.preventDefault();
					adminUsersBolean=0;
					$(document).find('#adminUsers').remove();
				});
				$("#au_menu a").on("click",function(event){
					event.preventDefault();
					var id_div=$(this).attr('href');
					$("#au_menu a").parent().removeClass('active');
					$(this).parent().addClass('active');
					$("#au_usuarios,#au_newusr,#FormNewUser #au_newusr h3,#FormNewUser .areasOpcGeoTelCombo,#FormNewUser .districtOpcGeoTelCombo,#FormNewUser .distritosText").hide();
					$(id_div).show();
					$(".FNUnom,.FNUexp,.FNUusu,.FNUeDI,.FNUpas").val('');
					$(".divisionesGeoTel").val(0);
					$("ul.listaDist").empty();
				});
				$("#FormNewUser").on("submit",function(event){
					event.preventDefault();
					var    name=$('.FNUnom').val(),
							exp=$('.FNUexp').val(),
						usuario=$('.FNUusu').val(),
						 passwd=$('.FNUpas').val(),
							rol=$('.FNUrol').val(),
						   edit=$('.FNUeDI').val(),
					   regiones=[],
						    nvo;
					$(".listaDist li").each(function(index){
						regiones.push($(this).attr('reg'));
					});
					var ctos_reg=Object.keys(regiones).length;
					if(name!='' && exp!='' && usuario!='' && passwd!='' && rol!='' && edit==''){
						var arrSend={	role:{idRole:rol},
										nombre:name,
										usuario:usuario,
										password:passwd,
										expediente:exp,
										cuenta:"true"
									};
						$.ajax({
							type:"POST",
							url:ip_services + "/telmex/add/user",
							data:JSON.stringify(arrSend),
							contentType:"application/json",
							dataType:"json",
							success:function(data,a,b){
								nvo_id(data.apiResponse[0].idUsuario);
								adminUsersBolean=0;
								$(document).find('#adminUsers').remove();
							},
							error: function(jqXHR,textStatus,error){
								creanotificacion('Error:',
									'No se recibió respuesta del servicio para crear un usuario.',
									error,textStatus,'error');
							}
						});
					}
					else if(name!='' && exp!='' && usuario!='' && rol!='' && edit!=''){
						var update={idUsuario:edit,
									role:{idRole:rol},
									nombre:name,
									usuario:usuario,
									password:passwd,
									expediente:exp,
									cuenta:"true"
								};
						$.ajax({
							type:"PUT",
							url:ip_services + "/telmex/userUp",
							data:JSON.stringify(update),
							contentType:"application/json",
							dataType:"json",
							success:function(data,a,b){
								nvo_id(edit);
								adminUsersBolean=0;
								$(document).find('#adminUsers').remove();
							},
							error:function(jqXHR,textStatus,error){
								creanotificacion('Error:',
									'No se recibió respuesta del servicio para editar al usuario.',
									error,textStatus,'error');
							}
						});
					}
					else alert('Por favor llena correctamente los campos.');
					function nvo_id(nvo){
						if(ctos_reg>0){
							$.each(regiones,function(i,region){
								$.post("postgre.php?hago=3",{
									id:nvo,
									reg:region
								}).done(function(data){
									var ex=parseInt(data);
									if(ex==0){
										var upnreg={idUsuario:{idUsuario:nvo},regionTrabajo:region};
										$.ajax({
											type:"POST",
											url:ip_services + "/telmex/add/region",
											data:JSON.stringify(upnreg),
											contentType:"application/json",
											dataType:"json",
											success:function(data,a,b){	},
											error:function(jqXHR,textStatus,error){
												alert(textStatus + ' - ' + error + ' - ' + jqXHR);
											}
										});
									}
								}).fail(function(jqXHR,textStatus,error){
									creanotificacion('Error:',
										'No se recibió respuesta del servicio para agregar la region al usuario.',
										error,textStatus,'error');
								});
							});
						}
					}
				});
				$(".au_eliminar").on("click",function(event){
					event.preventDefault();
					var ide=$(this).attr('data'),
						tre=$(this);
					var del={idUsuario:ide};
					$.ajax({
						type:"PUT",
						url:ip_services_b + "/telmex/userDel",
						data:JSON.stringify(del),
						contentType:"application/json",
						dataType:"json",
						success:function(data,a,b){
							tre.closest('tr').remove();
						},
						error:function(jqXHR,textStatus,error){
							creanotificacion('Error:',
								'No se recibió respuesta del servicio para eliminar al usuario.',
								error,textStatus,'error');
						}
					});
				});
				$(".au_editar").on("click",function(){
					var ide=$(this).attr('data'),
						tre=$(this);
					var obj=jQuery.parseJSON('{' + ide + '}');
					$.ajax({
						type:"GET",
						url:"http://10.105.116.52:9090/telmex/get/region/" + obj.usr_id,
						dataType:"json",
						success:function(html){
							var regiones_de=html.apiResponse[0];
							if(regiones_de.length>0){
								$("#FormNewUser").find('.distritosText').addClass('editoUser');
								$.each(regiones_de,function(index,valor){
									var laregi=regisdivareas(valor.regionTrabajo);
									$("#FormNewUser").find('.listaDist').append("<li reg='" + valor.regionTrabajo + "'>" + laregi.regionT + "</li>");
								});
							}
							else{
								$("#FormNewUser").find('.distritosText').removeClass('editoUser');
							}
							$("#au_menu a").parent().removeClass('active');
							$("#au_usuarios").hide();
							$("#au_newusr,#au_newusr h3").show();
							$(".FNUnom").val(obj.usr_nombre);
							$(".FNUexp").val(obj.expediente);
							$(".FNUusu").val(obj.usr_user);
							$(".FNUeDI").val(obj.usr_id);
							$(".FNUrol").val(obj.id_role);
							$(".listaDist li").click(function(event){
								$(".listaDist li").removeClass('sub');
								$(this).addClass('sub');
								quitame($(this));
							});
							$(".mensaje_elimina a").on("click",function(event){
								event.preventDefault();
								var opcion=$(this).attr('class'),
									region=li_eli_region.attr('reg'),
									iduser=$(".FNUeDI").val();
								li_eli_region.removeClass('sub');
								if(opcion=='si'){
									$.ajax({
										type:"DELETE",
										url:ip_services_b + "/telmex/del/region/" + iduser + "/" + region,
										success:function(data,a,b){
											li_eli_region.remove();
										},
										error:function(jqXHR,textStatus,error){
											creanotificacion('Error:',
												'No se recibió respuesta del servicio para eliminar la region del usuario.',
												error,textStatus,'error');
										}
									});
								}
								div_eli_region.hide();
							});
						},
						error:function(jqXHR,textStatus,error){
							creanotificacion('Error:',
								'No se recibió respuesta del servicio para obtener la region del usuario.',
								error,textStatus,'error');
						}
					});
				});
				$("table").tablesorter({
					theme : 'blue',
					sortList : [[1,0]],
					headerTemplate : '{content}{icon}',
					headers:{5:{sorter:false},6:{sorter:false}}
				}).tablesorterPager({container:$("#pager")});
			});
		}
	});
	$("#broad_msg").on("submit",function(event){
		event.preventDefault();
		var message_all=$('#message_all').val(),
			regId_all=nvoDivi + '-' + nvoArea + '-' + $('.listaDist li').text();
		if(message_all!='' && regId_all!=''){
			$('#message_all').val('Enviando mensaje....');
			$.ajax({
				method:"POST",
				url:"send_broadcast.php",
				data:{
					idJefe:idJefe,
					message_all:message_all,
					regId_all:regId_all
				}
			}).done(function(msg){
				$('#message_all').val('Mensaje enviado');
				setTimeout(function(){
					$('#message_all').val('');
				},1000);
			}).fail(function(jqXHR,textStatus,error){
				creanotificacion('Error:',
					'No se recibió respuesta del servicio para mandar el broadcast.',
					error,textStatus,'error');
			});
		}
	});
	$("#salir").on("click",function(event){
		event.preventDefault();
		document.cookie = "cCuatroV=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
		$.get("logout.php");
		console.log('sali');
		window.location="./"
	});
});
//window.onbeforeunload = confirmExit;
function confirmExit(){
	document.cookie = "cCuatroV=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
	$.get("logout.php");
	console.log('sali');
//  return false;
}
//document.oncontextmenu=new Function("return false;");
$(window).load(function(){
	setTimeout(function(){
		$("#mapaggg").hide();
		$("section.mainloader").remove();
		setTimeout(function(){
			$("#index-banner").addClass('cierra');
		},2000);
	},800);
});