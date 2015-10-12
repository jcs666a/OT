<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Telmex  | Dashboard</title>
<link href="css/index.css" rel="stylesheet" type="text/css" />
<link rel="shortcut icon" href="images/favico.gif">    
<script type="text/javascript" src="js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/valida.js"></script>
<script type="text/javascript" src="js/jquery.corner.js"></script>
 <!-- CSS  -->
    <link href="min/plugin-min.css" type="text/css" rel="stylesheet">
    <link href="min/custom-min.css" type="text/css" rel="stylesheet" >
 <!--  Scripts-->
    <script src="min/plugin-min.js"></script>
    <script src="min/custom-min.js"></script>
    <script src="js/materialize-min.js"></script>

</head>

<body>

<div id='contenedor'>
	<nav>
  <div class="nav-wrapper white">
    <a href="" class="brand-logo"><img src="images/logo_telmex.png"/></a>
  </div>
</nav>
<div class="spacer_10"></div>
<div id="menu"></div>
	<div id="cuerpo">
   
        <div id="campos_login">
<h6 style="color:#000066;">Por favor, introduce tu usuario y contrase&ntilde;a para continuar.</h6>
               <table id="formula_index" class="responsive-table">
            <tr><td><div style="height:15px;"></div></td></tr>
            <tr>
                <td>
		 <div class="input-field col s6">
                            <i class="mdi-action-account-circle prefix"></i>
                            <input id="icon_prefix" name="usr" id="usr" onChange="this.value=validar(this.value)" maxlength="20" type="text" class="validate">
                            <label for="icon_prefix">Nombre</label>
                        </div>
                </td>
                <td rowspan="2"><img src="images/padlook.png" /></td>
            </tr>
            <tr>
                <td>
 <div class="input-field col s6">
                            <i class="mdi-notification-vpn-lock prefix"></i>
                            <input id="icon_prefix"  name="pwd" id="pwd" onChange="this.value=validar(this.value)"  class="caja" maxlength="20" type="password">
                            <label for="icon_prefix">Contrase&ntilde;a</label>
                        </div>
                </td>
            </tr>   
            <tr>
                <td class="etiqueta"></td>
                <td>
                    <div style="width:400px;">
                        <div id="btn_ingresar"></div>
                    </div>
                </td>
            </tr> 
            <tr>
                <td id="resultados" colspan="3"></td>
            </tr>             
            </table>
        </div>
    </div>
    <div id="footer">
    	<div class="spacer_20"></div>
    	<div id="contenidos_foot">
        	<table id="footer_options">
            	<tr>
                	<td>
                    	<div class="subseccion">Secciones de inter&eacute;s</div>
                    	<ul>
                        	<li>Localiza tu Tienda TELMEX</li>
                            <li>Asómate</li>
                            <li>Revista Voces</li>
                            <li>Videos</li>
                            <li>Lugares de Pago </li>
                            <li>Buscador de Claves Lada </li>
                        </ul>
                    </td>
                	<td>
                    	<div class="subseccion">Educaci&oacute;n Digital es TELMEX</div>
                    	<ul>
                        	<li>Biblioteca Digital TELMEX</li>
                            <li>Académica</li>
                            <li>TELMEX hub</li>
                            <li>Aldea Digital</li>
                            <li>Inttelmex IT</li>
                            <li>CTIN</li>
                            <li>Educación Inicial</li>
                            <li>Fundación Carlos Slim</li>
                        </ul>
                    </td>
                	<td>
                    	<div class="subseccion">Mi TELMEX</div>
                    	<ul>
                        	<li>Consulta tu Recibo TELMEX</li>
                            <li>Paga en línea</li>
                            <li>Compras con financiamiento</li>
                            <li>Recibo TELMEX sin Papel </li>
                        </ul>
                    </td>
                	<td style="border-right:none;">
                    	<div class="subseccion">Lo más consultado</div>
                    	<ul>
                        	<li>Paquetes TELMEX</li>
                            <li>Sitios con cobertura WiFi </li>
                            <li>Portabilidad</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div> <!--Final contenedor-->




</body>
</html>
