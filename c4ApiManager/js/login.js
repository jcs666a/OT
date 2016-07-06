$("#entrar").on("submit",function(event){
	event.preventDefault();
	var u=$("#user").val(),
		p=$("#password").val();
	if(u=="" || p==""){
		creanotificacion('Advertencia:',
			'Debes escribir tu usuario y contraseña','','','advertencia');
	}else{
		var datos={ pky:'}54ñj?=',
					U:u,
					P:p};
		var P=getPromesa(datos);
		P.done(function(data){
			data=jQuery.parseJSON(data);
			if(data.adverMessage!='')
				creanotificacion('Advertencia:',
					data.adverMessage,'','','advertencia');
			else if(data.errorMessage!=''){
				creanotificacion('Error:',
					data.errorMessage,'','','error');
				console.log(data);
			}
			else if(data.dentrMessage=='1')
				$("#loading").fadeIn("slow",function(){
					window.location.href=data.z;
				});
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error AJAX:','No se recibió respuesta del servicio de acceso.',error,'','error');
		});
	}
});