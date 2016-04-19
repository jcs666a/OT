<?php ob_start();
/*
revisar compatibilidad de: JSON_UNESCAPED_UNICODE
json_encode($obj,JSON_UNESCAPED_UNICODE);
*/

if($_POST['pky']!='')
	$pky=trim($_POST['pky']);
else
	header("Location: ../");
//Vars:
$ipServ='http://10.105.116.52:9090/';
//$ipServ='http://localhost:9090/';
//$ipServ='http://187.217.179.35:9090/';
//$ipServ='http://10.105.116.187:9090/';
//Clases:
class GCM{
	function __construct(){}
	public function send_notification($registatoin_ids, $message){
		$url = 'https://android.googleapis.com/gcm/send';
		$fields = array(
			'registration_ids' => $registatoin_ids,
			'data' => $message,
		);
		$headers = array(
			'Authorization: key=AIzaSyCKeteGtPAv-xki2EmIgx_rE2xa9T59kVo',
			'Content-Type: application/json'
		);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// Disabling SSL Certificate support temporarly
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
		$result=curl_exec($ch);
		if($result===FALSE)
			$result=curl_error($ch);
		curl_close($ch);
		$result=json_decode($result);
		return $result;
	}
}
//Funciones:
function logout($data){
	global $ipServ;
	$ch = curl_init($ipServ."telmex/usuario/desconectado");
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response = curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		if(isset($_SERVER['HTTP_COOKIE'])){
			$cookies=explode(';',$_SERVER['HTTP_COOKIE']);
			foreach($cookies as $cookie){
				$parts=explode('=',$cookie);
				$name=trim($parts[0]);
				setcookie($name,'',time()-1000);
				setcookie($name,'',time()-1000,'/');
			}
		}
		serialize_cookie('Cinf','','');
	}
}
function mensajes($Ids,$mas,$emisor,$receptor){
	global $ipServ;
	$gcm=new GCM();
	$Ids=array($Ids);
	$mes=array("mensaje" =>$mas);
	$res=$gcm->send_notification($Ids,$mes);
	$obj['Emisor']=$emisor;
	$obj['Receptor']=$receptor;
	$obj['Mensaje']=$mas;
	$data=array(
		'idusr'=>$receptor,
		'idjefe'=>$emisor,
		'mensaje'=>$mas
	);
//	$obj['dataServicio']=$data;
	$ch = curl_init($ipServ.'telmex/add/mensaje');
	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE) die(curl_error($ch));
