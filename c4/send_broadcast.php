<?php
if(isset($_POST["idJefe"]) && isset($_POST["message_all"]) && isset($_POST["regId_all"])){
	$idJefe = $_POST["idJefe"];
	$regId = $_POST["regId_all"];
	$message = $_POST["message_all"];
	$result='';
	include_once 'db_postgre.php';
	$db = new db_Postgre();
	$regIds=$db->sendBroadcast($idJefe,$message,$regId);
	include_once './GCM.php';
	$gcm = new GCM();
	foreach($regIds as $key=>$row){
		$registatoin_ids=array($row["gcm_regid"]);
		$messageb=array("mensaje" => $message);
		$envio=$gcm->send_notification($registatoin_ids,$messageb);
		$result.=$row["gcm_regid"].' ';
	}
	echo $result;
//	print_r($regIds);
}
?>