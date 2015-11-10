<?php
	if(isset($_POST['edit'])){
		$name=trim($_POST['name']);
		$exp=trim($_POST['exp']);
		$usuario=trim($_POST['usuario']);
		$passwd=trim($_POST['passwd']);
		$rol=trim($_POST['rol']);
		$edit=trim($_POST['edit']);
		$region=trim($_POST['region']);
		if($edit!='' && $name!='' && $exp!='' && $usuario!='' && $rol!=''){
			$tipo=0;													 // No trajo pass ni reg
				 if($passwd!=0 && $region!=0) $tipo=1; // Trajo pass y reg
			else if($passwd==0 && $region!=0) $tipo=2; // Trajo reg sin pass
			else if($passwd!=0 && $region==0) $tipo=3; // Trajo pass sin reg
			include_once '../db_postgre.php';
	//		$db = new db_Postgre();
	//		$res = $db->eliminaUser($_POST['id']);
		}
	}
?>