var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0,
    appMenu = $("#appMenu"),
    closeMenuIndex = $("#closeMenuIndex"),
    menuDisplay = $("#menuDisplay"),
    wrapper = $("#wrapper"),
    loadInOverlay = $("#overlay .inner"),
    overlay = $("#overlay"),
    readMesage = $(".MensageHolder"),
    lastLatitude = 0,
    lastLongitude = 0,
    latitude = 0,
    miposicion=[],
    longitude = 0,
    tope=0,
    reportObj = {},
    imagesPlaces  = 'http://187.217.179.35/c4LOBO/imgCamps/',
    hostVar = 'http://187.217.179.35',
    expressPhone = 0,
    domicilio = "",
    urlVars=function(){
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
function global(){
    appMenu.click(function(event){
        iframeMethod("closeIframe");
        appMenu.addClass('active');
        menuDisplay.addClass('active');
        wrapper.addClass('active');
        closeMenuIndex.addClass('open');
    });
      closeMenuIndex.click(function(event) {
        appMenu.removeClass('active');
        wrapper.removeClass('active');
          menuDisplay.removeClass('active');
        closeMenuIndex.removeClass('open');
      });
    formulario.keypress(function(e){
      if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)){
        loginUser.click();
        return true;
      }
    });
  connect();
  geoRefer();
  core();
  midNight();
  Calendar= JSON.parse(localStorage.getItem('Calendar'));
}
function logout(){
  $.ajax({type:"PUT",
      url:""+hostVar+":9090/telmex/usuario/desconectado",
      data:JSON.stringify({idUsuario:userId}),
      contentType:"application/json",
      dataType:"json",
      success:function(data,a,b){
          window.location = "login.html";
          localStorage.clear();
    }
  });
}
function validar(string){
  for (var i=0, output='', validos="ABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZabcdefghijklmnÃ±opqrstuvwxyz1234567890,. "; i<string.length; i++)
     if (validos.indexOf(string.charAt(i)) != -1)
      output += string.charAt(i)
  return output;
}
function getAllMsg(){
  if(fielderMsgs.Todos.length-1 == -1){
      masterAlert('sin mensajes disponibles');
      $("<h1>Sin mensajes disponibles</h1>").appendTo('#content .mensageInner .inner');
  }
  else{
    $.each(fielderMsgs.Todos,function(i,a){
        doneC='';
        if(a.status==true || a.status==null)
          doneC=' done';
        $("<div class='MensageHolder"+doneC+"' data-localId='"+i+"' data-status="+a.status+" data-mensaje="+a.idMensaje+">"+
            "<span class='mailbox'></span>"+
            "<div class='text'>"+
              "<div class='center'>"+
                "<span>"+a.createAt+"</span>"+
              "</div>"+
            "<div id='readit'>"+
              "<i class='fa fa-check'></i>"+
              "<i class='fa fa-check'></i>"+
            "</div>"+
            "<p>"+a.mensaje+"</p>"+
          "</div>"+
        "</div>").appendTo('#content .mensageInner .inner');
    });
  }
}
$(document).on("click","#content .mensageInner .inner .MensageHolder",function(event){
  event.preventDefault();
  var d=$(this),
      clase=$(this).attr('class');
  $(".open").removeClass('open');
  if(!/open/i.test(clase))
    d.addClass("done open");
  var getStatus = d.attr('data-status'),
      getMensajeId = d.attr('data-mensaje').toString(),
      arrSend ={'idMensaje':''+getMensajeId+''};
  if(getStatus=="false"){
    $.ajax({
      type: "PUT",
      url: ""+hostVar+":9090/telmex/msgUp/",
      data: JSON.stringify(arrSend),
      contentType: "application/json",
      dataType: "json",
      success: function(data,a,b){
        d.attr('data-status','true');
        for(var i = 0; i <= fielderMsgs.Todos.length-1; i++){
          if(fielderMsgs.Todos[i].idMensaje == getMensajeId){
            fielderMsgs.Todos[i].status = true;
          }
        }
        fielderMsgs.Nuevos = fielderMsgs.Nuevos-1;
        fielderMsgs = JSON.stringify(fielderMsgs);
        fielderMsgs = localStorage.setItem('fielderMsgs',fielderMsgs);
        fielderMsgs = $.parseJSON(localStorage.getItem('fielderMsgs'));
      },
      error: function(jqXHR,textStatus,error){
        console.log(textStatus, error, jqXHR);
      }
    });
  }
});
//campañas
campanaDone = [];
function getCampanias(){
  if(fielderCamp.length-1 == -1){
    masterAlert('Sin campañas asignadas');
    $("<h1>Sin contendio de campañas</h1>").appendTo('#content .campaniasInner .inner');
  }
  else{
      for(var i = 0; i <= ObjectSize(fielderCamp)-1; i++){
        if(!campanaDone.includes(fielderCamp[i].campana.id)){
          campanaDone.push(fielderCamp[i].campana.id);
          $("<div class='MensageHolder'>"+
          "<span>"+fielderCamp[i].campana.titulo+"</span>"+
          "<img src='"+imagesPlaces+fielderCamp[i].campana.imagen+"'/>"+
          "<div class='text'>"+
          "<p>"+fielderCamp[i].campana.descripcion+"</p>"+
          "<a onclick='campCrossModul(this);' data-camp='"+fielderCamp[i].campana.id+"'>Contratar</a>"+
          "</div>"+
          "</div>").appendTo('#content .campaniasInner .inner');
          }
        }
  }

    function includes(k) {
      for(var i=0; i < this.length; i++){
        if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
          return true;
        }
      }
      return false;
    }
  campanaDone = [];
}
function geoRefer(){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  }
  else{
    console.log('not support');
  }
}
var positionCounter = 0;
function geo_success(position) {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
    savePosition();
    if($("#map-canvas").length){
      newPosition();
    }
    setTimeout(function(){
      navigator.geolocation.getCurrentPosition(geo_success,geo_error, geo_options);
    }, 60000);
}

