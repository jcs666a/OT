    <script type="text/javascript" src="mapa/js/mapaDin.js"></script>
    <script type="text/javascript" src="mapa/js/mapa.source.js" async></script>

<!-- socket por demanda de distritos -->    
    <script src="mapa/js/funcionesDistritosXdemanda.js"></script>
    <script src="mapa/js/sockjs-0.3.4.js"></script>
    <script src="mapa/js/stomp.js"></script>

<!-- tecnologias  -->
    <script src="mapa/js/pinta_tecnologias.js"></script>
    <script src="mapa/js/pinta_pois.js"></script> 
    <script src="mapa/js/pinta_pois_All.js"></script>

        <div id="header">
            <div id="circule">
                    <h1>+</h1>
            </div>
            <div id="map-menu">
                <!-- div id="techMenu">
                    <i class="fa fa-filter"></i>
                   <div class="showtitle">
                        <small>Filtrar tecnologías</small>
                   </div>
                </div -->
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
                <div id="navegacionMenu" onclick="registraCliente();">
                    <i class="fa fa-street-view"></i>
                    <div class="showtitle">
                        <small>Registra usuarios</small>
                    </div>
                </div>
                <!-- div id="navegacionMenu" onclick="nav();">
                    <i class="fa fa-users"></i>
                   <div class="showtitle">
                        <small>Clientes</small>
                   </div>
                </div -->

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
    <div class="inner"></div>
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
    <i class="fa  fa-crosshairs"></i>
</div>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script>
$(document).ready(function(){
    initialize();   
}); 
</script>
