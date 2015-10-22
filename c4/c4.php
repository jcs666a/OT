<?php
    session_start();
    if ($_SESSION["sesion_de"] <>""){
        $sesionDe=$_SESSION["sesion_de"];
        $niv=$_SESSION["niv"];
    }else{
        echo "<script>window.location='index.php';</script>";
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="img/favico.gif">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
    <meta name="theme-color" content="#2196F3">
    <title>Telmex C4</title>
    <script>var tipoUser = "<?php echo $niv; ?>";</script>
    <!-- CSS  -->
    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="css/custum.css">
 <style type="text/css">
            div.clear{
                clear: both;
            }
            ul.devices{
                margin: 0;
                padding: 0;
            }
            ul.devices li{
                float: left;
                list-style: none;
                border: 1px solid #dedede;
                padding: 10px;
                margin: 0 15px 25px 0;
                border-radius: 3px;
                -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                box-shadow: 0 1px 5px rgba(0, 0, 0, 0.35);
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                color: #555;
            }
            ul.devices li label, ul.devices li span{
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 12px;
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
        color: #393939;
                display: block;
                float: left;
            }
            ul.devices li label{
                height: 25px;
                width: 50px;
            }
        </style>
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                
            });
            function sendPushNotification(id){
                var data = $('form#'+id).serialize();
                $('form#'+id).unbind('submit');                
                $.ajax({
                    url: "send_message.php",
                    type: 'GET',
                    data: data,
                    beforeSend: function() {
                         
                    },
                    success: function(data, textStatus, xhr) {
                          $('.txt_message').val("");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                         
                    }
                });
                return false;
            }
            function sendBroadcast(){
                var data = $('form#').serialize();
                $('form#').unbind('submit');                
                $.ajax({
                    url: "index.php",
                    type: 'GET',
                    data: data,
                    beforeSend: function() {
                         
                    },
                    success: function(data, textStatus, xhr) {
                          $('.txt_message').val("");

                    },
                    error: function(xhr, textStatus, errorThrown) {
       
                    }
                });
                return false;
            }
        $(function() {
                $("#navigation a").stop().animate({"marginLeft":"-85px"},1000);
                $("#navigation > li").hover(
                    function () {
                        $("a",$(this)).stop().animate({"marginLeft":"-2px"},200);
                            },
                    function () {
                        $("a",$(this)).stop().animate({"marginLeft":"-85px"},200);
                            }
                        );
                    });
           var message="This function is not allowed here.";
                   function clickIE4(){

                                 if (event.button==2){
                                 return false;
                                 }
                   }

                   function clickNS4(e){
                                 if (document.layers||document.getElementById&&!document.all){
                                                if (e.which==2||e.which==3){
                                                          return false;
                                                }
                                        }
                   }

                   if (document.layers){
                                 document.captureEvents(Event.MOUSEDOWN);
                                 document.onmousedown=clickNS4;
                   }

                   else if (document.all&&!document.getElementById){
                                 document.onmousedown=clickIE4;
                   }

                   document.oncontextmenu=new Function("return false;")

    </script>
</head>
<body id="top" class="scrollspy">
       <?php
        include_once 'db_functions.php';
        $db = new DB_Functions();
        $users = $db->getAllUsers();
    $gcms = $db->getAllGcmIds();
        $channels = $db->getAllChannels();


        if ($users != false)
            $no_of_users = mysql_num_rows($users);
        else
            $no_of_users = 0;

    if ($channels != false)
            $no_of_channels = mysql_num_rows($channels);
        else
            $no_of_channels = 0;

    $gcmRegIds = array();
        while ($row = mysql_fetch_array($gcms)){
        array_push($gcmRegIds, $row['gcm_regid']);
}
        include_once './GCM.php';
        $gcm = new GCM();
        $pushMessage = $_POST['message'];
        if(isset($gcmRegIds) && isset($pushMessage)) {

        $message = array('mensaje' => $pushMessage);
        $gcm->send_notification($gcmRegIds, $message);
    }
        ?>

