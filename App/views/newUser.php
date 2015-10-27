<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" href="../css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
        <div id="wrapper">
            <div id="content" class="newUserContent">
            <!--carga contenido-->
			<form id="userInfo">
                <div id="newUser" class="left">
                  <a href="../login.php">
        				<i class="fa fa-arrow-left" data-page="login" onclick="loadOverlay(this);"></i>
                  </a>
                </div>
                <div class="content">
                    <p>inicio de sesion</p>
                <div class="logo"></div>
					<i class="fa fa-user"></i><input type="text" name="usuario" placeholder="USUARIO:" >
					<br>	
					<i class="fa fa-users"></i><input type="text" name="nombre"placeholder="NOMBRE: ">	
					<br>
					<i class="fa fa-users"></i><input type="text" name="apellidos" placeholder="APELLIDO" >
					<br>
					<i class="fa fa-lock"></i><input type="password" name="clave"placeholder="CLAVE (EXPEDIENTE):">
					<select name="roles" id="" style="display:none;">
						<option value="PROMOTOR"></option>
					</select>
					<div class="submit">
						<button type="submit" value="Registrar" onclick="registarUsuario();">
							Registrar
						</button>
					</div>
              </form>
            <!--carga contenido-->
            </div>
        </div>
        <div id="overlay">
            <div class="inner">
            </div>
        </div>
        <div id="masterLogin">
            <div class="inner">       
            </div>
        </div>
    <body>
    </body>
        <script src="../js/global.js"></script>
        <script>
        	var dataRegistro = $("#userInfo");
            $(function() {
                global();
            });
            $(window).bind("load", function() {
                $("#masterLogin").fadeOut('fast');
            });
			function registarUsuario(){
				  var data = dataRegistro.serialize();
			        try{
			          $.ajax({
			            type: "POST",
			            url: "http://187.217.179.35:9000/usuarios/",
			            data: data,
			            success: function(data, a, b){
			              window.location="index.php";
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
        </script>
</html>