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
    //include_once './db_functions.php';
    //$db = new DB_Functions();
    //$res = $db->storeUser($name, $exp, $gcm_regid);
    }else{
        echo "<script>window.location='login.php';</script>";
    }

?>

<!DOCTYPE html>
<html>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta name="viewport" content="width=320, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <link rel="stylesheet" href="css/style.css">
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
                <p>Mensajería</p><i class="fa fa-comment-o"></i>
              </div>
          </a>
          <a href="campanias.php">
              <div class="block">
                <p>Campañas</p><i class="fa fa-star"></i>
              </div>
          </a>
          <a href="contrataciones.php">
              <div class="block">
                <p>Contrataciones</p><i class="fa fa-pencil-square-o"></i>
              </div>
          </a>
          <div class="block" onclick="logout();">
            <p>Cerrar Sesión</p><i class="fa fa-power-off"></i>

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
                    getWorkAreas('<?php echo $dist;?>');
                   // getDistAutoPrint('<?php echo $dist;?>');
                });
            });

        </script>
</html>
