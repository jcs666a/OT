var urlVars=function(){
	var query_string={};
	var query=window.location.search.substring(1);
	var vars=query.split("&");
	var formulario = $("#formulario");
	for(var i=0;i<vars.length;i++){
		var pair=vars[i].split("=");
		if (typeof query_string[pair[0]]==="undefined")
			query_string[pair[0]]=decodeURIComponent(pair[1]);
		else if (typeof query_string[pair[0]]=== "string"){
			var arr=[query_string[pair[0]],decodeURIComponent(pair[1])];
			query_string[pair[0]]=arr;
		} else
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
	}
	return query_string;
}();
function getPromise(data){
	return $.ajax({method:"POST",url:"views/db_functions_c.php",data:data});
}
function validate(){
	if ( $("#usuario").val()=="" || $("#clave").val()=="" )
		$("#formulario #error").html('<small>Por favor llene los campos.</small>');
	else{
		var gcm_regid=$('#regid').val(),
			datos={ pDf:'}+ṕv$3ds',
					pw:$("#clave").val(),
					ky:$("#usuario").val()
				};
		var p=getPromise(datos);
		p.done(function(data){
			data=jQuery.parseJSON(data);
			console.log(data);
			var respuesta=data;
			if(respuesta.errorMessage!= null)
				$("#formulario #error").html('<small>'+respuesta.errorMessage+'</small>');
			else
				if(respuesta.apiResponse[0].cuenta==true)
					window.location="views/login.html?"+
					"&iduser="+respuesta.apiResponse[0].idUsuario+
					"&gcm_regid="+gcm_regid;
			else
				$("#formulario #error").html('<small>Cuenta desactivada</small>');
		}).fail(function(jqXHR,textStatus,error){
			$("#formulario #error").html('<small>'+respuesta.error+'</small><br />'+textStatus);
		});
	}
}
function creandoObjeto(){
	var gcm=urlVars.gcm_regid,
	idu=urlVars.iduser,
	Voy={
		Post:function(x){
			var res=$.ajax({method:"POST",url:'db_functions_c.php',data:x});
			return res;
		},
		mGCM:function(x){
			return this.Post({
				pDf:x,
				gcm:gcm,
				idu:idu
			});
		},
		Stor:function(x){
			x=jQuery.parseJSON(x);
			localStorage.setItem('fielderInfo','{"Persona":"'+x.Datos.Nombre+
				'","Datos":{"Rol":{"id":'+x.Datos.Rol.id+
								',"rol":"'+x.Datos.Rol.rol+
				'"},"Expediente":"'+x.Datos.Expediente+
				'","UserID":"'+x.Datos.UserID+'"}}');
			var vy=JSON.stringify(x.Mensajes);		localStorage.setItem('fielderMsgs',vy);
				vy=JSON.stringify(x.Regiones);		localStorage.setItem('fielderRegs',vy);
				vy=JSON.stringify(x.Poligonos);		localStorage.setItem('fielderPols',vy);
				vy=JSON.stringify(x.Tecnologias);	localStorage.setItem('fielderTecs',vy);
				vy=JSON.stringify(x.Graficos);		localStorage.setItem('fielderGrap',vy);
			return 'Listo';
		}
	};
	function paso2(){
		$.when(
			Voy.mGCM('4ýhHGr{')
		).done(function(x){
			paso3(x);
		});
	}
	function paso3(x){
		$.when(
			Voy.Stor(x)
		).done(function(x){
			window.location.href="../#home";
		});
	}
	$.when(
		Voy.mGCM('ñrRp3}.')
	).done(function(x){
		paso2();
	});
}