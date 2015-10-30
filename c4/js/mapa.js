
$(function(){
	$(document).on("change",".divisionesGeoTel",function(){
		var op=$(this).val(),
			ap=$(this);
		var divisiones=$.ajax({
			url: "ajax/registro.php",
			method: "POST",
			data: "div=" + op,
			select: ap
		});
		divisiones.done(function(msg){
			$(ap).parent().parent().next('div').slideDown();
			$(ap).parent().parent().next('div').next('div').hide();
			$(ap).parent().parent().next('div').next('div').next('div').hide();
			$(ap).parent().parent().next('div').find('select').children().remove().end().append(msg);
		});
		divisiones.fail(function( jqXHR, textStatus ) {
			alert( "Request failed: " + textStatus );
		});
	});
	$(document).on("change",".areasGeoTel",function(){
		$(this).parent().parent().next('div').find(".districtOpcGeoTel").val('0');
		$(this).parent().parent().next('div').slideDown();
		$(this).parent().parent().next('div').next('div').find(".distritosGeoTel").val('');
		$(this).parent().parent().next('div').next('div').slideUp();
	});
	$(document).on("change",".districtOpcGeoTel",function(){
		var op=$(this).val(),
			ap=$(this),
			ar=$(this).parent().parent().parent().find('.areasGeoTel').val(),
			dG=$(this).parent().parent().parent().find('.distritosGeoTel'),
			lD=$(this).parent().parent().parent().find('.listaDist'),
			dT=$(this).parent().parent().parent().find('.distritosText');
		dG.autocomplete({ create:function(event,ui){} });
		dG.val('');
		if(op == "1"){
			urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+ar+'/TODO';
			$.ajax({
				type: "GET",
				url: urldisc,
				dataType: "json",
				cache: false, 
				success: function(html){
					htmlDist = html;
					dG.autocomplete({
						source: htmlDist
					});
				}
			});
			$(this).parent().parent().next('div').slideDown();
			tags = [];
			lD.html('');
		}else if (op=="2" || op=="0"){
			//urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+op+'/TODO';
			dT.slideUp();	
		}
	});
	$(document).on("click","small.agregarDistrito",function(){
		var dist=$(this).parent().find('.distritosGeoTel').val();
		if (dist==""){
			alert("Debes escribir un nombre de distrito");
		}else{
			tags.push(dist);
			$(this).parent().find('.listaDist').html("<li>"+dist+"</li>");
			$(this).parent().find('.distritosGeoTel').val("");
			$(this).parent().find('.distritosGeoTel').focus();
		}
		$(this).parent().find(".listaDist > li").click(function(event){
//		$(".listaDist > li").click(function(event){
			$(this).remove();
		});
	});
});
function cargaReg(){
	var div = $(".divisionesGeoTel option:selected").text();
	//div = div.trim();
	var divid = $(".divisionesGeoTel").val();			
	var reg = $(".areasGeoTel option:selected").text();
	//reg = reg.trim();
	var are = $(".areasGeoTel").val();
	var opcDistrict = $(".districtOpcGeoTel").val(); 
	var url = "";
	var tipoArea = "";

	if (reg=="Todas"){
		url = "http://10.105.116.52:9090/getDivisionByName/geoJson/" + div;
		llave = "Division-"+trimer(div);
		tipoArea = "todas";
		obtieneAreasDivis(llave, url, tipoArea);
	}else if (reg != "Todas"){
		if (opcDistrict=="1"){
			if (tags.length > 0){
				url = "http://10.105.116.52:9090/telmex/necropsia/reporte/distrito";
				llave = "Distritos-"+trimer(reg);
				obtieneDistrics(llave, url, are);
			}else{
				alert("Debe agregar al menos un distrito para mostrar")	
			}					
		}else if (opcDistrict=="0"){
			url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + reg;
			llave = "Area-"+trimer(reg);
			tipoArea = "sola";
			obtieneAreasDivis(llave, url , tipoArea);
		}else if (opcDistrict=="2"){
			/*url = "http://10.105.116.52:9090/getAreaByName/geoJson/" + reg;
			llave = "Area-"+reg;
			tipoArea = "sola";
			obtieneAreasDivis(llave, url , tipoArea);*/					
			llave = "Area-"+trimer(reg);
			muestraDistrictsPorDemanda(are, llave);
		}
	}
	if($("#menu").is(":visible")){
		$("#menu").toggle("slide",{direction:"left"},500);
	}
}
function trimer(str){
    return str.replace(" ","");
}
function validate(){
	if ( $("#usr").val()=="" || $("#pwd").val()=="" ) {
		alert("Debes escribir un usuario y un password");
	}else{
		var data= $("#homeLoading").serialize();
    try{
      $.ajax({
        type: "POST",
        url: "http://187.217.179.35:9000/login",
        data: data,
        success: function(data,a,b){
          var respuesta = data;
          window.location="loginP.php?us=" + respuesta.cuenta.nombre +
          					"&ni=" + respuesta.cuenta.permisos[0] +
          					"&idJefe=" + respuesta.cuenta.idusuario;
        },
        error: function(jqXHR, textStatus, error){
			$('#login-wrapper div.inner').addClass('error');
			setTimeout(function(){
				$('#login-wrapper div.inner').removeClass('error');
/*				$('#login-wrapper input').each(function(){
					$(this).val(''); //Limpia los inputs del login
				}); */
			},2500);
		},
		dataType: 'json'
      });
    }catch(error){
      console.log(error)
    };
	}
}
function validar(string){
	for (var i=0, output='', validos="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,. "; i<string.length; i++)  
	   if (validos.indexOf(string.charAt(i)) != -1)  
		  output += string.charAt(i)  
	return output;  
}
function overlayClose(){
	$("#overlay").fadeOut('fast');
}