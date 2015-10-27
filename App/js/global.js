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
      loginUser.click(function(event) { enviarUsuario(); });

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
function enviarUsuario(){
  alert("enviar usuario");
var exp=150971;
var gcm_regid = $('#regid').val();
var dist= "zds008";
var data = {
'usuario': $('#usuario').val(),
'clave': $('#clave').val(),
};
$.ajax({
  type: "POST",
  url: "http://187.217.179.35:9000/login",
  data: data,
  success: function(data, a, b){
  var respuesta = data;
  alert(respuesta.cuenta.nombre);
  window.location="views/login.php?us="+respuesta.cuenta.nombre + "&ni=" + respuesta.cuenta.permisos[0]+ "&exp" + exp + "&gcm_regid" + gcm_regid + "&dist" +dist;
  },
  error: function(jqXHR, textStatus, error){
  console.log('Error',jqXHR, textStatus, error);
  },
  dataType: 'json'
});

}

function logout(){
  alert("redirecciono"); 
  window.location="views/logout.php";
}