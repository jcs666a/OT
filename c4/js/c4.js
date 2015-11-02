function sendPushNotification(id){
	var data = $('form#'+id).serialize();
	$('form#'+id).unbind('submit');                
	$.ajax({
		url:"send_message.php",
		type:'GET',
		data:data,
		beforeSend: function(){

		},
		success: function(data, textStatus, xhr){
			$('.txt_message').val("");
		},
		error: function(xhr, textStatus, errorThrown){
			console.log(xhr + ' ' + errorThrown);
		}
	});
	return false;
}
function sendBroadcast(){
	var data = $('form#').serialize();
	$('form#').unbind('submit');                
	$.ajax({
		url: "index.php",
		type: 'GET',
		data: data,
		beforeSend: function(){

		},
		success: function(data, textStatus, xhr) {
		$('.txt_message').val("");

		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});
	return false;
}
$(function(){
	$("ul.devices form").on("submit",function(event){
		event.preventDefault();
		var id=$(this).attr("id"),
			textarea=$(this).find('textarea'),
			mensaje=$(this).find('textarea').val(),
			regId=$(this).find('.regIDform').val();
		if(id!='' && mensaje!='' && regId!=''){
			$("ul.devices li.over").addClass('s');
			$.ajax({
				method:"POST",
				url:"send_message.php",
				data:{
					idJefe:idJefe,
					empleado:id,
					message:mensaje,
					regId:regId,
				}
			}).done(function(msg){
				$("ul.devices li.over").removeClass('s');
				textarea.val("");
			}).fail(function(jqXHR,textStatus){
				alert(textStatus + " " + jqXHR['status'] + ', ' + jqXHR['statusText']);
			});
		}
		return false;
	});
	$(document).on("click","ul.devices li form button.editar",function(){
		event.preventDefault();
		var archivo=$(this).attr('archivo'),
			empleado=$(this).parent().parent().find('.sempleado').text(),
			expediente=$(this).parent().parent().find('.sexp').text(),
			idEmpleado=$(this).parent().find('.IDform').val(),
			regIDform=$(this).parent().find('.regIDform').val();
		$("#loadPlace").load(archivo+".php", function(){
			$("#overlay").fadeIn('slow');
			$('#id-jefe').val(idJefe);
			$('#name-empleado').val(empleado);
			$('#expediente').val(expediente); // regIDform
			$(".districtOpcGeoTel option[value='2']").remove();
			$("#fcambiar_distro").on("submit",function(event){
				event.preventDefault();
				var distrito=$('.listaDist li').text();
				if(distrito!='' && idJefe!='' && idEmpleado!=''){
					$.ajax({
						method:"POST",
						url:"edit_b.php",
						data:{
							idJefe:idJefe,
							empleado:idEmpleado,
							distrito:distrito,
							regIDform:regIDform
						}
					}).done(function(msg){
						$("#overlay").fadeOut('fast');
					}).fail(function(jqXHR,textStatus){
						alert(textStatus + " " + jqXHR['status'] + ', ' + jqXHR['statusText']);
					});
				}
				else alert('Selecciona un distrito para cambiar al usuario.');
			});
		});
	});
	$("#navigation a").stop().animate({"marginLeft":"-85px"},1000);
	$("#navigation > li").hover(
		function(){
			$("a",$(this)).stop().animate({"marginLeft":"-2px"},200);
		},
		function(){
			$("a",$(this)).stop().animate({"marginLeft":"-85px"},200);
		}
	);
	if(tipoUser==2)
		$('.mensajes').hide();
	if(tipoUser==3)
		$('.editar').hide();
	if(tipoUser==4)
		$('.mensajes,.editar').hide();
	$(document).on("click","#newUser",function(){
		event.preventDefault();
		$("#loadPlace").load("newUser.php", function(){
			$("#overlay").fadeIn('slow');
		});
	});
});
// Botones, clic derecho, unknown, etc...
var message="This function is not allowed here.";
function clickIE4(){
	if (event.button==2){
		return false;
	}
}
function clickNS4(e){
	if(document.layers||document.getElementById&&!document.all)
		if(e.which==2||e.which==3)
			return false;
}
if(document.layers){
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS4;
}
else if (document.all&&!document.getElementById){
	document.onmousedown=clickIE4;
}
// Lo deshabilité temporalmente mientras trabajo en el sitio
// document.oncontextmenu=new Function("return false;");