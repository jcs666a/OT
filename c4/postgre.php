<?php
	if(isset($_GET['hago'])){
		$hago=trim($_GET['hago']);
		include_once 'db_postgre.php';
		$db = new db_Postgre();

		if($hago=='nada_de_nada'){
			$Usuarios=$db->getUsuarios();
			$Ssuarios=$db->getUsuariosSIN();
			$mensajes=$db->getMensajes();
			$Gcm_user=$db->getGcm_users();
			$RegTraba=$db->getAllRegionesTrabajo();
	//		$AllTabla=$db->getAllTablas();
	//		echo $db->reviveUser(46);
			$History_=$db->getHistory_change();
			$last_msg=$db->getLastMensajes(5);
	//		$db->setMensajesFalse(8);
	//		$db->eliminaRegiones(75);
	//		$db->eliminaRegiones(76);
	//		$db->storeRegion(47,'1-6-zds0004');
	//		$db->updateGcm_users('432ewrf3wfwesrw433f3wfr',8,3);
			echo '<h2>Usuarios S:</h2><pre>';
				print_r($Ssuarios);
			echo '</pre><p>&nbsp;</p><h2>Usuarios id:</h2><pre>';
				print_r($Usuarios);
			echo '</pre><p>&nbsp;</p><h2>Mensajes:</h2><pre>';
				print_r($mensajes);
			echo '</pre><p>&nbsp;</p><h2>GCM Users:</h2><pre>';
				print_r($Gcm_user);
			echo '</pre><p>&nbsp;</p><h2>History Change:</h2><pre>';
				print_r($History_);
			echo '</pre><p>&nbsp;</p><h2>All Regiones de Trabajo:</h2><pre>';
				print_r($RegTraba);
			//echo '</pre><p>&nbsp;</p><h2>All Tablas:</h2><pre>';
			//	print_r($AllTabla);
			echo '</pre><p>&nbsp;</p><h2>Last msg:</h2><pre>';
				print_r($last_msg);
			echo '<pre>';
		}
		else if($hago==1){
			$id=trim($_POST['idUsuario']);
			$id_role=trim($_POST['idRole']);
			$usr_nombre=trim($_POST['nombre']);
			$usr_user=trim($_POST['usuario']);
			$usr_pwd=trim($_POST['password']);
			$expediente=trim($_POST['expediente']);
			$regiones=$_POST['regiones'];
			$regeliminado=$db->eliminaRegiones($id);
			$user=$db->updateUser($id,$id_role,$usr_nombre,$usr_user,$usr_pwd,$expediente);
			foreach ($regiones as $region){
				$agrega_reg.=$db->storeRegion($id,$region).', ';
			}
			echo $user.', regiones: '.$agrega_reg;
		}
		else if($hago==2){
			$id_role=trim($_POST['idRole']);
			$usr_nombre=trim($_POST['nombre']);
			$usr_user=trim($_POST['usuario']);
			$usr_pwd=trim($_POST['password']);
			$expediente=trim($_POST['expediente']);
			$regiones=$_POST['regiones'];
			$user=$db->storeUsuarios($id_role,$usr_nombre,$usr_user,$usr_pwd,$expediente);
			foreach ($regiones as $region){
				$agrega_reg.=$db->storeRegion($user,$region).', ';
			}
			echo 'Usuario '.$user.' creado, regiones: '.$agrega_reg;
		}
		else if($hago==3){ // ver si existen usuarios con tal o cual region
			$id=trim($_POST['id']);
			$reg=trim($_POST['reg']);
			echo $db->getRegionTrabajo($id,$reg);
		}
		else if($hago==4){
			$id=trim($_POST['id']);
			$reg=trim($_POST['reg']);
			echo $db->getRegionTrabajoCrea($id,$reg);
		}
	}
?>