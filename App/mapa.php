<?php
    session_start();
    if ($_SESSION["sesion_de"] <>""){
        $sesionDe=$_SESSION["sesion_de"];
    $name=$sessionDe;
    $exp=$_SESSION["exp"];;
        $niv=$_SESSION["niv"];
    $gcm_regid=$_SESSION["gcm_regId"];
    $dist=$_SESSION["dist"];
    // Store user details in db
    include_once './db_functions.php';
    $db = new DB_Functions();
    $res = $db->storeUser($name, $exp, $gcm_regid);
    }else{
        echo "<script>window.location='login.php';</script>";
    }

?>

<!DOCTYPE html>
<html>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
        <div id="menuDisplay">
          <div class="block">
            <a href="index.php">
                <p>Home</p><i class="fa fa-home"></i>
            </a>
          </div>
          <div class="block active">
            <p>Mapa</p><i class="fa fa-map-o"></i>
          </div>
          <a href="mensajeria.php">
              <div class="block">
                <p>Mensajería</p><i class="fa fa-envelope-o"></i>
              </div>
          </a>
          <a href="contrataciones.php">
              <div class="block">
                <p>Contrataciones</p><i class="fa fa-pencil-square-o"></i>
              </div>
          </a>
          <div class="block" onclick="logout();">
            <p>Cerrar Sesión</p><i class="fa fa-key"></i>
          </div>
        </div>
        <div id="wrapper">
            <div id="nav">
                <div id="appMenu">
                    <i class="fa fa-bars"></i>
                </div>
            </div>
            <div id="content">
            <!--carga contenido-->

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
               $("#content").load('mapa/mapa.php',function(status) {
                    $("#masterLogin").fadeOut('fast');
                });
            });

        </script>
</html>
