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
	private $db;			private $row_db=NULL;
	private $result=NULL;	private $ar=array();
	private $oid;			private $i=0;

	function __construct(){
		$this->db = new DB_Connect();
		$this->db->connect();
	}
	function __destruct(){ }
// usuarios: usr_id - id_role - usr_nombre - usr_user - usr_pwd - region_trabajo - expediente - create_at
	public function storeUsuarios($id_role,$usr_nombre,$usr_user,$usr_pwd,$expediente){
		$this->result=pg_query("INSERT INTO usuarios(
					id_role,usr_nombre,usr_user,usr_pwd,expediente)
			VALUES('".$id_role."','".$usr_nombre."',
					'".$usr_user."','".$usr_pwd."',
					'".$expediente."')
					RETURNING usr_id;") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		$insert_row=pg_fetch_row($this->result);
		$insert_id=$insert_row[0];
		return $insert_id;
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
//Actualiza al usuario
	public function updateUser($id,$id_role,$usr_nombre,$usr_user,$usr_pwd,$expediente){
		$act_pass='';
		if($usr_pwd!='')
			$act_pass="usr_pwd='".$usr_pwd."',";
		$this->result=pg_query("UPDATE usuarios SET
				id_role='".$id_role."',
				usr_nombre='".$usr_nombre."',
				usr_user='".$usr_user."',
				".$act_pass."
				expediente='".$expediente."'
			WHERE usr_id=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return 'Usuario '.$id.' editado';
	}
//Actualiza las regiones
	public function eliminaRegiones($id){
		$this->result=pg_query("DELETE FROM region_trabajo
				WHERE id_usr=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return 'Regiones del usuario '.$id.' eliminadas';
	}
	public function storeRegion($id,$region_trabajo){
		$this->result=pg_query("INSERT INTO region_trabajo(id_usr,region)
				VALUES('".$id."','".$region_trabajo."')
			RETURNING id;") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		$insert_row=pg_fetch_row($this->result);
		$insert_id=$insert_row[0];
		return $insert_id;
	}
	public function eliminaUser($id){
		$this->result=pg_query("DELETE FROM usuarios WHERE usr_id=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		$this->result=pg_query("DELETE FROM gcm_users WHERE id_usr=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return 'Usuario '.$id.' eliminado';
	}
	public function reviveUser($id){
		$this->result=pg_query("UPDATE usuarios SET
				cuenta='true'
			WHERE usr_id=".$id.";") or die('ERROR AL ACTUALIZAR CUENTA: '.pg_last_error());
		return 'Usuario '.$id.' revivido';
	}
	public function getTecnologias(){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT DISTINCT ON (equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia)
			accesos.id_acceso,
			distrito_tmx.id_distrito,
			distrito_tmx.clave_distrito,
			equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia,
			equipo_acceso_tecnologia_catalog.tecnologia_acceso,
			solucion.latitud,
			solucion.longitud
			FROM accesos,distrito_tmx,equipo_acceso_tecnologia_catalog,solucion
			WHERE
			distrito_tmx.id_distrito=accesos.id_distrito
			AND accesos.id_equipo_acceso_tecnologia=equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia
			AND solucion.identity = distrito_tmx.id_distrito
			AND distrito_tmx.id_area=6
			AND distrito_tmx.clave_distrito ='zds0004'
			order by equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia,distrito_tmx.id_distrito;") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
	public function getAreasTecnologias(){
		$this->i=0;$this->ar=array(); //  DISTINCT ON (accesos.id_distrito)
		$this->result=pg_query("SELECT
			accesos.id_acceso, accesos.id_distrito,
			equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia,
			equipo_acceso_tecnologia_catalog.tecnologia_acceso, solucion.latitud, solucion.longitud,
			distrito_tmx.clave_distrito
			FROM distrito_tmx,accesos,equipo_acceso_tecnologia_catalog,solucion
			WHERE distrito_tmx.id_area=6
			AND distrito_tmx.id_distrito=accesos.id_distrito
			AND accesos.id_equipo_acceso_tecnologia=equipo_acceso_tecnologia_catalog.id_equipo_acceso_tecnologia
			AND solucion.identity = distrito_tmx.id_distrito
			order by accesos.id_distrito,equipo_acceso_tecnologia_catalog.tecnologia_acceso;") or die('ERROR: '.pg_last_error());
/*
			AND solucion.id_tag=':tag'
			AND solucion.latitud!=':wrongLat {0}'
*/
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
// mensajes: id - id_jefe - id_usr - mensaje - created_at - status_leido
	public function storeMensajes($id_jefe,$id_usr,$mensaje){
		$this->result=pg_query("INSERT INTO mensajes(id_jefe,id_usr,mensaje,created_at,status_leido)
				VALUES('".$id_jefe."','".$id_usr."','".$mensaje."',NOW(),'N');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		$this->oid=pg_last_oid($this->result);
		return $this->oid;
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
		$this->result=pg_query("UPDATE mensajes SET status_leido='N'
								WHERE id_usr=".$id_usr.";") or die('ERROR: '.pg_last_error());
		return $this->ar;
	}
	public function setUserDesconectado($id_usr){
		$this->result=pg_query("UPDATE usuarios SET conectado='N'
								WHERE usr_id=".$id_usr.";") or die('ERROR: '.pg_last_error());
		return 'Usuario '.$id_usr.' ahora esta desconectado.';
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
	public function updateGcm_users($gcm,$id_usr,$id){
		$this->result=pg_query("UPDATE gcm_users SET gcm_regid='".$gcm."',id_usr='".$id_usr."'
								WHERE id=".$id.";") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return $result;
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
//Regiones de trabajo
	public function getAllRegionesTrabajo(){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM region_trabajo") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
	public function getRegionTrabajo($id,$reg){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM region_trabajo
			WHERE id_usr=".$id." AND region='".$reg."';") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->i;
	}
	public function getRegionTrabajoCrea($id,$reg){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM region_trabajo
			WHERE id_usr=".$id." AND region='".$reg."';") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		if($this->i==0)
			$this->storeRegion($id,$reg);
		return $this->i;
	}
//Todas las tablas
	public function getAllTablas(){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT * FROM information_schema.tables") or die('ERROR: '.pg_last_error());
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
//donde estan los fielders
	public function TrackingFielders($telefono,$latitud,$longitud,$id_fielder){
		$this->result=pg_query("INSERT INTO fielders_coordinates_unica(latitud,longitud,telefono,created_at,id_fielder)
				VALUES('".$latitud."','".$longitud."','".$telefono."',NOW(),'".$id_fielder."');") or die('ERROR AL INSERTAR DATOS: '.pg_last_error());
		return $id_fielder.': '.$latitud.','.$longitud.' : '.$telefono.' -> listo';
	}
//Obtener traking fielders
	public function GettrackingFielders($ids_fielders){
		$this->i=0;$this->ar=array();
		$this->result=pg_query("SELECT DISTINCT ON (usuarios.usr_id)
				fielders_coordinates_unica.*,
				usuarios.usr_id,
				usuarios.usr_nombre,
				usuarios.expediente
			FROM fielders_coordinates_unica,usuarios
			WHERE usuarios.usr_id IN(".$ids_fielders.")
				AND usuarios.usr_id=fielders_coordinates_unica.id_fielder
			ORDER BY usuarios.usr_id,fielders_coordinates_unica.created_at DESC;") or die('ERROR: '.pg_last_error());
		while($this->row_db = pg_fetch_array($this->result,NULL,PGSQL_ASSOC)){
			$this->ar[$this->i]=$this->row_db;
			$this->i++;
		}
		return $this->ar;
	}
}
function roles($rol){
		 if($rol==1)
		$roles=array(	'id'=>1,
						'na'=>'Usuario Comercial');
	else if($rol==2)
		$roles=array(	'id'=>2,
						'na'=>'Usuario Técnico');
	else if($rol==3)
		$roles=array(	'id'=>3,
						'na'=>'Supervisor Comercial');
	else if($rol==4)
		$roles=array(	'id'=>4,
						'na'=>'Administrador');
	else if($rol==5)
		$roles=array(	'id'=>5,
						'na'=>'Director');
	else if($rol==6)
		$roles=array(	'id'=>6,
						'na'=>'Lider Promotor');
	else if($rol==7)
		$roles=array(	'id'=>7,
						'na'=>'Promotor');
	return $roles;
}
function regiones($region){
	$zonas=explode("-",$region);
	$regiones=array();
	if($zonas[0]==1){
		$regiones['division']='Metro';
		if($zonas[1]==1) $regiones['area']='Acapulco';
		if($zonas[1]==2) $regiones['area']='Balbuena';
		if($zonas[1]==3) $regiones['area']='Chilpancingo';
		if($zonas[1]==4) $regiones['area']='Cuautitlan-Morelos';
		if($zonas[1]==5) $regiones['area']='Ermita-Tlahuac';
		if($zonas[1]==6) $regiones['area']='Lindavista';
		if($zonas[1]==7) $regiones['area']='Lomas';
		if($zonas[1]==8) $regiones['area']='Mixcoac';
		if($zonas[1]==9) $regiones['area']='Morelos';
		if($zonas[1]==10)$regiones['area']='Satélite';
		if($zonas[1]==11)$regiones['area']='Sotelo';
		if($zonas[1]==12)$regiones['area']='Texcoco-Zaragoza';
		if($zonas[1]==13)$regiones['area']='Toluca';
		if($zonas[1]==14)$regiones['area']='Universidad';
		if($zonas[1]==15)$regiones['area']='Valle-San Juán';
	}
	else if($zonas[0]==2){
		$regiones['division']='Norte';
		if($zonas[1]==16)$regiones['area']='Aguascalientes';
		if($zonas[1]==17)$regiones['area']='Celaya';
		if($zonas[1]==18)$regiones['area']='Ciudad Victoria';
		if($zonas[1]==19)$regiones['area']='Irapuato';
		if($zonas[1]==20)$regiones['area']='León';
		if($zonas[1]==21)$regiones['area']='Matamoros';
		if($zonas[1]==22)$regiones['area']='Monterrey 1';
		if($zonas[1]==23)$regiones['area']='Monterrey 2';
		if($zonas[1]==24)$regiones['area']='Monterrey Foraneas';
		if($zonas[1]==25)$regiones['area']='Nuevo Laredo';
		if($zonas[1]==26)$regiones['area']='Querétaro';
		if($zonas[1]==27)$regiones['area']='Reynosa';
		if($zonas[1]==28)$regiones['area']='Sabinas';
		if($zonas[1]==29)$regiones['area']='Saltillo';
		if($zonas[1]==30)$regiones['area']='San Luis Potosí';
		if($zonas[1]==31)$regiones['area']='Tampico';
		if($zonas[1]==32)$regiones['area']='Torreón';
		if($zonas[1]==33)$regiones['area']='Zacatecas';
	}
	else if($zonas[0]==3){
		$regiones['division']='Occidente';
		if($zonas[1]==34)$regiones['area']='Chihuahua';
		if($zonas[1]==35)$regiones['area']='Ciudad Juárez';
		if($zonas[1]==36)$regiones['area']='Ciudad Obregón';
		if($zonas[1]==37)$regiones['area']='Colima';
		if($zonas[1]==38)$regiones['area']='Culiacán';
		if($zonas[1]==39)$regiones['area']='Durango';
		if($zonas[1]==40)$regiones['area']='Guadalajara Centro';
		if($zonas[1]==41)$regiones['area']='Guadalajara Oriente';
		if($zonas[1]==42)$regiones['area']='Guadalajara Poniente';
		if($zonas[1]==43)$regiones['area']='Hermosillo';
		if($zonas[1]==44)$regiones['area']='Jalisco';
		if($zonas[1]==45)$regiones['area']='La Paz';
		if($zonas[1]==46)$regiones['area']='Los Mochis';
		if($zonas[1]==47)$regiones['area']='Mazatlan';
		if($zonas[1]==48)$regiones['area']='Morelia';
		if($zonas[1]==49)$regiones['area']='Nogales';
		if($zonas[1]==50)$regiones['area']='Puerto Vallarta';
		if($zonas[1]==51)$regiones['area']='Tepic';
		if($zonas[1]==52)$regiones['area']='Zamora';
	}
	else if($zonas[0]==4){
		$regiones['division']='Sur';
		if($zonas[1]==53)$regiones['area']='Campeche';
		if($zonas[1]==54)$regiones['area']='Cancún';
		if($zonas[1]==55)$regiones['area']='Coatzacoalcos';
		if($zonas[1]==56)$regiones['area']='Córdoba';
		if($zonas[1]==57)$regiones['area']='Jalapa';
		if($zonas[1]==58)$regiones['area']='Mérida';
		if($zonas[1]==59)$regiones['area']='Oaxaca';
		if($zonas[1]==60)$regiones['area']='Pachuca';
		if($zonas[1]==61)$regiones['area']='Poza Rica';
		if($zonas[1]==62)$regiones['area']='Puebla';
		if($zonas[1]==63)$regiones['area']='Tlaxcala-Puebla';
		if($zonas[1]==64)$regiones['area']='Tuxtla Guitierrez';
		if($zonas[1]==65)$regiones['area']='Veracrúz';
		if($zonas[1]==66)$regiones['area']='Villahermosa';
		if($zonas[1]==70)$regiones['area']='Tlaxcala';
	}
	else if($zonas[0]==5){
		$regiones['division']='Telnor';
		if($zonas[1]==67)$regiones['area']='Ensenada';
		if($zonas[1]==68)$regiones['area']='Mexicali';
		if($zonas[1]==69)$regiones['area']='Tijuana';
	}
	$regiones['distrito']='';
	$regiones['colonia']='';
	if($zonas[2]!='0')
		$regiones['distrito']=$zonas[2];
	if($zonas[3]!='0')
		$regiones['colonia']=$zonas[3];
	if($zonas[2]!='0' && $zonas[3]=='0'){
		$regiones['region']=$regiones['division'].', '.$regiones['area'].', '.$zonas[2];
		$regiones['regionT']='<span>Distrito:</span> '.$regiones['division'].', '.$regiones['area'].', '.$zonas[2];
	}
	elseif($zonas[2]=='0' && $zonas[3]=='0'){
		$regiones['region']=$regiones['division'].', '.$regiones['area'];
		$regiones['regionT']='<span>Area:</span> '.$regiones['division'].', '.$regiones['area'];
	}
	else if($zonas[2]=='0' && $zonas[3]!='0'){
		$regiones['region']=$regiones['division'].', '.$regiones['area'].', '.$zonas[3];
		$regiones['regionT']='<span>Colonia:</span> '.$regiones['division'].', '.$regiones['area'].', '.$zonas[3];
	}
	else if($zonas[2]!='0' && $zonas[3]!=0){
		$regiones['region']=$regiones['division'].', '.$regiones['area'].', '.$zonas[3].', '.$zonas[2];
		$regiones['regionT']='<span>Distrito/Colonia:</span> '.$regiones['division'].', '.$regiones['area'].', '.$zonas[3].', '.$zonas[2];
	}
	$regiones['original']=$region;
	return $regiones;
}
?>