function geo_error() {
  masterAlert("Posición no disponible");
    navigator.geolocation.getCurrentPosition(geo_success,geo_error, geo_options);
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 600000,
  timeout           : 600000
};
function getPromise(url,data){ // Actualizar todo lo que venga aqui a getPromesa(data);
  var request=$.ajax({
    method:"POST",
    url:url,
    contentType:"application/json",
    data:JSON.stringify(data),
    processData:false
  });
return request;
}
function getPromesa(data){
  return $.ajax({method:"POST",url:"views/db_functions_c.php",data:data});
}
function connect() {
    var socket = new SockJS(''+hostVar+':8080/messaging');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/'+userId+'/topic/region', function(greeting){
            type = 'mapa';
            socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/usuario', function(greeting){
            type = "usario";
                socketResponse(greeting.body, type);
        });
       stompClient.subscribe('/topic/campaña', function(greeting){
            type = "campanias";
                socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/mensaje', function(greeting){
           var type = 'mensajeria';
                socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/cfr', function(greeting){
           var type = 'cfr';
           socketResponse(greeting.body, type);
        });
       stompClient.subscribe('/topic/dns', function(greeting){
            type = "DNS";
            socketResponse(greeting.body, type);
        });
        stompClient.subscribe('/topic/reporte/campaña', function(greeting){
             type = "reporte";
             socketResponse(greeting.body, type);
         });
    });
  var socketg = new SockJS(''+hostVar+':8080/coordenadas');
    stompClientg = Stomp.over(socketg);
    stompClientg.connect({}, function(frame) {
        console.log('Connected: ' + frame);
  });
  var socketAA = new SockJS(''+hostVar+':8080/contrato');
    stompClientAA = Stomp.over(socketAA);
    stompClientAA.connect({}, function(frame) {
        console.log('Connected: ' + frame);
  });
  socket.onclose = function() {
    setTimeout(function(){
      connect();
    }, 10000);
  };
  socketg.onclose = function() {
    setTimeout(function(){
      connect();
   }, 10000);
  };
 socketAA.onclose = function() {
    setTimeout(function(){
      connect();
    }, 10000);
  };
}
function savePosition(){
  stompClientg.send("/app/coordenadas", {}, JSON.stringify({ 'latitud': latitude, 'longitud': longitude, 'idFielder': userId }));
}
function persistencia(j){
  stompClientAA.send("/app/contrato", {}, JSON.stringify(j));
}
function socketResponse(response, type){
  response = $.parseJSON(response);
  if(type == "mensajeria"){
    Obj = fielderMsgs;
    name = 'fielderMsgs';
    NewContent(type, Obj, response, name);
  }
  if(type == "mapa"){
    Obj = fielderRegs;
    name = 'fielderRegs';
    NewContent(type, Obj, response, name);
  }
  if(type == "campanias"){
    Obj = fielderCamp;
    name = 'fielderCamp';
    NewContent(type,Obj, response, name);
  }
  if(type == "cfr"){
    Obj = fielderCamp;
    name= 'fielderCamp';
    NewContent(type, Obj, response, name);
  }
  if(type == "DNS"){
    printInfoUser(response);
  }
  if(type == "usario"){
    logout();
  }
  if(type == "reporte"){
    Obj = Calendar;
    name='Calendar';
    NewContent(type,Obj,response, name);
  }
}
function NewContent(url, Obj, r, name){
    //$("#brodcast").fadeIn('fast');
    if(url == "mensajeria"){
      if(r.accion == "Nuevo"){
        Obj.Todos.unshift(r);
        Obj.Nuevos = Obj.Nuevos+1;
      }
      if(r.accion == "Alerta"){
        printInfoUser(r);
      }
    }
    if(url== "mapa"){
      if(r[0].accion == "Eliminado"){
        delateItem(r,Obj);
      }
      else{
        styleNode(r, Obj);
      }
    }
    if(url == "campanias"){
    	if(r.accion == "Eliminado"){
    		borraCamp(r);
    	}
        else{
          	Obj[ObjectSize(Obj)] = r;
        }
    }
    if(url == "cfr"){
      commerceCamp(r);
    }
    if(url == "reporte"){
      exReport(r);
    }
    Obj = JSON.stringify(Obj);
    Obj = localStorage.setItem(name,Obj);
    Obj = $.parseJSON(localStorage.getItem(''+name+''));
    //esta linea se va y se genera un cuadro de dialogo
    //$("#brodcast").fadeOut('fast');
    if(window.location.hash == "#"+url){
      location.reload();
    }
    if(window.location.hash == "#home" && url == "mensajeria"){
      location.reload();
    }
    function commerceCamp(r){
      if(r.accion == "Nuevo"){
        fielderCamp.push(r);
        createCal();
        if(window.location.hash == "#campanias" || window.location.hash == "#calendario"){
          location.reload();
        }
        if(window.location.hash == "#mapa"){
          //PutInMapCamp();
          location.reload();
        }
      }
      if(window.location.hash == "#calendario" && url == "reporte"){
        location.reload();
      }
      if(r.accion == "Eliminado"){
        for(var c = 0; c <= fielderCamp.length-1; c++){
          if(r.idCr == fielderCamp[c].idCr){
            fielderCamp.splice(c,1);
          }
        }
        $.each(Calendar, function(index, val) {
          $.each(Calendar[index], function(index2, val) {
            $.each(Calendar[index][index2], function(index3, val) {
              if(!Calendar[index][index2][index3].campInfo){}
              else{
                for(var i = 0; i <= Calendar[index][index2][index3].campInfo.length-1; i++){
                  if(Calendar[index][index2][index3].campInfo[i].id == r.campana.id){
                    Calendar[index][index2][index3].campInfo.splice(i,1);
                  }
                }
              }
            });
          });
        });
        if(window.location.hash == "#campanias" || window.location.hash == "#calendario" || window.location.hash == "#mapa"){
          location.reload();
        }
      }
      Calendar = JSON.stringify(Calendar);
      localStorage.setItem('Calendar',Calendar);
      Calendar = JSON.parse(localStorage.getItem('Calendar'));
      fielderCamp = JSON.stringify(fielderCamp);
      localStorage.setItem('fielderCamp',fielderCamp);
      fielderCamp = JSON.parse(localStorage.getItem('fielderCamp'));
    }
    function borraCamp(r){
		console.log('delete');
		for(var c = 0; c <= fielderCamp.length-1; c++){
			console.log(c);
			if(r.idCampaña == fielderCamp[c].campana.id){
				fielderCamp.splice(c,1);
			}
		}
    }
    function putInMap(){
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
        if(fielderCalendar[y][m][d]){
              color = fielderCalendar[y][m][d].calendario.color,
              size = fielderCalendar[y][m][d].calendario.region;
          for(var i = 0; i <= size.length-1; i++){
            var split = size[i].split('-');
            $.each(fielderPols.Distritos, function(index, val) {
              if(split[2] == index){
                fielderPols.Distritos[index].properties.color = "#"+color;
                var insert = document.getElementById('campaniasAsignadas');
                insert.innerHTML = insert.innerHTML+
                "<div class='row'>"+
                "<div class='color' style='background:#"+color+";'></div>"+
                "<div class='innerRow'>"+
                "<div class='titulo'><p style='color:#"+color+";'>"+fielderCalendar[y][m][d].calendario.titulo+"</p></div>"+
                "<div class='descripcion'><p>"+fielderCalendar[y][m][d].calendario.descripcion+"</p></div>"+
                "</div>"+
                "</div>";
              }
            });
          }
        }
        else{
        	masterAlert('No existe fecha');
        }
    }
    function styleNode(r, Obj){
      console.log(r);
      //response del contenido
      Regiones = {};
      Regiones["Nomenclatura"] = r[0].regionTrabajo,
      Regiones["Llave"]= r[0].distrito.descripcion,
      Regiones["Division"]=r[0].division.idDivision,
      Regiones["Area"] = r[0].area.idArea,
      Regiones["Distrito"] = r[0].distrito.claveDistrito;
      Obj.Region.push(Regiones);
      if(!Obj.Areas[r[0].area.idArea]){
        Obj.Areas[r[0].area.idArea] = {},
        Obj.Areas[r[0].area.idArea].Distritos = {},
        fielderTecs[r[0].area.idArea] = {},
        fielderTecs[r[0].area.idArea]['PorTipo']={},
        fielderTecs[r[0].area.idArea].PorTipo['EnArea']= {};
        fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito] = {};
      }
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito] = {},
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].Clientes = r[0].cliente,
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].clienteDirigido = r[0].clienteDirigido,
      Obj.Areas[r[0].area.idArea].Distritos[r[0].distrito.claveDistrito].NoClientes = 0,
      fielderPols.Distritos[r[0].distrito.claveDistrito] = r[0].mr.features[0];
      for(var i = 0; i <= r[0].tecPoints.distritos.length-1; i++){
        if(!fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito]){
          fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito] = {};
        }
        areas = fielderTecs[r[0].area.idArea][r[0].distrito.claveDistrito];
        distritos = fielderTecs[r[0].area.idArea].PorTipo;
        if(!distritos.Distritos){
          distritos['Distritos'] = {};
        }
        distritos.Distritos[r[0].distrito.claveDistrito] = {},
        distritos.Distritos[r[0].distrito.claveDistrito][r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]= r[0].tecPoints.distritos[0].tecnologias[0].idTecnologia,
        distritos['EnArea'] = {},
        distritos.EnArea[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia] = {},
        distritos.EnArea[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]= r[0].tecPoints.distritos[0].tecnologias[0].idTecnologia,
        distritos['AreaName'] = r[0].area.descripcion,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia] = {},
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["idTecnologia"] = r[0].tecPoints.distritos[i].tecnologias[0].idTecnologia,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["centros"] = [],
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0] = {},
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0]["latitud"] = r[0].tecPoints.distritos[i].centro.latitud,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].centros[0]["longitud"] = r[0].tecPoints.distritos[i].centro.longitud,
        areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["idDistrito"]= r[0].tecPoints.distritos[i].idDistrito;
        switch(areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].idTecnologia) {
            case 1:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "5FB404";
                break;
            case 2:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FF8000";
                break;
            case 3:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "0080FF";
                break;
            case 4:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "8000FF";
                break;
            case 5:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "B40404";
                break;
            case 6:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FF00FF";
                break;
            case 7:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "01DFD7";
                break;
            case 8:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["color"] = "FFBF00";
                break;
            default:
        }
        switch(areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia].idTecnologia) {
            case 1:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiATM.png";
                break;
            case 2:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiFTTH.png";
                break;
            case 3:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiIpDislam.png";
                break;
            case 4:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiND.png";
                break;
            case 5:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiTBA.png";
                break;
            case 6:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiVSDLIPD.png";
                break;
            case 7:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiVSDLTBA.png";
                break;
            case 8:
                areas[r[0].tecPoints.distritos[i].tecnologias[0].tecnologia]["imagen"] = "poiWIMAX.png";
                break;
            default:
        }

      }

    }
    function delateItem(r, Obj){
      var parts = r[0].regionTrabajo.split('-', 4);
      for(var i = 0; i <= fielderRegs.Region.length-1; i++){
          if(fielderRegs.Region[i].Nomenclatura == r[0].regionTrabajo){
            console.log('L:562');
            fielderRegs.Region.splice(i,1);
            delete fielderTecs[parts[1]].PorTipo.Distritos[parts[2]];
          }
      }
     if(fielderRegs.Areas[parts[1]].Distritos[parts[2]]){
        delete fielderRegs.Areas[parts[1]].Distritos[parts[2]];
      }
      if(parts[2] != 0){
        if(fielderPols.Distritos[parts[2]]){
          delete fielderPols.Distritos[parts[2]];
        }
      }
      else{
        alert("borra area");
      }
    }
    fielderPols = JSON.stringify(fielderPols);
    fielderPols = localStorage.setItem('fielderPols',fielderPols);
    fielderPols = $.parseJSON(localStorage.getItem('fielderPols'));
    fielderRegs = JSON.stringify(fielderRegs);
    fielderRegs = localStorage.setItem('fielderRegs',fielderRegs);
    fielderRegs = $.parseJSON(localStorage.getItem('fielderRegs'));
    fielderTecs = JSON.stringify(fielderTecs);
    fielderTecs = localStorage.setItem('fielderTecs',fielderTecs);
    fielderTecs = $.parseJSON(localStorage.getItem('fielderTecs'));
}


function ObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
function removeAndSort(obj, key) {
    for (k in obj) {
        if (k==key) {
            delete obj[k];
        }
    }
var keys = Object.keys(obj),
  i, len = keys.length;
  keys.sort();
for(i = 0; i < len; i++){
  k  = keys[i];
  obj[i] = obj[k];
}
obj.pop();
}
//calendario
function calendar(t){
  var hoy = new Date(),data,dataYear;
  if(t == undefined){
    var d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
    calCostruct(d, m, y);
  }
  else{
    if(t.dataset.action){
      data = t.dataset.action;
      getInfoDay(data);
      $(".row").removeClass("activeDay2");
      t.classList.add("activeDay2");
    }
    if(t.dataset.prev){
      data = t.dataset.prev,
      dataYear = t.dataset.year;
      var go = new Date();
      var d = go.getDate(),
          m = parseInt(data)-1,
          y = dataYear;
      if(m<0){
        m=11;y=parseInt(y)-1;
      }
      calCostruct(d, m, y);
      var currentDate = new Date(),
      mm = currentDate.getDate();
      if(m != mm ){
        $('.row').removeClass('activeDay');
      }
    }
    if(t.dataset.next){
      data = t.dataset.next,
      dataYear = t.dataset.year;
      var go = new Date();
      var d = go.getDate(),
          m = parseInt(data)+1,
          y = dataYear;
      if(m>11){
        m=0;y=parseInt(y)+1;
      }
      calCostruct(d, m, y);
      var currentDate = new Date(),
      mm = currentDate.getDate();
      if(m != mm ){
        $('.row').removeClass('activeDay');
      }
    }
  }
  function calCostruct(d, m, y){
      var mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dias =['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        firstDay = new Date(y,m,(1-1)),
        firstDay = firstDay.getDay(),
        monthLength = new Date(y, m+1, 0).getDate(),
        body = '',
        header = '';
      header += '<div class="nav">';
      header += '<p data-prev="'+m+'" data-year="'+y+'" onclick="calendar(this);" style="left:0px;"><i class="fa fa-arrow-left"></i></p>';
      header +=  "<h3>"+mes[m] + "&nbsp;" +y+"</h3>";
      header += '<p data-next="'+m+'" data-year="'+y+'" onclick="calendar(this);" style="right:0px;"><i class="fa fa-arrow-right"></i></p>';
      header += '</div>';
      header += '<div class="header">';
      for(var i = 0; i <= 6; i++ ){
        header += '<div class="row">';
        header += dias[i];
        header += '</div>';
      }
          var day = 1;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j <= 6; j++) {
            if(day <= firstDay){
              body += "<div class='row'>&nbsp;</div>";
              day++;
            }
            if((day <= (monthLength+firstDay)) && (i > 0 || j >= firstDay)){
                if((day-firstDay) == d){
                  body += '<div class="row activeDay" data-action="'+(day-firstDay)+'-'+m+'-'+y+'" onclick="calendar(this);">';
                  if(!Calendar[y]){
                     Calendar[y] = {};
                  }
                  if(!Calendar[y][m]){
                    Calendar[y][m] = {}
                  }
                  if(!Calendar[y][m][(day-firstDay)]){
                    Calendar[y][m][(day-firstDay)] = {}
                  }
                  else{
                    if(Calendar[y][m][(day-firstDay)].campInfo){
                      camps = Calendar[y][m][(day-firstDay)].campInfo;
                      for(var f = 0; f <= camps.length-1; f++){
                        body += '<div class="eventCamp" style="background:#'+camps[f].color+';"></div>';
                      }
                    }
                  }
                  body+= (day-firstDay)+'</div>';
                  data = String((day-firstDay))+'-'+String(m)+'-'+String(y);
                  getInfoDay(data);
                }
                else{
                  body += '<div class="row" data-action="'+(day-firstDay)+'-'+m+'-'+y+'" onclick="calendar(this);">';
                  if(!Calendar){
                    Calendar = {};
                  }
                  if(!Calendar[y]){
                    Calendar[y]= {};
                  }
                  if(!Calendar[y][m]){
                    Calendar[y][m] = {};
                  }
                  if(!Calendar[y][m][(day-firstDay)]){
                    //console.log('NaN');
                  }
                  else{
                    if(Calendar[y][m][(day-firstDay)].campInfo){
                      camps = Calendar[y][m][(day-firstDay)].campInfo;
                      for(var f = 0; f <= camps.length-1; f++){
                        body += '<div class="eventCamp" style="background:#'+camps[f].color+';"></div>';
                      }
                    }
                  }
                  body+=(day-firstDay)+'</div>';
                }
                day++;
            }
          }
          if (day > (monthLength+firstDay)) {
            break;
          }
          body +='<br>';
        }
        document.getElementById('headerCalendar').innerHTML = header;
        document.getElementById('bodyCalendar').innerHTML = "<div class='inner'>"+body+"</div>";
  }
  function getInfoDay(data){
    var data = data.split('-',3),
    agendOb={},
    agend = '';
    if(!Calendar[data[2]][data[1]]){
      document.getElementById('day-content').innerHTML = "<p><div class='errorCal'><p>Lo sentimos no existe contenido para el mes buscado.</p></div>";
      $("#calc small").html('0');
      $("#ventasRealizadas small").html('0');
      $("#visitas small").html('0');
    }
    if(!Calendar[data[2]][data[1]][data[0]] || !Calendar[data[2]][data[1]][data[0]].asignacion){
      document.getElementById('day-content').innerHTML = "<p><div class='errorCal'><p>Lo sentimos no existe contenido para este día.</p></div>";
      $("#calc small").html('0');
      $("#ventasRealizadas small").html('0');
      $("#visitas small").html('0');
    }
    else{
      var i = 0,ventas=0,libres=0,visitas=0;
      $.when(
        $.each(Calendar[data[2]][data[1]][data[0]].asignacion, function(index, val){
          if(!val.clientes){
            if(index == 'Libres'){
              libres=val.length;
              desc = 'Libres';
                agend += '<div class="holder">';
                agend += '<h3  data-place ="'+(parseInt(i)+1)+'" data-origin="'+[data[0]]+'-'+[data[1]]+'-'+[data[2]]+'" data-asig="'+desc+'" onclick="getInfoThis(this);">Ventas Libres</h3>';
                agend += '<div id="'+desc+'" class="loadDay"></div>';
                agend += '</div>';
            }
          }
            else{
            $.each(val.clientes, function(index2,val2){
              var desc = val2.distrito;
              if(desc == '' || desc == null || desc == undefined){}
              else{
                visitas++;
                if(val2.status==true || val2.status==1 || val2.status=='true'){
                  ventas++;
                }
                if(!agendOb.hasOwnProperty(desc)){
                  agendOb[desc]='';
                  agend += '<div class="holder">';
                  agend += '<h3  data-place ="'+i+'" data-origin="'+[data[0]]+'-'+[data[1]]+'-'+[data[2]]+'" data-asig="'+desc+'" onclick="getInfoThis(this);">Distrito '+desc+'</h3>';
                  agend += '<div id="'+desc+'" class="loadDay"></div>';
                  agend += '</div>';
                  i++;
                }
              }
            });
          }
        })
      ).done(function(){
        $('#ventasRealizadas small').text(ventas);
        $('#visitas small').text(visitas);
        $('#calc small').text(libres);
        document.getElementById('day-content').innerHTML = agend;
      });
    }
  }
}
function getInfoThis(t){
  var place = t.dataset.place,
      origin = t.dataset.origin,
      asig = t.dataset.asig;
      if(t.classList.contains('open')){
        document.getElementById(''+asig+'').innerHTML = '';
        t.classList.remove('open');
      }
      else{
        t.classList.add("open");
        if(asig != 'Libres'){
        var loadThis = '<div data-origin="'+origin+'" data-asig="'+asig+'" data-todo="'+place+'" onclick="loadCont(this);" class="son">Todo</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-cam="'+place+'" onclick="loadCont(this);" class="son">Campañas</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-adq="'+place+'" data-type="venta" onclick="loadCont(this);" class="son">Adquisiciones</div>'+
            '<div data-origin="'+origin+'" data-asig="'+asig+'" data-adq="'+place+'" data-type="sin venta" onclick="loadCont(this);" class="son">Sin adquisicion</div>'+
            '<div id="load-'+asig+'"></div>';
            document.getElementById(''+asig+'').innerHTML = loadThis;
        }
        else{
          date = origin.split('-'),
          place =  Calendar[date[2]][date[1]][date[0]].asignacion.Libres;
         loadThis = '<div id="load-'+asig+'"></div>';
          document.getElementById(''+asig+'').innerHTML = loadThis;
            Print(place,'todo',asig,origin);
        }
      }
}
function loadCont(t){
  var data = t.dataset.origin,
      data = data.split('-',3),
      asig = t.dataset.asig;
      place = Calendar[data[2]][data[1]][data[0]].asignacion;
      document.getElementById('load-'+asig).innerHTML = " ";
  if(t.dataset.cam){
    if(t.classList.contains('open')){
      t.classList.remove('open');
      document.getElementById('load-'+asig).innerHTML = " ";
    }
      else{
        $(".son").removeClass('open');
        t.classList.add('open');
        dataLoad = t.dataset.cam,
        obj = {},
        type = "campania";
        $.each(place, function(index, val){
          var clien=[];
          if(val.clientes[ObjectSize(val.clientes)-1]==-1){}
          else{
            $.each(val.clientes,function(i,v){
              if(v.distrito==asig){
                clien.push(v);
              }
            });
            if(!obj[val.descripcion]){
              obj[val.descripcion] = {};
              obj[val.descripcion]= clien;
            }
            else{
              obj[val.descripcion] = clien;
            }
          }
          Print(obj,type,asig,t.dataset.origin);
        });
    }
  }
  if(t.dataset.adq){
    if(t.classList.contains('open')){
        t.classList.remove('open');
    }
    else{
      dataLoad = t.dataset.adq,
      obj = {},
      type = t.dataset.type,
      i = 0;
      if(type == "venta"){
          $(".son").removeClass('open');
          t.classList.add('open');
        $.each(place, function(index, val) {
          if(val.length == 0){}
          else{
            if(!val.clientes){}
            else{
              $.each(val.clientes, function(index2, val2) {
                if(val2.distrito==asig){
                  if(val2.status == "venta" || val2.status == true || val2.status == "Venta"){
                    val2.status = "Venta";
                    obj[i] = val2;
                    i++;
                  }
                }
              });
            }
          }
        });
      }
      if(type == "sin venta"){
          $(".son").removeClass('open');
          t.classList.add('open');
        $.each(place, function(index, val) {
          if(val.length == 0){}
          else{
            if(!val.clientes){}
            else{
              $.each(val.clientes, function(index2, val2) {
                if(val2.distrito==asig){
                  if(val2.status == "sin venta" || val2.status == false || val2.status == "Sin Venta"){
                    val2.status = "Sin Venta";
                    obj[i] = val2;
                    i++;
                  }
                }
              });
            }
          }
        });
      }
      Print(obj,type,asig);
    }
  }
  if(t.dataset.todo){
    if(t.classList.contains('open')){
        t.classList.remove('open');
    }
    else{
      $(".son").removeClass('open');
      t.classList.add('open');
      dataLoad = t.dataset.todo,
      obj = {},
      type = "todo",
      i = 0;
        $.each(place, function(index, val) {
          if(val.length == 0){}
          else{
            if(!val.clientes){}
            else{
              $.each(val.clientes, function(index2, val2){
                if(val2.distrito==asig){
                  obj[i] = val2;
                  i++;
                }
              });
            }
          }
        });
      Print(obj,type,asig);
    }
  }
}
  function Print(obj,type,data,origin){
    var insert = document.getElementById('load-'+data);
    insert.innerHTML = '';
    insert.classList.add('loadResult');
    if(type == "campania"){
      $.each(obj, function(i,v){
        if(v.length == 0){}
        else{
          if(!v[0].campaña){}
          else{
            insert.innerHTML = insert.innerHTML+'<div class="row"><div class="name"><h3  onclick="toggleThis(this);" data-toggle="'+i+'" data-idCamp="'+v[0].campaña+'" data-origin="'+origin+'">'+i+'</h3></div><div id="'+i+'" class="campLoad"></div></div>';
            var insert2 = document.getElementById(i);
            $.each(v, function(ix,vx){
              insert2.innerHTML = insert2.innerHTML+'<div class="row2"><div><h3  onclick="toggleThis(this);" data-toggle="node-'+ix+'">cliente '+vx.nombre+'</h3></div><div id="node-'+ix+'" class="campLoad"></div></div>';
              var insert3 = document.getElementById('node-'+ix);
              $.each(vx, function(ixx,vxx){
                insert3.innerHTML = insert3.innerHTML +'<div class="innerRow"><div>'+ixx+':</div><div>'+vxx+'</div></div>';
              });
            });
          }
        }
      });
    }
    if(type == "todo" || type == "venta" || type == "sin venta"){
      $.each(obj, function(a, b) {
            insert.innerHTML = insert.innerHTML+'<div class="row"><div class="name"><h3  onclick="toggleThis(this);" data-toggle="node-'+a+'">cliente '+b.nombre+'</h3></div><div id="node-'+a+'" class="campLoad"></div></div>';
            var insert2 = document.getElementById('node-'+a);
         $.each(b, function(c, d) {
            insert2.innerHTML = insert2.innerHTML +'<div class="innerRow"><div>'+c+':</div><div>'+d+'</div></div>';
         });
      });
    }
  }
