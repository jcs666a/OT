
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=320, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>
    <body>
        <div id="wrapper">
            <div id="content">
            <!--carga contenido-->
              <form id="formulario" method="post">
              <!--  <div id="newUser">
                  <a href="views/newUser.php">
                    <i class="fa fa-user-plus"></i>
                  </a>
                </div>-->
                <div class="content">
                    <p>Inicio de sesión</p>
                <div class="logo"></div>
                <i class="fa fa-user"></i><input type="text" id="usuario" name="usuario" placeholder="USUARIO:">
                <br>
                <i class="fa fa-lock"></i><input type="password" id="clave" name="clave" placeholder="CONTRASEÑA:" >
                 <div id="error"></div>
                <input type="hidden" id="regid" name="regid" value="<?php echo $_GET['regid'];?>" />
                <button type="button" value="Ingresar"  onclick="validate(); ">
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