<!-- Pre Loader -->
<div id="loader-wrapper">
    <div id="loader"></div>
 
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
 
</div>

<!--Navigation-->
 <div class="navbar-fixed">
    <nav id="nav_f" class="default_color" role="navigation">
        <div class="container">
            <div class="nav-wrapper"><a id="logo-container" href="#top" class="brand-logo">Telmex C4</a>
            <ul id="nav-mobile" class="right side-nav">
                <li><a href="#intro">Fielders</a></li>
                <li><a href="#work">Proyectos</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#registro" id="newUser" class="triggerOverlay">Nuevo Usuario</a></li>
                <li><a href="#contact">Contacto</a></li>
            </ul><a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
            </div>
        </div>
    </nav>
</div>

<!--Hero-->
<div class="section no-pad-bot" id="index-banner">
    <div class="container">
        <h1 class="text_h center header cd-headline letters type">
            <span>Telmex</span> 
            <span class="cd-words-wrapper waiting">
                <b class="is-visible">C4</b>
                <b>esta contigo</b>
            </span>
        </h1>
    </div>
</div>


<!--Intro and service-->
    <div id="intro" class="section scrollspy">
        <div id="filter-box">
            <h4>Seleccione los filtros para ver el detalle.</h4>
            <?php include 'distritos.php';?>
            <div class="sendbtn">
                <buttom type="button" value="Buscar" onClick="cargaReg();" class="btn waves-effect waves-light red darken-1 mostrarDatosGeoTel">
                    Enviar
                <i class="mdi-content-send right white-text"></i>
            </button>
            </div>
        </div>
        <div class="container">
            <div class="col s12">
                <h3 class="header text_h2"> Enviar a todos en el canal: <span class="span_h2"> Carlos Slim  </span>
            </div>
            <form name="" class="broad" method="post" onsubmit="return sendBroadcast()">                            
                <div class="send_container">
                    <textarea rows="3" name="message" cols="25" class="materialize-textarea black-text" placeholder="Mensaje"></textarea>
                    <input type="hidden" name="regId" value="<?php echo $gcmRegIds ?>"/>
                    <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                        <i class="mdi-content-send right white-text"></i>
                    </button>
                </div>
            </form>
        </div>
        <div  class="col s12">
            <h2 class="center header text_h2">Dispositivos Registrados: <?php echo $no_of_users; ?>
        </div>
        <ul class="devices">
            <?php
                if ($no_of_users > 0) {
            ?>
            <?php
                while ($row = mysql_fetch_array($users)) {
            ?>
            <li>
                <form id="<?php echo $row["id"] ?>" name="" method="post" onsubmit="return sendPushNotification('<?php echo $row["id"] ?>')">
                    <label class="blue-text">Nombre: </label>
                    <span class="black-text"><?php echo $row["name"] ?></span>                                
                    <div class="clear"></div>
                    <label class="blue-text">Exp:</label> 
                    <span  class="black-text"><?php echo $row["exp"] ?></span>
                    <div class="clear"></div>
                    <label class="blue-text">Distrito: </label>
                    <span class="black-text"><?php echo $row["distrito"] ?></span> 
                    <div class="send_container">
                        <textarea rows="3" id="mensaje" name="message" cols="5" class="materialize-textarea black-text" placeholder="Mensaje"></textarea>
                        <input type="hidden" name="regId" value="<?php echo $row["gcm_regid"] ?>"/>
                        <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                            <i class="mdi-content-send right white-text"></i>
                        </button>
                        <button class="btn waves-effect waves-light green accent-4 triggerOverlay" type="submit" id="edit">Editar
                            <i class="mdi-content-create right white-text"></i>
                        </button>
                    </div>
                </form>
            </li>
            <?php }
            } else { ?>
            <li>
                No existen registros!
            </li>
            <?php } ?>
        </ul>
        <div  class="col s12 m4 l4">
            <div class="center promo promo-example">
                <i class="mdi-image-flash-on"></i>
                <h5 class="promo-caption">PDM</h5>
                <p class="light center">Atacar zonas con mayor foco.</p>
            </div>
        </div>
        <div class="col s12 m4 l4">
            <div class="center promo promo-example">
                <i class="mdi-social-group"></i>
                <h5 class="promo-caption">Fielders</h5>
                <p class="light center">Cuadrillas de trabajo dedicadas a difundir ofertas comerciales de Telmex.</p>
            </div>
        </div>
        <div class="col s12 m4 l4">
            <div class="center promo promo-example">
                <i class="mdi-hardware-desktop-windows"></i>
                <h5 class="promo-caption">Canales</h5>
                <p class="light center">Canales disponibles de los usuarios</p>
            </div>
        </div>
    </div>
