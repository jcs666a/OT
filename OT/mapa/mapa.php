<?php
    session_start();
    if ($_SESSION["sesion_de"] <>""){
        $sesionDe=$_SESSION["sesion_de"];
        $niv=$_SESSION["niv"];
    }else{
        echo "<script>window.location='index.php';</script>";
    }
?>

    <script type="text/javascript" src="mapa/js/jquery-ui-1.10.4.custom.min.js"></script>
    <link rel="stylesheet" href="mapa/css/mapa.css">
    <script src="mapa/js/jquery.tabSlideOut.v1.3.js"></script>
    <script type="text/javascript" src="mapa/js/corner.js"></script>    
    <script type="text/javascript" src="mapa/js/mapaDin.js"></script> 
    <script>var tipoUser = "2";</script>
    <script type="text/javascript" src="mapa/js/mapa.source.js" async></script>

    
    
<!-- socket por demanda de distritos -->    
    <script src="mapa/js/funcionesDistritosXdemanda.js"></script>
    <script src="mapa/js/sockjs-0.3.4.js"></script>
    <script src="mapa/js/stomp.js"></script>



<!-- tecnologias  -->
    <script src="mapa/js/pinta_tecnologias.js"></script>
    <script src="mapa/js/pinta_pois.js"></script> 
    <script src="mapa/js/pinta_pois_All.js"></script>
    


<?php 
    //require_once("include/connect_red.php");
?>    
        <div id="header">
            <div id="circule">
                    <h1>+</h1>
            </div>
            <div id="map-menu">
                <div id="techMenu">
                    <i class="fa fa-filter"></i>
                   <div class="showtitle">
                        <small>Filtrar tecnologías</small>
                   </div>
                </div>
                <div id="chartMenu">
                    <i class="fa fa-area-chart"></i>
                   <div class="showtitle">
                        <small>Gráficas</small>
                   </div>
                </div>
                <div id="fildersMenu">
                    <i class="fa fa-briefcase"></i>
                   <div class="showtitle">
                        <small>Filders</small>
                   </div>
                </div>
                <div id="clientMenu">
                    <i class="fa fa-thumb-tack"></i>
                   <div class="showtitle">
                        <small>POI</small>
                   </div>
                </div>
                <div id="navegacionMenu" onclick="nav();">
                    <i class="fa fa-users"></i>
                   <div class="showtitle">
                        <small>Clientes</small>
                   </div>
                </div>

                <div id="flushTodo">
                    <i class="fa fa-eraser"></i>
                   <div class="showtitle">
                        <small>Limpiar mapa</small>
                   </div>
                </div>
            </div>
        </div>
        <div id="contadorcillo" style="background-color:#D8F781; line-height:30px; position:relative; z-index:3; font-family:Arial, Helvetica, sans-serif; font-size:18px; padding-left:10px;"></div>
        <div id="map-canvas"></div>
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
<div id="tecnoDialog">
    <div id="closeLoader">
        <i class="fa fa-chevron-down"></i>
    </div>
    <div class="inner">  
        <div class="filtersLine"></div>
        <div class="loadArea">
            <ul></ul>
        </div>
    </div>
</div> 
<div id="genericLoad">
    <div id="closeGeneric">
        <i class="fa fa-chevron-down"></i>
    </div>
    <div class="inner">  
    </div>
</div> 
<div id="poiLoad">
    <div id="closePoi">
        <i class="fa fa-chevron-down"></i>
    </div>
    <div class="inner">  
    </div>
</div>  
<div id="ocultos"></div>
<div id="nameDistrict">
    <div class="inner" onclick="openLayer(this);">
        <i class="fa fa-chevron-up"></i>
    </div>
    <div id="loadInMap">
        <div id="workZone">
            <div class="left">
                <small>Activo</small>
            </div>
            <div class="right">
                <small>Área de trabajo</small>
            </div>
        </div>
        <div id="distZone"></div>
        <div id="areaZone"></div>
    </div>
</div>
<div id="goTo">
    <div onclick="registraCliente();">
        <i class="fa fa-street-view"></i>
    </div>
    <div data-type="user" onclick="userLocation(this);">
        <i class="fa fa-user"></i>
    </div>
    <div data-type="noUser" onclick="userLocation(this);">
        <i class="fa fa-user-times"></i>
    </div>
</div>
<div id="centraUsuario" onclick="userCenter();">
    <i class="fa fa-crosshairs"></i>
</div>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script src="http://code.highcharts.com/modules/data.js"></script>
<script src="http://code.highcharts.com/modules/drilldown.js"></script>
<script>
$(document).ready(function() {
    initialize();   
}); 
</script>
