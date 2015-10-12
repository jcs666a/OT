<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="shortcut icon" href="img/favico.gif">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
    <meta name="theme-color" content="#2196F3">
    <title>Telmex C4</title>

    <!-- CSS  -->
    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
 <!--  Scripts-->
    <script src="min/plugin-min.js"></script>
    <script src="min/custom-min.js"></script>
    <script src="js/materialize-min.js"></script>

<script type="text/javascript">
$(document).ready(function() {
    $('select').material_select();
});</script>
</head>
<body id="top" class="scrollspy">
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
                            <i class="mdi-action-description prefix white-text"></i>
                            <input id="icon_description" name="exp" type="email" class="validate white-text">
                            <label for="icon_email" class="white-text">Expediente</label>
                        </div>
        <div class="input-field col s8">
<i class="mdi-communication-location-on prefix white-text"></i>
   <select>
      <option value="" disabled selected>Distrito</option>
      <option value="1">Distrito 1</option>
      <option value="2">Distrito 2</option>
      <option value="3">Distrito 3</option>
    </select>
  </div>                
	</div>
                        <div class="col offset-s7 s5">
                            <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                                <i class="mdi-content-send right white-text"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

</body>
</html>