function toggleThis(t){
  console.log(t);
  var value = t.dataset.toggle,
      node = document.getElementById(value),
      idCamp = t.dataset.idcamp,
      origin = t.dataset.origin;
      console.log(t.dataset.origin);
  if(t.classList.contains("open")){
    node.style.display = "none";
    t.classList.remove("open");
    printScore(idCamp,origin,'clear');
  }
  else{
    node.style.display = "block";
    t.classList.add("open");
    printScore(idCamp,origin,'print');
  }
}
function printScore(id,origin,action){
  console.log(origin);
  var date = origin.split('-'),
      obj = Calendar[date[2]][date[1]][date[0]].campInfo;
  if(action == 'clear'){
    $("#ventasRealizadas small").html('0');
    $("#visitas small").html('0');
    $("#calc small").html('0');
  }
  else{
    for(var i = 0; i <= obj.length-1; i++ ){
      if(obj[i].idCamp == id){
        $("#ventasRealizadas small").html(obj[i].meta.ventas);
        $("#visitas small").html(obj[i].meta.visitas);
        $("#calc small").html(obj[i].meta.meta);
      }
    }
  }
}
printCampDone = [];
function printCamps(){
  var agend = "";
    if(fielderCamp){
    agend+= '<div id="colorCode">';
      agend+='<h3>Campañas asignadas</h3>';
    for(var i = 0; i <= fielderCamp.length-1; i++){
      if(!printCampDone.includes(fielderCamp[i].campana.id)){
          printCampDone.push(fielderCamp[i].campana.id);
          agend+='<div class="row">';
            agend+='<div class="color" style="background:#'+fielderCamp[i].campana.color+';"></div>';
            agend+='<p class="titulo" style="color:#'+fielderCamp[i].campana.color+';">'+
                      fielderCamp[i].campana.titulo+'</p>';
            agend+='<p>'+fielderCamp[i].campana.descripcion+'</p>';
            agend+='<p class="mets"><span>'+fielderCamp[i].campana.meta+'</span><span>';
            if(!fielderCalendar[fielderCamp[i].campana.id]){
            }
            else{
              agend+= fielderCalendar[fielderCamp[i].campana.id].TotalVentas+'</span></p>';
            }
          agend+= '</div>';
        }
    }
    agend+= '</div>';
  }
  document.getElementById('camps').innerHTML = agend;
  function includes(k) {
    for(var i=0; i < this.length; i++){
      if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
        return true;
      }
    }
    return false;
  }
  printCampDone = [];
}
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



  var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("ine").value ="data:image/jpeg;base64,"+btoa(binaryString);
        };
        reader.readAsBinaryString(file);
    }
};
  var handleFileSelect2 = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            document.getElementById("comp").value ="data:image/jpeg;base64,"+btoa(binaryString);
        };
        reader.readAsBinaryString(file);
    }
};

    function validation(){
      $('.error').remove();
      var ValObj = {};
        ValObj[0] = document.getElementsByClassName('mandatory'),
        ValObj[1] = document.getElementsByClassName('numeric'),
        ValObj[2] = document.getElementsByClassName('text'),
        ValObj[3] = document.getElementsByClassName('email');
      var size = ObjectSize(ValObj)-1,
        error = 0;
        for(var i = 0; i <= size; i++){
          for(var b = 0; b <= ValObj[i].length-1; b++){
            if(i == 0){
              if(ValObj[i][b].value == "" || ValObj[i][b].value == " " ){
                var text = document.createElement('div');
                  text.classList.add('error');
                  text.innerHTML = "<p>auch! ese campo es obligatorio..";
                insertAfter(ValObj[i][b], text);
                error = 1;
              }
              else{
              }
            }
            if(i == 1){
              var soWhat = numberTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es número..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
            if(i == 2){
              var soWhat = textTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es texto..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
            if(i == 3){
              var soWhat = mailTest(ValObj[i][b].value);
                if(soWhat == false){
                  var text = document.createElement('div');
                    text.classList.add('error');
                    text.innerHTML = "<p>auch! no es email valido..</p>";
                  insertAfter(ValObj[i][b], text);
                  error = 1;
                }
                else{
                }
            }
          }
        }
      if(error == 0){
        //se envia el formulario
        $("#shure").addClass('active');
        $("#shureContent").html('');
        for(var i = 0; i <= fielderCamp.length-1; i++){
          if(reportObj.campañas[0] == fielderCamp[i].campana.id){
            $("#shureContent").append('<span>Adquisicón:</span>'+fielderCamp[i].campana.titulo+'');
            break;
          }
        }

        $("#shureContent").append('<span>Usuario:</span>'+ document.getElementsByName("nombre")[0].value+' '+document.getElementsByName("paterno")[0].value +' '+document.getElementsByName("materno")[0].value+'');
        $("#shureContent").append('<span>Direccion:</span>'+ document.getElementsByName("calle")[0].value+' '+document.getElementsByName("numExt")[0].value +' '+document.getElementsByName("numInt")[0].value+' '+document.getElementsByName("colonia")[0].value+'');
          for(var i = 0; i < formHistory.length; i++){
            $("#shureContent").append(formHistory[i]);
          }
      }
      function ObjectSize(obj) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) size++;
          }
          return size;
      }
      function mailTest(v){
        var val = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return val.test(v);
      }
      function textTest(v){
        if (!isNaN(v))
        {
          return false;
        }
      }
      function numberTest(v){
        if (isNaN(v) || v== "")
        {
          return false;
        }
      }
      function insertAfter(referenceNode, newNode) {
          referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
    }
      function checkOut2(){
        $("#shure .inner").html('<h1>Procesando contratación...</h1>');
         var $form = $("#express-node"),
                  action = $form.attr("action"),
                  toSend = JSON.stringify(getFormData($form));
                  console.log(toSend);
                $.ajax({
                  url: $form.attr("action"),
                  type: 'POST',
                  contentType: 'application/json',
                  //Authorization: 'Bearer f8d59a90d34ff29b4c4b39fc1216da91',
                  data: toSend,
                })
              .done(function(data) {
                console.log("success");
                if(data.mensaje == undefined){
                  data.mensaje = "no definido, no se enviara";
                }
                $("#shure .inner").html('<h3>¡Gracias por su contratación!</h3>'+
                                          '<p>Su folio de servicio es:</p>'+
                                          '<strong>'+data.idPisa+'</strong>'+
                                          '<p>la informacion sera enviada al correo</p>'+
                                          '<strong>'+data.mensaje+'</strong>'+
                                          '<div id="so">'+
                                          '<div class="left" onclick="doneAllSet();">'+
                                          '<p>OK</p>'+
                                          '</div>'+
                                          '</div>');
                    devSave2(data.idPisa);
              })
              .fail(function(data) {
                $("#shure .inner").html('<h3>Lo sentimos su transaccion no fue exitosa...</h3>'+
                                          '<div id="so">'+
                                          '<div class="left" onclick="closeCheckOut();">'+
                                          '<p>Cerrar <i class="fa fa-times"></i></p>'+
                                          '</div>'+
                                          '</div>');
              });
      function getFormData($form){
          var unindexed_array = $form.serializeArray();
          var indexed_array = {};

          $.map(unindexed_array, function(n, i){
              indexed_array[n['name']] = n['value'];
          });

          return indexed_array;
      }
    }
            function doneAllSet(){
              reportObj["status"] = {};
              reportObj.status = "venta";
              reportObj["razon"] = "venta concretada";
              cachInfo();
            }


    function loadInfo(){
  var split = reportObj.usuario[1].split(' ');
  setTimeout(function(){
          document.getElementById('region').value = reportObj.llave;
          document.getElementById('geoId').value  = latitude+","+longitude;
          document.getElementById('idCamp').value =  reportObj.usuario[0];
          document.getElementById('vivo').value =  reportObj.tipo;
        if(split.length == 4){
            document.getElementsByName('nombre')[0].value = split[0] +" "+ split[1];
            document.getElementsByName('paterno')[0].value = split[2];
            document.getElementsByName('materno')[0].value = split[3];
        }
        if(split.length == 5){
            document.getElementsByName('nombre')[0].value = split[0] +" "+ split[1];
            document.getElementsByName('paterno')[0].value = split[2];
            document.getElementsByName('materno')[0].value = split[3] +" "+ split[4];
        }
        if(split.length == 3){
            document.getElementsByName('nombre')[0].value = split[0];
            document.getElementsByName('paterno')[0].value = split[1];
            document.getElementsByName('materno')[0].value = split[2];
        }
        document.getElementsByName('telefono')[0].value = reportObj.usuario[2];
        //document.getElementsByName('calle')[0].value = reportObj.usuario[3];
       var split2 = reportObj.usuario[3].split(','),
            split3 = [],
            insertCalle = "",
            insertCol = "";
          console.log(split2.length-1);
          for(var i = 0; i <= split2.length-1; i++){
            var item = split2[i].split(" ");
            split3.push(item);
          }
          console.log(split3);
          for(var i = 0; i <= split3.length-1; i++){
            for(var a = 0; a <= split3[i].length-1; a++){
              if(i == 0){
                  if(a == split3[i].length-1){
                    document.getElementsByName('numExt')[0].value = split3[i][a];
                  }
                  else{
                    insertCalle = insertCalle+" "+split3[i][a];
                    document.getElementsByName('calle')[0].value = insertCalle;
                  }
              }
              if(i == 1){
                if(a != 0){
                  insertCol = insertCol+" "+split3[i][a];
                  document.getElementsByName('colonia')[0].value = insertCol;
                }
              }
              if(i == 2){
                if(a == 1){
                  document.getElementsByName('cp')[0].value = split3[i][a];
                }
              }
            }
          }
      $.ajax({
        url: ''+hostVar+':9090/telmex/get/estados',
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#noShit").html('');
        var response = data.apiResponse[0];
        for(var i = 0; i <= response.length-1; i++){
          $("#noShit").append('<option value='+response[i].idEstado+'>'+response[i].descripcion+'</option>');
        }
      });
        document.getElementById('inePic').addEventListener('change', handleFileSelect, false);
        document.getElementById('compPic').addEventListener('change', handleFileSelect2, false);
        }, 100);
  }

  function footerAction(){
    var footer = document.getElementById('footer'),
        menu = document.getElementById('holderFooter');
        if(footer.classList.contains('open')){
          menu.classList.remove('open');
          footer.classList.remove('open');
        }
        else{
          menu.classList.add('open');
          footer.classList.add('open');
        }

  }


