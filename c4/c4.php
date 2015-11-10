<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="img/favico.gif">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
    <meta name="theme-color" content="#2196F3">
    <title>Telmex C4</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" charset="UTF-8"></script>
    <?php include_once 'variables.php'; echo $var_script; ?>

    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="css/custum.css">
</head>
<body id="top" class="scrollspy dentroc4">
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
                <li><a href="#registro" id="newUser" class="triggerOverlay editar">Usuarios</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li><a href="#salir" id="salir">Salir</a></li>
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
        <div id="filter-box" class="editar">
            <h4>Seleccione los filtros para ver el detalle.</h4>
            <?php include 'distritos.php';?>
        </div>
        <div id="container_mensajes" class="container mensajes" style="display:none;">
            <div class="col s12">
                <h3 class="header text_h2"> Enviar a todos en el canal: <span class="span_h2"> Carlos Slim  </span>
            </div>
            <form id="broad_msg" name="broad_msg" class="broad" method="post" target="./">
                <div class="send_container">
                    <textarea rows="3" id="message_all" name="message_all" cols="25" placeholder="Mensaje"></textarea>
                    <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                        <i class="mdi-content-send right white-text"></i>
                    </button>
                </div>
            </form>
        </div>

        <div id="showUP">
            <div  class="col s12">
                <h2 class="center header text_h2"></h2>
            </div>
            <ul class="devices">
                <li class="over"><span>Enviando mensaje</span></li>
            </ul>
        </div>

        <div class="section scrollspy">
            <div class="container">
                <div class="row">
                    <div class="col s12 m4 l4">
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
        <div id="close-overlay" onclick="overlayClose();"><span>x</span></div>
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
    <script src="min/plugin-min.js" charset="UTF-8"></script>
    <script src="min/custom-min.js" charset="UTF-8"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js" charset="UTF-8"></script>
    <script src="js/materialize.min.js" charset="UTF-8"></script>
    <script src="js/mapa.js" charset="UTF-8"></script>
    <script src="js/c4.js" charset="UTF-8"></script>
    </body>
</html>