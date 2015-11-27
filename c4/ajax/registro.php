<?php
include_once '../variables.php';
$div=$_POST["div"];
echo '<option value="0">Todas</option>';
$divisiones =  json_decode(file_get_contents($ip_services.'/getAreaCatalog/'.$div));
foreach($divisiones as &$apiResponse){
	foreach($apiResponse as &$valor){
		echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
	}
}
?>