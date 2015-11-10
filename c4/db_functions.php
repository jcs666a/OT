<?php

class DB_Functions{

    private $db;

    //put your code here
    // constructor
    function __construct() {
        include_once './db_connect.php';
        // connecting to database
        $this->db = new DB_Connect();
        $this->db->connect();
    }

    // destructor
    function __destruct() {
        
    }

    /**
     * Storing new user
     * returns user details
     */
    public function storeUser($name,$exp,$usuario,$passwd,$rol,$region){
//      $result = mysql_query("INSERT INTO gcm_users(name, exp, gcm_regid, created_at) VALUES('$name', '$exp', '$gcm_regid', NOW())");
        $result = mysql_query("INSERT INTO
                            `usuarios`(`name`,`exp`,`usuario`,`passwd`,`rol`,`region`)
                            VALUES ('".$name."',
                                    '".$exp."',
                                    '".$usuario."',
                                    '".$passwd."',
                                    '".$rol."',
                                    '".$region."');");
        if ($result) {
            // get user details
            $id = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM gcm_users WHERE id = $id") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    //Store historyChange
    public function history_change($idJefe,$idUser,$nvo_distrito){
        $result = mysql_query("INSERT INTO history_change(idJefe,idUser,nvo_distrito)
                                    VALUES('$idJefe','$idUser','$nvo_distrito')");
        if ($result){
            $id = mysql_insert_id();
            $result = mysql_query("SELECT * FROM history_change WHERE id = $id") or die(mysql_error());
            if (mysql_num_rows($result) > 0){
                return mysql_fetch_array($result);
            } else return false;
        } else return false;
    }
    //Store mensajes
    public function mensajes($idJefe,$idUser,$mensaje){
        $result = mysql_query("INSERT INTO mensajes(id_jefe,id_usuario,mensaje)
                                    VALUES('$idJefe','$idUser','$mensaje')");
        if ($result){
            $id = mysql_insert_id();
            $result = mysql_query("SELECT * FROM mensajes WHERE id_mensaje = $id") or die(mysql_error());
            if (mysql_num_rows($result) > 0){
                return mysql_fetch_array($result);
            } else return false;
        } else return false;
    }

    /**
     * Storing new gps
     * returns user details
     */
    public function storeUserGPS($latitud, $longitud, $gcm_regid){
        // insert user into database
        $result = mysql_query("INSERT INTO gps_users(latitud, longitud, gcm_regid, created_at) VALUES('$latitud', '$longitud', '$gcm_regid', NOW())");
        // check for successful store
        if ($result){
            // get user details
            $id = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM gps_users WHERE id = $id") or die(mysql_error());
            // return user details
            if (mysql_num_rows($result) > 0) {
                return mysql_fetch_array($result);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Get user by exp and password
     */
    public function getUserByExp($exp){
        $result = mysql_query("SELECT `usuarios`.*,
                                `gcm_users`.`id_usuario`,
                                `gcm_users`.`id` AS 'id_gcm',
                                `gcm_users`.`gcm_regid`,
                                `gcm_users`.`created_at` AS 'gcm_created_at'
                            FROM `usuarios` LEFT JOIN `gcm_users`
                            ON `usuarios`.`id`=`gcm_users`.`id_usuario`
                            WHERE `usuarios`.`exp`='".$exp."';");
        return $result;
    }

    /**
     * Getting all users
     */
    public function getAllUsers(){
    // Dependera de la prioridad, la consulta, si le damos prioridad a usuarios o a gcm
/*      $result = mysql_query("SELECT `usuarios`.*,
                                `gcm_users`.`id_usuario`,
                                `gcm_users`.`id` AS 'id_gcm',
                                `gcm_users`.`gcm_regid`,
                                `gcm_users`.`created_at` AS 'gcm_created_at'
                            FROM `usuarios` LEFT JOIN `gcm_users`
                            ON `usuarios`.`id`=`gcm_users`.`id_usuario`;"); */
        $result = mysql_query("SELECT `usuarios`.*,
                                `gcm_users`.`id_usuario`,
                                `gcm_users`.`id` AS 'id_gcm',
                                `gcm_users`.`gcm_regid`,
                                `gcm_users`.`created_at` AS 'gcm_created_at'
                            FROM `gcm_users`,`usuarios`
                            WHERE `gcm_users`.`id_usuario`=`usuarios`.`id`;");
        return $result;
    }

/**
     * Getting all gcms
     */
    public function getAllGcmIds(){
//      Depende de la prioridad, si usuarios o gcm
/*      $result = mysql_query("SELECT `gcm_users`.`gcm_regid` AS 'id'
                    FROM `usuarios` LEFT JOIN `gcm_users`
                    ON `usuarios`.`id`=`gcm_users`.`id_usuario`;"); */
        $result = mysql_query("SELECT `gcm_users`.`gcm_regid` AS 'id'
                    FROM `gcm_users`,`usuarios`
                    WHERE `gcm_users`.`id_usuario`=`usuarios`.`id`;");
        return $result;
    }

/**
     * Getting all channels
     */
    public function getAllChannels() {
        $result = mysql_query("select * from canal");
        return $result;
    }


    /**
     * Check user is existed or not
     */
    public function isUserExisted($exp) {
        $result = mysql_query("SELECT exp from gcm_users WHERE exp = '$exp'");
        $no_of_rows = mysql_num_rows($result);
        if ($no_of_rows > 0) {
            // user existed
            return true;
        } else {
            // user not existed
            return false;
        }
    }

}

?>
