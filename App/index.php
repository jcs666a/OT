<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <meta name="viewport" content="width=320px, initial-scale=1">
  <link rel="stylesheet" href="css/style.css">
  <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
  <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
</head>
<body>
  <!--page1-->
<div data-role="page" id="pageone">
  <div data-role="header">
    <h1>Iniciar Sesión</h1>
  </div>
  <div data-role="content"> 
    <form id="formulario" method="post" action="http://187.217.179.35:9000/login">
      <div id="respuesta"></div>
            <label> Usuario </label>
            <input type="text" id="usuario" name="usuario">
      
            <label> Contraseña</label>
          <input type="password" id="clave" name="clave" >

            <input type="submit" value="Submit"  onclick="enviarUsuario(); " id="botonLogin">
        </form> 
        <a href="#home">home</a>  
  </div>
</div>
<!--page2-->
<div data-role="page" id="home">
  <div data-role="header" data-position="fixed">
      <h1>Panel responsive</h1>
      <a href="#menu" class="ui-btn ui-icon-bars ui-btn-icon-notext ui-corner-all">No text</a>
      <a href="#" class="ui-btn ui-icon-search ui-btn-icon-notext ui-corner-all">No text</a>
  </div>
  <div data-role="main" class="ui-content">
    <div class="inner">
    </div>
    <div id="loading"></div>
  </div>
  <div data-role="panel" id="menu" data-theme="b">
    <ul data-role="listview">
      <li data-icon="eye"><a href="#" id="map-go">Mapas</a></li>
      <li data-icon="heart"><a href="#">Mensajeria</a></li>
    </ul>
  </div>
</div> 
<!---->
</body>
  <script src="js/global.js"></script>
<script>
  $(document).ready(function() {
    global();
  });
</script>
</html>
