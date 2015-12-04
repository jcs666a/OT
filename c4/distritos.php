<div class="box col s12 m4 l4">
    <label><select name="divisionesGeoTel" class="divisionesGeoTel" style="width:180px;">
        <option value="0">División:</option>
        <?php include_once 'variables.php';
        $divisiones =  json_decode(file_get_contents($ip_services.'/getCatalog/CatalogoDivisiones'));
        foreach($divisiones as $apiResponse){ foreach($apiResponse as $valor){
            echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
        } } ?>
    </select></label>
</div>
<div class="box col s12 m4 l4 areasOpcGeoTelCombo" style="display:none;">
    <label><select class="areasGeoTel" name="areasGeoTel" style="width:180px;">
        <option value="0">Área:</option>
    </select></label>
</div>
<div class="box col s12 m4 l4 districtOpcGeoTelCombo" style="display:none;">
    <label><select class="districtOpcGeoTel" name="districtOpcGeoTel" style="width:180px;">
        <option value="0"> --- </option>
        <option value="1">Distritos</option>
        <option value="2">Todos los distritos</option>
        <option value="3">Colonias</option>
    </select></label>
</div>
<div  class="col s12 m4 l4 distritosText" style="display:none;">
    <p>Regiones asignadas:</p>
    <input type="text" data-name="nameOfSelect" name="distritosGeoTel" class="distritosGeoTel" placeholder="Buscar..." />
    <small class="agregarDistrito">Agregar +</small>
    <div class="mensaje_elimina">
        <p>¿Deseas eliminar esta región del usuario?</p>
        <a href="#" class="si">Si</a> &nbsp; - &nbsp; <a href="#" class="no">No</a>
    </div>
    <ul class="listaDist"></ul>
</div>
<div style="height:5px;" class="listadoDistricts"></div>