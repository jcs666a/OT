var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0,
    appMenu = $("#appMenu"), 
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
    userId = fielderInfo.Datos.UserID,
    userName = fielderInfo.Persona;
function global(){
    appMenu.click(function(event){
      if(wrapper.hasClass('active')){
        appMenu.removeClass('active');
        appMenu.html('<i class="fa fa-bars"></i>');
        menuDisplay.removeClass('active');
        wrapper.removeClass('active');
      }
      else{
        appMenu.addClass('active');
        appMenu.html('<i class="fa fa-times"></i>');
        menuDisplay.addClass('active');
        wrapper.addClass('active');
      }
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
  homeAnimation();
}
function logout(){
  $.ajax({type:"PUT",
      url:"http://10.105.116.52:9090/telmex/usuario/desconectado",
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
function homeAnimation(){
 setInterval(function(){
   var actual = 1;
   var number =  $(".activity").children().size(),
      rondomizer = Math.ceil(Math.random() * number),
      select = $(".boxSlide:nth-child("+rondomizer+")");
      if(rondomizer != actual){
        select.addClass('active');
        actual = rondomizer;
      }
      else{
        rondomizer = Math.ceil(Math.random() * 6);  
      }
    setTimeout(function(){ 
      select.removeClass('active');
    }, 2100);
  }, 2000);
  $('.homeInner .boxSlide a .inner i.fa.fa-envelope-o span').html(fielderMsgs.Nuevos);
}
function getAllMsg(){
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
$(document).on("click","#content .mensageInner .inner .MensageHolder",function(event){
  event.preventDefault();
  var d=$(this),mos,
      clase=$(this).attr('class');
  $(".open").removeClass('open');
  if(!/open/i.test(clase))
    d.addClass("done open");
  var getStatus = d.attr('data-status'),
      getMensajeId = d.attr('data-mensaje').toString(),
      arrSend ={'idMensaje':''+getMensajeId+''},
      nuevos=fielderMsgs.Nuevos;
  if(getStatus=="false"){
    $.ajax({
      type: "PUT",
      url: "http://10.105.116.52:9090/telmex/msgUp/",
      data: JSON.stringify(arrSend),
      contentType: "application/json",
      dataType: "json",
      success: function(data,a,b){
        d.attr('data-status','true');
        nuevos--;
        fielderMsgs.Nuevos=nuevos;
        fielderMsgs.Todos[d.attr('data-localId')].status=true;
        localStorage.setItem('fielderMsgs',JSON.stringify(fielderMsgs));
        console.log(JSON.stringify(fielderMsgs));
      },
      error: function(jqXHR,textStatus,error){
        console.log(textStatus, error, jqXHR);
      }
    });
  }
});
$('#wrapper').bind('swipeleft', function(){
    alert("test");
});

function geoRefer(){
  if(navigator.geolocation){
      navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
  }
  else{
    console.log('not support');  
  }
}
var positionCounter = 0;
function geo_success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  if(latitude == lastLatitude && longitude == lastLongitude){
    positionCounter++;
    if (positionCounter == 6) {
      console.log('too much time in the same place');
      positionCounter = 0;
        //send e-mail or mesange 
    }
  }
  else{
    lastLatitude = latitude,
    lastLongitude = longitude;
    savePosition();
    if($("#map-canvas").length)
      newPosition();
  }
}

function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 0, 
  timeout           : 100000
};

function savePosition(){
  console.log('save position');
  stompClient.send("/user/"+userId+"/geoMensages", {}, JSON.stringify({ 'latitude': latitude, 'longitude': longitude, 'fielderId': userId }));
}
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
    var socket = new SockJS('http://10.105.116.202:8080/messaging');
    stompClient = Stomp.over(socket);            
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/'+userId+'/topic/region', function(greeting){
            type = 0;
            showGreeting(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/usuario', function(greeting){ 
            type = 1;
                showGreeting(greeting.body, type);
        });
        stompClient.subscribe('/user/'+userId+'/topic/campania', function(greeting){ 
            type = 2;
                console.log(greeting.body);
        });
        stompClient.subscribe('/user/'+userId+'/topic/mensaje', function(greeting){ 
           var type = 'mensajeria';
                socketResponse(greeting.body, type);
        });
    });
socket.onclose = function() {
  connect();
};
}
function socketResponse(response, type){
  response = $.parseJSON(response);
  if(type ="mensajeria"){
    Obj = fielderMsgs;
    name = 'fielderMsgs';
    NewContent(type, Obj, response, name);
  }
}
function NewContent(url, Obj, r, name){
    $("#brodcast").fadeIn('fast');
    $('#content').load( url+".html" );
    if(url == "mensajeria"){
      Obj.Todos.unshift(r);
      Obj.Nuevos = Obj.Nuevos+1;
    }
    Obj = JSON.stringify(Obj);
    console.log(Obj.constructor.name.value);
    Obj = localStorage.setItem(name,Obj);
    $("#brodcast").fadeOut('fast');
}
