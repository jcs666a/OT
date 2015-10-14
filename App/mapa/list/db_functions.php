<?php
 
class DB_Functions {
 
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
     * Storing new dist
     * returns user details
     */
	public function storeDist($nom, $vel, $fac, $pdm) {
        // insert user into database
        $result = mysql_query("INSERT INTO distritos(nom, vel, fac, pdm) VALUES('$nom', '$vel', '$fac', '$pdm')");
        // check for successful store
        if ($result) {
            // get user details
            $id = mysql_insert_id(); // last inserted id
            $result = mysql_query("SELECT * FROM distritos WHERE id = $id") or die(mysql_error());
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
     * Getting all users
     */
    public function getDist() {
        $result = mysql_query("select * FROM distritos");
        return $result;
    }
	
}
 
?>