//	else $obj['response']=$response;
	if($res->failure==0){
		$obj['success']=$res->success;
		$obj['multicast_id']=$res->multicast_id;
		$obj['failure']=$res->failure;
		$obj['canonical_ids']=$res->canonical_ids;
		$obj['message_id']=$res->results[0]->message_id;
	}
	else if($res->failure==1){
		$obj['errorMessage']='La API de Google devolvió un error';
		$obj['success']=$res->success;
		$obj['multicast_id']=$res->multicast_id;
		$obj['failure']=$res->failure;
		$obj['canonical_ids']=$res->canonical_ids;
		$obj['error']=$res->results[0]->error;
	}
	return $obj;
}
function serialize_cookie($nombre_cookie='',$arreglo='',$time='mas'){
	$array=array();
	unset($_COOKIE[$nombre_cookie]);
	if($nombre_cookie!='' && $arreglo!=''){
		if($time=='mas'){
			$nvo='[';
			foreach($arreglo as $value){
				$nvo.='"'.$value.'",';
			}
			$nvo=rtrim($nvo,",").']';
			setcookie($nombre_cookie,$nvo,time()+700000,"/");
		}
		else{
			setcookie($nombre_cookie,'',time()-5600);
			setcookie($nombre_cookie,'',time()-5600,"/");
		}
		$array=array($nombre_cookie=>$arreglo);
	}
	return $array;
}
function serialize_cookieReg($nombre_cookie='',$arreglo='',$time='mas'){
	$array=array();
	unset($_COOKIE[$nombre_cookie]);
	if($nombre_cookie!='' && $arreglo!=''){
		if($time=='mas'){
			$nvo='[';
			foreach($arreglo as $value){
				$nvo.='"'.$value.'",';
			}
			$nvo=rtrim($nvo,",").']';
			setcookie($nombre_cookie,$nvo,time()+700000,"/");
		}
		else{
			setcookie($nombre_cookie,'',time()-5600);
			setcookie($nombre_cookie,'',time()-5600,"/");
		}
		$array=array($nombre_cookie=>$arreglo);
	}
	return $array;
}
if($pky=='}54ñj?='){ //Login
	$abj=file_get_contents($ipServ.'telmex/get/user/'.$_POST['U'].'/'.$_POST['P']);
	if($abj=='')
		$object['errorMessage']='No hay respuesta del servidor de login. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$object['errorMessage']='';
		$object['adverMessage']='';
		$object['dentrMessage']='';
		if($abj->errorMessage!=''){
			$object['errorMessage']=$abj->errorMessage;
		}
		else{
//			$object['return']=$abj;
			if($abj->apiResponse[0]->role->role!='Usuario Tecnico' &&
				$abj->apiResponse[0]->role->role!='Usuario Comercial' &&
				$abj->apiResponse[0]->role->role!='Supervisor Comercial' &&
				$abj->apiResponse[0]->role->role!='Promotor' &&
				$abj->apiResponse[0]->cuenta==1){
				$object['dentrMessage']=1;
				$object['z']='dashboard/#34fTRc';
				$ibj=file_get_contents($ipServ.'telmex/get/userandregiones/'.$abj->apiResponse[0]->idUsuario);
				if($ibj=='')
					$object['errorMessage']='No hay respuesta del servidor de login. NO RESPONSE';
				else{
					$ibj=json_decode($ibj);
					$ibj=$ibj->apiResponse[0];
					foreach($ibj as $k=>$v){
						if($v->regionTrabajo!=null && $v->regionTrabajo!='null' && $v->regionTrabajo!=0)
							$object['regiones'][]=$v->regionTrabajo;
						else if($v->role==8)
							$object['regiones'][]='Todas las campañas';
						else if($v->role==4)
							$object['regiones'][]='Todas las regiones';
						else
							$object['regiones'][]='Ninguna';
					}
					serialize_cookie('Cinf',array(
						'Nombre'=>$abj->apiResponse[0]->nombre,
						'idBoss'=>$abj->apiResponse[0]->idUsuario,
						'Role'	=>$abj->apiResponse[0]->role->role,
						'idRole'=>$abj->apiResponse[0]->role->idRole,
						'User'	=>$abj->apiResponse[0]->usuario
					));
					serialize_cookieReg('Creg',$object['regiones']);
				}
			}
			else{
				$data=array('idUsuario'=>$abj->apiResponse[0]->idUsuario);
				logout($data);
				$object['adverMessage']='No tienes acceso a esta aplicación';
			}
		}
	}
	echo json_encode($object);
}
else if($pky=='4g?$eRt='){ //logout
	$data=array('idUsuario'=>$_POST['P']);
	logout($data);
}
else if($pky=='b.4{d2xA'){//Enviar mails
	$templa=file_get_contents('mailer/temp.html', FILE_USE_INCLUDE_PATH);
	$templa=str_replace("{{titulo}}","Tu cuenta de Telmex c4",$templa);
	$templa=str_replace("{{usuario}}","lider",$templa);
	$templa=str_replace("{{contraseña}}","kkkk",$templa);
	require 'mailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPDebug=0; // 0=off, 1=client messages, 2=client and server messages
	$mail->Debugoutput='html';
	$mail->Host='smtp.gmail.com';
	$mail->Port=587;
	$mail->SMTPSecure='tls';
	$mail->SMTPAuth=true;
	$mail->Username="jcottelmex@gmail.com";
	$mail->Password="Blitz2016";
	$mail->setFrom('jcottelmex@gmail.com','Julio S.');
//	$mail->addReplyTo('jcottelmex@gmail.com','Julio S.');
	$mail->addAddress('jcsavila@gmail.com','Julio');
//	$mail->addAddress('EVIVANCO@telmex.com','Rafaelo');
	$mail->Subject='Llamado a Rafaelo';
//	$mail->msgHTML(file_get_contents('mailer/temp.html'), dirname(__FILE__));
	$mail->msgHTML($templa);
	$mail->AltBody='Tu cuenta de Telmex c4 /r/n/r/n Usuario: lider /r/n Contraseña: kkk';
//	$mail->addAttachment('../img/estacontigo.png');
	if (!$mail->send()){
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}
}
else if($pky=='46%6&fyR'){ //Obtiene divisiones para menu
	$ctx=stream_context_create(array('http'=>array('timeout'=>5,)));
	$abj=file_get_contents($ipServ.'getCatalog/CatalogoDivisiones',false,$ctx);
//	$abj=file_get_contents($ipServ.'getCatalog/CatalogoDivisiones');
	$obj['errorMessage']='';
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para obtener catalogo de divisiones. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse;
		foreach($abj as $k=>$vl){
			$obj['divs'][$k]['id']=$vl->id;
			$obj['divs'][$k]['de']=$vl->descripcion;
		}
	}
	echo json_encode($obj);
}
else if($pky=='ñhj/4"1z'){ //Pinta poligonos de divisiones
	$abj=file_get_contents($ipServ.'getDivisionByName/geoJson/'.rawurlencode($_POST['P']));
	if($_POST['X'][0]=='Todas las regiones' || $_POST['X'][0]=='Todas las campañas'){}
	else{
		foreach($_POST['X'] as $k=>$v){
			$por=explode("-",$v);
			$q=$por[1];
			if($q==0)
				$derecho[]='Todas';
			else
				$derecho[]=$q;
		}
	}
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para obtener polígonos de divisiones. NO RESPONSE';
	else{
		$abj=str_replace('"color":"blue"','"color":"#E0E4CC"',$abj);
		$abj=json_decode($abj);
		$obj['mapa']=$abj->apiResponse[0];
		$abj=file_get_contents($ipServ.'getAreaCatalog/'.$_POST['U']);
		$abj=json_decode($abj);
		$abj=$abj->apiResponse;
		$opciones='<option value="0" disabled selected>Áreas</option>';
		foreach($abj as $k=>$vl){
			if(($_POST['X'][0]=='Todas las regiones' || $_POST['X'][0]=='Todas las campañas' || $derecho[0]=='Todas') ||
				in_array($vl->id,$derecho))
					$opciones.='<option value="'.$vl->id.'">'.$vl->descripcion.'</option>';
		}
		$obj['areas']=$opciones;
	}
	echo json_encode($obj);

}
else if($pky=='5yj[.-}'){ //Pinta poligonos de areas
	$jsan=file_get_contents($ipServ.'getAreaByName/geoJson/'.rawurlencode($_POST['P']));
	if($jsan=='')
		$abj['errorMessage']='No hay respuesta del servidor para obtener polígonos de áreas. NO RESPONSE<br />'.urlencode($ipServ.'getAreaByName/geoJson/');
	else{
		$jsan=str_replace('"color":"blue"','"color":"#E0E4CC"',$jsan);
		$abj=json_decode($jsan);
		$abj=$abj->apiResponse[0];
	}
	echo json_encode($abj);
}
else if($pky=='er43{¿3'){ //Obtiene nombre de colonias
	$abj=file_get_contents($ipServ.'telmex/necropsia/getNecropsiaColoniaByArea/'.$_POST['P']);
	if($abj=='')
		$abj['errorMessage']='No hay respuesta del servidor para obtener nombres de colonias. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse;
	}
	echo json_encode($abj);
}
else if($pky=='eK,.-/'){ //Obtiene nombre de distritos
	$abj=file_get_contents($ipServ.'getDistritosBySearch/'.$_POST['P'].'/0');
	if($abj==''){
		$abj['errorMessage']='No hay respuesta del servidor para obtener nombres de distritos. NO RESPONSE';
		$abj=json_encode($abj);
	}
	echo $abj;
}
else if($pky=='Tym,pñ&'){ //Obtiene fielders por region
	$abj=file_get_contents($ipServ.'telmex/get/usuariosregion/'.$_POST['P']);
	if($abj=='')
		$abj['errorMessage']='No hay respuesta del servidor para obtener fielders de la región. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
	}
	echo json_encode($abj);
}
else if($pky==',.-76reIo5{'){ //Obtiene fielders por Area
	$abj=file_get_contents($ipServ.'telmex/get/usuariosarea/'.$_POST['P']);
	if($abj=='')
		$abj['errorMessage']='No hay respuesta del servidor para obtener fielders del área. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
	}
	echo json_encode($abj);
}
else if($pky=='lñjh(U]'){ //Pinta los distritos pedidos (Necesito mandarme el área)
	$data[]=$_POST['P'];
	$area=$_POST['A'];
	$postData = array(
		'distritos'=>array(
			'name'=>$data,'idArea'=>$area,'color'=>'#ff9000'
		)
	);
	$ch = curl_init($ipServ.'getDistrito/geoJson');
	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($postData)
	));
	$response = curl_exec($ch);
	if($response === FALSE)
		die(curl_error($ch));
	$responseData = json_decode($response);
	echo json_encode($responseData->apiResponse[0]);
}
else if($pky=='1|s"1!'){ //Envia un mensaje a un solo fielder
	$mas=trim($_POST['T']);
	$Ids=trim($_POST['R']);
	if($mas!=''){
		$obj=mensajes($Ids,$mas,$_POST['P'],$_POST['I']);
	}
	else
		$obj['errorSinMensaje']='No escribiste mensaje alguno para enviar al usuario.';
	echo json_encode($obj);
}
else if($pky=='t6U.ño/'){ //Envia un mensaje a una area (broadcast)
	$mas=trim($_POST['T']);
	$obj['Emisor']=$_POST['P'];
	$obj['Mensaje']=$mas;
	$i=0;
	$o=0;
	if($mas!=''){
		foreach($_POST['R'] as $k=>$v){
			$ti=mensajes($v['regid'],$mas,$_POST['P'],$v['idUser']);
			if($ti['errorMessage']==''){
				$obj['Bien'][$i]['Receptor']=$v['idUser'];
				$obj['Bien'][$i]['success']=$ti['success'];
				$obj['Bien'][$i]['multicast_id']=$ti['multicast_id'];
				$obj['Bien'][$i]['failure']=$ti['failure'];
				$obj['Bien'][$i]['canonical_ids']=$ti['canonical_ids'];
				$obj['Bien'][$i]['message_id']=$ti['message_id'];
//				$obj['Bien'][$i]['response']=$ti['response'];
//				$obj['Bien'][$i]['dataServicio']=$ti['dataServicio'];
				$i++;
			}
			else{
				$obj['Mal'][$o]['Receptor']=$v['idUser'];
				$obj['Mal'][$o]['success']=$ti['success'];
				$obj['Mal'][$o]['multicast_id']=$ti['multicast_id'];
				$obj['Mal'][$o]['failure']=$ti['failure'];
				$obj['Mal'][$o]['canonical_ids']=$ti['canonical_ids'];
				$obj['Mal'][$o]['error']=$ti['error'];
//				$obj['Mal'][$o]['response']=$ti['response'];
//				$obj['Mal'][$o]['dataServicio']=$ti['dataServicio'];
				$o++;
			}
		}
	}
	else
		$obj['errorSinMensaje']='No escribiste mensaje alguno para enviar al usuario.';
	echo json_encode($obj);
}
else if($pky=='-*6+¿dyF'){ //Traigo todos los usuarios
	$r=$_POST['R'];
	$p=$_POST['P'];
	foreach($r as $k=>$v){
		$w=substr($v,0,1);
		if(is_numeric($w)){
			$rb[]=substr($v,0,4);
			$ra[]=substr($v,0,2);
		}
		else{
			$rb[]=$v;
			$ra[]=$v;
		}
	}
	$abj=file_get_contents($ipServ.'telmex/get/userAllRegs');
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach($abj as $k=>$v){
			if($v->role > 3 && $v->cuenta==1){
				if($p=='Administrador' || in_array('Todas las regiones',$rb) || in_array('Todas las campañas',$rb)){
					$obj['u'][$i]['idUsuario']=$v->idUsuario;
					$obj['u'][$i]['role']=$v->role;
					$obj['u'][$i]['idRole']=$v->role;
					$obj['u'][$i]['nombre']=$v->nombre;
					$obj['u'][$i]['usuario']=$v->usuario;
					$obj['u'][$i]['expediente']=$v->expediente;
					$obj['u'][$i]['conectado']=$v->conectado;
					$obj['u'][$i]['gcm']=$v->gcm;
					$ibj=file_get_contents($ipServ.'telmex/get/region/'.$v->idUsuario);
					$ibj=json_decode($ibj);
					$ibj=$ibj->apiResponse[0];
					$o=0;
					foreach($ibj as $ky=>$vy){
						$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
						$o++;
					}
					$i++;
				}
				else{
					$ibj=file_get_contents($ipServ.'telmex/get/region/'.$v->idUsuario);
					$ibj=json_decode($ibj);
					$ibj=$ibj->apiResponse[0];
					$o=0;$no_tengo='No';
					foreach($ibj as $kx=>$vx){
						if($p=='Director'){
							foreach($ra as $kix=>$vix){
								if(substr($vx->regionTrabajo,0,2)===$vix)
									$no_tengo='Si';
							}
						}
						else{
							foreach($rb as $kix=>$vix){
								if(strpos($vx->regionTrabajo,$vix)!==false)
									$no_tengo='Si';
							}
						}
					}
					if($no_tengo=='Si'){
						if($p=='Director' && $v->role=='6'){
							foreach($ibj as $ky=>$vy){
								$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
								$o++;
							}
							$obj['u'][$i]['idUsuario']=$v->idUsuario;
							$obj['u'][$i]['role']=$v->role;
							$obj['u'][$i]['idRole']=$v->role;
							$obj['u'][$i]['nombre']=$v->nombre;
							$obj['u'][$i]['usuario']=$v->usuario;
							$obj['u'][$i]['expediente']=$v->expediente;
							$obj['u'][$i]['conectado']=$v->conectado;
							$obj['u'][$i]['gcm']=$v->gcm;
							$i++;
						}
						else if($p=='Lider Promotor' && $v->role=='7'){
							foreach($ibj as $ky=>$vy){
								$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
								$o++;
							}
							$obj['u'][$i]['idUsuario']=$v->idUsuario;
							$obj['u'][$i]['role']=$v->role;
							$obj['u'][$i]['idRole']=$v->role;
							$obj['u'][$i]['nombre']=$v->nombre;
							$obj['u'][$i]['usuario']=$v->usuario;
							$obj['u'][$i]['expediente']=$v->expediente;
							$obj['u'][$i]['conectado']=$v->conectado;
							$obj['u'][$i]['gcm']=$v->gcm;
							$i++;
						}
					}
				}
			}
			$no_tengo='No';
		}
	}
	echo json_encode($obj);
}
else if($pky=='ñ%3fN.-'){ //Traigo los usuarios lideres o los fielders de un lider o director
	$p=$_POST['P'];
	$q=$_POST['Q'];
	if($q=='1'){
		$abj=file_get_contents($ipServ.'telmex/get/usuariosLiderByDiv/'.$p);
		$obj['url']=$ipServ.'telmex/get/usuariosLiderByDiv/'.$p;
	}
	else{
		$abj=file_get_contents($ipServ.'telmex/get/usuariosPromotorByDivArea/'.$p);
		$obj['url']=$ipServ.'telmex/get/usuariosPromotorByDivArea/'.$p;
	}
	if($abj=='' || $abj==null){
		$obj['errorMessage']='No hay respuesta del servidor para obtener usuarios. (NO RESPONSE)';
	}
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];$i=0;
		foreach($abj as $k=>$v){
			$obj['u'][$i]['idUsuario']=$v->idUsuario;
			$obj['u'][$i]['role']=$v->role->idRole;
			$obj['u'][$i]['idRole']=$v->role->idRole;
			$obj['u'][$i]['nombre']=$v->nombre;
			$obj['u'][$i]['usuario']=$v->usuario;
			$obj['u'][$i]['expediente']=$v->expediente;
			$obj['u'][$i]['conectado']=$v->conectado;
			$obj['u'][$i]['gcm']='';
			$ibj=file_get_contents($ipServ.'telmex/get/region/'.$v->idUsuario);
			$ibj=json_decode($ibj);
			$ibj=$ibj->apiResponse[0];
			$o=0;
			foreach($ibj as $ky=>$vy){
				$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
				$o++;
			}
			$i++;
		}
	}
	echo json_encode($obj);
}
else if($pky=='ñ*}{Lokj'){ //Traigo todas las campañas
	$abj=file_get_contents($ipServ.'telmex/get/camp');
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach ($abj as $k=>$v){
			if($v->estado==true){
				$obj[$i]['id']=$v->id;
				$obj[$i]['titulo']=htmlspecialchars($v->titulo,ENT_QUOTES);
				$obj[$i]['tcode']=$v->tcode;
				$obj[$i]['campaigncode']=$v->campaigncode;
				$obj[$i]['offercode']=$v->offercode;
				$obj[$i]['createAt']=$v->createAt;
				$obj[$i]['meta']=$v->meta;
				$obj[$i]['color']=$v->color;
				$obj[$i]['fecha_inicio']=$v->fechaInicio;
				$obj[$i]['fecha_fin']=$v->fechaFin;
				$obj[$i]['descripcion']=htmlspecialchars($v->descripcion,ENT_QUOTES);
				$i++;
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='-Iyh&4}['){ //Traigo info del usuario por id
	$abj=file_get_contents($ipServ.'telmex/get/userandregiones/'.$_POST['P']);
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach ($abj as $k=>$v){
			if($i==0){
				if($v->correo==null || $v->correo=='null')
					$v->correo='';
				$obj['idUsuario']=$v->idUsuario;
				$obj['role']=$v->role;
				$obj['nombre']=$v->nombre;
				$obj['usuario']=$v->usuario;
				$obj['expediente']=$v->expediente;
				$obj['correo']=$v->correo;
			}
			$obj['Regiones'][$i]=$v->regionTrabajo;
			$i++;
		}
	}
	echo json_encode($obj);
}
else if($pky=='.3Lñ-_,U'){ //Guardo información de usuario
	$n=trim($_POST['N']);
	$i=trim($_POST['I']);
	$e=trim($_POST['E']);
	$u=trim($_POST['U']);
	$p=trim($_POST['P']);
	$r=trim($_POST['R']);
	$s=trim($_POST['S']);
	$data=array(
		'idUsuario'=>$i,
		'role'=>array('idRole'=>$r),
		'nombre'=>$n,
		'usuario'=>$u,
		'password'=>$p,
		'expediente'=>$e,
		'correo'=>$s,
		'cuenta'=>1);
	$ch=curl_init($ipServ."telmex/userUp");
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj=0;
		if($response->errorCode<0)
			$obj='Error';
	}
	echo $obj;
}
else if($pky=='bH-.!sdT'){ //Guardo nuevo usuario
	$n=trim($_POST['N']);
	$e=trim($_POST['E']);
	$u=trim($_POST['U']);
	$p=trim($_POST['P']);
	$r=trim($_POST['R']);
	$s=trim($_POST['S']);
	$z=trim($_POST['Z']);
	$data=array(
		'role'=>array('idRole'=>$r),
		'nombre'=>$n,
		'usuario'=>$u,
		'password'=>$p,
		'expediente'=>$e,
		'correo'=>$s,
		'cuenta'=>1);
	$obj['Error']='';
	$ch = curl_init($ipServ.'telmex/add/user');
	curl_setopt_array($ch, array(
		CURLOPT_CONNECTTIMEOUT => 15,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE)
		$obj['Error']=curl_error($ch);
	else{
		$response=json_decode($response);
		if($response->errorCode<0)
			$obj['Error']=$response->errorMessage;
		else{
			if($z=='')$obj['Respo']=$response->apiResponse[0];
			else{
				$nU=$response->apiResponse[0];
				$postData[]=array(
					'idUsuario'=>$nU->idUsuario,
					'regionTrabajo'=>$z
				);
				$ch=curl_init($ipServ.'telmex/add/regiones');
				curl_setopt_array($ch, array(
					CURLOPT_CONNECTTIMEOUT => 15,
					CURLOPT_TIMEOUT => 30,
					CURLOPT_POST => TRUE,
					CURLOPT_RETURNTRANSFER => TRUE,
					CURLOPT_HTTPHEADER => array(
						'Content-Type: application/json'
					),
					CURLOPT_POSTFIELDS=>json_encode($postData)
				));
				$response = curl_exec($ch);
				if($response === FALSE)
					$obj['Error']=curl_error($ch);
				else{
					$response=json_decode($response);
					if($response->errorCode<0)
						$obj['Error']=$response->errorMessage;
					else
						$obj['Respo']=$response->apiResponse[0];
				}
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='Nb%423d'){ //Guardo y envío información de nueva región asignada a usuario
	$i=trim($_POST['I']); //Empleado
	$j=trim($_POST['J']); //Jefe
	$r=trim($_POST['R']); //Region
	$g=trim($_POST['G']); //GCMid
	$b=trim($_POST['B']); //Region bonita
	$z=trim($_POST['Z']); //Rol 7
	$postData[]=array(
		'idUsuario'=>$i,
		'regionTrabajo'=>$r
	);
	$ch = curl_init($ipServ.'telmex/add/regiones');
	curl_setopt_array($ch, array(
		CURLOPT_CONNECTTIMEOUT => 15,
		CURLOPT_TIMEOUT => 30,
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($postData)
	));
	$response = curl_exec($ch);
	if($response === FALSE){
		$obj['error_curl']=curl_error($ch);
	}
	else{
		$responseData=json_decode($response);
		if($responseData->errorCode>=0){
			if($z==7)
				$obj['men']=mensajes($g,'Has sido asignado a la region '.$b,$j,$i);
		}
		else
			$obj['errorSinMensaje']='No se pudo conectar al servicio para agregar una región al usuario.';
	}
//	$obj['data']=$responseData;
	echo json_encode($obj);
}
else if($pky=='0"#rGf4sxV'){ //Elimino región del usuario
	$p=trim($_POST['P']); //Empleado
	$r=trim($_POST['R']); //region
	$ch = curl_init($ipServ."telmex/del/region/".$p."/".$r);
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj=$response;
	}
	echo json_encode($obj);
}
else if($pky=='Fg3$°1|'){ //Guardo nueva CFR campaña fielder region
	$p=trim($_POST['P']);
	$y=trim($_POST['Y']);
	$data[]=array(
		'idCr'=>$p,
		'idFielder'=>$y
	);
	$ch = curl_init($ipServ.'telmex/add/cfr');
	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response = curl_exec($ch);
	if($response === FALSE)
		die(curl_error($ch));
	$response=json_decode($response);
	if($response->errorCode<0){
		$obj['Error']=$response->errorMessage;
	}
	else{
		$obj['Error']='';
		$obj['id']=$response->apiResponse[0][0]->id;
	}
	echo json_encode($obj);
}
else if($pky==']}ñByr4F'){ //Elimino CFR campaña fielder region
	$p=trim($_POST['P']); //Empleado
	$y=trim($_POST['Y']); //CFR
	$ch = curl_init($ipServ."telmex/del/cfr");
	$data[]=array('id'=>$y,'idFielder'=>$p);
//	print_r(json_encode($data));
	$obj='';
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		if($response->errorCode<0)
			$obj=$response->errorMessage;
	}
	echo $obj;
}
else if($pky=='l/55G4rp´'){ //Guardo tarea a un fielder
	$p=trim($_POST['P']);
	$y=trim($_POST['Y']);
	$q=trim($_POST['Q']);

	$abj=file_get_contents($ipServ.'telmex/validaFielderCFR/'.$q.'/'.$y);
	$obj['url']=$ipServ.'telmex/validaFielderCFR/'.$q.'/'.$y;
	if($abj=='')
		$obj['errorMessage']='No hay respuesta del servidor para saber si el Fielder tiene asignada la campaña. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$obj['RespA']=$abj->apiResponse[0];
		if($abj->apiResponse[0]==false){
			$obj['respB']='No la tengo';
			$dataBB[]=array(
				'idCr'=>$q,
				'idFielder'=>$y
			);
			$ch = curl_init($ipServ.'telmex/add/cfr');
			curl_setopt_array($ch, array(
				CURLOPT_POST => TRUE,
				CURLOPT_RETURNTRANSFER => TRUE,
				CURLOPT_HTTPHEADER => array(
					'Content-Type: application/json'
				),
				CURLOPT_POSTFIELDS=>json_encode($dataBB)
			));
			$response = curl_exec($ch);
			$obj['RespNormal']=$response;
			if($response === FALSE)
				die(curl_error($ch));
			$response=json_decode($response);
			if($response->errorCode<0){
				$obj['Error']=$response->errorMessage;
			}
			else{
				$obj['Error']='';
				$obj['dataB']=$dataBB;
			}
		}
	}

	$data[]=array(
		'idCalendar'=>$p,
		'idFielder'=>$y
	);
	$obj['data_1']=$data;
	$obj['q']=$q;
	$ch = curl_init($ipServ.'telmex/add/calf');
	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response = curl_exec($ch);
	if($response === FALSE)
		die(curl_error($ch));
	$response=json_decode($response);
	if($response->errorCode<0){
		$obj['Error']=$response->errorMessage;
	}
	else{
		$obj['Error']='';
		$obj['id']=$response->apiResponse[0][0]->id;
	}
	echo json_encode($obj);
}
else if($pky=='l/4t{{+}'){ //Elimino tarea de un fielder
	$p=trim($_POST['P']);
	$q=trim($_POST['Q']);
	$r=trim($_POST['R']);
	$ch = curl_init($ipServ."telmex/del/calf/");
	$data[]=array(
		'idCalendar'=>$q,
		'idFielder'=>$r
	);
	$obj='';
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		if($response->errorCode<0)
			$obj=$response->errorMessage;
	}
	echo $obj;
}
else if($pky=='Ñpf[0o'){ //Elimino un usuario
	$p=trim($_POST['P']);
	$data=array('idUsuario'=>$p);
	$ch=curl_init($ipServ."telmex/userDel");
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj['resp']=$response;
		echo json_encode($obj);
	}
}
else if($pky=='0Ṕ[RGdf'){ //Cerrar sesión de un usuario
	$p=trim($_POST['P']);
	$ch=curl_init($ipServ."telmex/desconectaUsuario/".$p);
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "PUT",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj['resp']=$response;
		echo json_encode($obj);
	}
}
else if($pky=='h-&7/f5D'){ //Elimino campaña
	$p=trim($_POST['P']);
	$ch = curl_init($ipServ."telmex/del/camp/".$p);
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		if($response->errorMessage!='')
			$obj=$response->errorMessage;
		else
			$obj='';
	}
	echo $obj;
}
else if($pky=='g.-&3eGD'){ //Guardo edición de campaña o también campaña nueva!
	$i=trim($_POST['I']);
	$e=trim($_POST['E']);
	$u=trim($_POST['U']);
	$p=trim($_POST['P']);
	$r=trim($_POST['R']);
	$d=trim($_POST['D']);
	$k=trim($_POST['K']);$obj['K']=$k;
	$l=trim($_POST['L']);$obj['L']=$l;
	$m=trim($_POST['M']);$obj['M']=$m;
	$c=trim($_POST['C']);$c=ltrim($c,'#');
	$y='';
	$obj['Error']='';
	if($_FILES['file']['tmp_name']!=''){
		if($_FILES['file']['error']==UPLOAD_ERR_OK){
			$tmp_name=$_FILES["file"]["tmp_name"];
			$carpeta="../imgCamps/";
			$archivo=$carpeta.basename($_FILES["file"]["name"]);
			$y=basename($_FILES["file"]["name"]);
			if(move_uploaded_file($_FILES["file"]["tmp_name"],$archivo))
				$obj['msj']='Exito al subir la imagen, '.$archivo;
			else
				$obj['msj']='Error al tratar de mover el archivo de carpeta';
		}
		else{
			$obj['msj']='error al tratar de subir el archivo';
		}
	}
	if($i=='ZZ'){
		$data=array(
			'tcode'=>$u,
			'campaigncode'=>$p,
			'offercode'=>$r,
			'titulo'=>$e,
			'descripcion'=>$d,
			'estado'=>'true',
			'fechaInicio'=>$k,
			'fechaFin'=>$l,
			'meta'=>$m,
			'color'=>$c,
			'imagen'=>$y);
		$ch=curl_init($ipServ.'telmex/add/camp');
		curl_setopt_array($ch, array(
			CURLOPT_POST => TRUE,
			CURLOPT_RETURNTRANSFER => TRUE,
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json'
			),
			CURLOPT_POSTFIELDS=>json_encode($data)
		));
	}
	else{
		$data=array(
			'id'=>$i,
			'tcode'=>$u,
			'campaigncode'=>$p,
			'offercode'=>$r,
			'titulo'=>$e,
			'descripcion'=>$d,
			'estado'=>'true',
			'fechaInicio'=>$k,
			'fechaFin'=>$l,
			'meta'=>$m,
			'color'=>$c,
			'imagen'=>$y);
		$ch=curl_init($ipServ."telmex/campUp");
		curl_setopt_array($ch, array(
			CURLOPT_CUSTOMREQUEST => "PUT",
			CURLOPT_RETURNTRANSFER => TRUE,
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json'
			),
			CURLOPT_POSTFIELDS=>json_encode($data)
		));
	}
	$obj['Data']=$data;
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else
		$response=json_decode($response);
	if($response->errorCode<0)
		$obj['Error']=$response->errorMessage;
	echo json_encode($obj);
}
else if($pky=='-:Ñ_6%fC'){ // Mostrando regiones asignadas a campaña en select cuando asigno fielders a campaña
	$p=$_POST['P'];
	$r=$_POST['R'];
	$res=file_get_contents($ipServ.'telmex/get/campAllRegs');
	if($res!=''){
		$res=json_decode($res);$i=0;
		foreach($res->apiResponse[0] as $k=>$v){
			if($v->estado==true && $v->idCampaña==$p && in_array($v->region,$r)){
				$obj['Regiones'][$i]['id_CR']=$v->id;
				$obj['Regiones'][$i]['id_C']=$v->idCampaña;
				$obj['Regiones'][$i]['Region']=$v->region;
				$obj['Regiones'][$i]['createAt']=$v->createAt;
				$ras=file_get_contents($ipServ.'telmex/get/campInformacion/'.$v->id);
				if($ras!=''){
					$ras=json_decode($ras);
					$obj['Regiones'][$i]['titulo']=$ras->apiResponse[0][0]->titulo;
					$obj['Regiones'][$i]['offercode']=$ras->apiResponse[0][0]->offer_code;
					$obj['Regiones'][$i]['campaigncode']=$ras->apiResponse[0][0]->campaign_code;
					$obj['Regiones'][$i]['tcode']=$ras->apiResponse[0][0]->tcode;
					$obj['Regiones'][$i]['meta']=$ras->apiResponse[0][0]->meta;
					$obj['Regiones'][$i]['region']=$ras->apiResponse[0][0]->region;
					$obj['Regiones'][$i]['createAt']=$v->createAt;
				}
				$i++;
			}
		}
		if($i==0)
			$obj['Sin']='No hay regiones asignadas a la campaña.';
	}
	else{
		$obj['Error']='No se encontró el servicio para obtener las regiones asignadas a esta campaña.';
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='lj.m,-/5tD'){ // Mostrando regiones asignadas a campaña, DIRECTOR
	$p=$_POST['P'];
	$res=file_get_contents($ipServ.'telmex/get/campAllRegs');
	$obj['Error']='';
	$obj['Sin']='';
	if($res!=''){
		$res=json_decode($res);$i=0;
		foreach ($res->apiResponse[0] as $k=>$v){
			if($v->estado==true)
				if($v->idCampaña==$p || in_array($v->region,$p) || $p[0]=='Todas las regiones' || $p[0]=='Todas las campañas'){
					if($v->idCampaña==$p || $p[0]=='Todas las regiones' || $p[0]=='Todas las campañas'){}
					else $i=$v->idCampaña; // Le pega cuando veo que regiones tiene la campaña, al admin o director
					$obj['Regiones'][$i]['id_CR']=$v->id;
					$obj['Regiones'][$i]['id']=$v->id;
					$obj['Regiones'][$i]['id_C']=$v->idCampaña;
					$obj['Regiones'][$i]['Region']=$v->region;
					$obj['Regiones'][$i]['createAt']=$v->createAt;
					$ras=file_get_contents($ipServ.'telmex/get/campById/'.$v->idCampaña);
					if($ras!=''){
						$ras=json_decode($ras);
						$obj['Regiones'][$i]['titulo']=$ras->apiResponse[0]->titulo;
						$obj['Regiones'][$i]['offercode']=$ras->apiResponse[0]->offercode;
						$obj['Regiones'][$i]['campaigncode']=$ras->apiResponse[0]->campaigncode;
						$obj['Regiones'][$i]['tcode']=$ras->apiResponse[0]->tcode;
						$obj['Regiones'][$i]['meta']=$ras->apiResponse[0]->meta;
						$obj['Regiones'][$i]['color']=$ras->apiResponse[0]->color;
						$obj['Regiones'][$i]['fecha_inicio']=$ras->apiResponse[0]->fechaInicio;
						$obj['Regiones'][$i]['fecha_fin']=$ras->apiResponse[0]->fechaFin;
						$obj['Regiones'][$i]['region']=$v->region;
					}
					$i++;
				}
		}
		if($i==0)
			$obj['Sin']='No hay regiones asignadas a la campaña.';
	}
	else{
		$obj['Error']='No se encontró el servicio para obtener los CR.';
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='lj.m,[0]tD'){ // Mostrando regiones asignadas a campaña, Lider en calendarios
	$p=$_POST['P'];
	$res=file_get_contents($ipServ.'telmex/get/campAllRegs');
	$obj['Error']='';
	$obj['Sin']='';
	if($res!=''){
		$res=json_decode($res);$i=0;
		foreach ($res->apiResponse[0] as $k=>$v){
			if($v->estado==true)
				if($v->idCampaña==$p || in_array($v->region,$p)){
					$obj['Regiones'][$i]['id_CR']=$v->id;
					$obj['Regiones'][$i]['id_C']=$v->idCampaña;
					$obj['Regiones'][$i]['Region']=$v->region;
					$ras=file_get_contents($ipServ.'telmex/get/campInformacion/'.$v->id);
					if($ras!=''){
						$ras=json_decode($ras);
						$obj['Regiones'][$i]['titulo']=$ras->apiResponse[0][0]->titulo;
						$obj['Regiones'][$i]['offercode']=$ras->apiResponse[0][0]->offer_code;
						$obj['Regiones'][$i]['campaigncode']=$ras->apiResponse[0][0]->campaign_code;
						$obj['Regiones'][$i]['tcode']=$ras->apiResponse[0][0]->tcode;
						$obj['Regiones'][$i]['meta']=$ras->apiResponse[0][0]->meta;
						$obj['Regiones'][$i]['region']=$ras->apiResponse[0][0]->region;
						$obj['Regiones'][$i]['createAt']=$v->createAt;
					}
					$i++;
				}
		}
		if($i==0)
			$obj['Sin']='No hay regiones asignadas a la campaña.';
	}
	else{
		$obj['Error']='No se encontró el servicio para obtener los CR.';
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='{-po9kD3$'){ // para eliminar reguin CR
	$p=trim($_POST['P']);
	$data[]=array('id'=>$p);
	$ch = curl_init($ipServ."telmex/del/cr");
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	print_r($response);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj=$response;
	}
	echo json_encode($obj);
}
else if($pky=='}-.Ygf#44'){ //Guardo nueva relacion CR
	$p=trim($_POST['P']);
	$r=trim($_POST['R']);
	$data[]=array(
		'idCampaña'=>$p,
		'region'=>$r);
	$ch = curl_init($ipServ.'telmex/add/cr');
	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE)
		die(curl_error($ch));
	$response=json_decode($response);
	$obj=$response->apiResponse[0];
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='/*ÑÑ%4dG'){ // Obtengo los fielders que ya estan en un calendario, validando su region tambien y campaña
	$p=trim($_POST['P']);	// Id cr
	$y=trim($_POST['Y']); // GetAllCFR=N - GetACalFi=Y
	$z=$_POST['Z'];	// Mis regiones
	$r=$_POST['R'];	// Region a comparar o bien NA
	foreach($z as $k=>$v){
		$w=substr($v,0,1);
		if(is_numeric($w))
			$zz[]=substr($v,0,4);
		else
			$zz[]=$v;
	}
	$abj=file_get_contents($ipServ.'telmex/get/calf/byIdCal/'.$p);
	$obj['errorMessageA']='';
	$obj['errorMessageB']='';
	$obj['Dentro']=array();
	$obj['Fuera']=array();
	if($abj=='')
		$obj['errorMessageA']='No hay respuesta del servidor para obtener usuarios registrados al CFR. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach($abj as $k=>$v){
			$com[]=$v->idFielder;$paso=0;
			$subj=file_get_contents($ipServ.'telmex/get/userandregiones/'.$v->idFielder);
			$subj=json_decode($subj);
			$subj=$subj->apiResponse[0];
			foreach($subj as $j=>$w){
				if(in_array(substr($w->regionTrabajo,0,4),$zz) && $w->role==7)
					$paso=1;
			}
			if($paso==1){
					$obj['Dentro'][$i]['id']=$v->id;
					$obj['Dentro'][$i]['idCalendar']=$v->idCalendar;
					$obj['Dentro'][$i]['idFielder']=$v->idFielder;
					$obj['Dentro'][$i]['createAt']=$v->createAt;
					$obj['Dentro'][$i]['nombre']=$v->nombre;
				$i++;
			}
		}
	}
	$r=explode('-',$r);
	$r=$r[0].'-'.$r[1];
	$abj=file_get_contents($ipServ.'telmex/get/userAllByRegiones/'.$r);
	if($abj=='')
		$obj['errorMessageB']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		foreach($abj as $k=>$v){
			$bat=explode('-',$v->region);
			$bet=$bat[1].'-'.$bat[2];
			if(!in_array($bat[0],$com)){
				if($bet==$r){
					$obj['Fuera'][$bat[0]]['idUsuario']=$bat[0];
					$obj['Fuera'][$bat[0]]['nombre']=$v->usrNombre;
					$obj['Fuera'][$bat[0]]['role']=7;
				}
			}
		}
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='/*-+%4dG'){ // Obtengo los fielders mas los fielders que ya estan asignados a un CFR
	$p=trim($_POST['P']);	// Id cr
	$y=trim($_POST['Y']); // GetAllCFR=N - GetACalFi=Y
	$z=$_POST['Z'];	// Mis regiones
	$r=$_POST['R'];	// Region a comparar o bien NA
	foreach($z as $k=>$v){
		$w=substr($v,0,1);
		if(is_numeric($w))
			$zz[]=substr($v,0,4);
		else
			$zz[]=$v;
	}
	if($y=='N')
		$abj=file_get_contents($ipServ.'telmex/get/cfr/'.$p);
	else
		$abj=file_get_contents($ipServ.'telmex/get/calf/byIdCal/'.$p);
	$obj['errorMessageA']='';
	$obj['errorMessageB']='';
	$obj['MisReg']=$z;
	$obj['MisRegZ']=$zz;
	$obj['Dentro']=array();
	$obj['Fuera']=array();
	if($abj=='')
		$obj['errorMessageA']='No hay respuesta del servidor para obtener usuarios registrados al CFR. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach($abj as $k=>$v){
			$com[]=$v->idFielder;$paso=0;
			$subj=file_get_contents($ipServ.'telmex/get/userandregiones/'.$v->idFielder);
			$subj=json_decode($subj);
			$subj=$subj->apiResponse[0];
			foreach($subj as $j=>$w){
				if($zz[0]!='Todas las regiones'){
					if(in_array(substr($w->regionTrabajo,0,4),$zz) && $w->role==7)
						$paso=1;
				}
				else if($w->role==7)
					$paso=1;
			}
			if($paso==1){
				if($y=='N'){
					$obj['Dentro'][$i]['idUsuario']=$v->idFielder;
					$obj['Dentro'][$i]['nombre']=$v->nombre;
					$obj['Dentro'][$i]['idCFR']=$v->idCFR;
					$obj['Dentro'][$i]['idCR']=$v->idCR;
				}
				else{
					$obj['Dentro'][$i]['id']=$v->id;
					$obj['Dentro'][$i]['idCalendar']=$v->idCalendar;
					$obj['Dentro'][$i]['idFielder']=$v->idFielder;
					$obj['Dentro'][$i]['createAt']=$v->createAt;
					$obj['Dentro'][$i]['nombre']=$v->nombre;
				}
				$i++;
			}
		}
	}
	$obj['com']=$com;
	if($zz[0]=='Todas las regiones'){
		$abj=file_get_contents($ipServ.'telmex/get/userAllRegs');
		if($abj=='')
			$obj['errorMessageB']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
		else{
			$abj=json_decode($abj);
			$abj=$abj->apiResponse[0];
			$i=0;
			foreach($abj as $k=>$v){
				if(!in_array($v->idUsuario,$com))
					if($v->role==7 && $v->cuenta==1){
						$obj['Fuera'][$i]['idUsuario']=$v->idUsuario;
						$obj['Fuera'][$i]['nombre']=$v->nombre;
						$obj['Fuera'][$i]['role']=$v->role;
						$i++;
					}
			}
		}
	}
	else{
		$r=explode('-',$r);
		$r=$r[0].'-'.$r[1];
		foreach($zz as $k=>$v){
			$iz=explode('-',$v);
			$iy[]=$iz[0].'-'.$iz[1];
		}
		$ix=implode(',',$iy);
		$abj=file_get_contents($ipServ.'telmex/get/userAllByRegiones/'.$ix);
		if($abj=='')
			$obj['errorMessageB']='No hay respuesta del servidor para obtener usuarios. NO RESPONSE';
		else{
			$abj=json_decode($abj);
			$abj=$abj->apiResponse[0];
			foreach($abj as $k=>$v){
				$bat=explode('-',$v->region);
				$bet=$bat[1].'-'.$bat[2];
				if(!in_array($bat[0],$com)){
					if($bet==$r){
						$obj['Fuera'][$bat[0]]['idUsuario']=$bat[0];
						$obj['Fuera'][$bat[0]]['nombre']=$v->usrNombre;
						$obj['Fuera'][$bat[0]]['role']=7;
					}
				}
			}
		}
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='hUUrf[,.()'){ // Mostrando calendarios que me asignaron o todos si soy director!
	$p=$_POST['P'];
	$q=$_POST['Q'];
	$res=file_get_contents($ipServ.'telmex/get/campAllRegs');
	$obj['Error']='';
	if($q==5){
		foreach($p as $k=>$v){
			$r=substr($v,0,2);
			$pp[]=$r;
		}
	}
	if($p[0]!='Todas las regiones'){
		if($res!=''){
			$res=json_decode($res);
			foreach($res->apiResponse[0] as $k=>$v){
				if($q==6){
					if(in_array($v->region,$p))
						$ibs[]=$v->id;
				}
				else if($q==5){
					$r=substr($v->region,0,2);
					if(in_array($r,$pp))
						$ibs[]=$v->id;
				}
			}
		}
		else $obj['Error']='No se logro obtener respuesta del servicio que devuelve las regiones que tienes asignadas como líder.';
	}
	else $p='NA';
	if($p=='NA' || !empty($ibs)){
		$res=file_get_contents($ipServ.'telmex/get/calendarAll');
		if($res!=''){
			$res=json_decode($res);$i=0;
			foreach($res->apiResponse[0] as $k=>$v){
				$fe_ini=strtotime($v->fechaInit);
				$fe_ini=date("Y-m-d",$fe_ini);
				$fe_end=strtotime($v->fechaEnd);
				$fe_end=date("Y-m-d",$fe_end);
				if($p!='NA'){
					if(in_array($v->idCr,$ibs)){
						$obj['Eventos'][$i]['inicio']=$fe_ini;
						$obj['Eventos'][$i]['fin']=$fe_end;
						$obj['Eventos'][$i]['titulo']=$v->titulo;
						$obj['Eventos'][$i]['meta']=$v->meta;
						$obj['Eventos'][$i]['descripcion']=$v->descripcion;
						$obj['Eventos'][$i]['idActividad']=$v->id;
						$obj['Eventos'][$i]['idCR']=$v->idCr;
						$obj['Eventos'][$i]['color']='#'.$v->color;
					}
				}
				else{
					$obj['Eventos'][$i]['inicio']=$fe_ini;
					$obj['Eventos'][$i]['fin']=$fe_end;
					$obj['Eventos'][$i]['titulo']=$v->titulo;
					$obj['Eventos'][$i]['meta']=$v->meta;
					$obj['Eventos'][$i]['descripcion']=$v->descripcion;
					$obj['Eventos'][$i]['idActividad']=$v->id;
					$obj['Eventos'][$i]['idCR']=$v->idCr;
					$obj['Eventos'][$i]['color']='#'.$v->color;
				}
				$i++;
			}
		}
		else $obj['Error']='No se pudo conectar al servicio para obtener las actividadesd de calendario.';
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='°1sLp9]+'){ //Actualizo evento de calendario....
	$a=trim($_POST['A']);
	$c=trim($_POST['C']);$c=explode(",",$c);$c=$c[0];
	$s=trim($_POST['S']);$s=date('Y-m-d',strtotime($s.' +1 day'));
	$e=trim($_POST['E']);$e=date('Y-m-d',strtotime($e.' +1 day'));
	$m=trim($_POST['M']);
	$t=trim($_POST['T']);
	$d=trim($_POST['D']);
	$data=array(
		'id'=>$a,
		'idCr'=>$c,
		'fechaInit'=>$s,
		'fechaEnd'=>$e,
		'meta'=>$m,
		'titulo'=>$t,
		'descripcion'=>$d);
	$obj['CalendarUp']=$data;
	$ch=curl_init($ipServ."telmex/calendarUp");
	curl_setopt_array($ch,array(
		CURLOPT_CUSTOMREQUEST=>"PUT",
		CURLOPT_RETURNTRANSFER=>TRUE,
		CURLOPT_HTTPHEADER=>array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
//		$response=json_decode($response);
		$obj['Raponse']=$response;
		$obj['Response']=json_decode($response);
	}
	echo json_encode($obj);
}
else if($pky=='y_m,/5fGd'){ //Crea un evento de calendario....
	$c=trim($_POST['C']);$c=explode(",",$c);$c=$c[0];
	$s=trim($_POST['S']);$s=date('Y-m-d',strtotime($s.' +1 day'));
	$e=trim($_POST['E']);$e=date('Y-m-d',strtotime($e.' +1 day'));
	$m=trim($_POST['M']);
	$t=trim($_POST['T']);
	$d=trim($_POST['D']);
	$data=array(
		'idCr'=>$c,
		'fechaInit'=>$s,
		'fechaEnd'=>$e,
		'meta'=>$m,
		'titulo'=>$t,
		'descripcion'=>$d);
	$obj['Data']=$data;
	$ch=curl_init($ipServ."telmex/add/calendar");
	curl_setopt_array($ch,array(
		CURLOPT_POST=>TRUE,
		CURLOPT_RETURNTRANSFER =>TRUE,
		CURLOPT_HTTPHEADER =>array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj['id']='';
		$obj['Error']='';
		if($response->errorCode<0)
			$obj['Error']=$response->errorMessage;
		else
			$obj['id']=$response->apiResponse[0]->id;
	}
	echo json_encode($obj);
}
else if($pky=='p_.9886fF+'){ //Agrega fielder a tarea de calendario
	$c=trim($_POST['C']);
	$r=trim($_POST['R']);
	$f=trim($_POST['F']);
/* [{
	"idCfr":"12",
	"idCampaña":"2",
	"idFielder":"7"
}] */
	$data=array(
		'idCfr'=>$c,
		'idCampaña'=>$r,
		'idFielder'=>$f);
	$ch=curl_init($ipServ."telmex/add/campFielder");
	curl_setopt_array($ch,array(
		CURLOPT_POST=>TRUE,
		CURLOPT_RETURNTRANSFER =>TRUE,
		CURLOPT_HTTPHEADER =>array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj['resp']='';
		$obj['Error']='';
		if($response->errorCode<0)
			$obj['Error']=$response->errorMessage;
		else
			$obj['resp']=$response->apiResponse;
		echo json_encode($obj);
	}
}
else if($pky=='-Ñp0?2.3d'){
	foreach($_POST['P'] as $v){
		$data[]=array('idFielder'=>$v);
	}
	$ch=curl_init($ipServ."telmex/get/coordn");
	curl_setopt_array($ch,array(
		CURLOPT_POST=>TRUE,
		CURLOPT_RETURNTRANSFER =>TRUE,
		CURLOPT_HTTPHEADER =>array(
			'Content-Type: application/json'
		),
		CURLOPT_POSTFIELDS=>json_encode($data)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		$obj['respon']=$response;
		$obj['Error']='';
		if($response->errorCode<0)
			$obj['Error']=$response->errorMessage;
		else
			$obj['r']=$response->apiResponse;
		echo json_encode($obj);
	}
}
else if($pky=='""#fGm0""'){ //Elimino actividad del calendario
	$p=trim($_POST['P']); //id
	$obj['Error']='';
	$obj['P']=$p;
	$obj['Ok']=0;
	$ch = curl_init($ipServ."telmex/del/calendar/".$p);
	curl_setopt_array($ch, array(
		CURLOPT_CUSTOMREQUEST => "DELETE",
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		)
	));
	$response=curl_exec($ch);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else{
		$response=json_decode($response);
		if($response->errorCode<0)
			$obj['Error']=$response->errorMessage;
		else $obj['Ok']=1;
	}
	echo json_encode($obj);
}
else if($pky=='k;624/6'){ // Graficos, obtener RC / INT de rango de fechas
	$fa=trim($_POST['P']);
	$fb=trim($_POST['U']);
	$ca=$_POST['C'];
	$obj['Error']='';
	$obj['camps']=$ca;
	$res=file_get_contents($ipServ.'telmex/get/rc/int/'.$fa.'/'.$fb);
	if($res!=''){
		$res=json_decode($res);
		$ven=0;$nov=0;
		$venb=0;$novb=0;
		$i=0;
		foreach($res->apiResponse[0] as $k=>$v){
			$dia=substr($v->createAt,0,2);       $dia=str_pad($dia,2,"0",STR_PAD_LEFT);
			$mes=substr($v->createAt,3,2);$mes--;$mes=str_pad($mes,2,"0",STR_PAD_LEFT);
			$ano=substr($v->createAt,6,4);
			if(in_array($v->idCampaign,$ca) || $ca[0]=='todas'){
				$obj['regiones'][$v->region]['name']=$v->region;
				if($obj['regiones'][$v->region]['y']=='' || $obj['regiones'][$v->region]['y']==null)
					$obj['regiones'][$v->region]['y']=0;
				if($obj['nuevos'][$v->idCampaign][0]=='' || $obj['nuevos'][$v->idCampaign][0]==null)
					$obj['nuevos'][$v->idCampaign][0]=0;
				if($obj['nuevos'][$v->idCampaign][1]=='' || $obj['nuevos'][$v->idCampaign][1]==null)
					$obj['nuevos'][$v->idCampaign][1]=0;
				if($yui[$v->idFielder]=='' || $yui[$v->idFielder]==null)
					$yui[$v->idFielder]=0;
				if($v->pesco==true){
					$obj['nuevos'][$v->idCampaign][0]=$obj['nuevos'][$v->idCampaign][0]+1;
					$obj['regiones'][$v->region]['y']=$obj['regiones'][$v->region]['y']+1;
					$yui[$v->idFielder]=$yui[$v->idFielder]+1;
				}
				else
					$obj['nuevos'][$v->idCampaign][1]=$obj['nuevos'][$v->idCampaign][1]+1;
			}
		}
		foreach($yui as $k=>$v){
			$res=file_get_contents($ipServ.'telmex/get/userById/'.$k);
			if($res!=''){
				$res=json_decode($res);
				$obj['fielders'][$res->apiResponse[0]->nombre]=$yui[$k];
			}
		}
	}
	else $obj['Error']='No se logro obtener respuesta del servicio que devuelve la información para graficar [1]';
	echo json_encode($obj);
}
else if($pky=='.tr/(ydF'){ // Obtener informacion de campaña por ID
	$p=$_POST['P'];
	$res=file_get_contents($ipServ.'telmex/get/campById/'.$p);
	$obj['Error']='';
	if($res!=''){
		$res=json_decode($res);
		$obj['img']=$res->apiResponse[0]->imagen;
		$obj['color']=$res->apiResponse[0]->color;
		$obj['descripcion']=$res->apiResponse[0]->descripcion;
		$obj['titulo']=$res->apiResponse[0]->titulo;
		$obj['tcode']=$res->apiResponse[0]->tcode;
		$obj['meta']=$res->apiResponse[0]->meta;
		$obj['campaigncode']=$res->apiResponse[0]->campaigncode;
		$obj['offercode']=$res->apiResponse[0]->offercode;
		$obj['fecha_inicio']=$res->apiResponse[0]->fechaInicio;//traian dia mes año entonces: date('Y-m-d',strtotime($res->apiResponse[0]->fechaInicio))
		$obj['fecha_fin']=$res->apiResponse[0]->fechaFin;
	}
	else $obj['Error']='No se logro obtener respuesta del servicio que devuelve la información de la campaña solicitada.';
	echo json_encode($obj);
}
else if($pky=='oP{ñ_,m$"'){ // Graficos, obtener RC / INT en tiempo real, por día...
	$p=$_POST['P'];
	$r=$_POST['R'];
	$fa=strtotime(date().' -1 months');
	$fa=date('Y-m-d',$fa);
	$fb=date('Y-m-d');
	$obj['Error']='';
	$aryRange=array();
	$iDateFr=mktime(1,0,0,substr($fa,5,2),substr($fa,8,2),substr($fa,0,4));
	$iDateTo=mktime(1,0,0,substr($fb,5,2),substr($fb,8,2),substr($fb,0,4));
	if($iDateTo>=$iDateFr){
		array_push($aryRange,date('d-m-Y',$iDateFr));
		while($iDateFr<$iDateTo){
			$iDateFr+=86400;
			array_push($aryRange,date('d-m-Y',$iDateFr));
		}
	}
	$res=file_get_contents($ipServ.'telmex/get/rc/int/'.$fa.'/'.$fb);
	if($res!=''){
		$res=json_decode($res);
		foreach($res->apiResponse[0] as $k=>$v){
			$dia=substr($v->createAt,0,2);       $dia=str_pad($dia,2,"0",STR_PAD_LEFT);
			$mes=substr($v->createAt,3,2);$mes--;$mes=str_pad($mes,2,"0",STR_PAD_LEFT);
			$ano=substr($v->createAt,6,4);
			$obj['campsIDS'][]=$v->idCampaign;
//			if((in_array($v->idCampaign,$p) || $p[0]=='todas') &&
//			(in_array($v->region,$r) || $r[0]=='Todas las regiones') || $r[0]=='Todas las campañas'){
				if($fv[$ano.'.'.$mes.'.'.$dia]=='' || $fv[$ano.'.'.$mes.'.'.$dia]==null)
					$fv[$ano.'.'.$mes.'.'.$dia]=0;
				if($nv[$ano.'.'.$mes.'.'.$dia]=='' || $nv[$ano.'.'.$mes.'.'.$dia]==null)
					$nv[$ano.'.'.$mes.'.'.$dia]=0;

				if($v->pesco==true)
					$fv[$ano.'.'.$mes.'.'.$dia]=$fv[$ano.'.'.$mes.'.'.$dia]+1;
				else
					$nv[$ano.'.'.$mes.'.'.$dia]=$nv[$ano.'.'.$mes.'.'.$dia]+1;
//			}
		}
		foreach($aryRange as $v){
			$dia=substr($v,0,2);       $dia=str_pad($dia,2,"0",STR_PAD_LEFT);
			$mes=substr($v,3,2);$mes--;$mes=str_pad($mes,2,"0",STR_PAD_LEFT);
			$ano=substr($v,6,4);
			if(array_key_exists($ano.'.'.$mes.'.'.$dia,$fv))
				$fvz[$ano.'.'.$mes.'.'.$dia]=$fv[$ano.'.'.$mes.'.'.$dia];
			else
				$fvz[$ano.'.'.$mes.'.'.$dia]=0;
			if(array_key_exists($ano.'.'.$mes.'.'.$dia,$nv))
				$nvz[$ano.'.'.$mes.'.'.$dia]=$nv[$ano.'.'.$mes.'.'.$dia];
			else
				$nvz[$ano.'.'.$mes.'.'.$dia]=0;
		}
		$obj['FV']=$fvz;
		$obj['NV']=$nvz;
		$obj['p']=$p;
		$obj['r']=$r;
	}
	else $obj['Error']='No se logro obtener respuesta del servicio que devuelve la información para graficar en tiempo real.';
	echo json_encode($obj);
}
else if($pky==',&44jÑ{'){
	$p=$_POST['P'];
	$nmsgs=file_get_contents($ipServ.'telmex/get/msgAll/'.$p);
	$nmsgs=json_decode($nmsgs);
	$nmsgs=$nmsgs->apiResponse[0];
	echo json_encode($nmsgs);
}
else if($pky=='7%&7fBh{'){ // Graficos, contratos mapa calor tiempo real....
	$p=$_POST['P'];
	$fa=strtotime(date().' -1 months');
	$fa=date('Y-m-d',$fa);
	$fb=date('Y-m-d');
	$obj['Error']='';
	$aryRange=array();
	$iDateFr=mktime(1,0,0,substr($fa,5,2),substr($fa,8,2),substr($fa,0,4));
	$iDateTo=mktime(1,0,0,substr($fb,5,2),substr($fb,8,2),substr($fb,0,4));
	if($iDateTo>=$iDateFr){
		array_push($aryRange,date('d-m-Y',$iDateFr));
		while($iDateFr<$iDateTo){
			$iDateFr+=86400;
			array_push($aryRange,date('d-m-Y',$iDateFr));
		}
	}
	$res=file_get_contents($ipServ.'telmex/get/contratos/intervalo/'.$fa.'/'.$fb);
	if($res!=''){
		$res=json_decode($res);
		foreach($res->apiResponse[0] as $k=>$v){
			if(in_array($v->idCampaign,$p) || $p[0]=='todas')
				$obj['puntos'][]=array(
					$v->latitud,
					$v->longitud,
				);
		}
	}
	else $obj['Error']='No se logro obtener respuesta del servicio que devuelve la información para graficar en tiempo real.';
	echo json_encode($obj);
}
else
	header("Location: ../");
ob_end_flush(); ?>