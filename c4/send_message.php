<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_POST["idJefe"]) && isset($_POST["empleado"]) && isset($_POST["regId"]) && isset($_POST["message"])){
	$idJefe = $_POST["idJefe"];
	$empleado = $_POST["empleado"];

	$regId = $_POST["regId"];
	$message = $_POST["message"];

	include_once './db_functions.php';
	$db = new DB_Functions();
	$db->mensajes($idJefe,$empleado,$message);

	include_once './GCM.php';

	$gcm = new GCM();

	$registatoin_ids = array($regId);
	$message = array("mensaje" => $message);
	//$token = array("jwt" => $token);	

	$result = $gcm->send_notification($registatoin_ids, $message);

	echo $result;
}
?>