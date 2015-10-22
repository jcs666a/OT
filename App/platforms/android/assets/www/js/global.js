var loadPage = $(".map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario"),
    contador = 0;
function global(){
      loadPage.click(function(event) {
        $("#loading").css('display','block');
        $( "#mapAjax" ).load( "mapa/mapa.php", function( response, status, xhr ) {
            initialize();
          if ( status == "success" ) {
            setTimeout(function(){ 
             $("#loading").fadeOut('fast'); 
            }, 900);   
          }
        });
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
 /* if ( $("#usuario").val()=="" || $("#clave").val()=="" ) {
    alert("Debes escribir un usuario y un password");
    return false;
  }*/
  /*else{*/
  var data = formulario.serialize();
        try{
          $.ajax({
            type: "POST",
            url: "http://187.217.179.35:9000/login",
            data: data,
            success: function(data, a, b){
              var respuesta = data;
              window.location="views/login.php?us="+respuesta.cuenta.nombre + "&ni=" + respuesta.cuenta.permisos[0];
            },
            error: function(jqXHR, textStatus, error){
              console.log('Error',jqXHR, textStatus, error);
            },
            dataType: 'json'
          });
        }catch(error){
          console.log(error)
        };
  /*}*/
}

