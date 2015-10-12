<?php

// response json
$json = array();

/**
 * Registering a user device
 * Store reg id in users table
 */
if (isset($_POST["latitud"]) && isset($_POST["longitud"]) && isset($_POST["regId"])) {
    $latitud = $_POST["latitud"];
    $longitud = $_POST["longitud"];
    $gcm_regid = $_POST["regId"]; // GCM Registration ID
    // Store user details in db
    include_once './db_functions.php';
    include_once './GCM.php';

    $db = new DB_Functions();
    $gcm = new GCM();

    $res = $db->storeUserGPS($latitud, $longitud, $gcm_regid);

    $registatoin_ids = array($gcm_regid);
    $message = array("product" => "shirt");

} else {
    // user details missing
}
?>
