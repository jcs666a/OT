<?php
function serialize_cookie($nombre_cookie='',$arreglo='',$time='mas'){
	$la_url	= "10.105.116.69";
	$array=array();
	unset($_COOKIE[$nombre_cookie]);
	if($nombre_cookie!='' && $arreglo!=''){
		if($time=='mas'){
			$nvo='[';
			foreach($arreglo as $value){
				$nvo.='"'.$value.'",';
			}
			$nvo=rtrim($nvo,",").']';
			setcookie($nombre_cookie,$nvo,time()+7000,"/");
		}
		else
			setcookie($nombre_cookie,'',time()-5600,"/");
		$array=array($nombre_cookie=>$arreglo);
	}
	return $array;
}
// response json
$json = array();

/**
 * Registering a user device
 * Store reg id in users table
 */
if (isset($_POST["name"]) && isset($_POST["exp"]) && isset($_POST["regId"])) {
    $name = $_POST["name"];
    $exp = $_POST["exp"];
    $gcm_regid = $_POST["regId"]; // GCM Registration ID
	serialize_cookie('oTVb',array(
						'name'		=>$name,
						'exp'		=>$exp,
						'gcm_regid'	=>$gcm_regid
					));
    // Store user details in db
    include_once './db_functions.php';
    $db = new DB_Functions();

    $res = $db->storeUser($name, $exp, $gcm_regid);

} else {
    // user details missing
}
?>
