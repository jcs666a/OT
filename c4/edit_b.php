<?php
	if(isset($_POST["idJefe"]) && isset($_POST["empleado"]) && isset($_POST["distrito"]) && isset($_POST["regIDform"])){
		$idJefe = $_POST["idJefe"];
		$empleado = $_POST["empleado"];
		$distrito = $_POST["distrito"];
		$regIDform = $_POST["regIDform"];
		include_once 'db_postgre.php';
//		$db = new db_Postgre();
		$region=regiones($distrito);
//		$result=$db->storeRegion($empleado,$distrito);
//		$result=$db->history_change($idJefe,$empleado,$distrito);
		$result=$idJefe.' + '.$empleado.' + '.$distrito;
		$result='J:'.$idJefe.' - E:'.$empleado.' - D:'.$distrito.' - R:'.$regIDform;
		$message='Has sido asignado a la region '.$region['region'];
		include_once './GCM.php';
		$gcm = new GCM();
		$registatoin_ids = array($regIDform);
		$message=array("mensaje" => $message);
		$gcm->send_notification($registatoin_ids, $message);
		echo $result;
	}
?>
