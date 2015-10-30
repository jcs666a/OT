var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0;
var appMenu = $("#appMenu"), 
    menuDisplay = $("#menuDisplay"),
    wrapper = $("#wrapper"),
    masterLogin = $("#masterLogin"),
    loadInOverlay = $("#overlay .inner"),
    overlay = $("#overlay");
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
      //loginUser.click(function(event) { enviarUsuario(); });

      $(".triggerOverlay").click(function(event) {
        var getId = this.id;
        $("#overlayLoad").load("views/"+getId+".php", function(){
          $("#overlay").fadeIn('fast');
        });
        $("#closeOverlay").click(function(event) {
          $("#overlay").fadeOut('fast');
        });
      });
}

function logout(){
  window.location="views/logout.php";
}

function validate(){
    if ( $("#usuario").val()=="" || $("#clave").val()=="" ) {
        $("#formulario #error").html('<small>Por favor llene los campos.</small>');
    }else{
  var exp=150971;
  var gcm_regid = $('#regid').val();
  var dist= "zds008"
  var data= formulario.serialize();
        try{
          $.ajax({
            type: "POST",
            url: "http://187.217.179.35:9000/login",
            data: data,
            success: function(data, a, b){
              var respuesta = data;
              window.location="views/login.php?us="+respuesta.cuenta.nombre + "&iduser="+respuesta.cuenta.idusuario +"&ni=" + respuesta.cuenta.permisos[0]+ "&exp" + exp + "&gcm_regid" + gcm_regid + "&dist" +dist;
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
