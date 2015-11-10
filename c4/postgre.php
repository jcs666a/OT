<?php
	include_once 'db_postgre.php';
	$db = new db_Postgre();
	$Usuarios=$db->getUsuarios();
	$Ssuarios=$db->getUsuariosSIN();
	$mensajes=$db->getMensajes();
	$Gcm_user=$db->getGcm_users();
	$History_=$db->getHistory_change();
	$last_msg=$db->getLastMensajes(5);
//	$db->setMensajesFalse(8);
//	$db->updateUser('1-6-vmw0005',8);
//	$db->updateGcm_users('432ewrf3wfwesrw433f3wfr',8,3);
echo '<pre>Usuarios S:
';
	print_r($Ssuarios);
echo '</pre><pre>Usuarios id:
';
	print_r($Usuarios);
echo '</pre><pre>Mensajes:
';
	print_r($mensajes);
echo '</pre><pre>GCM Users:
';
	print_r($Gcm_user);
echo '</pre><pre>History Change:
';
	print_r($History_);
echo '<pre><pre>Last msg:
';
	print_r($last_msg);
echo '<pre>';
?>