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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
        <div id="menuDisplay">
          <a href="index.php">
              <div class="block">
                <p>Home</p><i class="fa fa-home"></i>
              </div>
          </a>
          <a href="mapa.php">
              <div class="block">
                <p>Mapa</p><i class="fa fa-map-o"></i>
              </div>
          </a>
          <div class="block active">
            <p>Mensajería</p><i class="fa fa-comment-o"></i>
          </div>
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
                <div class="mensageInner">
                    <h3>Mensajería</h3>
                    <div class="inner">
                      <div class="MensageHolder">
                        <div class="image">
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div class="text">
                            <div class="center">
                               <span>15/11/2</span> <span>13:24</span>
                            </div>
                          <div id="readit">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-check"></i>
                          </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, velit, non. Pariatur in, fugiat laboriosam tempora debitis eum voluptatibus neque, consequatur sint saepe ipsum quos officia rerum aperiam possimus maxime.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit pariatur modi eaque ratione temporibus iusto architecto voluptatum, exercitationem adipisci harum nihil laboriosam fugit ipsa voluptates quasi dolorem cumque tempora?</p>
                        </div>
                      </div>
                      <div class="MensageHolder">
                        <div class="image">
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div class="text">
                            <div class="center">
                               <span>15/11/2</span> <span>13:24</span>
                            </div>
                          <div id="readit">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-check"></i>
                          </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, velit, non. Pariatur in, fugiat laboriosam tempora debitis eum voluptatibus neque, consequatur sint saepe ipsum quos officia rerum aperiam possimus maxime.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit pariatur modi eaque ratione temporibus iusto architecto voluptatum, exercitationem adipisci harum nihil laboriosam fugit ipsa voluptates quasi dolorem cumque tempora?</p>
                        </div>
                      </div>
                      <div class="MensageHolder">
                        <div class="image">
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div class="text">
                            <div class="center">
                               <span>15/11/2</span> <span>13:24</span>
                            </div>
                          <div id="readit">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-check"></i>
                          </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, velit, non. Pariatur in, fugiat laboriosam tempora debitis eum voluptatibus neque, consequatur sint saepe ipsum quos officia rerum aperiam possimus maxime.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit pariatur modi eaque ratione temporibus iusto architecto voluptatum, exercitationem adipisci harum nihil laboriosam fugit ipsa voluptates quasi dolorem cumque tempora?</p>
                        </div>
                      </div>
                      <div class="MensageHolder">
                        <div class="image">
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div class="text">
                            <div class="center">
                               <span>15/11/2</span> <span>13:24</span>
                            </div>
                          <div id="readit">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-check"></i>
                          </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, velit, non. Pariatur in, fugiat laboriosam tempora debitis eum voluptatibus neque, consequatur sint saepe ipsum quos officia rerum aperiam possimus maxime.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit pariatur modi eaque ratione temporibus iusto architecto voluptatum, exercitationem adipisci harum nihil laboriosam fugit ipsa voluptates quasi dolorem cumque tempora?</p>
                        </div>
                      </div>
                      <div class="MensageHolder">
                        <div class="image">
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div class="text">
                            <div class="center">
                               <span>15/11/2</span> <span>13:24</span>
                            </div>
                          <div id="readit">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-check"></i>
                          </div>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, velit, non. Pariatur in, fugiat laboriosam tempora debitis eum voluptatibus neque, consequatur sint saepe ipsum quos officia rerum aperiam possimus maxime.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae odit pariatur modi eaque ratione temporibus iusto architecto voluptatum, exercitationem adipisci harum nihil laboriosam fugit ipsa voluptates quasi dolorem cumque tempora?</p>
                        </div>
                      </div>
                    </div>
                  <div id="readMore">
                    <p>leer más +</p>
                  </div>
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
            });
            $(window).bind("load", function() {
                $("#masterLogin").fadeOut('fast');
            });
        </script>
</html>
