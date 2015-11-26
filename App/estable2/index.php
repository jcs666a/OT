<?php
    session_start();
    if ($_SESSION["sesion_de"] <>""){
      $sesionDe=$_SESSION["sesion_de"];
      $name=$sessionDe;
      $exp=$_SESSION["exp"];
      $niv=$_SESSION["niv"];
      $gcm_regid=$_SESSION["gcm_regId"];
      $dist=$_SESSION["dist"];
      $iduser=$_SESSION["iduser"];

   }else{
        echo "<script>window.location='login.php?regid=".$_GET['regid']."';</script>";
    }
?>
<!DOCTYPE html>
<html>
        <meta name="viewport" content="width=320, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
        <div id="menuDisplay">
          <div class="block active">
            <p>Home</p><i class="fa fa-home"></i>
          </div>
          <a href="mapa.php">
              <div class="block">
                <p>Mapa</p><i class="fa fa-map-o"></i>
              </div>
          </a>
          <a href="mensajeria.php">
              <div class="block">
                <p>Mensajería</p><i class="fa fa-envelope-o"></i>
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
            <p>Cerrar Sesión</p><i class="fa fa-key"></i>
          </div>
        </div>
        <div id="wrapper">
            <div id="nav">
               <!-- <div id="appMenu">
                    <i class="fa fa-bars"></i>
                </div>-->
            </div>
            <div id="content">
            <!--carga contenido-->
                <div class="homeInner">
                  <p>Bienvenido <strong><?php echo $sesionDe; ?> </strong></p>
                  <small>Elige tu actividad:</small>
                  <br>
                  <div class="activity">
                    <div class="boxSlide active2">        
                       <i class="fa fa-home"></i>
                       <p>Home</p>
                    </div>
                    <div class="boxSlide">
                      <a href="mapa.php">
                        <div class="inner">
                          <i class="fa fa-map-o"></i>
                          <p>Mapa</p>
                        </div>
                      </a>
                    </div>
                    <div class="boxSlide">
                      <a href="mensajeria.php">
                        <div class="inner">
                          <i class="fa fa-envelope-o">
                            <span>3</span>
                          </i>
                          <p>Mensajería</p>
                        </div>
                      </a>
                    </div>
                    <div class="boxSlide">
                      <a href="campanias.php">
                        <div class="inner">
                          <i class="fa fa-star"></i>
                          <p>Campañas</p>
                        </div>
                      </a>
                    </div>
                    <div class="boxSlide">
                      <a href="contrataciones.php">
                        <div class="inner">
                          <i class="fa fa-pencil-square-o"></i>
                          <p>Contrataciones</p>
                        </div>
                      </a>
                    </div>
                    <div class="boxSlide">
                      <a href="#" onclick="logout();">
                          <div class="inner">
                            <i class="fa fa-key"></i>
                            <p>Cerrar Sesión</p>
                          </div>
                      </a>
                    </div>
                  </div>
                  <!--contendio home-->
                </div>
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
                homeAnimation();
            });
            $(window).bind("load", function() {
                $("#masterLogin").fadeOut('fast');
            });
        </script>
</html>
