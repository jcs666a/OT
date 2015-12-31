<!DOCTYPE html>
<html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
  <head>
    <title>Telmex</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<link rel="shortcut icon" href="mapa/images/favico.gif">    
    <meta charset="utf-8">
    <link rel="stylesheet" href="mapa/css/mapa.css">
	<link rel="stylesheet" href="mapa/js/jquery-ui-1.11.4.custom/jquery-ui.css">
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
	<!--<script type="text/javascript" src="mapa/js/jquery-1.10.2"></script>-->
   	<script type="text/javascript" src="mapa/js/jquery-1.11.3"></script>
	<script type="text/javascript" src="mapa/js/jquery-ui-1.10.4.custom.min"></script>
    <script src="mapa/js/jquery.tabSlideOut.v1.3.js"></script>
	<script type="text/javascript" src="mapa/js/corner.js"></script>    
	<script type="text/javascript" src="mapa/js/mapaDin.js"></script> 
	<script type="text/javascript" src="mapa/js/mapa.js"></script> 
    
    
<!-- socket por demanda de distritos -->    
    <script src="mapa/js/funcionesDistritosXdemanda.js"></script>
    <script src="mapa/js/sockjs-0.3.4.js"></script>
    <script src="mapa/js/stomp.js"></script>

<!-- HIGHCHART -->
	<script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
    <script src="http://code.highcharts.com/modules/data.js"></script>
    <script src="http://code.highcharts.com/modules/drilldown.js"></script>
    
<!-- tecnologias  -->
    <script src="mapa/js/pinta_tecnologias.js"></script>  
    
<!-- TAG -->
      <link rel="stylesheet" type="text/css" href="mapa/js/jQuery-Tagit-master/css/tagit-stylish-yellow.css">

<!-- CALENDAR -->

    <!--<link rel="stylesheet" href="mapa/js/calendar/development-bundle/themes/base/jquery.ui.all.css">
    <script src="mapa/js/calendar/development-bundle/ui/jquery.ui.core.js"></script>-->



<?php 
	//require_once("include/connect_red.php");
