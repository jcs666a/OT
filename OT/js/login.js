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
			else{
				if(respuesta.apiResponse[0].cuenta==true){
					if(respuesta.apiResponse[0].role.idRole==7 || respuesta.apiResponse[0].role.idRole=='7')
						window.location="views/login.html?"+
						"&iduser="+respuesta.apiResponse[0].idUsuario+
						"&gcm_regid="+gcm_regid;
					else
						$("#formulario #error").addClass('si').html('<small>No tienes acceso a esta aplicaciÃ³n</small>');
				}
				else
					$("#formulario #error").addClass('si').html('<small>Cuenta desactivada</small>');
			}
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
			console.log(x);
			localStorage.setItem('fielderInfo','{"Persona":"'+x.Datos.Nombre+
				'","Datos":{"Rol":{"id":'+x.Datos.Rol.id+
								',"rol":"'+x.Datos.Rol.rol+
				'"},"Expediente":"'+x.Datos.Expediente+
				'","UserID":"'+x.Datos.UserID+'"}}');
			localStorage.setItem('fielderMsgs','{}');		var vy=JSON.stringify(x.Mensajes);		if(x.hasOwnProperty("Mensajes"))localStorage.setItem('fielderMsgs',vy);
			localStorage.setItem('fielderRegs','{}');			vy=JSON.stringify(x.Regiones);		if(x.hasOwnProperty("Regiones"))localStorage.setItem('fielderRegs',vy);
			console.log(vy);
			localStorage.setItem('fielderPols','{}');			vy=JSON.stringify(x.Poligonos);		if(x.hasOwnProperty("Poligonos"))localStorage.setItem('fielderPols',vy);
			localStorage.setItem('fielderTecs','{}');			vy=JSON.stringify(x.Tecnologias);	if(x.hasOwnProperty("Tecnologias"))localStorage.setItem('fielderTecs',vy);
			localStorage.setItem('fielderGrap','{}');			vy=JSON.stringify(x.Graficos);		if(x.hasOwnProperty("Graficos"))localStorage.setItem('fielderGrap',vy);
			localStorage.setItem('fielderCamp','{}');			vy=JSON.stringify(x.Campanas);		if(x.hasOwnProperty("Campanas"))localStorage.setItem('fielderCamp',vy);
			localStorage.setItem('fielderTien','{}');			vy=JSON.stringify(x.Tiendas);		if(x.hasOwnProperty("Tiendas"))localStorage.setItem('fielderTien',vy);
			localStorage.setItem('fielderCalendar','{}');		vy=JSON.stringify(x.Calendario);	if(x.hasOwnProperty("Calendario")){localStorage.setItem('fielderCalendar',vy);}
			createCal();
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
		Voy.mGCM('Ã±rRp3}.')
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
function createCal(){
  Calendar = {};
	fielderCamp = JSON.parse(localStorage.getItem('fielderCamp'));
  for(var i = 0; i <= fielderCamp.length-1; i++){
    c = fielderCamp[i].campana.fechaInicio;
    b = fielderCamp[i].campana.fechaFin;
    console.log(fielderCamp[i].campana.id);
    console.log(b);
    splitInicio = c.split('-'),
    splitFinal = b.split('-'),
    oneDay = 24*60*60*1000,
    firstDate = new Date(splitInicio[0],splitInicio[1]-1,splitInicio[2]);
    console.log(firstDate);
    secondDate = new Date(splitFinal[0],splitFinal[1]-1,splitFinal[2]);
    console.log(secondDate);
    diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    diffDays = diffDays+parseInt(splitInicio[2]);
    console.log(diffDays);
    console.log('/////');
    mm = splitInicio[1]-1,
    yy = splitInicio[0],
    changeMonth = 0;
    mmdif = parseInt( splitFinal[1]) -  parseInt(splitInicio[1]);
    for(var f = 0; f <= diffDays;){
      monthLength = new Date(yy, mm+1, 0).getDate();
    for (a = 1; a <= monthLength; a++){
    if(mm == parseInt(splitFinal[1])+1){
      patt = /^0[0-9].*$/,
      monthNum = parseInt(splitFinal[1])-1;
      if(patt.test(monthNum)){
        var mmParse = monthNum.toString().split('');
        if(mm == mmParse[1]){
          console.log("L: 58");
          break;
        }
      }
      else{
        if(mm == monthNum){
          console.log("L: 54");
          break;
        }
      }
    }
    if(!Calendar[yy]){
      Calendar[yy] ={};
    }
    if(!Calendar[yy][mm]){
      Calendar[yy][mm] = {};
    }
      if(!Calendar[yy][mm][a]){
        Calendar[yy][mm][a] = {};
      }
    if(Calendar[yy][mm][a]){
      newObj = Calendar[yy][mm][a];
        if(a >= splitInicio[2] || mm >= splitInicio[1]){
          printDates();
        }
      }
      if(a == monthLength){
        console.log('jump');
        mm++;
      }
      if(mm == 12){
        yy++;
        mm = 0;
      }
      function printDates(){
        if(f <= (diffDays + mmdif)){
          if(!newObj.campInfo){
            newObj.campInfo = [];
            newObj.campInfo[newObj.campInfo.length] = {},
            newObj.campInfo[newObj.campInfo.length-1]['id'] = fielderCamp[i].campana.id,
            newObj.campInfo[newObj.campInfo.length-1]['color'] = fielderCamp[i].campana.color;
          }
          else{
            var found =  newObj.campInfo.some(function (el) {
              return el.id === fielderCamp[i].campana.id;
            });
            if(!found){
              newObj.campInfo[newObj.campInfo.length] = {},
              newObj.campInfo[newObj.campInfo.length-1]['id'] = fielderCamp[i].campana.id,
              newObj.campInfo[newObj.campInfo.length-1]['color'] = fielderCamp[i].campana.color;
            }
          }
        }
          hasSomeThing(newObj,yy,mm,a);
      }
      f++;
       if(f == diffDays){
          break;
        }
    }
  }
}
}
function ObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
function hasSomeThing(o,y,m,a){
	fielderCalendar = JSON.parse(localStorage.getItem('fielderCalendar'));
  if(!o.campInfo){
  }
  else{
    for(var i = 0; i <= o.campInfo.length-1; i++){
      if(!o.asignacion){
        o.asignacion = {};
      }
      if(!fielderCalendar.Libres){}
      else{
        if(fielderCalendar.Libres.Visitas[y]){
          if(fielderCalendar.Libres.Visitas[y][m]){
            if(fielderCalendar.Libres.Visitas[y][m][a]){
              o.asignacion["Libres"] = fielderCalendar.Libres.Visitas[y][m][a];
            }
          }
        }
      }

        if(!fielderCalendar[o.campInfo[i].id]){
          fielderCalendar[o.campInfo[i].id] = {};
          fielderCalendar[o.campInfo[i].id].Visitas = {};
        }
        if(!fielderCalendar[o.campInfo[i].id].Visitas[y]){
          fielderCalendar[o.campInfo[i].id].Visitas[y] = {};
        }if(!fielderCalendar[o.campInfo[i].id].Visitas[y][m]){
         fielderCalendar[o.campInfo[i].id].Visitas[y][m] ={};
        }
        if(!fielderCalendar[o.campInfo[i].id].Visitas[y][m][a]){
          fielderCalendar[o.campInfo[i].id].Visitas[y][m][a] = {};
        }
        if(!o.asignacion[o.campInfo[i].id]){
          o.asignacion[o.campInfo[i].id] = {};
        }
        o.asignacion[o.campInfo[i].id] = {};
        o.asignacion[o.campInfo[i].id]["clientes"] = [],
        o.asignacion[o.campInfo[i].id]["clientes"] = fielderCalendar[o.campInfo[i].id].Visitas[y][m][a];
        for(var y = 0; y <= fielderCamp.length-1; y++){
          if(fielderCamp[y].campana.id == o.campInfo[i].id){
            o.asignacion[o.campInfo[i].id]["descripcion"] = fielderCamp[y].campana.titulo;
          }
        }
    }
  }
//localStorage.setItem('Calendar',{});
Calendar = JSON.stringify(Calendar);
localStorage.setItem('Calendar',Calendar);
Calendar = JSON.parse(localStorage.getItem('Calendar'));
}
