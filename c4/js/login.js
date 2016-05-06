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
			console.log(data);
			data=jQuery.parseJSON(data);
			if(data.errorMessage!='')
				creanotificacion('Error:',
					data.errorMessage,'','','error');
			else if(data.adverMessage!='')
				creanotificacion('Advertencia:',
					data.adverMessage,'','','advertencia');
			else if(data.dentrMessage=='1')
				$("#loading").fadeIn("slow",function(){
					window.location.href=data.z;
				});
		}).fail(function(jqXHR,textStatus,error){
			creanotificacion('Error 404:',
					'No se recibió respuesta del servicio de acceso.',
					error,textStatus,'error');
		});
	}
});