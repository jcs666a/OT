<?php
	if(isset($_POST["idJefe"]) && isset($_POST["empleado"]) && isset($_POST["distrito"]) && isset($_POST["regIDform"])){
		$idJefe = $_POST["idJefe"];
		$empleado = $_POST["empleado"];
		$distrito = $_POST["distrito"];
		$regIDform = $_POST["regIDform"];
		include_once './db_functions.php';
		$db = new DB_Functions();
		$result = $db->history_change($idJefe,$empleado,$distrito);
		$result=$idJefe.' + '.$empleado.' + '.$distrito;
		$message='Has sido asignado al distrito '.$distrito;

		include_once './GCM.php';
		$gcm = new GCM();
		$registatoin_ids = array($regIDform);
		$message = array("mensaje" => $message);
		$result = $gcm->send_notification($registatoin_ids, $message);

		echo $result;
	}
?>
