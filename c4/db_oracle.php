<?php
// $inicio=microtime(true);
class DB_PConnect{
	function __construct(){}
	function __destruct(){}
	public function connect(){
		$con=pg_connect("host=10.105.116.52 port=5432 dbname=giberish_tmx user=postgres password=ki11thema11 options='--client_encoding=UTF8'");
		return $con;
	}
	public function close(){pg_close();}
}
class db_Postgre{
	private $db;			private $row_db=NULL;
	private $result=NULL;	private $ar=array();
	private $oid;			private $i=0;
	private $n_rows;

	function __construct(){
		$this->db = new DB_PConnect();
		$this->db->connect();
	}
	function __destruct(){ }
	public function storeUnik($ary){
		$this->ar=array();
		pg_query("TRUNCATE ut_contact_ot_unica;") or die('ERROR AL TRUNCAR: '.pg_last_error());
		foreach ($ary as $key => $value){
			$this->i++;
/*			$this->result=pg_query("SELECT telefono FROM ut_contact_ot_unica WHERE telefono='".$value['TELEFONO']."';") or die('ERROR: '.pg_last_error());
			$this->n_rows=pg_num_rows($this->result);
			if($this->n_rows > 0){
				while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
					$this->ar[$this->i]=array($value['TELEFONO']=>'Actualizado');
					$this->result=pg_query("UPDATE ut_contact_ot_unica
						SET distrito='".$value['DISTRITO']."',
							tcode='".$value['TCODE']."',
							campaign_code='".$value['CAMPAIGNCODE']."',
							offer_code='".$value['OFFERCODE']."',
							contact_datetime='".$value['CONTACTDATETIME']."',
							processed='".$value['PROCESSED']."',
							campoa='".$value['CAMPOA']."',
							campob='".$value['CAMPOB']."',
							campoc='".$value['CAMPOC']."'
						WHERE telefono=".$value['TELEFONO'].";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
				}
			}
			else{ */
				$this->ar[$this->i]=array($value['TELEFONO']=>'Insertado');
				$this->result=pg_query("INSERT INTO ut_contact_ot_unica
					(telefono,distrito,tcode,campaign_code,offer_code,contact_datetime,processed,campoa,campob,campoc)
					VALUES(	'".$value['TELEFONO']."',
							'".$value['DISTRITO']."',
							'".$value['TCODE']."',
							'".$value['CAMPAIGNCODE']."',
							'".$value['OFFERCODE']."',
							'".$value['CONTACTDATETIME']."',
							'".$value['PROCESSED']."',
							'".$value['CAMPOA']."',
							'".$value['CAMPOB']."',
							'".$value['CAMPOC']."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
//			}
		}
		return $this->ar;
	}
//Obtener unikas
	public function getUnik(){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM ut_contact_ot_unica;") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
//donde estan los fielders
	public function TrackingFielders($telefono,$latitud,$longitud){
		$this->result=pg_query("INSERT INTO fielders_coordinates_unica(latitud,longitud,telefono)
				VALUES('".$latitud."','".$longitud."','".$telefono."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return $telefono.': '.$latitud.','.$longitud.' -> listo';
	}
//Obtener traking fielders
	public function GettrackingFielders(){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM fielders_coordinates_unica;") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
}
class DB_Connect{
	function __construct(){}
	function __destruct(){}
	public function connect(){
		$dv='(DESCRIPTION =
	(ADDRESS_LIST =
		(ADDRESS = (PROTOCOL = TCP)(HOST = 10.94.170.143)(PORT = 1522))
	)
	(CONNECT_DATA =
		(SID = UCDM)
		(SERVER = DEDICATED)
	)
)';
		$conn=oci_connect('USR_FILDERS','u856432mli67',$dv);
		if(!$conn){
			$e = oci_error();
			trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
		}
		return $conn;
	}
	public function close(){
//		pg_close();
	}
}
class db_Oracle{
	private $db;			private $row_db=NULL;	private $result=NULL;
	private $ar=array();	private $oid;			private $i=0;
	private $conn;			private $postgre_db;	private $ary=array();

	function __construct(){
		$this->db = new DB_Connect();
		$this->conn = $this->db->connect();
	}
	function __destruct(){ }

	public function getUsuariosUnika(){
		$this->i=0;$this->ar=array();
		$this->result=oci_parse($this->conn,'SELECT * FROM USR_CDM_OWNER.UT_CONTACT_OT');
		oci_execute($this->result);
		while($this->row_db = oci_fetch_array($this->result, OCI_ASSOC+OCI_RETURN_NULLS)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}

	public function copyUsuariosUnikaPostgre(){
		$this->i=0;$this->ar=array();$this->ary=array();
		$this->result=oci_parse($this->conn,'ALTER SESSION SET NLS_TIMESTAMP_FORMAT = "YYYY-MM-DD hh24:mi:ss"');
		oci_execute($this->result);
		$this->result=oci_parse($this->conn,'SELECT * FROM USR_CDM_OWNER.UT_CONTACT_OT'); //  WHERE ROWNUM <=5
		oci_execute($this->result);
		while($this->row_db = oci_fetch_array($this->result, OCI_ASSOC+OCI_RETURN_NULLS)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		$this->postgre_db=new db_Postgre();
		$this->ary[]=$this->postgre_db->storeUnik($this->ar);
		return $this->ary;
	}

	public function getTime(){
		$this->i=0;$this->ar=array();
		$this->result=oci_parse($this->conn,'ALTER SESSION SET NLS_TIMESTAMP_FORMAT = "YYYY-MM-DD hh24:mi:ss"');
		oci_execute($this->result);
		$this->result=oci_parse($this->conn,'SELECT CONTACTDATETIME FROM USR_CDM_OWNER.UT_CONTACT_OT');
		oci_execute($this->result);
		while($this->row_db = oci_fetch_array($this->result, OCI_ASSOC+OCI_RETURN_NULLS)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
}

//$oracle_db=new db_Oracle();
//$res=$oracle_db->getUsuariosUnika();
//$res=$oracle_db->getTime();
//$res=$oracle_db->copyUsuariosUnikaPostgre();
//print_r($res);
/*
$postgre_db=new db_Postgre();
$res=$postgre_db->getUnik();

print_r($res);

$fin = microtime(true);
$execution_time = ($fin - $inicio);
echo 'Me tarde: '.$execution_time.' segundos';
*/
?>