var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0;
var appMenu = $("#appMenu"), 
    menuDisplay = $("#menuDisplay"),
    wrapper = $("#wrapper"),
    masterLogin = $("#masterLogin"),
    loadInOverlay = $("#overlay .inner"),
    overlay = $("#overlay"),
    readMesage = $(".MensageHolder"),
    userID = "",
    lastLatitude = 0, 
    lastLongitude = 0, 
    thisLongitude = 0, 
    thisLatitude = 0;
function global(){
    appMenu.click(function(event) {
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
      formulario.keypress(function(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
          loginUser.click();
          return true;
        }
      });
      $(".triggerOverlay").click(function(event) {
        var getId = this.id;
        $("#overlayLoad").load("views/"+getId+".php", function(){
          $("#overlay").fadeIn('fast');
        });
        $("#closeOverlay").click(function(event) {
          $("#overlay").fadeOut('fast');
        });
      });
  geoRefer();
}

function logout(){
  window.location="views/logout.php";
}

function validate(){
    if ( $("#usuario").val()=="" || $("#clave").val()=="" ) {
        $("#formulario #error").html('<small>Por favor llene los campos.</small>');
    }else{
      var clave = $("#clave").val();
      var usuario = $("#usuario").val();
  var exp=150971;
  var gcm_regid = $('#regid').val();
        try{
          $.ajax({
            type: "GET",
            url: "http://10.105.116.52:9090/telmex/get/user/"+usuario+"/"+clave+"",
            success: function(data, a, b){
              var respuesta = data;
              if(respuesta.apiResponse == null){
                //alert("error");
                $("#formulario #error").html('<small>Credenciales incorrectas.</small>');
              }
              userID = respuesta.apiResponse[0].idUsuario;
              window.location="views/login.php?us="+respuesta.apiResponse[0].nombre + "&iduser="+respuesta.apiResponse[0].idUsuario +"&ni=" + respuesta.apiResponse[0].role.idRole+ "&exp=" + exp + "&gcm_regid=" + gcm_regid + "&dist=" +respuesta.apiResponse[0].idUsuario +"";
            },
            error: function(jqXHR, textStatus, error){
              $("#formulario #error").html('<small>Credenciales incorrectas.</small>');
            },
            dataType: 'json'
          });
        }catch(error){
          console.log(error)
        };
      
    }
      
  }


  function validar(string) {  
    for (var i=0, output='', validos="ABCDEFGHIJKLMNÃ‘OPQRSTUVWXYZabcdefghijklmnÃ±opqrstuvwxyz1234567890,. "; i<string.length; i++)  
       if (validos.indexOf(string.charAt(i)) != -1)  
        output += string.charAt(i)  
    return output;  
  }
function getWorkAreas(d){
          $.ajax({
            type: "GET",
            url: "http://10.105.116.52:9090/telmex/get/region/"+d+"",
            success: function(data, a, b){
              for(i = 0; i < data.apiResponse[0].length; i++){
                  getDistAutoPrint(data.apiResponse[0][i].regionTrabajo, data.apiResponse[0].length);
              }
            },
            error: function(jqXHR, textStatus, error){
              $("#formulario #error").html('<small>Credenciales incorrectas.</small>');
            },
            dataType: 'json'
          });
}
function getDistAutoPrint(valString, size){
  //qui va ir el valor de colonia pintarla
  //console.log(valString);
  var srt = valString;
  var parts = srt.split('-', 4);
  var divString = parts[0],
      areaString = parts[1],
      distString = parts[2],
      colString = parts[3];
      knowNames(divString, areaString);
       setTimeout(function(){ 
          cargaReg(divString,areaString, distString, size); 
        }, 200);
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
 $.get("http://10.105.116.52:9090/telmex/get/nomsg/"+idUser,function(){})
  .done(function(data){
    $('.homeInner .boxSlide a .inner i.fa.fa-envelope-o span').html(data.apiResponse[0]);
  });
}
function creaFormularioCliente(){
  var html='<form id="ubicaNuevoCliente" method="post" action="#">'+
      '<fieldset>'+
        '<h3>Almacenar ubicación</h3>'+
        '<div class="onoffswitch">'+
          '<input type="checkbox" name="clienteOnoTelmex" class="onoffswitch-checkbox" id="clienteOnoTelmex">'+
          '<label class="onoffswitch-label" for="clienteOnoTelmex"> &nbsp; &nbsp; Cliente Telmex</label>'+
        '</div>'+
        '<input type="text" placeholder="Teléfono" name="telefono" class="telefono" value="" />'+
        '<input type="text" placeholder="Nombre" name="nombre" class="nombre" value="" />'+
        '<input type="text" placeholder="Dirección" name="direccon" class="direccion" value="" />'+
        '<button type="submit">Guardar</button>'+
      '</fieldset>'+
    '</form>';
  return html;
}
function registraCliente(){
  var formulario=creaFormularioCliente();
  $("#genericLoad .inner").html(formulario);
  $("#goTo").removeClass('open');
  $("#genericLoad").addClass('open');
}
$(document).on("click","#content .mensageInner #readMore",function(){
  var linea=$(this),
      idUser=$(this).attr('user');
  $.ajax({
    type: "GET",
    url: "http://10.105.116.52:9090/telmex/get/msgAll/"+idUser+"",
    success: function(data,a,b){
      var doneC='';
      linea.hide();
      $("#content  .mensageInner .inner").html('');
      for(i = 0; i < data.apiResponse[0].length; i++){
        doneC='';
        if(data.apiResponse[0][i].status == true)
          doneC=' done';
        $("<div class='MensageHolder"+doneC+"' data-status="+data.apiResponse[0][i].status+" data-mensaje="+data.apiResponse[0][i].idMensaje+">"+
            "<span class='mailbox'></span>"+
            "<div class='text'>"+
              "<div class='center'>"+
                "<span>"+data.apiResponse[0][i].createAt+"</span>"+
              "</div>"+
            "<div id='readit'>"+
              "<i class='fa fa-check'></i>"+
              "<i class='fa fa-check'></i>"+
            "</div>"+
            "<p>"+data.apiResponse[0][i].mensaje+"</p>"+
          "</div>"+
        "</div>").appendTo('#content .mensageInner .inner');
      }
    },
    error: function(jqXHR, textStatus, error){
      alert("error en carga de datos por favor vuelva a intentar");
    },
    dataType:'json'
  });
});
function getLast(idUser){
  $.ajax({
    type: "GET",
    url: "http://10.105.116.52:9090/telmex/get/msg/"+idUser+"",
    success: function(data, a, b){
      $("<div class='MensageHolder' data-status="+data.apiResponse[0].status+" data-mensaje="+data.apiResponse[0].idMensaje+">"+
          "<span class='mailbox'></span>"+
          "<div class='text'>"+
            "<div class='center'>"+
              "<span>"+data.apiResponse[0].createAt+"</span>"+
            "</div>"+
          "<div id='readit'>"+
            "<i class='fa fa-check'></i>"+
            "<i class='fa fa-check'></i>"+
          "</div>"+
          "<p>"+data.apiResponse[0].mensaje+"</p>"+
        "</div>"+
      "</div>").appendTo('#content .mensageInner .inner');
        if(data.apiResponse[0].status == true){
          $(".MensageHolder").addClass('done');
        }
    },
    error: function(jqXHR, textStatus, error){
      alert("error en la carga de datos favor de volver a intentar");
    },
    dataType: 'json'
  });
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
      url: "http://10.105.116.52:9090/telmex/msgUp/",
      data: JSON.stringify(arrSend),
      contentType: "application/json",
      dataType: "json",
      success: function(data,a,b){
        d.attr('data-status','true');
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
      navigator.geolocation.getCurrentPosition(where);
  }
  else{
    console.log('not support');  
  }
}
var positionCounter = 0;
function where(position){
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  if(latitude == lastLatitude && longitude == lastLongitude){
    positionCounter++;
    if (positionCounter == 6) {
      console.log('too much time in the same place');
      positionCounter = 0;
        //send e-mail or mesange 
    }
  }
  else{
    console.log('traking device...');
    lastLatitude = latitude,
    lastLongitude = longitude;
    savePosition();
    newPosition();
  }
  setTimeout(function(){ 
    geoRefer();
  }, 30000);
}
function savePosition(){
  console.log('save position');
}