?>    
  	</head>
    <body>
    	

        
		<div id="header">
        	<div id="menuPuller"></div>
            <img src="mapa/images/logo_white.png" border="0" style="margin-top:5px; margin-left:20px;">
            <div id="menuPullerWiket"></div>
        </div>
     	<div id="contadorcillo" style="background-color:#D8F781; line-height:30px; position:relative; z-index:3; font-family:Arial, Helvetica, sans-serif; font-size:18px; padding-left:10px;"></div>
        <div id="map-canvas"></div>
		
        <div id="menu">
  				<div class="titleMenu" id="menuJumper">
					<table style="width:100%;">
                    	<tr>
                        	<td>Opciones de cartograf&iacute;a</td>
                            <td style="text-align:right;"><img src="mapa/images/arrow_entra.png" align="absmiddle" border="0" style="cursor:pointer;" /></td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div>
                <div id="accordion">
                  <h3>Geograf&iacute;a Telmex</h3>
                  <div>
                  		
                    	<p>Seleccione los filtros para ver el detalle.</p>
 						<table style="padding:5px; width:100%; border:#CCCCCC solid 1px; background-color:#EFF8FB;">
                            <tr>
                            	<td style="text-align:right;">Divisi&oacute;n: </td>
                                <td>
                                    <select name="divisionesGeoTel" id="divisionesGeoTel" onChange="muestraRegs(this.value);" style="width:180px;">
                                        <option value="0" selected>.: Seleccione una opci&oacute;n :.</option>
										<?php
											$divisiones =  json_decode(file_get_contents('http://10.105.116.52:9090/getCatalog/CatalogoDivisiones'));

											foreach($divisiones as $apiResponse){
												foreach($apiResponse as $valor){
													echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
												}												
											}																				
										?>                                        
	                                </select>                                                                
                                </td>
                            </tr>
                            <tr>
                            	<td style="text-align:right;">&Aacute;rea: </td>
                                <td>
                                    <select  id="areasGeoTel" name="areasGeoTel" onChange="muestraDistritosxOPC();" style="width:180px;">
                                        <option value="0">.: Seleccione una opci&oacute;n :.</option>
                                    </select>                            
                                </td>
                            </tr>
                            <tr>
                            	<td colspan="2">
								  <div style="margin-left:3px; display:none;" id="districtOpcGeoTelCombo">                            
                                        <table>
                                        	<tr>
                                                <td style="text-align:right;">Distrito(s): </td>
                                                <td>
                                                  <select  id="districtOpcGeoTel" name="districtOpcGeoTel" onChange="muestraDistritosxArea(this.value);" style="width:180px;">
                                                    <option value="0">.: Selecciona una opci&oacute;n :.</option>
                                                        <option value="1">Seleccionar distritos para mostrar</option>
													<option value="2">Todos los distritos</option>                                                        
                                                  </select>                            
                                                </td>
                                           	</tr>
                                        </table>                                    
                                  </div>
                                </td>                                            
                            </tr>                            
                      <tr>
                            	<td colspan="2">
									<div style="margin-left:14px; display:none;" id="distritosText">
                                        <table>
                                            <tr>
                                                <td style="text-align:right;">Distritos: </td>
                                                <td>
                                                    <input type="text" id="distritosGeoTel" data-name="nameOfSelect" name="distritosGeoTel"  style="width:120px;"> <img src="mapa/images/btn_add.png" border="0" style="cursor:pointer; margin-bottom:1px;" align="absbottom" onClick="agregaDist();">
                                                </td>
                                            </tr> 
                                            <tr>
                                            	<td></td>
                                            	<td>
                                                	<ul id="listaDist" style="width:250px; max-height:50px; overflow:auto;"></ul>                                                
                                                 </td>
                                            </tr>                                    
                                        </table>                                    
                                    </div>
                                </td>
                            </tr>
                            <tr><td><div style="height:5px;" id="listadoDistricts">&nbsp;</div></td></tr>                   
                            <tr>
                            	<td></td>
                                <td> <input type="button" id="mostrarDatosGeoTel" value="Mostrar" onClick="cargaReg();" ></td>
                            </tr>
                            <!--<tr><td style="line-height:20px;" colspan="2"><hr></td></tr>-->  
                        </table>
                        
                       <!-- <div id="opcionesOver">
                            <p>Seleccione un elemento para mostrar en el mapa</p>
                            <table style="border:#CCCCCC solid 1px; background-color:#EFF8FB; padding:5px; width:100%;">
                                <tr>
                                    <td>Necropsia</td>
                                    <td><input type="checkbox" id="btnMuestraNecro" value="1"></td>
                                </tr>
                                <tr><td colspan="2" style="border-bottom:#999999 solid 1px;"></td></tr>                            
                                <tr>
                                    <td>Consumos</td>
                                    <td><input type="checkbox" id="btnMuestraConsumos" value="2"></td>
                                </tr>
                                <tr><td colspan="2" style="border-bottom:#999999 solid 1px;"></td></tr>                                                        
                                <tr>
                                    <td>Facturaci&oacute;n</td>
                                    <td><input type="checkbox" id="btnMuestraFactura" value="2"></td>
                                </tr>
                            </table>  
                      	</div>-->
                                          
                                   
                  </div>                 