function chooseAdress(){
  var insert = document.getElementById('mapaPush');
  insert.classList.add('open');
  document.getElementById('fixedMarker').style.display= "block";
  document.getElementById('fixedMarker').style.height= "100%";
   document.getElementById('closeMap').addEventListener('click', closeUbication);

            var myLatlng = new google.maps.LatLng(19.4346601,-99.1667576);
                var mapOptions = {
                  center: myLatlng,
                  zoom: 19
                };

            var map = new google.maps.Map(document.getElementById("fixedMarker"),
                mapOptions);

            marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map
            });
            var infowindow = new google.maps.InfoWindow,
                geocoder = new google.maps.Geocoder;
            google.maps.event.addListener(map, 'drag', function() {
                center = map.getCenter();
                marker.setPosition(center);
            });

   google.maps.event.addListener(map, "dragend", function(event) {
                    data = marker.getPosition().lat()+','+marker.getPosition().lng();
                    geocodeLatLng(geocoder, map, infowindow, data);
        });
function closeUbication(){
  insert.classList.remove('open');
  document.getElementById('fixedMarker').style.display = "none";
  document.getElementById('fixedMarker').style.height = "0";
}
function geocodeLatLng(geocoder, map, infowindow,data) {
  var insertNew = document.getElementById('direccion'),
      geo = document.getElementById('geoSend');
      geo.value = data;
  var input = data;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
        insertNew.innerHTML = results[0].formatted_address;

      } else {
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
        insertNew.innerHTML = results[0].formatted_address;
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
      google.maps.event.addDomListener(window, 'load', initialize);
  }
  //recibo objeto
