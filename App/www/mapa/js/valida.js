$(document).ready(function () {
		
	$("#formula_index").keypress(function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			$("#btn_ingresar").click();
			return true;
		}
	});
		
	$("#btn_ingresar").click( function() { revisaUser(); } );
		
});

//var respuesta ="";
	function revisaUser(){
			
		if ( $("#usr").val()=="" || $("#pwd").val()=="" ) {
			alert("Debes escribir un usuario y un password");
		}else{
		
			usr = $("#usr").val();
			pwd = $("#pwd").val();
			url = "http://10.105.116.52:9090/telmex/get/user/"+usr+"/"+pwd;			
			
			$("#resultados").html("<div style='width:100%; text-align:center;'><img src='images/loader_small.gif' style='margin:0px auto;'></div>");
			$.ajax({
				   method: "GET",
				   url: url,
				   contentType: "application/json",
				   data: "",
				   processData: false,
				   success: function(html){
						//$("#tecnoDialog").html(html);
						console.log(html);
						var respuesta = html;
						
						if (respuesta.errorCode != 0 ){
							$("#resultados").html("<div style='color:#8A0808; text-align:center; margin:0px auto;' ><img src='images/warning_small.png' align='absbottom' /> <b>El usuario no existe o es incorrecto por favor verifique los datos</b></div>");
						}else{
							window.location="loginP.php?us="+respuesta.apiResponse[0].nombre + "&ni=" + respuesta.apiResponse[0].role.idRole;
						}
						
					}
			});
			
		}
			
	}


	function promesaLog(url){
		//console.log("promesa ---> url:" + url + " data:" + data);
		
		//var request = 		
		//return request;
		
	}



	function validar(string) {  
		for (var i=0, output='', validos="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,. "; i<string.length; i++)  
		   if (validos.indexOf(string.charAt(i)) != -1)  
			  output += string.charAt(i)  
		return output;  
	}
	