<!--                  <h3>Geograf&iacute;a</h3>
                  <div>
                    <p>Seleccione un estado para ver el detalle</p>
                    <table>
                    	<tr>
                        	<td>
                                <select name="estadosGeo" id="estadosGeo">
                                    <option value="0">.: Seleccione una opci&oacute;n :.</option>
                                </select>                            
                            </td>
                        </tr>
                        <tr>
                        	<td> <input type="button" id="mostrarDatosGeo" value="Mostrar">  <input type="button" id="quitarDatosGeo" value="quitar" onClick="quita();"></td>
                        </tr>
                    </table>
					<br><br>
                  </div>-->
                  <h3>Eventos en tiempo real</h3>
                  <div>
                    <p>Seleccione un elemento para mostrar en el mapa</p>
                    <table style="border:#CCCCCC solid 1px; background-color:#F1F8E0; padding:5px; width:100%;">
                        <tr>
                        	<td>Quejas</td>
                            <td><input type="checkbox" id="btnMuestraQuejasMapa" value="1"></td>
                        </tr>
                       <tr><td colspan="2" style="border-bottom:#999999 solid 1px;"><div id="div_1" style="display:none;"></div></td></tr>
                      <!--   <tr>
                        	<td>Nuevo Equipo</td>
                            <td><input type="checkbox" id="btnMuestraEquipoMapa" value="2"></td>
                        </tr>
                        <tr><td><div id="div_2" style="display:none;"></div></td></tr>-->
                    </table>
					<br><br>
                  </div>
        	   </div>	
               
		</div>

		<div id="widgets" ></div>	
        

		<div id="menuWiket">
  				<div class="titleMenuWiket" id="menuJumperWiket">
					<table style="width:100%;">
                    	<tr>
                            <td><img src="mapa/images/arrow_entra_right.png" align="absmiddle" border="0" style="cursor:pointer;" /></td>
                            <td style="text-align:left; padding-left:30px;">Men&uacute; de Widgets</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div>
                <ul id="gallery">
                    <li id="live">
                        <div style="background-color:#E6E6E6;">Quejas Tiempo Real</div>
                        <div style="text-align:center;"><img src="mapa/images/realtime.PNG" alt="Quejas en Tiempo Real" /></div>
                    </li>
    			</ul>                 

                      
        </div>
       	<div id="activos" style="display:none;">
        	<div style="background-color:#999999; line-height:35px; text-align:center; font-size:20px; color:#FFFFFF; cursor:pointer;" id="escondedorActivos">Elementos activos en el mapa</div>
            <div id="contenedorActivos">
                <table style="width:98%;">
                    <tr>
                        <td>
                            <div>
                                <!--<table id="encabezadosActivos" style="background-color:#CCCCCC; padding:5px; float:left; width:100%;">
                                    <tr>
                                        <td style="width:60px; text-align:center;">Mostrar</td>
                                        <td style="width:350px;">Elemento</td>
                                        
                                    </tr>
                                </table>-->
                                <ul style="margin:0px; padding:0px; width:100%;" id="encabezadosActivos">
                                	<li style="width:75px; text-align:center;"  class="activoEnlaLista">Mostrar</li>
                                    <li style="width:326px;" class="activoEnlaLista">Elemento</li>
                                    <li style="width:80px;" class="activoEnlaLista">Opciones</li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                            	<ul style="margin:0px; padding:0px; width:100%;" id="divic"></ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                            	<ul style="margin:0px; padding:0px; width:100%;" id="ares"></ul>
                            </div>
                        </td>
                    </tr>      
                    <tr>
                        <td>
                            <div>
                            	<ul style="margin:0px; padding:0px; width:100%;" id="distr"></ul>
                            </div>
                        </td>
                    </tr>                          
                </table>
        	</div>
        </div>
        
        <div id="detalleSlide" style="display:none;">
  				<div class="titleMenuWiket" id="menuPullerSlide">
					<table style="width:100%;">
                    	<tr>
                            <td><img src="mapa/images/arrow_entra_right.png" align="absmiddle" border="0" style="cursor:pointer;" /></td>
                            <td style="text-align:left; padding-left:30px;">Detalles Estadisticos</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div> 
                <div id="graphSlide">
                
                </div>      
        </div>
        
        <div id="socketizable" style="visibility:hidden; min-width:400px;">
            <div class='titu' style="line-height:40px; min-width:400px; background-color:#336699; font-family:Arial, Helvetica, sans-serif; color:#FFFFFF; text-align:left; font-size:18px;"> <img src="mapa/images/move_icon.png" border="0" style="cursor:pointer; float:left; margin-right:7px; margin-left:10px; margin-top:10px;"> Heat-Map de necropsia por distrito, por &aacute;rea. <img src="mapa/images/closeBtnSmall.png" border="0" onClick="resizas();" style="cursor:pointer; float:right; margin-right:7px; margin-top:7px;" align="absmiddle"></div>
            <div id="distritosXareaPOP"></div>
        </div>
   
		<div id="mapasdinamicos"></div>
   		
<!--DIALOGS-->
   		<div id="necroDialog" title="Opciones de Consulta" style="font-size:14px;">
			<table style=" font-family:Arial, Helvetica, sans-serif; font-size:11px; width:400px;">
            	<tr>
                	<td colspan="2" style="font-size:14px; background-color:#92E9D4;" ><strong>Selecciona los filtros necesarios:</strong></td>
                </tr>
                <tr><td colspan="2"><div style="height:20px;"><hr></div></td></tr>
                <tr>
                	<td><strong>Fecha inicial</strong></td>
                    <td><strong>Fecha Final</strong></td>
                </tr>
                <tr>
                	<td><div id="iniOpcNecrop"></div></td>
                    <td><div id="finiOpcNecrop"></div></td>
                </tr>
				<tr>
                	<td colspan="2">
                    	<table>
                            <tr>
                                <td>Bajas </td><td><input type="checkbox" value="1" id="opcNecropBajas"></td>
                            </tr>
                            <tr>
                                <td>Altas </td><td><input type="checkbox" value="2" id="opcNecropAltas"></td>                
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        
   		<div id="tecnoDialog" title="Opciones de Consulta" style="font-size:14px;"></div>        
        
        
<div id="ocultos"></div>
</body>
</html>