function saveInCalendar(obj){
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth(),
        y = hoy.getFullYear();
        if(!Calendar[y]){
        Calendar[y] = {};
        }
        if(!Calendar[y][m]){
          Calendar[y][m] = {};
        }
        if(!Calendar[y][m][d]){
          Calendar[y][m][d] = {};
        }
        size = Calendar[y][m][d];
        if(obj.llave == "" || obj.llave == undefined){
          if(!size.asignacion["Libres"]){
            size.asignacion["Libres"] = {};
          }
          size = size.asignacion["Libres"],
          size[ObjectSize(size)] = {},
          size[ObjectSize(size)-1]["nombre"] = obj.usuario[1],
          size[ObjectSize(size)-1]["telefono"] = obj.usuario[2],
          size[ObjectSize(size)-1]["geo"] = obj.usuario[4],
          size[ObjectSize(size)-1]["direccion"] = obj.usuario[3];
          size[ObjectSize(size)-1]["status"] = obj.status;
          size[ObjectSize(size)-1]["tipo"] = obj.tipo;
          size[ObjectSize(size)-1]["razon"] = obj.razon;
          size[ObjectSize(size)-1]["distrito"] = "venta sin distrito";
          for(var n = 0; n <= fielderCamp.length-1; n++){
            if(fielderCamp[n].campana.id = obj.usuario[0]){
              size[ObjectSize(size)-1]["campaña"] = fielderCamp[n].campana.titulo ;
            }
          }
        }
        else{
          size = size.asignacion[obj.campañas[0]];
          size.clientes[ObjectSize(size.clientes)] = {},
          size.clientes[ObjectSize(size.clientes)-1]["nombre"] = obj.usuario[1],
          size.clientes[ObjectSize(size.clientes)-1]["telefono"] = obj.usuario[2],
          size.clientes[ObjectSize(size.clientes)-1]["geo"] = obj.usuario[4],
          size.clientes[ObjectSize(size.clientes)-1]["direccion"] = obj.usuario[3];
          size.clientes[ObjectSize(size.clientes)-1]["status"] = obj.status;
          size.clientes[ObjectSize(size.clientes)-1]["tipo"] = obj.tipo;
          size.clientes[ObjectSize(size.clientes)-1]["razon"] = obj.razon;
          split = obj.llave.split('-');
          size.clientes[ObjectSize(size.clientes)-1]["distrito"] = split[2];
          for(var n = 0; n <= fielderCamp.length-1; n++){
            if(fielderCamp[n].campana.id = obj.usuario[0]){
              size.clientes[ObjectSize(size.clientes)-1]["campaña"] = fielderCamp[n].campana.titulo ;
            }
          }
        }
  Calendar = JSON.stringify(Calendar);
  localStorage.setItem('Calendar',Calendar);
  Calendar = JSON.parse( localStorage.getItem('Calendar'));
  location.reload();
}
function devSave2(idOk){
  console.log('L: 1569');
  var geoPosition = document.getElementById('geoId').value,
      servicioTipo  = document.getElementsByName('servicioTipo')[0].value,
      servicioId = document.getElementsByName('servicioId')[0].value,
      camp = document.getElementById('idCamp').value,
      nombre = document.getElementsByName('nombre')[0].value,
      paterno = document.getElementsByName('paterno')[0].value,
      materno = document.getElementsByName('materno')[0].value,
      telefono = document.getElementsByName('telefono')[0].value,
      celular = document.getElementsByName('celular')[0].value,
      email = document.getElementsByName('email')[0].value,
      rfc = document.getElementsByName('rfc')[0].value,
      tipoCalle = document.getElementsByName('tipoCalle')[0].value;
      console.log(tipoCalle);
      calle = document.getElementsByName('calle')[0].value,
      numExt = document.getElementsByName('numExt')[0].value,
      numInt = document.getElementsByName('numInt')[0].value,
      entreCalle1 = document.getElementsByName('entreCalle1')[0].value;
      entreCalle2 = document.getElementsByName('entreCalle2')[0].value;
      colonia = document.getElementsByName('colonia')[0].value,
      cp = document.getElementsByName('cp')[0].value;
      if(document.getElementsByName('estado')[0]){
        var selIndex = document.getElementsByName('estado')[0].selectedIndex,
             estado = document.getElementsByName('estado')[0].options[selIndex].innerHTML;
             console.log(selIndex);
             console.log(estado);
      }
      selIndex2 = document.getElementsByName('municipio')[0].selectedIndex;
      console.log(selIndex2);
      municipio = document.getElementsByName('municipio')[0].options[selIndex2].innerHTML,
      ine = document.getElementById('ine').value,
      comp = document.getElementById('comp').value,
      parts = geoPosition.split(',', 2),
      region = document.getElementById('region').value,
      vivo = document.getElementById('vivo').value;
      data = {"idContrato":""+idOk+"","latitud":""+parts[0]+"","longitud":""+parts[1]+"","servicioTipo": ""+servicioTipo+"","servicioId":""+servicioId+"","nombre":""+nombre+"","paterno":""+paterno+"","materno":""+materno+"","telefono":""+telefono+"","email":""+email+"","rfc":""+rfc+"","tipoCalle":""+tipoCalle+"","calle":""+calle+"","numExt":""+numExt+"","numInt":""+numInt+"","entreCalle1":""+entreCalle1+"","entreCalle2":""+entreCalle2+"","colonia":""+colonia+"","delMun":""+municipio+"","cp":""+cp+"","estado":""+estado+"","modemEntrega":" ","reciboSinpapel":" ","fecha":"","latitud":""+parts[0]+"", "longitud":""+parts[1]+"","idtipo":" ","identifica":" ","celular":""+celular+"","idFielder":""+userId+"","imagenIfe": ""+ine+"", "imagenComprobanteDe":""+comp+"","region":""+region+"","idCampaign":""+camp+"", "vivo":""+vivo+""};
      persistencia(data);
}
$(document).on("click","#campaniasAsignadas .row",function(){
  var color=$(this).attr('data-id'),
      areas = $(this).attr('data-places'),
      split = areas.split(',');
      for(var i = 0; i <= split.length-1; i++ ){
        parts = split[i].split('-');
        if(parts[2] != 0){

        }
        else{
          for(var i = 0; i <= fielderRegs.Region.length-1; i++){
            if(fielderRegs.Region[i].Area = parts[1]){
              console.log('L: 1473');
              //fielderRegs.Distrito
              map.data.setStyle(function(feature){
                return({
                  fillColor:'#'+color,
                  strokeOpacity:1,
                  strokeWeight:1
                });
              });
            }
          }
        }
      }
});
$(document).on("click","#closeImageDisplay",function(){$(this).parent().remove();});
areIn = [];
function getCampDist(v){
	document.getElementById('mercaBox').innerHTML = "";
  $('#masterLogin').removeClass('ani').fadeOut();
	if(!v){
		var llave = reportObj.llave.split('-'),
			img,id,titulo,descripcion,
			insert = document.getElementById('mercaBox');
		for(var i = 0; i<= fielderCamp.length-1; i++){
			for(var b = 0; b <= fielderCamp[i].campReg.length-1; b++){
				hook = fielderCamp[i].campReg[b].region.split('-');
				if(llave[0] == hook[0] && llave[1] == hook[1]){
					id = fielderCamp[i].campana.id,
					titulo = fielderCamp[i].campana.titulo,
					descripcion = fielderCamp[i].campana.descripcion;
          img = imagesPlaces+fielderCamp[i].campana.imagen;
				}
				if(llave[0] == hook[0] && llave[1] == hook[1] && llave[2] == hook[2]){
					id = fielderCamp[i].idCampaña,
					titulo = fielderCamp[i].campana.titulo,
					descripcion = fielderCamp[i].campana.descripcion;
          img = imagesPlaces+fielderCamp[i].campana.imagen;
				}
          if(!areIn.includes(id)){
            areIn.push(id);
  					insert.innerHTML = insert.innerHTML+'<div class="cont">'+
              '<div class="t">'+titulo+'</div>'+
              '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
    					'<div class="descripcion">'+descripcion+'</div>'+
              '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this)"> Contratar</a>'+
  					'</div>';
          }

			}
		}
	}
	else{
		for(var i = 0; i <= fielderCamp.length-1; i++){
			if(fielderCamp[i].campana.id == v){
				id = fielderCamp[i].campana.id,
				titulo = fielderCamp[i].campana.titulo,
				descripcion = fielderCamp[i].campana.descripcion,
				insert = document.getElementById('mercaBox');
        img = imagesPlaces+fielderCamp[i].campana.imagen;
        if(!areIn.includes(id)){
          areIn.push(id);
          insert.innerHTML =  insert.innerHTML+"<h1>campaña dirigida</h1>";
          insert.innerHTML = insert.innerHTML+'<div class="cont">'+
          '<div class="t">'+titulo+'</div>'+
          '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
          '<div class="d">'+descripcion+'</div>'+
          '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this)"> Contratar</a>'+
          '</div>';
        }
			}
		}
    var llave = reportObj.llave.split('-'),
      img,id,titulo,descripcion,
      insert = document.getElementById('mercaBox');
    for(var i = 0; i<= fielderCamp.length-1; i++){
      for(var b = 0; b <= fielderCamp[i].campReg.length-1; b++){
        hook = fielderCamp[i].campReg[b].region.split('-');
        if(llave[0] == hook[0] && llave[1] == hook[1]){
          var img = imagesPlaces+fielderCamp[i].campana.imagen,
          id = fielderCamp[i].campana.id,
          titulo = fielderCamp[i].campana.titulo,
          descripcion = fielderCamp[i].campana.descripcion;
        }
        if(llave[0] == hook[0] && llave[1] == hook[1] && llave[2] == hook[2]){
          var img = imagesPlaces+fielderCamp[i].campana.imagen,
          id = fielderCamp[i].idCampaña,
          titulo = fielderCamp[i].campana.titulo,
          descripcion = fielderCamp[i].campana.descripcion;
        }
          if(!areIn.includes(id)){
          areIn.push(id);
          insert.innerHTML =  insert.innerHTML+"<h1>campaña por region</h1>";
          insert.innerHTML = insert.innerHTML+'<div class="cont">'+
            '<div class="t">'+titulo+'</div>'+
            '<img class="row" src="'+img+'" data-type="image" data-id="w" data-source='+img+' onclick="more(this);" />'+
            '<div class="descripcion">'+descripcion+'</div>'+
            '<a class="buy" data-id="'+id+'" data-steep="1" onclick="reportBox(this);"> Contratar</a>'+
          '</div>';
        }
      }
    }
    $('#mercaBox').append('<div class="cont">'+
            '<div class="t" style="padding:10px">Agendador</div>'+
            '<iframe src="https://187.217.179.35:81/agenda?tel='+reportObj.usuario[2]+'" frameborder="0"></iframe>'+
          '</div>');
	}
  function includes(k) {
    for(var i=0; i < this.length; i++){
      if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
        return true;
      }
    }
    return false;
  }
}
function mercaCrossModul(t){
	if(cc[t].vivo == true){
		loadPageCore('#merca');
		geo = cc[t].latitud+','+cc[t].longitud,
		reportObj["fielderId"] = userId,
		reportObj["usuario"] = [cc[t].id,cc[t].cliente,cc[t].telefono,cc[t].direccion,geo],
		reportObj["campañas"]=[cc[t].id],
		reportObj["llave"] = cc[t].region;
		reportObj["tipo"] = true;
		reportBox();
	}
	else{
		loadPageCore('#merca');
	}
}
function campCrossModul(t){
  masterLogin();
   loadPageCore("#merca");
   if(!document.getElementById('clientPosition')){
      setTimeout(function(){
     data = document.getElementById('clientPosition');
     data.classList.add('open');
      idAdq = t.dataset.camp,
      geo = document.getElementById('geoSend'),
      name = document.getElementById('nameSend'),
      telefono = document.getElementById('telefonoSend'),
      address = document.getElementById('direccion'),
      document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd),
      document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
      },700);
   }
   else{
     data = document.getElementById('clientPosition');
     data.classList.add('open');
      idAdq = t.dataset.camp,
      geo = document.getElementById('geoSend'),
      name = document.getElementById('nameSend'),
      telefono = document.getElementById('telefonoSend'),
      address = document.getElementById('direccion'),
      document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd),
      document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
   }
      function getInfoEnd(){
        var datos = [idAdq,document.getElementById('nameSend').value,telefono.value,address.value,geo.value];
        reportObj["usuario"] = datos;
        reportObj["campañas"] = [],
        reportObj.campañas[0] = idAdq;
        reportObj["llave"] = "";
        finishRepo();
      }
      function getInfo(){
            masterLogin();
            var datos = [idAdq,document.getElementById('nameSend').value,telefono.value,address.value,geo.value];
            reportObj["usuario"] = datos;
            reportObj["campañas"] = [],
            reportObj.campañas[0] = idAdq;
            document.getElementById('clientPosition').classList.remove('open');
            $("#mercaBox").load("formularios.html #expressTelmex", function(){
              loadInfo();
            });
          setTimeout(function(){
            document.getElementById('masterLogin').style.display = "none";
          },1000);
      }
  var geocoder = new google.maps.Geocoder;
  geocodeLatLng(geocoder, map, infowindow);
    function geocodeLatLng(geocoder, map, infowindow) {
      var latlng = {lat: latitude, lng: longitude};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            document.getElementById('direccion').innerHTML = String(results[0].formatted_address);
          }
            else {
              window.alert('No results found');
            }
          }
          else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
}

function reportBox(t){
		if(!t){
			var steep = 0,
				type = "cliente";
				document.getElementById('masterLogin').style.display = 'block';
		}
		else{
			var steep = t.dataset.steep,
				type = t.dataset.type;
		}
		if(steep == 0){
			if(type == "cliente"){
				 if(!t){
					setTimeout(function(){
              document.getElementById('content').classList.add('not');
						getCampDist(reportObj.usuario[0]);
					}, 1000);
				 }
				 else{
 					searchNumber();
				 }
			}
			if(type == "no cliente"){
				toModel();
				getCampDist();
			}
			//agregar id distrito y id producto
			//falta agregar la informacion del usuario en este paso
			if(!t){
        setTimeout(function(){
          $('#masterLogin').removeClass('ani').fadeOut();
        },4000);
			}
			else{
				reportObj["fielderId"] = userId;
				reportObj["tipo"] = type;
				var ofert = document.getElementsByClassName('buy'),
					codes = [];
				for(var i = 0; i <= ofert.length-1; i++){
					codes.push(ofert[i].dataset.id);
				}
				reportObj["campañas"] = codes;
			}
		}
	if(steep == 1){
		var insert = document.getElementById('clientPosition'),
			geo = document.getElementById('geoSend'),
			name= document.getElementById('nameSend'),
			telefono= document.getElementById('telefonoSend'),
			address= document.getElementById('direccion'),
			idAdq = t.dataset.id;
			insert.classList.add('open');
		//modificar por no cliente
		if(reportObj.tipo == false){
			var geocoder = new google.maps.Geocoder;
			geocodeLatLng(geocoder, map, infowindow);
			document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd);
			document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
			function getInfoEnd(){
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
			}
			function getInfo(){
        masterLogin();
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
				document.getElementById('clientPosition').classList.remove('open');
				$("#mercaBox").load("formularios.html #expressTelmex");
					loadInfo();
           document.getElementById('masterLogin').style.display = "none";
			}
		}
		if(reportObj.tipo == true){
			for(var i = 0; i <= reportObj["usuario"].length-1; i++){
					if(i == 1){
						name.value = reportObj["usuario"][i];
						name.text = reportObj["usuario"][i];
					}
					if(i == 2){
						telefono.value = reportObj["usuario"][i];
						telefono.text = reportObj["usuario"][i];
					}
					if(i == 3){
						address.value = reportObj["usuario"][i];
						address.text = reportObj["usuario"][i];
					}

					if(i == 3){
						var geocoder = new google.maps.Geocoder;
						geocodeLatLng(geocoder, map, infowindow);
					}
				}
			latlng = latitude+','+longitude;
			reportObj["usuario"].push(latlng);
      function getInfoEnd(){
				var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
				reportObj["usuario"] = datos;
        reportObj.campañas[0]=idAdq;
			}
      function getInfo(){
        masterLogin();
          setTimeout(function(){
            var datos = [idAdq,name.value,telefono.value,address.value,geo.value];
            reportObj["usuario"] = datos;
            reportObj.campañas[0]=idAdq;
            document.getElementById('clientPosition').classList.remove('open');
            $("#mercaBox").load("formularios.html #expressTelmex", function(){
              loadInfo();
            });
          },1000);
          setTimeout(function(){
            document.getElementById('masterLogin').style.display = "none";
          },1000);
			}
			document.getElementsByClassName('getData')[1].addEventListener('click',getInfoEnd);
			document.getElementsByClassName('getData2')[0].addEventListener('click',getInfo);
		}
	}
