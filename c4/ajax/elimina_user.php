<?php
	if(isset($_POST['id'])){
		include_once '../db_postgre.php';
		$db = new db_Postgre();
		$res = $db->eliminaUser($_POST['id']);
		echo $res;
	}
?>