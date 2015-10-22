
		function muestraRegs(op){
			$.ajax({
				type: "POST",
				url: "ajax/registro.php",
				data: "div=" + op,
				cache: false, 
				success: function(html){
					$(".areasGeoTel").html(html);
					$('select').material_select('destroy');
				}		
			});						
		}
		
		
		function muestraDistritosxOPC(op){
			$(".districtOpcGeoTelCombo").slideDown();
		}
		
		function muestraDistritosxArea(op){		
			if (op == "1"){
				var ar = $(".areasGeoTel").val();
				urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+ar+'/TODO';
				$.ajax({
					type: "GET",
					url: urldisc,
					dataType: "json",
					cache: false, 
					success: function(html){
						htmlDist = html;
						$( ".distritosGeoTel" ).autocomplete({
							source: htmlDist
						});
					}
				});
				$(".distritosText").slideDown();
				tags = [];
				$(".listaDist").html('');
				
			}else if (op=="2" || op=="0"){
				//urldisc = 'http://10.105.116.52:9090/getDistritosBySearch/'+op+'/TODO';
				$(".distritosText").slideUp();	
			}
		}		
		
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
			
			if ($("#menu").is(":visible")){
			$("#menu").toggle("slide", { direction: "left" }, 500);
		}
			
	}
	function agregaDist(){
		
		if ($(".distritosGeoTel").val()==""){
			alert("Debes escribir un nombre de distrito");
		}else{
		
			var dist = $(".distritosGeoTel").val();

			tags.push(dist);
			
			$(".listaDist").append("<li>"+dist+"</li>");
			var restito = tags.length % 3;
			//console.log("restito-->" + restito);
			if (restito==0){
				$(".listaDist").append("<div style='clear:both;'></div>");
			}
			
			$(".distritosGeoTel").val("");
			$(".distritosGeoTel").focus();
		}
		$(".listaDist > li").click(function(event) {
			$(this).remove();
		});
	}
	function trimer(str) {
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
            success: function(data, a, b){
              var respuesta = data;
              window.location="loginP.php?us="+respuesta.cuenta.nombre + "&ni=" + respuesta.cuenta.permisos[0];
            },
            error: function(jqXHR, textStatus, error){
              console.log('Error',jqXHR, textStatus, error);
            },
            dataType: 'json'
          });
        }catch(error){
          console.log(error)
        };
			
		}
			
	}


	function validar(string) {  
		for (var i=0, output='', validos="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890,. "; i<string.length; i++)  
		   if (validos.indexOf(string.charAt(i)) != -1)  
			  output += string.charAt(i)  
		return output;  
	}
	

		
function overlayClose(){
	$("#overlay").fadeOut('fast');
}