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
    readMesage = $(".MensageHolder");
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
readMesage.click(function(event) {
  if($(this).hasClass('open')){
    $(this).removeClass('open');
    $(this).children('.image').children('i').removeClass('fa-chevron-up');
    $(this).children('.image').children('i').addClass('fa-chevron-down');
  }
  else{
    $(this).addClass('open');
    $(this).addClass('done');
    $(this).children('.image').children('i').removeClass('fa-chevron-down');
    $(this).children('.image').children('i').addClass('fa-chevron-up');
  }
});
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
              window.location="views/login.php?us="+respuesta.apiResponse[0].nombre + "&iduser="+respuesta.apiResponse[0].idUsuario +"&ni=" + respuesta.apiResponse[0].role.idRole+ "&exp=" + exp + "&gcm_regid=" + gcm_regid + "&dist=" +respuesta.apiResponse[0].regionTrabajo +"";
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
function getDistAutoPrint(valString){
  var srt = valString;
  var parts = srt.split('-', 3);
  var divString = parts[0];
  var areaString = parts[1];
  var distString = parts[2];
  cargaReg(divString,areaString,distString );
}

function homeAnimation(){
 setInterval(function(){ 
   var actual = 1;
   var number =  $(".activity").children().size(), 
      rondomizer = Math.ceil(Math.random() * number),
      select = $(".boxSlide:nth-child("+rondomizer+")");
      if(rondomizer != actual){
        console.log("cambio");
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
}
