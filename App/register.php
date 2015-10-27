

<?php

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
    // Store user details in db
    include_once './db_functions.php';

    $db = new DB_Functions();

    $res = $db->storeUser($name, $exp, $gcm_regid);

} else {
    // user details missing
}
?>
