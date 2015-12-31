<?php

class DB_Connect{
    function __construct(){}
    function __destruct(){}
    public function connect(){
        $con=pg_connect("host=10.105.116.52 port=5432 dbname=giberish_tmx user=postgres password=ki11thema11 options='--client_encoding=UTF8'");
        return $con;
    }
    public function close(){pg_close();}
} 

class db_Postgre{
    private $db;            private $row_db=NULL;
    private $result=NULL;   private $ar=array();
    private $oid;           private $i=0;

    function __construct(){
        $this->db = new DB_Connect();
        $this->db->connect();
    }
    function __destruct(){ }
// usuarios: usr_id - id_role - usr_nombre - usr_user - usr_pwd - region_trabajo - expediente - create_at
    public function storeUsuarios($id_role,$usr_nombre,$usr_user,$usr_pwd,$region_trabajo,$expediente){
        $this->result=pg_query("INSERT INTO usuarios(id_role,usr_nombre,usr_user,usr_pwd,region_trabajo,expediente,create_at)
                VALUES('".$id_role."','".$usr_nombre."','".$usr_user."','".$usr_pwd."','".$region_trabajo."','".$expediente."',NOW());") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        $this->oid = pg_last_oid($this->result);
        return $result;
    }
    public function getUsuarios(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT usuarios.*,
                                    gcm_users.id_usr,
                                    gcm_users.id AS id_gcm,
                                    gcm_users.gcm_regid,
                                    gcm_users.created_at AS gcm_created_at
                                FROM gcm_users,usuarios
                                WHERE gcm_users.id_usr=usuarios.usr_id;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
    public function getUsuariosSIN(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT * FROM usuarios WHERE id_role!=2;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
    public function updateUser($region_trabajo,$id){
        $this->result=pg_query("UPDATE usuarios SET region_trabajo='".$region_trabajo."'
                                WHERE usr_id=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        return $result;
    }
    public function eliminaUser($id){
        $this->result=pg_query("DELETE FROM usuarios WHERE usr_id=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        $this->result=pg_query("DELETE FROM gcm_users WHERE id_usr=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        return $result;
    }
// mensajes: id - id_jefe - id_usr - mensaje - created_at - status_leido
    public function storeMensajes($id_jefe,$id_usr,$mensaje){
        $this->result=pg_query("INSERT INTO mensajes(id_jefe,id_usr,mensaje,created_at,status_leido)
                VALUES('".$id_jefe."','".$id_usr."','".$mensaje."',NOW(),'N');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        $this->oid = pg_last_oid($this->result);
        return $result;
    }
    public function getMensajes(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT * FROM mensajes;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
    public function getLastMensajes($id_usr){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT * FROM mensajes WHERE id_usr='".$id_usr."' ORDER BY created_at DESC LIMIT 1;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
    public function setMensajesFalse($id_usr){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("UPDATE mensajes SET status_leido='N'
                                WHERE id_usr=".$id_usr.";") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
// gcm_users: id - gcm_regid - id_usr - created_at
    public function storeGcm_users($gcm_regid,$id_usr,$created_at){
        $this->result=pg_query("INSERT INTO gcm_users(gcm_regid,id_usr,created_at)
                VALUES('".$gcm_regid."','".$id_usr."','".$created_at."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        $this->oid = pg_last_oid($this->result);
        return $result;
    }
    public function getGcm_users(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT * FROM gcm_users") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
    public function getAllGcmIds(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT gcm_regid FROM gcm_users;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
// history_change
    public function history_change($idJefe,$idUser,$nvo_distrito){
        $this->result=pg_query("INSERT INTO history_change(id_jefe,id_usr,new_region,date_change)
                                VALUES('$idJefe','$idUser','$nvo_distrito',NOW())") or die('ERROR: '.pg_last_error());
        $this->oid = pg_last_oid($this->result);
        return $result;
    }
    public function getHistory_change(){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT * FROM history_change;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        return $this->ar;
    }
//enviar broadcast...
    public function sendBroadcast($idJefe,$message,$regId){
        $this->i=0;$this->ar=array();
        $this->result=pg_query("SELECT usuarios.usr_id,gcm_users.gcm_regid
                                FROM gcm_users,usuarios
                                WHERE usuarios.region_trabajo='".$regId."'
                                AND gcm_users.id_usr=usuarios.usr_id;") or die('ERROR: '.pg_last_error());
        while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
            $this->ar[$this->i]=$this->row_db;
            $this->i++;
        }
        foreach($this->ar as $key=>$row){
            $this->storeMensajes($idJefe,$row["usr_id"],$message);
        }
        return $this->ar;
    }
}
 $db= new db_Postgre();

 $gcm=$db->getAllGcmIds();
 var_dump($gcm);

public function check_gcm($gcm_regid){
        $result=pg_query("SELECT * FROM gcm_users WHERE gcm_regid = $gcm_regid;") or die('ERROR: '.pg_last_error());
        return $result;
    }

?>