document.getElementsByClassName('sendReport')[0].addEventListener('click',finishRepo);
}
	function geocodeLatLng(geocoder, map, infowindow) {
	  var latlng = {lat: latitude, lng: longitude};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
				document.getElementById('direccion').innerHTML = String(results[0].formatted_address);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
	function toModel(){
		$.each(fielderPols.Distritos, function(index, val) {
			var tope = val['geometry']['coordinates'][0],
			obj = [];
			for(var i = 0; i <= tope.length-1; i++){
				obj[i]={'lat':tope[i][0],'lng':tope[i][1]};
			}
			 var polygon = new google.maps.Polygon({
			    paths: obj
			  });

				getName(polygon,index);
		});
		function getName(pol,index){
			var latlng = new google.maps.LatLng(19.538309,-99.124570);
			if (google.maps.geometry.poly.containsLocation(latlng, pol)) {
			}
			else{
				//en pruebas operativas este codigo va en el if y este es el fallback
				for(var i = 0; i <= ObjectSize(fielderRegs.Region)-1; i++){
					if(fielderRegs.Region[i].Distrito == index){
						reportObj["llave"] = fielderRegs.Region[i].Nomenclatura;
						document.getElementById('typeCliente').style.display= "none";
					}
				}
			}
		}
	}
	function searchNumber(){
 		document.getElementById('phoneDialog').style.display = "block";
		document.getElementById('verify').addEventListener('click',verify);
		function verify(){
			number = document.getElementById('ClientNumber').value;
			var tn = /^[0-9]*$/;
			if(tn.test(number)){
				if(number != "" || number != null || number != undefined){
					query(number);
				}
			}
			else{
				document.getElementsByClassName('error')[0].classList.add('open');
			}
			function query(n){
        var obj='';
        $.when(
    			$.each(fielderRegs.Areas, function(index, val){
    				$.each(fielderRegs.Areas[index], function(index2, val){
    					 $.each(fielderRegs.Areas[index][index2], function(index3, val){
    					 	var clients=fielderRegs.Areas[index][index2][index3].Clientes;
                console.log(clients);
                $.each(clients,function(k,v){
                  if(v.telefono==n){
                    obj=v;
    								var address = obj.direccion;
    								reportObj["usuario"] = [obj.id,obj.cliente,obj.telefono, address];
    								for(var i = 0; i <= ObjectSize(fielderRegs.Region)-1; i++){
    									if(index3 == fielderRegs.Region[i].Distrito){
    										reportObj["llave"] = fielderRegs.Region[i].Nomenclatura;
    									}
    								}
    					 		}
                });
    					 });
    				});
    			})
        ).done(function(){
    				if(obj!=''){
    					getCampDist(reportObj.usuario[0]);
    					document.getElementsByClassName('error')[0].classList.remove('open');
    					document.getElementById('typeCliente').style.display= "none";
    					document.getElementById('phoneDialog').style.display = "none";
    				}
    				else{
    					masterAlert("Lo sentimos el número no esta registrado");
    					$('#phoneDialog').hide();
    				}
        });
			}
		}
	}

function more(t){
	var source = t.dataset.source,
		type = t.dataset.type,
		insert = document.getElementById('showStuff'),
		id = t.dataset.id,
		buy = document.getElementById('buy');
		insert.classList.add('open');
		if(type == "close"){
			insert.classList.remove('open');
		}
		if(type == "video"){
			insert.getElementsByClassName('inner')[0].innerHTML = source;
		}
		else{
			var html = '<img src="'+source+'"/>';
			insert.getElementsByClassName('inner')[0].innerHTML = html;
		}
		//buy.setAttribute('data-id', id);
}
function expressPlug(){
	$("#typeCliente").load('contrataciones.html');
	document.getElementById('typeCliente').style.display = "block";
}
function repo(){
	document.getElementById('typeCliente').style.display = "none";

}
		function finishRepo(){
			var insert = document.getElementById('clientPosition');
			insert.classList.add('open');
			insert.innerHTML = '<div class="holderSelect fin">'+
			'<div class="porFinal"><h3>¿Por qué finaliza?</h3>'+
			'<div class="getData">'+
				'<select name="" id="reason">'+
					'<option value="sin datos">Seleccione un motivo</option>'+
					'<option value="No contrató">No contrató</option>'+
					'<option value="Desea más información vía Tecmarketing">Desea más información vía Tecmarketing</option>'+
					'<option value="Desea más información vía correo electrónico.">Desea más información vía correo electrónico.</option>'+
					'<option value="No desea el servicio">No desea el servicio</option>'+
					'<option value="Ya tiene el servicio">Ya tiene el servicio</option>'+
					'<option value="Prefiere servicio con otro proveedor">Prefiere servicio con otro proveedor</option>'+
					'<option value="Renta, tarifa o costo elevado">Renta, tarifa o costo elevado</option>'+
					'<option value="No se encuentra el decisor(Con agenda)">No se encuentra el decisor(Con agenda)</option>'+
					'<option value="No se encuentra el decisor(Sin agenda)">No se encuentra el decisor(Sin agenda)</option>'+
					'<option value="Ya tuvo el servicio y canceló">Ya tuvo el servicio y canceló</option>'+
					'<option value="Cliente satisfecho con servicio actual">Cliente satisfecho con servicio actual</option>'+
					'<option value="Desea servicio en otra línea">Desea servicio en otra línea</option>'+
					'<option value="Servicio no compatible/No convive con servicios activos">Servicio no compatible/No convive con servicios activos</option>'+
					'<option value="Plan excede necesidades">Plan excede necesidades.</option>'+
					'<option value="Prefiere hacer contratación por otro canal de venta">Prefiere hacer contratación por otro canal de venta</option>'+
					'<option value="Datos incompletos">Datos incompletos</option>'+
					'<option value="Cliente cambió de domicilio">Cliente cambió de domicilio</option>'+
					'<option value="Cliente no estaba en domicilio">Cliente no estaba en domicilio</option>'+
					'<option value="Domicilio no localizado">Domicilio no localizado</option> '+
				'</select>'+
				'<p id="endRepo">Finalizar <i class="fa fa-check"></i></p>'+
			'</div></div>'+
		'</div>';
		reportObj["status"] = {};
		reportObj.status = "sin venta";
		document.getElementById('endRepo').addEventListener('click',cachInfo);
	}
		function cachInfo(){
				if(reportObj.status == "sin venta"){
					status = 0;
					var value = document.getElementById('reason').value;
					reportObj["razon"] =value;
				}
				if(reportObj.status == "venta"){
					status = 1;
				}
				var obj = [];
				for(var i = 0; i <= reportObj.campañas.length-1; i++){
					var idCamp,
						status;
					if(jQuery.inArray(reportObj.campañas[i], reportObj.usuario) != -1){
						idCamp = reportObj.campañas[i];
					}
					obj[obj.length] = {"idFielder": userId, "idCampaign": reportObj.usuario[0], "pesco": status, "region":reportObj.llave, "razon": reportObj.razon, "direccion":reportObj.usuario[3], "nombre":reportObj.usuario[1],"telefono":reportObj.usuario[2],"vivo":reportObj.tipo, "latitud":latitude,"longitud":longitude};
				}
				$.ajax({
					url: ''+hostVar+':9090/telmex/add/rc',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(obj),
				})
				.done(function() {
				masterAlert("Gracias la información fue procesada");
        document.getElementById('loadingMap').style.display ="block";
				})
				.fail(function(a,b,c) {
          console.log(a,b,c);
				masterAlert("Error por favor vuelva a intentar");
				})
				.always(function() {
					//location.reload();
				});
        /*  setTimeout(function(){
            if(!reportObj.llave){
              location.reload();
            }
            else{
              saveInCalendar(reportObj);
            }
          },1000);*/
          function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

		}
var savePoint = "";
function savePointFallback(){
	var geocoder = new google.maps.Geocoder;
	geocodeLatLng(geocoder, map);
	function geocodeLatLng(geocoder, map, infowindow) {
	  var latlng = {lat: latitude, lng: longitude};
	  geocoder.geocode({'location': latlng}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      if (results[0]) {
				savePoint = String(results[0].formatted_address);
	      } else {
	        window.alert('No results found');
	      }
	    } else {
	      window.alert('Geocoder failed due to: ' + status);
	    }
	  });
	}
	obj ={"latitud": ""+latitude+"","longitud": ""+longitude+"","idFielder": ""+userId+"","telefono":"","estado":0,"nombre": "bla bla bla erick es puto","direccion": ""+savePoint+""};
	$.ajax({
		url: ''+hostVar+':9090/telmex/add/clientegeo',
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(obj),
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	masterAlert('Enviado...');
}
function masterAlert(txt){
	insert = document.getElementById('masterAlert');
	insert.innerHTML = "<p>"+txt+"</p>";
	insert.classList.add('open');
	 setTimeout(function(){
	 	insert.classList.remove('open');
	 }, 3000);
}

   var done = [];
function PutInMapCamp(){
  for(var i = 0; i <= fielderCamp.length-1; i++){
    for(var b= 0; b <= fielderCamp[i].campReg.length-1; b++){
      var split = fielderCamp[i].campReg[b].region.split('-');
      if(split[2] != 0 && !done.includes(fielderCamp[i].idCr)){
        done.push(fielderCamp[i].idCr);
        $.each(fielderPols.Distritos, function(index, val) {
            if(split[2] == index){
              fielderPols.Distritos[index].properties.color = "#"+fielderCamp[i].campana.color;
              var insert = document.getElementById('campaniasAsignadas');
              insert.innerHTML = insert.innerHTML+
              "<div class='row' data-id='"+fielderCamp[i].campana.color+"'>"+
              "<div class='color' style='background:#"+fielderCamp[i].campana.color+";'></div>"+
              "<div class='innerRow'>"+
              "<div class='titulo'><p style='color:#"+fielderCamp[i].campana.color+";'>"+fielderCamp[i].campana.titulo+"</p></div>"+
              "<div class='descripcion'><p>"+fielderCamp[i].campana.descripcion+"</p></div>"+
              "</div>"+
              "</div>";
            }
          });
        }
        else{
            for(var c = 0; c <= fielderRegs.Region.length-1; c++){
               var splitRegs = fielderRegs.Region[c].Nomenclatura.split('-');
              if(split[1] == splitRegs[1] && !done.includes(fielderCamp[i].idCr)){
                done.push(fielderCamp[i].idCr);
                for(var n = 0; n <= fielderRegs.Region.length-1; n++){
                  if(fielderRegs.Region[n].Area == splitRegs[1]){
                      fielderPols.Distritos[fielderRegs.Region[n].Distrito].properties.color = "#"+fielderCamp[i].campana.color;
                  }
                }
                var insert = document.getElementById('campaniasAsignadas');
                areasVar = "";
                for(var f = 0; f <= ObjectSize(fielderCamp[i].campReg)-1; f++){
                    breakhere = fielderCamp[i].campReg[f].region.split('-');
                  if( breakhere[1] == splitRegs[1]){
                    areasVar = areasVar+fielderCamp[i].campReg[f].region+',';
                  }
                }
                insert.innerHTML = insert.innerHTML+
                "<div class='row' data-id='"+fielderCamp[i].campana.color+"' data-places='"+areasVar+"'>"+
                "<div class='color' style='background:#"+fielderCamp[i].campana.color+";'></div>"+
                "<div class='innerRow'>"+
                "<div class='titulo'><p style='color:#"+fielderCamp[i].campana.color+";'>"+fielderCamp[i].campana.titulo+"</p></div>"+
                "<div class='descripcion'><p>"+fielderCamp[i].campana.descripcion+"</p></div>"+
                "</div>"+
                "</div>";
            }


           }
        }
        function includes(k) {
          for(var i=0; i < this.length; i++){
            if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
              return true;
            }
          }
          return false;
        }
    }
  }
}
function masterLogin(){
  setTimeout(function(){
    $('#masterLogin').addClass('small').addClass('ani').fadeIn();
  },10);
  setTimeout(function(){
    $('#masterLogin').removeClass('small').addClass('end');
  },300);
}

