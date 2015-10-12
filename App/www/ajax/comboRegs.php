<?php

//require_once("../include/connect_red.php");	

$div=$_POST["div"];

		echo '<option value="0">Todas</option>';
	
		$divisiones =  json_decode(file_get_contents('http://10.105.116.52:9090/getAreaCatalog/'.$div));
		
		/*echo "<pre>";
		print_r($divisiones);
		echo "</pre>";*/
		
		foreach($divisiones as &$apiResponse){
			foreach($apiResponse as &$valor){
				//echo $valor->{'id'} . "<br>";
				echo '<option value="'.$valor->{'id'}.'">'.$valor->{'descripcion'}.'</option>';
			}												
		}		
		
												
?>