<!--Work-->
<div class="section scrollspy" id="work">
    <div class="container">
        <h2 class="header text_b">Proyectos </h2>
        <div class="row">
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/sandiegoday.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Mapas Telmex<i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="http://10.105.116.58/mapa" target="_blank">Mapas Telmex</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Mapas Telmex <i class="mdi-navigation-close right"></i></span>
                        <p>Sistema de monitoreo de cajas y cajeros.</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/sandiegonight.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Cajas y Cajeros <i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="http://cajasycajeros.telmex.com/" target="_blank">Cajas y Cajeros</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Cajas y Cajeros <i class="mdi-navigation-close right"></i></span>
                        <p>Sistema de monitoreo de cajas y cajeros.</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/montaña.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Project Title <i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="#" target="_blank">Project link</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Project Title <i class="mdi-navigation-close right"></i></span>
                        <p>Here is some more information about this project that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/playa.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Project Title <i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="#" target="_blank">Project link</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Project Title <i class="mdi-navigation-close right"></i></span>
                        <p>Here is some more information about this project that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/parque.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Project Title <i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="#" target="_blank">Project link</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Project Title <i class="mdi-navigation-close right"></i></span>
                        <p>Here is some more information about this project that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
            <div class="col s12 m4 l4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="img/puente.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Project Title <i class="mdi-navigation-more-vert right"></i></span>
                        <p><a href="#" target="_blank">Project link</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Project Title <i class="mdi-navigation-close right"></i></span>
                        <p>Here is some more information about this project that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Parallax-->
<div class="parallax-container">
    <div class="parallax"><img src="img/parallax1.png"></div>
</div>

<!--Team-->
<div class="section scrollspy" id="team">
    <div class="container">
        <h2 class="header text_b"> Team </h2>
        <div class="row">
            <div class="col s12 m3">
                <div class="card card-avatar">
                    <div class="waves-effect waves-block waves-light">
                        <img class="activator" src="img/avatar1.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Hector Slim <br/>
                            <small><em><a class="red-text text-darken-1" href="#">CEO</a></em></small></span>
                        <p>
                            <a class="blue-text text-lighten-2" href="https://www.facebook.com/joash.c.pereira">
                                <i class="fa fa-facebook-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://twitter.com/im_joash">
                                <i class="fa fa-twitter-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://plus.google.com/u/0/+JoashPereira">
                                <i class="fa fa-google-plus-square"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col s12 m3">
                <div class="card card-avatar">
                    <div class="waves-effect waves-block waves-light">
                        <img class="activator" src="img/avatar2.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Alvaro Sanchez<br/>
                            <small><em><a class="red-text text-darken-1" href="#">Designer</a></em></small>
                        </span>
                        <p>
                            <a class="blue-text text-lighten-2" href="https://www.facebook.com/joash.c.pereira">
                                <i class="fa fa-facebook-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://twitter.com/im_joash">
                                <i class="fa fa-twitter-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://plus.google.com/u/0/+JoashPereira">
                                <i class="fa fa-google-plus-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://www.linkedin.com/in/joashp">
                                <i class="fa fa-linkedin-square"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col s12 m3">
                <div class="card card-avatar">
                    <div class="waves-effect waves-block waves-light">
                        <img class="activator" src="img/avatar3.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            Enrique Gonzalez <br/>
                            <small><em><a class="red-text text-darken-1" href="#">CMO</a></em></small></span>
                        <p>
                            <a class="blue-text text-lighten-2" href="https://www.facebook.com/joash.c.pereira">
                                <i class="fa fa-facebook-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://twitter.com/im_joash">
                                <i class="fa fa-twitter-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://plus.google.com/u/0/+JoashPereira">
                                <i class="fa fa-google-plus-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://www.linkedin.com/in/joashp">
                                <i class="fa fa-linkedin-square"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col s12 m3">
                <div class="card card-avatar">
                    <div class="waves-effect waves-block waves-light">
                        <img class="activator" src="img/avatar4.png">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">Erick Vivanco<br/>
                            <small><em><a class="red-text text-darken-1" href="#">Developer</a></em></small></span>
                        <p>
                            <a class="blue-text text-lighten-2" href="https://www.facebook.com/joash.c.pereira">
                                <i class="fa fa-facebook-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://twitter.com/im_joash">
                                <i class="fa fa-twitter-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://plus.google.com/u/0/+JoashPereira">
                                <i class="fa fa-google-plus-square"></i>
                            </a>
                            <a class="blue-text text-lighten-2" href="https://www.linkedin.com/in/joashp">
                                <i class="fa fa-linkedin-square"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Footer-->
