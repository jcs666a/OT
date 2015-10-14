var loadPage = $("#map-go"),
    loginUser = $("#botonLogin"),
    formulario = $("#formulario");
function global(){
      loadPage.click(function(event) {
        alert();
        $("#loading").css('display','block');
        $( ".inner" ).load( "mapa/mapa.php", function( response, status, xhr ) {
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
      loginUser.prevetDefault();
      loginUser.click(function(event) { enviarUsuario(); });
}

function enviarUsuario(){
  if ( $("#usuario").val()=="" || $("#clave").val()=="" ) {
    alert("Debes escribir un usuario y un password");
    return false;
  }
  else{
        var url = formulario.attr("action");
        var formData = formulario.serialize();
        alert(url);
        alert(formData);
        $.ajax({
               type: "POST",
               url: url,
               data: formData,
               success: function(data){
                console.log(data);
               }
        });
        return false; // avoid to execute the actual submit of the form.
  }

}

