<?php

$div = $_POST["div"];
$reg = $_POST["are"];



		$sql_b="select division_id, division_dsc from divisiones where  division_id='".$div."' ";
		$res_b = mysql_query($sql_b);
		$renglones_b= mysql_num_rows($res_b);
		if ($renglones_b>=1){
			while($rowR_b = mysql_fetch_array($res_b)) {  

				$division = $rowR_b["division_dsc"];
			}
		}
		
		
		$sql_b="select region_id, region_dsc from regiones where region_id='".$reg."' ";
		$res_b = mysql_query($sql_b);
		$renglones_b= mysql_num_rows($res_b);
		if ($renglones_b>=1){
			while($rowR_b = mysql_fetch_array($res_b)) {  
				$region = $rowR_b["region_dsc"];
			}
		}		
		

?>