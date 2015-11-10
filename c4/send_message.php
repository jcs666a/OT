<?php
if(isset($_POST["idJefe"]) && isset($_POST["empleado"]) && isset($_POST["regId"]) && isset($_POST["message"])){
	$idJefe = $_POST["idJefe"];
	$empleado = $_POST["empleado"];
	$regId = $_POST["regId"];
	$message = $_POST["message"];
//	echo $regId.' - '.$message.' ';
	include_once 'db_postgre.php';
	$db = new db_Postgre();
	$db->storeMensajes($idJefe,$empleado,$message);
	include_once './GCM.php';
	$gcm = new GCM();
	$registatoin_ids = array($regId);
	$message = array("mensaje" => $message);
//	$token = array("jwt" => $token); ????
//	print_r($registatoin_ids);
//	print_r($message);
	$result = $gcm->send_notification($registatoin_ids, $message);
//	echo $result;
}
?>