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

    public function getIdOT($gcm_regid,$id_usr){
        $this->i=0;$this->ar=array();$this->oid='NADA';
        $this->result=pg_query("SELECT id_usr
                                FROM gcm_users
                                WHERE id_usr=".$id_usr.";") or die('ERROR: '.pg_last_error());
        while($this->row_db=pg_fetch_array($this->result,NULL,PGSQL_ASSOC))
            $this->ar[$this->i]=$this->row_db;
        foreach($this->ar as $key=>$row)
            $this->oid='Existe';
        if($this->oid=='NADA')
            $this->result=pg_query("INSERT INTO gcm_users(gcm_regid,id_usr)
                    VALUES('".$gcm_regid."','".$id_usr."')") or die('ERROR: '.pg_last_error());
        $this->result=pg_query("INSERT INTO history_init(id_usr)
                        VALUES(".$id_usr.")") or die('ERROR: '.pg_last_error());
        return 'Listo...';
    }
    public function TrackingFielders($telefono,$latitud,$longitud,$id_fielder){
        $this->result=pg_query("INSERT INTO fielders_coordinates_unica(latitud,longitud,telefono,created_at,id_fielder)
                VALUES('".$latitud."','".$longitud."','".$telefono."',NOW(),'".$id_fielder."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
        return $id_fielder.': '.$latitud.','.$longitud.' : '.$telefono.' -> listo';
    }
}

if($_GET['track']=='SI'){
    $db = new db_Postgre();
    if(isset($_POST['latitud'])){
        $telefono=trim($_POST['telefono']);
        $latitud=trim($_POST['latitud']);
        $longitud=trim($_POST['longitud']);
        $id_fielder=trim($_POST['id_fielder']);
        if($latitud!='' && $longitud!='' && $id_fielder!=''){
            echo $db->TrackingFielders($telefono,$latitud,$longitud,$id_fielder);
        }
        else{
            echo 'Uno de los post requeridos esta vacio WEY Lat:'.$latitud.' Lon:'.$longitud.' Id:'.$id_fielder;
        }
    }
    else{
        echo 'No mandaste los post WEY';
    }
}
?>