<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Telmex  | Dashboard</title>
<link href="mapa/css/index.css" rel="stylesheet" type="text/css" />
 <!-- CSS  -->
    <link href="mapa/min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="mapa/min/custom-min.css" type="text/css" rel="stylesheet" >
 <!--  Scripts-->
    <script src="mapa/min/plugin-min.js"></script>
    <script src="mapa/min/custom-min.js"></script>
    <script src="mapa/js/materialize.min.js"></script>
<script type="text/javascript" src="mapa/js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="mapa/js/index.js"></script>
<script type="text/javascript" src="mapa/js/valida.js"></script>
<script type="text/javascript" src="mapa/js/jquery.corner.js"></script>
</head>



<body>
<div id='contenedor'>

<nav>
  <div class="nav-wrapper white">
    <a href="" class="brand-logo"><img src="mapa/images/logo_telmex.png"/></a>
  </div>
</nav>
<div class="spacer_10"></div>
<div id="menu"></div>

	<div id="cuerpo">

    
 <div class="nav-wrapper white">
<h5 class="center header text_h5" style="color:#000066;">Por favor, introduce tu usuario y contrase&ntilde;a para continuar.</h5>
  </div>

   <form class="col s12">
    <div class="row">
      <div class="input-field col s8">
      <i class="mdi-action-account-circle prefix"></i>
        <input type="text" name="usr" id="usr" onChange="this.value=validar(this.value)"  maxlength="20"/>
            <label for="icon_prefix">Nombre</label>
	</div>
</div>
<div class="row">
      <div class="input-field col s8">
  <i class="mdi-notification-vpn-lock prefix"></i>
        <input type="password" name="pwd" id="pwd" onChange="this.value=validar(this.value)" class="caja"  maxlength="20"  />
            <label for="icon_prefix">Contrase&ntilde;a</label>      
	</div>

    </div>
<div class="row">
<div class="etiqueta"></div>
                        <div id="btn_ingresar"></div>
                    </div>
</div>
</form> 

    <div id="footer">


</div> <!--Final contenedor-->

</body>

</html>


