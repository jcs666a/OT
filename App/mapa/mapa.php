<!--<?php
    session_start();
    if ($_SESSION["sesion_de"] <>""){
        $sesionDe=$_SESSION["sesion_de"];
        $niv=$_SESSION["niv"];
    }else{
        echo "<script>window.location='index.php';</script>";
    }
?>-->

    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="mapa/images/favico.gif">    
    <meta charset="utf-8">


    <link rel="stylesheet" href="mapa/css/mapa.css">
    <link rel="stylesheet" href="mapa/js/jquery-ui-1.11.4.custom/jquery-ui.css">
    <script type="text/javascript" src="mapa/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="mapa/js/jquery-ui-1.10.4.custom.min.js"></script>
    <script src="mapa/js/jquery.tabSlideOut.v1.3.js"></script>
    <script type="text/javascript" src="mapa/js/corner.js"></script>    
    <script type="text/javascript" src="mapa/js/mapaDin.js"></script> 
    <script>var tipoUser = "2";</script>
    <script type="text/javascript" src="mapa/js/mapa.js" async></script>

    
    
<!-- socket por demanda de distritos -->    
    <script src="mapa/js/funcionesDistritosXdemanda.js"></script>
    <script src="mapa/js/sockjs-0.3.4.js"></script>
    <script src="mapa/js/stomp.js"></script>

 <!--HIGHCHART -->
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
    <script src="http://code.highcharts.com/modules/data.js"></script>
    <script src="http://code.highcharts.com/modules/drilldown.js"></script>

<!-- tecnologias  -->
    <script src="mapa/js/pinta_tecnologias.js"></script>
    <script src="mapa/js/pinta_pois.js"></script> 
    <script src="mapa/js/pinta_pois_All.js"></script>
    
<!-- TAG -->
      <link rel="stylesheet" type="text/css" href="mapa/js/jQuery-Tagit-master/css/tagit-stylish-yellow.css">

<!-- CALENDAR -->

    <!--<link rel="stylesheet" href="mapa/js/calendar/development-bundle/themes/base/jquery.ui.all.css">
    <script src="mapa/js/calendar/development-bundle/ui/jquery.ui.core.js"></script>-->

<style>
    .ui-widget-content, .ui-front, .ui-autocomplete, .ui-widget{
    z-index: 9999 !important;
}
</style>
<?php 
    //require_once("include/connect_red.php");
?>    
        <div id="header">
            <div id="menuPuller">
               <i class="fa fa-filter"></i>
            </div>
        </div>
        <div id="contadorcillo" style="background-color:#D8F781; line-height:30px; position:relative; z-index:3; font-family:Arial, Helvetica, sans-serif; font-size:18px; padding-left:10px;"></div>
        <div id="map-canvas" style="width:100%; height:100%; position:absolute;"></div>
<div id="menu">
    <div id="menuJumper">
        <i class="fa fa-chevron-down"></i>
    </div>
    <div class="inner">
        <h3>Filtros <i class="fa fa-filter"></i></h3>
        <select name="divisionesGeoTel" id="divisionesGeoTel" onChange="muestraRegs(this.value);">
            <option value="0" selected>División:</option>
            <?php
                $divisiones =  json_decode(file_get_contents('http://10.105.116.52:9090/getCatalog/CatalogoDivisiones'));
                foreach($divisiones as $apiResponse){
                    foreach($apiResponse as $valor){
                        echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
                    }                                               
                }                                                                               
            ?>                                        
        </select>  
        <select  id="areasGeoTel" name="areasGeoTel" onChange="muestraDistritosxOPC();">
            <option value="0">Área:</option>
        </select>
        <select  id="districtOpcGeoTel" name="districtOpcGeoTel" onChange="muestraDistritosxArea(this.value);" >
            <option value="0">Distrito(s):</option>
            <option value="1">Selecciona distritos a mostrar</option>
            <option value="2">Todos los distritos</option>                                                        
        </select>
        <div id="distritosText">
            <input type="text" id="distritosGeoTel" data-name="nameOfSelect" name="distritosGeoTel"  placeholder="¿Que distritos?"> 
            <i class="fa fa-plus-circle" onClick="agregaDist();"></i>
            <ul id="listaDist"></ul>                                                                                  
        </div>
        <div style="height:5px;" id="listadoDistricts"></div>
        <input type="button" id="mostrarDatosGeoTel" value="Mostrar" onClick="cargaReg();" >
    </div>
</div>

        <div id="widgets" ></div>   
        

        <div id="menuWiket">
                <div class="titleMenuWiket" id="menuJumperWiket">
                    <table style="width:100%;">
                        <tr>
                            <td><img src="mapa/images/arrow_entra_right.png" align="absmiddle" border="0" style="cursor:pointer;" /></td>
                            <td style="text-align:left; padding-left:30px;">Menú de Widgets</td>
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
        <div id="activos">
            <div id="escondedorActivos">
                <p>Elementos activos en el mapa </p><i class="fa fa-map-o"></i>
            <div id="contenedorActivos">
                <div class="header">
                    <div class="block">
                        <small>Mostrar</small>
                    </div>
                    <div class="block">
                        <small>Elemento</small>
                    </div>
                    <div class="block">
                        <small>Opciones</small>
                    </div>
                </div>
                <div class="content">
                    <ul id="divic"></ul>
                    <ul id="ares"></ul>
                    <ul id="distr"></ul>
                </div>
                <!--<div>
                    <ul style="margin:0px; padding:0px; width:100%;" id="divic"></ul>
                </div>
                <div>
                    <ul style="margin:0px; padding:0px; width:100%;" id="ares"></ul>
                </div>
                <div>
                    <ul style="margin:0px; padding:0px; width:100%;" id="distr"></ul>
                </div>-->
            </div>
        </div>
        <!--
        <div id="activos" style="display:none;">
            <div style="background-color:#999999; line-height:35px; text-align:center; font-size:15px; color:#FFFFFF; cursor:pointer;" id="escondedorActivos">Elementos activos en el mapa</div>
            <div id="contenedorActivos">
                <table style="width:auto;">
                    <tr>
                        <td>
                            <div>
                                <ul style="margin:0px; padding:0px; width:100%;" id="encabezadosActivos">
                                    <li style="width:45px; text-align:center;"  class="activoEnlaLista">Mostrar</li>
                                    <li style="width:125px;" class="activoEnlaLista">Elemento</li>
                                    <li style="width:65px;" class="activoEnlaLista">Opciones</li>
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
        </div>-->
        
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
        
        <div id="tecnoDialog" title="Opciones" style="font-size:14px;"></div>        
        
        
<div id="ocultos"></div>
<script>
$(document).ready(function() {
                 initialize();   
}); 
</script>
