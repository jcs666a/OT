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
$("#formulario").on("submit",function(event){
	event.preventDefault();
	if ( $("#usuario").val()=="" || $("#clave").val()=="" )
		$("#formulario #error").addClass('si').html('Por favor llene los campos.');
	else{
		var gcm_regid=$('#regid').val(),
			datos={ pDf:'}+ṕv$3ds',
					ky:$("#clave").val(),
					pw:$("#usuario").val()
				};
		var p=getPromise(datos);
		p.done(function(data){
			data=jQuery.parseJSON(data);
			var respuesta=data;
			if(respuesta.errorMessage!= null)
				$("#formulario #error").addClass('si').html('<small>'+respuesta.errorMessage+'</small>');
			else
				if(respuesta.apiResponse[0].cuenta==true)
					window.location="views/login.html?"+
					"&iduser="+respuesta.apiResponse[0].idUsuario+
					"&gcm_regid="+gcm_regid;
			else
				$("#formulario #error").addClass('si').html('<small>Cuenta desactivada</small>');
		}).fail(function(jqXHR,textStatus,error){
			$("#formulario #error").addClass('si').html('<small>'+respuesta.error+'</small><br />'+textStatus);
		});
	}
});
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
			console.log(x.Campanas);
			console.log(x.Calendario);
			localStorage.setItem('fielderInfo','{"Persona":"'+x.Datos.Nombre+
				'","Datos":{"Rol":{"id":'+x.Datos.Rol.id+
								',"rol":"'+x.Datos.Rol.rol+
				'"},"Expediente":"'+x.Datos.Expediente+
				'","UserID":"'+x.Datos.UserID+'"}}');
			localStorage.setItem('fielderMsgs','{}');		var vy=JSON.stringify(x.Mensajes);		if(x.hasOwnProperty("Mensajes"))localStorage.setItem('fielderMsgs',vy);
			localStorage.setItem('fielderRegs','{}');			vy=JSON.stringify(x.Regiones);		if(x.hasOwnProperty("Regiones"))localStorage.setItem('fielderRegs',vy);
			localStorage.setItem('fielderPols','{}');			vy=JSON.stringify(x.Poligonos);		if(x.hasOwnProperty("Poligonos"))localStorage.setItem('fielderPols',vy);
			localStorage.setItem('fielderTecs','{}');			vy=JSON.stringify(x.Tecnologias);	if(x.hasOwnProperty("Tecnologias"))localStorage.setItem('fielderTecs',vy);
			localStorage.setItem('fielderGrap','{}');			vy=JSON.stringify(x.Graficos);		if(x.hasOwnProperty("Graficos"))localStorage.setItem('fielderGrap',vy);
			localStorage.setItem('fielderCamp','{}');			vy=JSON.stringify(x.Campanas);		if(x.hasOwnProperty("Campanas"))localStorage.setItem('fielderCamp',vy);
			localStorage.setItem('fielderTien','{}');			vy=JSON.stringify(x.Tiendas);		if(x.hasOwnProperty("Tiendas"))localStorage.setItem('fielderTien',vy);
			localStorage.setItem('fielderCalendar','{}');		vy=JSON.stringify(x.Calendario);	if(x.hasOwnProperty("Calendario")){localStorage.setItem('fielderCalendar',vy);}
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
//			window.location.href="../#home";
		});
	}
	$.when(
		Voy.mGCM('ñrRp3}.')
	).done(function(x){
		paso2();
	});
}
$(window, document, undefined).ready(function(){
	$('input').blur(function(){
		var $this = $(this);
		if ($this.val())
			$this.addClass('used');
		else
			$this.removeClass('used');
	});
	var $ripples = $('.ripples');
	$ripples.on('click.Ripples',function(e){
		var $this = $(this);
		var $offset = $this.parent().offset();
		var $circle = $this.find('.ripplesCircle');
		var x = e.pageX - $offset.left;
		var y = e.pageY - $offset.top;
		$circle.css({
			top: y + 'px',
			left: x + 'px'
		});
		$this.addClass('is-active');
	});
	$ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd',function(e){
		$(this).removeClass('is-active');
	});
});
