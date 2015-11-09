<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Telmex  | Dashboard</title>
    <script type="text/javascript" src="js/jquery-1.4.2.js"></script>
    <script src="js/materialize.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/mapa.js"></script>
    <script type="text/javascript" src="js/jquery.corner.js"></script>
    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
    <link rel="stylesheet" href="css/custum.css">
</head>
<body>
    <div id="login-wrapper">
        <h1>Bienvenido a Telmex <span>C4</span></h1>
         <div class="inner">
            <form id="homeLoading" method="post">
                <span class="error">Nombre de usuario o contraseña incorrectos</span>
                <div class="content">
                <p>Por favor registrate para validar tus datos.</p>
                <input type="text" name="usuario" id="usr" onChange="this.value=validar(this.value)" class="caja"  maxlength="20" placeholder="Usuario:" />
                <input type="password" name="clave" id="pwd" onChange="this.value=validar(this.value)"  class="caja" maxlength="20" placeholder="Contraseña:"  />
               <div class="button-holder">
                    <buttom type="button" value="Ingresar" onclick="validate();" class="btn waves-effect waves-light red darken-1">
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
</body>
</html>