<footer id="contact" class="page-footer default_color scrollspy">
    <div class="container">  
        <div class="row">
            <div class="col l6 s12">
                <form class="col s12" action="contact.php" method="post">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="mdi-action-account-circle prefix white-text"></i>
                            <input id="icon_prefix" name="name" type="text" class="validate white-text">
                            <label for="icon_prefix" class="white-text">Nombre</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="mdi-communication-email prefix white-text"></i>
                            <input id="icon_email" name="email" type="email" class="validate white-text">
                            <label for="icon_email" class="white-text">Email</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="mdi-editor-mode-edit prefix white-text"></i>
                            <textarea id="icon_prefix2" name="message" class="materialize-textarea white-text"></textarea>
                            <label for="icon_prefix2" class="white-text">Mensaje</label>
                        </div>
                        <div class="col offset-s7 s5">
                            <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                                <i class="mdi-content-send right white-text"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col l3 s12">
                <h5 class="white-text">telmex.com</h5>
                <ul>
                    <li><a class="white-text" href="http://www.telmex.com/">Home</a></li>
                    <li><a class="white-text" href="http://blog.telmex.com/">Blog</a></li>
                </ul>
            </div>
            <div class="col l3 s12">
                <h5 class="white-text">Social</h5>
                <ul>
                    <li>
                        <a class="white-text" href="https://twitter.com/TELMEXSoluciona?lang=es">
                            <i class="small fa fa-twitter-square white-text"></i> Twitter
                        </a>
                    </li>
                    <li>
                        <a class="white-text" href="https://www.facebook.com/telmex?fref=ts">
                            <i class="small fa fa-facebook-square white-text"></i> Facebook
                        </a>
                    </li>
                    <li>
                        <a class="white-text" href="https://plus.google.com/u/0/116694533553464118545/posts">
                            <i class="small fa fa-google-plus-square white-text"></i> Google Plus
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-copyright default_color">
        <div class="container">
            Made by <a class="white-text" href="http://joashpereira.com">Erick Vivanco</a>.
        </div>
    </div>
</footer>
<div id="overlay">
    <div class="inner">
        <div id="close-overlay" onclick="overlayClose();">X</div>
        <div id="laod">
            <div class="logo-box">
                <h3><span>Telmex</span> C4</h3>
            </div>
            <div id="loadPlace">
            </div>
        </div>
    </div>
</div>
    <!--  Scripts-->
    <script src="min/plugin-min.js"></script>
    <script src="min/custom-min.js"></script>
    <script src="js/materialize.min.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="js/mapa.js"></script>
<script>
$(document).ready(function() {
    $('.divisionesGeoTel').material_select();
    $(".triggerOverlay").click(function(event) {
        var getId = this.id;
        $("#loadPlace").load(getId+".php", function(){
                $("#overlay").fadeIn('slow');
            });
        });
});
</script>
    </body>
</html>