$(document).on("blur", "input",function(){
//  $('input').blur(function(){
  var $this = $(this);
  if($this.val())
    $this.addClass('used');
  else
    $this.removeClass('used');
});

$(document).on("click",".riples",function(e){
  var es=$(this);
  var tama=es.parent().offset(),
      klas=es.attr('class'),
      circ=es.find('.ripplesCircle');
  var x=e.pageX-tama.left,
      y=e.pageY-tama.top;
  circ.css({top:y+'px',left:x+'px'});
  es.addClass('is-active');
  if(klas!='riples none') masterLogin();
  setTimeout(function(){
    es.removeClass('is-active');
  },500);
});

function printInfoUser(r){
  insert = document.getElementById('dns');
  if(!r.fecha){
    insert.innerHTML = '<div class="inner"><h3>Mensaje de Alerta:</h3>'+
      '<div class="url">'+r.mensaje+'</div>'+
    '</div>';
  }
  else{
    insert.innerHTML = '<div class="inner"><h3>Navegación de usuarios</h3>'+
      '<div class="telefono"><span>Teléfono:</span>'+r.telefono+'</div>'+
      '<div class="url"><span>URL:</span>'+r.url+'</div>'+
      '<div class="fecha"><span>Fecha:</span>'+r.fecha+'</div>'+
    '</div>';
  }
  insert.classList.add('open');
   setTimeout(function(){
    insert.classList.remove('open');
   }, 3000);
}


function iframeMethod(type){
  if(type == "closeIframe"){
    document.getElementById('iframeDisplay').classList.remove('open');
    document.getElementById('iframeDisplay2').classList.remove('open');
  }
  else{
     window.location.hash = '#'+type;
    insert = document.getElementById(type);
    if(!insert.classList.contains('open')){
      insert.classList.add('open');
    }
    else{
      insert.classList.remove('open');
      if(type == "iframeDisplay"){
        document.getElementById('iframeDisplay2').classList.remove('open');
        insert.innerHTML = '<iframe src="https://187.217.179.35:81/tcd/?fielder='+userId+'" allowtransparency="true"></iframe>';
      }
      if(type == "iframeDisplay2"){
         document.getElementById('iframeDisplay').classList.remove('open');
         insert.innerHTML = '<iframe src="https://187.217.179.35:81/tcd/?fielder='+userId+'" allowtransparency="true"></iframe>';
      }
    }
  }
}
function exReport(r){
  var hoy = new Date(),
      d = hoy.getDate(),
      m = hoy.getMonth(),
      y = hoy.getFullYear();
      if(!Calendar[y]){
      Calendar[y] = {};
      }
      if(!Calendar[y][m]){
        Calendar[y][m] = {};
      }
      if(!Calendar[y][m][d]){
        Calendar[y][m][d] = {};
      }
      size = Calendar[y][m][d];
      if(r[0].region == "" || r[0].region == undefined || r[0].region == null){
        if(!size.asignacion["Libres"]){
          size.asignacion["Libres"] = {};
        }
        size = size.asignacion["Libres"],
        size[ObjectSize(size)] = {},
        size[ObjectSize(size)-1]["nombre"] = r[0].nombre,
        //size[ObjectSize(size)-1]["telefono"] = obj.usuario[2],
        size[ObjectSize(size)-1]["geo"] = r[0].latitud,r[0].longitud,
        size[ObjectSize(size)-1]["direccion"] = r[0].direccion;
        size[ObjectSize(size)-1]["status"] = r[0].pesco;
        size[ObjectSize(size)-1]["tipo"] = r[0].vivo;
        size[ObjectSize(size)-1]["razon"] = r[0].razon;
        size[ObjectSize(size)-1]["distrito"] = "venta sin distrito";
        for(var n = 0; n <= fielderCamp.length-1; n++){
          if(fielderCamp[n].campana.id = r[0].idCampaign){
            size[ObjectSize(size)-1]["campaña"] = fielderCamp[n].campana.titulo ;
          }
        }
      }
      else{
        size = size.asignacion[r[0].idCampaign];
        size.clientes[ObjectSize(size.clientes)] = {},
        size.clientes[ObjectSize(size.clientes)-1]["nombre"] = r[0].nombre,
        //size.clientes[ObjectSize(size.clientes)-1]["telefono"] = obj.usuario[2],
        size.clientes[ObjectSize(size.clientes)-1]["geo"] = r[0].latitud,r[0].longitud,
        size.clientes[ObjectSize(size.clientes)-1]["direccion"] = r[0].direccion;
        size.clientes[ObjectSize(size.clientes)-1]["status"] = r[0].pesco;
        size.clientes[ObjectSize(size.clientes)-1]["tipo"] = r[0].vivo;
        size.clientes[ObjectSize(size.clientes)-1]["razon"] = r[0].razon;
        split = r[0].region.split('-');
        size.clientes[ObjectSize(size.clientes)-1]["distrito"] = split[2];
        for(var n = 0; n <= fielderCamp.length-1; n++){
          if(fielderCamp[n].campana.id = r[0].idCampaign){
            size.clientes[ObjectSize(size.clientes)-1]["campaña"] = fielderCamp[n].campana.titulo ;
          }
        }
      }
Calendar = JSON.stringify(Calendar);
localStorage.setItem('Calendar',Calendar);
Calendar = JSON.parse( localStorage.getItem('Calendar'));
location.reload();
document.getElementById('loadingMap').style.display ="none";
/*  split = r[0].createAt.split('-'),
  regExp = /^0[0-9].*$/;
  for(var i = 0; i <= split.length-1; i++){
    if(regExp.test(split[i])){
       slice = split[i].split('');
       split[i] = slice[1];
    }
  }
  newObj = Calendar[split[0]][(parseInt(split[1])-1)][split[2]];
  if(!newObj.asignacion){
    newObj['asignacion'] ={},
    newObj.asignacion['Libres'] = {};
  }
  if(!newObj.asignacion.Libres){
    newObj.asignacion['Libres'] = {};
  }
  newObj = Calendar[split[0]][(parseInt(split[1])-1)][split[2]].asignacion.Libres;
  console.log(split[0],split[1],split[2]);
  newObj[ObjectSize(newObj)] = {},
  newObj[ObjectSize(newObj)-1]["nombre"] = r[0].nombre,
  newObj[ObjectSize(newObj)-1]["geo"] = r[0].latitud,r[0].longitud,
  newObj[ObjectSize(newObj)-1]["direccion"] = r[0].direccion;
  newObj[ObjectSize(newObj)-1]["status"] = r[0].pesco;
  newObj[ObjectSize(newObj)-1]["tipo"] = r[0].vivo;
  newObj[ObjectSize(newObj)-1]["distrito"] = "venta sin distrito";

  Calendar = JSON.stringify(Calendar);
  Calendar = localStorage.setItem('Calendar',Calendar);
  Calendar = JSON.parse( localStorage.getItem('Calendar'));*/
}

function midNight(){
  timeNow = new Date();
    closeApp = new Date(timeNow.getFullYear(),timeNow.getMonth(), timeNow.getDate()+1, 16, 27).getTime() - Date.now();
    setTimeout(function(){
        logout();
    }, closeApp);
}
