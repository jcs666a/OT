    <div class="box col s12 m4 l4">
        <select name="divisionesGeoTel" class="divisionesGeoTel" onChange="muestraRegs(this.value);" style="width:180px;">
        <option value="0" selected>División: </option>
        <?php
        $divisiones =  json_decode(file_get_contents('http://10.105.116.52:9090/getCatalog/CatalogoDivisiones'));
        foreach($divisiones as $apiResponse){
        foreach($apiResponse as $valor){
        echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
        }                                               
        }                                                                               
        ?>                                        
        </select>  
        </div>  
        <div class="box col s12 m4 l4">
        <select  class="areasGeoTel" name="areasGeoTel" onChange="muestraDistritosxOPC();" style="width:180px;">
        <option value="0">Área: </option>
        </select>
        </div>
        <div class="box col s12 m4 l4 districtOpcGeoTelCombo" style="display:none;">
        <select  class="districtOpcGeoTel" name="districtOpcGeoTel" onChange="muestraDistritosxArea(this.value);" style="width:180px;">
        <option value="0"> Distrito(s): </option>
        <option value="1">Seleccionar distritos para mostrar</option>
        <option value="2">Todos los distritos</option>                                                        
        </select>                            
        </div>
        <div  class="col s12 m4 l4 distritosText" style="display:none;">
        <p>Distritos: </p>
        <input type="text" data-name="nameOfSelect" name="distritosGeoTel" class="distritosGeoTel" style="width:120px;"> 
        <small  onClick="agregaDist();"> agregar +</small>
        <ul class="listaDist" style="width:250px; max-height:50px; overflow:auto;"></ul>                                                
        </div>
        <div style="height:5px;" class="listadoDistricts">&nbsp; </div> 

        <script>
        $(document).ready(function() {
            $('.divisionesGeoTel').material_select();
        });
        </script>