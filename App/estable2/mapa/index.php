<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Telmex  | Dashboard</title>

<link href="mapa/css/index.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="mapa/js/jquery-1.4.2.js"></script>
<script type="text/javascript" src="mapa/js/index.js"></script>
<script type="text/javascript" src="mapa/js/valida.js"></script>
<script type="text/javascript" src="mapa/js/jquery.corner.js"></script>

</head>



<body>



<div id='contenedor'>

	<div id="header">

    	<div id="subhead">

        	<div class="spacer_20"></div>

            <table style="width:900px;">

            	<tr>

                	<td><img src="mapa/images/logo_telmex.png" /></td>

                    <td style="text-align:right;"></td>

                </tr>

            </table>

        </div>

        <div class="spacer_10"></div>

        <div id="menu"></div>

    </div>

	<div id="cuerpo">

    

    

        <div id="campos_login">

            <div style="height:34px;"></div>

    

            <table id="formula_index" style="margin:0px auto; vertical-align:top;" cellspacing="15">

            <tr>

                <td colspan="3" style="color:#000066; font-size:20px;">Por favor, introduce tu usuario y contrase&ntilde;a para continuar.</td>

            </tr>

            <tr><td><div style="height:15px;"></div></td></tr>

            <tr>

                <td class="etiqueta">Usuario</td>

                <td>

                    <div class="casilla">

                        <div class="spacer_small"></div>

                        <input type="text" name="usr" id="usr" onChange="this.value=validar(this.value)" class="caja"  maxlength="20"  />

                    </div>

                </td>

                <td rowspan="2"><img src="mapa/images/padlook.png" /></td>

            </tr>

            <tr>

                <td class="etiqueta">Contrase&ntilde;a</td>

                <td>

                    <div  class="casilla">

                        <div class="spacer_small"></div>

                        <input type="password" name="pwd" id="pwd" onChange="this.value=validar(this.value)"  class="caja" maxlength="20"  />

                    </div>

                </td>

            </tr>   

            <tr>

                <td class="etiqueta"></td>

                <td>

                    <div style="width:400px;">

<input type="button" value="Ingresar" onclick="revisaUser();"/>
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


