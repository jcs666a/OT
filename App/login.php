<?php
if (isset($_POST["name"]) && isset($_POST["exp"]) && isset($_POST["regId"]))
  $name = $_POST["name"];
	$exp = $_POST["exp"];
	$gcm_regid = $_POST["regId"];
?>

<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
        <div id="wrapper">
            <div id="content">
            <!--carga contenido-->
              <form id="formulario" method="post">
                <div id="newUser">
                  <a href="views/newUser.php">
                    <i class="fa fa-user-plus"></i>
                  </a>
                </div>
                <div class="content">
                    <p>inicio de sesion</p>
                <div class="logo"></div>
                <i class="fa fa-user"><input type="text" id="usuario" name="usuario" placeholder="USUARIO:">
                <i class="fa fa-lock"><input type="password" id="clave" name="clave" placeholder="CONTRASEÑA:" >
                    <select name="regId" style="display:none;" id="regid">
                        <option value="<?php echo $gcm_regid ?>"></option>
                    </select>
                <button type="submit" value="Submit"  onclick="enviarUsuario(); " id="botonLogin">
                  Ingresar
                </button>
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
        <script src="js/global.js"></script>
        <script>
            $(function() {
                global();
            });
            $(window).bind("load", function() {
                $("#masterLogin").fadeOut('fast');
            });
        </script>
</html>