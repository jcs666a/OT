<?php ob_start();
/* json_encode($obj,JSON_UNESCAPED_UNICODE); */

$entorno='Desarrollo'; // Producción
$apiManager='Si'; // No

$llaveCR='#bJ;tyF$.-P/$34t';

//Ips Desarrollo:
$ipServ='http://187.217.179.35:9090/';
$ipLogi='https://187.217.179.35:8246/';
$ipApiM='https://187.217.179.35:8245/';
$ipWso2='://187.217.179.35:';
//Ips Producción
if($entorno=='Producción'){
    $ipServ='https://localhost:9090/';
    $ipLogi='https://187.217.179.35:8246/';
    $ipWso2='://187.217.179.35:';
	$ipApiM='https://187.217.179.35:8245/';
}

if($_POST['pky']!='')
	$pky=trim($_POST['pky']);
else
	header("Location: ../");

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
function regeneraToken($tipo,$url,$data,$contentType,$login){
	$ay=getCuki();
	if($ay!='' && !empty($ay)){
		$d=array(
			'user'=>trim($ay['user']),
			'pass'=>trim($ay['passw'])
		);
		$abj=curl('POST','services/TokinRenewingAM',$d,'','application/json','Si');
		$token=$abj['Resp']->access_token;
		if($token!='' && $token!=null && $token!=false && $token!==false){
			serialize_cookie('Cinf',array(
				'Nombre'=>$ay['Nombre'],
				'idBoss'=>$ay['idBoss'],
				'Role'	=>$ay['Role'],
				'idRole'=>$ay['idRole'],
				'User'	=>$ay['user'],
				'At'	=>enCr($token),
				'Pw'	=>enCr($ay['passw'])
			));
			$ub=curl($tipo,$url,$data,$token,$contentType,$login);
//			$ub['TokenRegenerado']=$token;
//			$ub['TokenAnterior']=$ay['token'];
		}
		else{
			$ub['errorMessage']='La respuesta para regenerar el Token fue nula ( regeneraToken )';
		}
	}
	else{
		$ub['errorMessage']='Algo anda mal, sin cookie, como llegó aqui? ( regeneraToken )';
	}

	return $ub;
}
function curl($tipo,$url,$data='',$token='',$contentType='application/json',$login='No'){
	global $ipServ,$ipLogi,$ipApiM,$apiManager;

	if($token!='') // $apiManager=='Si' || 
			$ipCurl=$ipApiM;
	else	$ipCurl=$ipServ;

	if($login=='Si')
		$ch=curl_init($ipLogi.$url);
	else{
		if($tipo!='Wso2-POST' && $tipo!='Wso2-GET' && $tipo!='Wso2-DELETE')
			$ch=curl_init($ipCurl.$url);
		else
			$ch=curl_init($url);
	}

	if($tipo=='Wso2-GET')	$tipo='GET';
	if($tipo=='Wso2-POST')	$tipo='POST';
	if($tipo=='Wso2-DELETE')$tipo='DELETE';

	if($token!='')
		$cabezas[]='authorization: Bearer '.$token;
		$cabezas[]='cache-control: no-cache';
		$cabezas[]='Content-Type: '.$contentType;

	$opciones[CURLOPT_USERAGENT]		='telmexdashboardjulio';
	$opciones[CURLOPT_VERBOSE]			=TRUE;
	$opciones[CURLOPT_AUTOREFERER]		=TRUE;
	$opciones[CURLOPT_ENCODING]			='';
	$opciones[CURLOPT_FOLLOWLOCATION]	=TRUE;
	$opciones[CURLOPT_CONNECTTIMEOUT]	=15;
	$opciones[CURLOPT_TIMEOUT]			=20;
	$opciones[CURLOPT_RETURNTRANSFER]	=TRUE;
	$opciones[CURLOPT_SSL_VERIFYPEER]	=FALSE;
	$opciones[CURLOPT_SSL_VERIFYHOST]	=FALSE;
	$opciones[CURLOPT_HTTPHEADER]		=$cabezas;
	$opciones[CURLOPT_CUSTOMREQUEST]	=$tipo;

	if($data!='')
		$opciones[CURLOPT_POSTFIELDS]	=json_encode($data);

	curl_setopt_array($ch,$opciones);
	unset($arr);unset($resp);
	$resp=curl_exec($ch);				// $arr['TalCual']=$resp;$arr['RespUrl']=$url;

	if($resp=='' || $resp==null){
		$arr['errorMessage']='La respuesta del servicio fue nula';
		$arr['TalCual']=$resp;
		$arr['data']=$data;
		$arr['RespUrl']=$url;
	}
	else if(curl_errno($ch) || $resp==false){
		$arr['errorMessage']='Error ch: '.curl_error($ch);
		$arr['TalCual']=$resp;
		$arr['RespUrl']=$url;
	}
	else if(strpos($resp,'<am')!==false){
		$p=xml_parser_create();
		xml_parse_into_struct($p,$resp,$vals,$index);
		xml_parser_free($p);
		if($index['AMS:MESSAGE'][0]!='' && $index['AMS:MESSAGE'][0]!=null){
			if($vals[$index['AMS:MESSAGE'][0]]['value']=='Invalid Credentials'){
				unset($arr);
				$arr=regeneraToken($tipo,$url,$data,$contentType,$login);
			}
			else{
				$arr['errorMessage']='Error AMS: '.$vals[$index['AMS:MESSAGE'][0]]['value'].': '.$vals[$index['AMS:DESCRIPTION'][0]]['value'];
			}
		}
		else if($index['AMT:MESSAGE'][0]!='' && $index['AMT:MESSAGE'][0]!=null)
			$arr['errorMessage']='Error AMT: '.$vals[$index['AMT:MESSAGE'][0]]['value'].': '.$vals[$index['AMT:DESCRIPTION'][0]]['value'];
		else
			$arr['errorMessage']='Error AM: '.$vals[$index['AM:MESSAGE'][0]]['value'].': '.$vals[$index['AM:DESCRIPTION'][0]]['value'];
		$arr['TalCual']=$resp;
		$arr['RespUrl']=$url;
	}
	else
		$arr['Resp']=json_decode($resp);

	return $arr;
}
function logout($data,$qe='',$tkn=''){
	if($tkn==''){
		$tkn=getCuki();
		$tkn=$tkn['token'];
	}
	$res=curl('PUT','DesactivaConexionUsuario/1.0.0',$data,$tkn);
	$obj['errorMessage']='';
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' (logout)';
		$obj['data']=$res['data'];
	}
	else{
		$re=$res['Resp']->apiResponse[0]->conectado;
		if($re==false){
			$obj['Exito']='Si';
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
		else{
			$obj['errorMessage']='Error, no se pudo desconectar el usuario (logout)';
		}
	}
	if($qe=='')
		echo json_encode($obj);
	else if($qe=='cacha')
		return $obj;
}
function enCr($s){
	global $llaveCR;
	$result='';
	for($i=0; $i<strlen($s); $i++){
		$char=substr($s,$i,1);
		$keychar=substr($llaveCR,($i % strlen($llaveCR))-1,1);
		$char=chr(ord($char)+ord($keychar));
		$result.=$char;
	}	return base64_encode($result);
}
function deCr($s){
	global $llaveCR;
	$result='';
	$s=base64_decode($s);
	for($i=0; $i<strlen($s); $i++){
		$char=substr($s,$i,1);
		$keychar=substr($llaveCR,($i % strlen($llaveCR))-1,1);
		$char=chr(ord($char)-ord($keychar));
		$result.=$char;
	}	return $result;
}
function mensajes($Ids,$mas,$emisor,$receptor){
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
	$response=curl("POST",'telmex/add/mensaje',$data);
	if($response===FALSE)
		$obj['Error']=='Error al conectarse al servicio para agregar mensaje';
	else{
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
function getCuki(){
	$la=json_decode($_COOKIE['Cinf']);
	$ay['Nombre']=$la[0];
	$ay['idBoss']=$la[1];
	$ay['Role']=$la[2];
	$ay['idRole']=$la[3];
	$ay['user']=$la[4];
	$ay['token']=deCr($la[5]);
	$ay['passw']=deCr($la[6]);
	unset($la);
	return $ay;
}

if($pky=='}54ñj?='){ //Login
	// engomathic
	// Engo@engomathic01
	$d=array(
		'user'=>trim($_POST['U']),
		'pass'=>trim($_POST['P'])
	);
	$logout='';
	$abj=curl('POST','services/LoginToken',$d,'','application/json','Si');
	if($abj['errorMessage']!=''){
		$object['errorMessage']=$abj['errorMessage'].' ( }54ñj?= )';
		$object['TalCual']=$abj['TalCual'];
		$object['RespUrl']=$abj['RespUrl'];
	}
	else{
		$object['errorMessage']='';
		$object['adverMessage']='';
		$object['dentrMessage']='';
		if($abj['Resp']->usuario->apiResponse!='' && $abj['Resp']->usuario->apiResponse!=null && $abj['Resp']->usuario->apiResponse!='null'){

			$vApiResp=json_decode($abj['Resp']->usuario->apiResponse);
			$data=array('idUsuario'=>$vApiResp->idUsuario);

			if($vApiResp->role->role!='Usuario Tecnico' &&
			$vApiResp->role->role!='Usuario Comercial' &&
			$vApiResp->role->role!='Supervisor Comercial' &&
			$vApiResp->role->role!='Promotor' &&
			$vApiResp->cuenta==1){

				if($abj['Resp']->usuario->access_token!='' && $abj['Resp']->usuario->access_token!=null && $abj['Resp']->usuario->access_token!='null'){
					$object['dentrMessage']=1;
					$object['z']='dashboard/#34fTRc';
					$ibj=curl('GET','ObtieneUsuarioRegionTrabajo/1.0.0/'.$vApiResp->idUsuario,'',$abj['Resp']->usuario->access_token);
	//				$ibj=curl('GET','telmex/get/userandregiones/'.$vApiResp->idUsuario);
					if($ibj['errorMessage']!=''){
						$logout=logout($data,'cacha',$abj['Resp']->usuario->access_token);
						$object['errorMessage']=$ibj['errorMessage'].' ( }54ñj?= )';
						$object['TalCual']=$ibj['TalCual'];
						$object['RespUrl']=$ibj['RespUrl'];
					}
					else{
						$object['ibkTal']=$ibj;
						$ibj=$ibj['Resp']->apiResponse[0];
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
						$object['toKen']=$abj['Resp']->usuario->access_token;
						serialize_cookie('Cinf',array(
							'Nombre'=>$vApiResp->nombre,
							'idBoss'=>$vApiResp->idUsuario,
							'Role'	=>$vApiResp->role->role,
							'idRole'=>$vApiResp->role->idRole,
							'User'	=>$vApiResp->usuario,
							'At'	=>enCr($abj['Resp']->usuario->access_token),
							'Pw'	=>enCr($_POST['P'])
						));
						serialize_cookieReg('Creg',$object['regiones']);
					}
				}
				else{
					$logout['errorMessage']='No puedo desconectar al usuario porque no pude generar un Token';
					$object['errorMessage']='El token recibido no es válido o es nulo ( }54ñj?= )';
					$object['TalCual']=$abj;
				}
			}
			else{
				if($abj['Resp']->usuario->access_token!='' && $abj['Resp']->usuario->access_token!=null && $abj['Resp']->usuario->access_token!='null'){
					$logout=logout($data,'cacha',$abj['Resp']->usuario->access_token);
				}
				else{
					$logout['errorMessage']='No puedo desconectar al usuario porque no pude generar un Token';
				}
				$object['adverMessage']='No tienes acceso a esta aplicación';
			}
		}
		else{
			$object['adverMessage']='El usuario ya se encuentra conectado.';
		}
	}
	if($logout!=''){
		if($logout['errorMessage']!=''){
			$object['errorMessage']=$object['errorMessage'].', '.$logout['errorMessage'];
			$object['adverMessage']=$object['adverMessage'].', '.$logout['errorMessage'];
			$object['logoutData']=$logout['data'];
		}
	}
	echo json_encode($object);
}
else if($pky=='4g?$eRt='){ //logout
	$data=array('idUsuario'=>$_POST['P']);
	logout($data);
}
else if($pky=='b.4{d2xA'){//Enviar mails
	$correo=trim($_POST['M']);
	$asunto=trim($_POST['A']);
	$cuerpo=trim($_POST['C']);
	$templa=file_get_contents('mailer/temp.html', FILE_USE_INCLUDE_PATH);
	$templa=str_replace("{{titulo}}",$asunto,$templa);
	$templa=str_replace("{{cuerpo}}",$cuerpo,$templa);
	require 'mailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->CharSet = 'utf-8';
	ini_set('default_charset', 'UTF-8');
	$mail->isSMTP();
	$mail->SMTPDebug=0; // 0=off, 1=client messages, 2=client and server messages
	$mail->Debugoutput='html';
	$mail->Host='smtp.gmail.com';
	$mail->Port=587;
	$mail->SMTPSecure='tls';
	$mail->SMTPAuth=true;
	$mail->Username="jcottelmex@gmail.com";
	$mail->Password="Blitz2016";
	$mail->setFrom('jcottelmex@gmail.com','Administración de Dashboard');
	$mail->addAddress($correo,'Administración de Dashboard');
	$mail->Subject=$asunto;
	$mail->msgHTML($templa);
	$mail->AltBody=$asunto.' /r/n/r/n '.$cuerpo;
	if (!$mail->send()){
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}
}
else if($pky=='46%6&fyR'){ //Obtiene divisiones para menu
	$obj['errorMessage']='';
	$abj=curl('GET','getCatalog/CatalogoDivisiones');
	if($abj['errorMessage']!=''){
		$obj['errorMessage']=$abj['errorMessage'].' ( 46%6&fyR )';
		$obj['TalCual']=$abj['TalCual'];
		$obj['RespUrl']=$abj['RespUrl'];
	}
	else{
		$abj=$abj['Resp']->apiResponse;
		foreach($abj as $k=>$vl){
			$obj['divs'][$k]['id']=$vl->id;
			$obj['divs'][$k]['de']=$vl->descripcion;
		}
	}
	echo json_encode($obj);
}
else if($pky=='ñhj/4"1z'){ //Pinta poligonos de divisiones
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
	$abj=curl('GET','getDivisionByName/geoJson/'.rawurlencode($_POST['P']));
	if($abj['errorMessage']!='')
		$obj['errorMessage']=$abj['errorMessage'];
	else{
		$abj=str_replace('"color":"blue"','"color":"#E0E4CC"',$abj);
		$abj=$abj['Resp'];
		$obj['mapa']=$abj->apiResponse[0];
		unset($abj);
		$abj=curl('GET','getAreaCatalog/'.$_POST['U']);
		if($abj['errorMessage']!='')
			$obj['errorMessage']=$abj['errorMessage'];
		else{
			$abj=$abj['Resp'];
			$abj=$abj->apiResponse;
			$opciones='<option value="0" disabled selected>Áreas</option>';
			foreach($abj as $k=>$vl){
				if(($_POST['X'][0]=='Todas las regiones' || $_POST['X'][0]=='Todas las campañas' || $derecho[0]=='Todas') ||
					in_array($vl->id,$derecho))
						$opciones.='<option value="'.$vl->id.'">'.$vl->descripcion.'</option>';
			}
			$obj['areas']=$opciones;
		}
	}
	echo json_encode($obj);

}
else if($pky=='5yj[.-}'){ //Pinta poligonos de areas
	$jsan=curl('GET','getAreaByName/geoJson/'.rawurlencode($_POST['P']));
	if($jsan['errorMessage']!='')
		$abj['errorMessage']=$jsan['errorMessage'];
	else{
//		$jsan=str_replace('"color":"blue"','"color":"#E0E4CC"',$jsan['Resp']);
		$abj=$jsan['Resp'];
		$abj=$abj->apiResponse[0];
	}
	echo json_encode($abj);
}
else if($pky=='er43{¿3'){ //Obtiene nombre de colonias
	$abj=curl('GET','telmex/necropsia/getNecropsiaColoniaByArea/'.$_POST['P']);
	if($abj['errorMessage']!='')
		$abj['errorMessage']=$abj['errorMessage'];
	else{
		$abj=$abj['Resp'];
		$abj=$abj->apiResponse;
	}
	echo json_encode($abj);
}
else if($pky=='eK,.-/'){ //Obtiene nombre de distritos
	$abj=curl('GET','getDistritosBySearch/'.$_POST['P'].'/0');
	if($abj['errorMessage']==''){
		$abj=$abj['Resp'];
	}
	echo json_encode($abj);
}
else if($pky=='Tym,pñ&'){ //Obtiene fielders por region
	$abj=curl('GET','telmex/get/usuariosregion/'.$_POST['P']);
	if($abj['errorMessage']==''){
		$abj=$abj['Resp'];
		$abj=$abj->apiResponse[0];
	}
	echo json_encode($abj);
}
else if($pky==',.-76reIo5{'){ //Obtiene fielders por Area
	$abj=curl('GET','telmex/get/usuariosarea/'.$_POST['P']);
	$obj[]=array();
	if($abj['errorMessage']==''){
		$abj=$abj['Resp'];
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach($abj as $k=>$v){
			if($v[1]==7){
				$obj[$i][0]=$v[0];
				$obj[$i][1]=$v[1];
				$obj[$i][2]=$v[2];
				$obj[$i][3]=$v[3];
				$obj[$i][4]=$v[4];
				$obj[$i][5]=$v[5];
				$obj[$i][6]=$v[6];
				$obj[$i][7]=$v[7];
				$obj[$i][8]=$v[8];
				$obj[$i][9]=$v[9];
				$obj[$i][10]=$v[10];
				$obj[$i][11]=$v[11];
				$obj[$i][12]=$v[12];
				$obj[$i][13]=$v[13];
				$obj[$i][14]=$v[14];
				$i++;
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='lñjh(U]'){ //Pinta los distritos pedidos (Necesito mandarme el área)
	$data[]=$_POST['P'];
	$area=$_POST['A'];
	$postData = array(
		'distritos'=>array(
			'name'=>$data,'idArea'=>$area,'color'=>'#ff9000'
		)
	);
	$obj['Error']='NO RESPONSE, en el servicio para obtener poligonos de distritos.';
	$response=curl('POST','getDistrito/geoJson',$postData);
	if($response['errorMessage']==''){
		$responseData=$response['Resp'];
		echo json_encode($responseData->apiResponse[0]);
	}
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
	$abj=curl('GET','telmex/get/userAllRegs');
	if($abj['errorMessage']!='')
		$obj['errorMessage']=$abj['errorMessage'];
	else{
		$abj=$abj['Resp'];
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
					$ibj=curl('GET','telmex/get/region/'.$v->idUsuario);
					if($ibj['errorMessage']!='')
						$obj['errorMessage']=$ibj['errorMessage'];
					else{
						$ibj=$ibj['Resp'];
						$ibj=$ibj->apiResponse[0];
						$o=0;
						foreach($ibj as $ky=>$vy){
							$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
							$o++;
						}
						$i++;
					}
				}
				else{
					$ibj=curl('GET','telmex/get/region/'.$v->idUsuario);
					if($ibj['errorMessage']!='')
						$obj['errorMessage']=$ibj['errorMessage'];
					else{
						$ibj=$ibj['Resp'];
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
		$abj=curl('GET','telmex/get/usuariosLiderByDiv/'.$p);
	}
	else{
		$abj=curl('GET','telmex/get/usuariosPromotorByDivArea/'.$p);
	}
	$obj['TalCual']=$abj;
	if($abj['errorMessage']!='')
		$obj['errorMessage']=$abj['errorMessage'];
	else{
		$abj=$abj['Resp'];
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
			$ibj=curl('GET','telmex/get/region/'.$v->idUsuario);
			if($ibj['errorMessage']!='')
				$obj['errorMessage']=$ibj['errorMessage'];
			else{
				$ibj=$ibj['Resp'];
				$ibj=$ibj->apiResponse[0];
				$o=0;
				foreach($ibj as $ky=>$vy){
					$obj['u'][$i]['regiones'][$o]=$vy->regionTrabajo;
					$o++;
				}
				$i++;
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='ñ*}{Lokj'){ //Traigo todas las campañas
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$res=curl('GET','ObtieneCampanias/1.0.0','',$tkn);
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( ñ*}{Lokj )';
		$obj['TalCual']=$res['TalCual'];
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		$abj=$res['Resp']->apiResponse[0];
		$i=0;$hoy=date("Ymd");
		foreach ($abj as $k=>$v){
			if($v->estado==true){
				$terminada='Vigente';
				$ffin=str_replace("-","",$v->fechaFin);
				$fechaFinMas=date('Y-m-d',strtotime($v->fechaFin.' +1 day'));
				if($hoy>$ffin)	$terminada='Caduca';
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
				$obj[$i]['fecha_fin_mas']=$fechaFinMas;
				$obj[$i]['descripcion']=htmlspecialchars($v->descripcion,ENT_QUOTES);
				$obj[$i]['caducidad']=$terminada;
				$obj[$i]['Hoy']=$hoy;
				$i++;
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='-Iyh&4}['){ //Traigo info del usuario por id
	$abj=curl('GET','telmex/get/userandregiones/'.$_POST['P']);
	if($abj['errorMessage']!='')
		$obj['errorMessage']=$abj['errorMessage'];
	else{
		$abj=$abj['Resp'];
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
	$response=curl('PUT','telmex/userUp',$data);
	if($response===FALSE){
		$obj='Error';
	}
	else{
		$response=json_decode($response);
		$obj=0;
		if($response->errorCode<0)
			$obj=$response->errorMessage;
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
	$pasLen=strlen($p);
	$errorPass='Con';
	$obj['ErrorPass']='';
	$obj['Error']='';
	if($pasLen>=6 && $pasLen<=32){
		if(preg_match('/[A-Z]/',$p) && preg_match('/[a-z]/',$p)){
			if(preg_match('/[0-9]/', $p)){
				if(preg_match('/[^a-z0-9 ]+/i',$p)) $errorPass='Sin';
				else
				$obj['ErrorPass']='Tu contraseña no contiene algún caracter especial (debe contener al menos uno)';
			}
			else
				$obj['ErrorPass']='Tu contraseña no contiene algún número (debe contener al menos un número)';
		}
		else	$obj['ErrorPass']='Tu contraseña debe contener mayúsculas y minúsculas (al menos una de cada una)';
	}
	else		$obj['ErrorPass']='Tu contraseña debe ser de al menos 6 caracteres, máximo 32';
	$data=array(
		'role'=>array('idRole'=>$r),
		'nombre'=>$n,
		'usuario'=>$u,
		'password'=>$p,
		'expediente'=>$e,
		'correo'=>$s,
		'cuenta'=>1);
	if($errorPass=='Sin'){
		$response=curl('POST','telmex/add/user',$data);
		if($response['errorMessage']!='')
			$obj['Error']=$response['errorMessage'];
		else if($response=='')
			$obj['Error']='Error, la respuesta del servicio fue nula';
		else{
			$response=$response['Resp'];
			if($response->errorCode<0)
				$obj['Error']=$response->errorMessage;
			else{
				if($response->errorMessage!=''){
					$obj['Error']=$response->errorMessage;
				}
				else{
					$obj['RespoAddUser']=$response;
					if($z=='')$obj['Respo']=$response->apiResponse[0];
					else{
						$nU=$response->apiResponse[0];
						$postData[]=array(
							'idUsuario'=>$nU->idUsuario,
							'regionTrabajo'=>$z
						);
						$response=curl('POST','telmex/add/regiones',$postData);
						if($response['errorMessage']!='')
							$obj['ErrorRegiones']=$response['errorMessage'];
						else{
							$response=$response['Resp'];
							if($response->errorCode<0)
								$obj['ErrorRegiones']=$response->errorMessage;
							else
								$obj['RespoRegiones']=$response->apiResponse[0];
						}
						$obj['RegionesAsignadas']=$postData;
					}
					$token=curl('Wso2-GET','https'.$ipWso2.'8246/services/TokenService');
					if($token['errorMessage']==''){
						$token=$token['Resp'];
						$token=$token->access_token;

						$obj['URLTOKEN']='https'.$ipWso2.'8246/services/TokenService';
						$obj['TOKEN']=$token;

						if($token!=''){
							if($r==7){
								$dat=array(
									'username'=>$u,
									'password'=>$p,
									'nombre'=>$n,
									'apellido'=>$n,
									'correo'=>$s,
									'role'=>'Fielder',
									'tier'=>'Silver');
								$response=curl('Wso2-POST','https'.$ipWso2.'8246/services/AddSuscribewso2',$dat,$token);
								if($response===FALSE)
									$obj['Error']='Error al solicitar servicio de WSo2 para generar un nuevo usuario';
								else if($response==null || $response=='null')
									$obj['Error']='La respuesta de crear usuario en WSO2 fue nula';
								else{
									unset($dat);unset($token);
								}
							}
							else{
								$dat=array(
									'username'=>$u,
									'password'=>$p,
									'nombre'=>$n,
									'apellido'=>$n,
									'correo'=>$s,
									'tier'=>'Gold');
								$response=curl('Wso2-POST','https'.$ipWso2.'8246/services/AddSuscribeAM',$dat,$token);
								if($response===FALSE)
									$obj['Error']='Error al solicitar servicio de Api Manager para generar un nuevo usuario';
								else if($response==null || $response=='null')
									$obj['Error']='La respuesta de crear usuario en Api Manager fue nula';
								else{
									unset($dat);unset($token);
								}
							}
						}
						else
							$obj['Error']='El token de acceso para WSO2 no fue recibido correctamente.<br />'.'https'.$ipWso2.'9443/mdm-admin/users';
					}
					else
						$obj['Error']="No se recibió respuesta del servicio de WSO2 /services/TokenService".'http'.$ipWso2.'8283/services/TokenService';
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
	$response=curl('POST','telmex/add/regiones',$postData);
	if($response === FALSE){
		$obj['error_curl']='Error al resivir respuesta del servicio para agregar regiones';
	}
/*	else if($response==null || $response=='null' || $response=='' || $response==0){
		$obj['error']='No se recibió dato alguno del servicio para agregar una región, vuelve a cargar la página, probablemente si se agregó la región, si no, inténtalo nuevamente.';
	} */
	else{
		$responseData=json_decode($response);
		$obj['z']=$z;
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
	$response=curl('DELETE','telmex/del/region/'.$p.'/'.$r);
	if($response===FALSE){
		$obj['Error']="Error al recibir respuesta del servicio para eliminar una región de un usuario";
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
	$response=curl('POST','telmex/add/cfr',$data);
	if($response === FALSE)
		$obj['Error']='Error al recibir respuesta del servicio para agregar una CFR';
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
	$data[]=array('id'=>$y,'idFielder'=>$p);
	$obj='';
	$response=curl("POST","telmex/del/cfr",$data);
	if($response===FALSE){
		$obj['Error']='Error al recibir la respuesta del servicio para eliminar una CFR.';
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
	$r=trim($_POST['R']);
	$data=array('idUsuario'=>$p);
	$response=curl('PUT','telmex/userDel',$data);
	if($response===FALSE){
		$obj['Error']='Error al recibir respuesta del servicio para eliminar un usuario';
	}
	else{
		$response=json_decode($response);
		$obj['resp']=$response;
		/* Eliminar del WSO2: */
		if($r==7){
			$token=curl('Wso2-GET','http'.$ipWso2.'8283/services/TokenService');
			if($token!='' && $token!=null && $token!='null'){
				$token=json_decode($token);
				$token=$token->access_token;
				if($token!=''){
					$dat=array(
						'username'=>'PRIMARY/'.$u,
						'firstname'=>$n,
						'lastname'=>$n,
						'emailAddress'=>$s,
						'roles'=>array('Fielder'));
					$response=curl('Wso2-DELETE','https'.$ipWso2.'9443/mdm-admin/users?username='.$u,$dat,$token);
					if($response===FALSE)
						$obj['Error']='Error al tratar de recibir respuesta de WSO2 para eliminar usuario';
					else if($response==null || $response=='null')
						$obj['Error']='La respuesta de eliminar usuario en WSO2 fue nula, token: '.$token;
					else{
						unset($dat);unset($token);
					}
				}
				else
					$obj['Error']='El token de acceso para WSO2 no fue recibido correctamente.<br />'.'https'.$ipWso2.'9443/mdm-admin/users';
			}
			else
				$obj['Error']="No se recibió respuesta del servicio de WSO2 /services/TokenService".'http'.$ipWso2.'8283/services/TokenService';
		}
		echo json_encode($obj);
	}
}
else if($pky=='0Ṕ[RGdf'){ //Cerrar sesión de un usuario
	$p=trim($_POST['P']);
	$response=curl('PUT','telmex/desconectaUsuario/'.$p);
	if($response===FALSE){
		$obj['Error']='Error al recibir respuesta del servidor para desconectar al usuario';
	}
	else{
		$response=json_decode($response);
		$obj['resp']=$response;
	}
	echo json_encode($obj);
}
else if($pky=='h-&7/f5D'){ //Elimino campaña
	$p=trim($_POST['P']);
//	$response=curl('DELETE','telmex/del/camp/'.$p);
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$obj['Sin']='';
	$obj['errorMessage']='';
	$res=curl('DELETE','BorrarCampania/1.0.0/'.$p,'',$tkn);
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( h-&7/f5D )';
		$obj['TalCual']=$res;
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		$res=$res['Resp'];$i=0;
		$hoy=date('Ymd');
		if($res->errorMessage!='')
			$obj['errorMessage']=$res->errorMessage;
	}
	echo json_encode($obj);
}
else if($pky=='g.-&3eGD'){ // Guardo edición de campaña o también campaña nueva!
	$i=trim($_POST['I']);
	$e=trim($_POST['E']);
	$u=trim($_POST['U']);
	$p=trim($_POST['P']);
	$r=trim($_POST['R']);
	$d=trim($_POST['D']);
	$k=trim($_POST['K']);$obj['K']=$k;$k=date('Y-m-d',strtotime($k.' + 1 days'));
	$l=trim($_POST['L']);$obj['L']=$l;$l=date('Y-m-d',strtotime($l.' + 1 days'));
	$m=trim($_POST['M']);$obj['M']=$m;
	$c=trim($_POST['C']);$c=ltrim($c,'#');
	$y='';
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$obj['errorMessage']='';

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
		$response=curl('POST','CrearCampania/1.0.0',$data,$tkn);
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
		$response=curl('PUT','ActualizarCampania/1.0.0',$data,$tkn);
	}
	$obj['Data']=$data;
	if($response['errorMessage']!=''){
		$obj['errorMessage']=$response['errorMessage'].' ( .tr/(ydF )';
		$obj['TalCual']=$response;
		$obj['RespUrl']=$response['RespUrl'];
	}
	else{
		$response=$response['Resp'];
		$response=json_decode($response);
		if($response->errorCode<0)
			$obj['errorMessage']=$response->errorMessage;
		else
			$obj['responSe']=$response;
	}
	echo json_encode($obj);
}
else if($pky=='-:Ñ_6%fC'){ // Mostrando regiones asignadas a campaña en select cuando asigno fielders a campaña
	$p=$_POST['P'];
	$r=$_POST['R'];
	$res=curl('GET','telmex/get/campAllRegs');
	if($res === FALSE)
		$obj['Error']='No se encontró el servicio para obtener las regiones asignadas a esta campaña.';
	else{
		$res=json_decode($res);$i=0;
		foreach($res->apiResponse[0] as $k=>$v){
			if($v->estado==true && $v->idCampaña==$p && in_array($v->region,$r)){
				$obj['Regiones'][$i]['id_CR']=$v->id;
				$obj['Regiones'][$i]['id_C']=$v->idCampaña;
				$obj['Regiones'][$i]['Region']=$v->region;
				$obj['Regiones'][$i]['createAt']=$v->createAt;
				$ras=curl('GET','telmex/get/campInformacion/'.$v->id);
				if($ras === FALSE){}
				else{
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
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='lj.m,-/5tD'){ // Mostrando regiones asignadas a campaña, DIRECTOR
	$p=$_POST['P'];
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$obj['Sin']='';
	$obj['errorMessage']='';
	$res=curl('GET','ObtieneTodasCampaniasRegion/1.0.0','',$tkn);
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( lj.m,-/5tD )';
		$obj['TalCual']=$res;
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		$res=$res['Resp'];$i=0;
		$hoy=date('Ymd');
		foreach ($res->apiResponse[0] as $k=>$v){
			if($v->estado==true)
				if($v->idCampaña==$p || in_array($v->region,$p) || $p[0]=='Todas las regiones' || $p[0]=='Todas las campañas'){
					if($v->idCampaña==$p || $p[0]=='Todas las regiones' || $p[0]=='Todas las campañas'){}
					else $i=$v->idCampaña;
					$obj['Regiones'][$i]['id_CR']=$v->id;
					$obj['Regiones'][$i]['id']=$v->id;
					$obj['Regiones'][$i]['id_C']=$v->idCampaña;
					$obj['Regiones'][$i]['Region']=$v->region;
					$obj['Regiones'][$i]['createAt']=$v->createAt;
					$ras=curl('GET','ObtieneCampaniaPorId/1.0.0/'.$v->idCampaña,'',$tkn);
					if($ras['errorMessage']!=''){
						$obj['errorObtieneCampaniaPorId'][]=$ras['errorMessage'].' ( lj.m,-/5tD )';
						$obj['TalCualObtieneCampaniaPorId'][]=$ras;
					}
					else{
						$ras=$ras['Resp'];
						$terminada='Vigente';
						$ffin=str_replace("-","",$ras->apiResponse[0]->fechaFin);
						$fechaFinMas=date('Y-m-d',strtotime($ras->apiResponse[0]->fechaFin.' +1 day'));
						if($hoy>$ffin)	$terminada='Caduca';
						$obj['Regiones'][$i]['titulo']=$ras->apiResponse[0]->titulo;
						$obj['Regiones'][$i]['offercode']=$ras->apiResponse[0]->offercode;
						$obj['Regiones'][$i]['campaigncode']=$ras->apiResponse[0]->campaigncode;
						$obj['Regiones'][$i]['tcode']=$ras->apiResponse[0]->tcode;
						$obj['Regiones'][$i]['meta']=$ras->apiResponse[0]->meta;
						$obj['Regiones'][$i]['color']=$ras->apiResponse[0]->color;
						$obj['Regiones'][$i]['fecha_inicio']=$ras->apiResponse[0]->fechaInicio;
						$obj['Regiones'][$i]['fecha_fin']=$ras->apiResponse[0]->fechaFin;
						$obj['Regiones'][$i]['fecha_fin_mas']=$fechaFinMas;
						$obj['Regiones'][$i]['region']=$v->region;
						$obj['Regiones'][$i]['caducidad']=$terminada;
					}
					$i++;
				}
		}
		if($i==0)
			$obj['Sin']='No hay regiones asignadas a la campaña.';
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='{-po9kD3$'){ // para eliminar region CR
	$p=trim($_POST['P']);
	$data[]=array('id'=>$p);
	$response=curl("POST","telmex/del/cr",$data);
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
	$obj['errorMessage']='';
	$data[]=array(
		'idCampaña'=>$p,
		'region'=>$r);
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$res=curl('POST','CrearCampaniaRegion/1.0.0',$data,$tkn);
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( }-.Ygf#44 )';
		$obj['TalCual']=$res['TalCual'];
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		$res=$res['Resp'];
		$obj['Resp']=$res->apiResponse[0];
	}
	echo json_encode($obj,JSON_UNESCAPED_UNICODE);
}
else if($pky=='/*-+%4dG'){ // Obtengo los fielders mas los fielders que ya estan asignados a un CFR
	$p=trim($_POST['P']);	// Id cr
	$z=$_POST['Z'];	// Mis regiones
	$r=$_POST['R'];	// Region a comparar o bien NA
	foreach($z as $k=>$v){
		$w=substr($v,0,1);
		if(is_numeric($w))
			$zz[]=substr($v,0,4);
		else
			$zz[]=$v;
	}
	$abj_url='telmex/get/cfr/'.$p;
	$obj['errorMessageA']='';
	$obj['errorMessageB']='';
	$obj['MisReg']=$z;
	$obj['MisRegZ']=$zz;
	$obj['Dentro']=array();
	$obj['Fuera']=array();
	$abj=curl('GET',$abj_url);
	if($abj === FALSE)
		$obj['errorMessageA']='No hay respuesta del servidor para obtener usuarios registrados al CFR. NO RESPONSE';
	else{
		$abj=json_decode($abj);
		$abj=$abj->apiResponse[0];
		$i=0;
		foreach($abj as $k=>$v){
			$com[]=$v->idFielder;$paso=0;
			$subj=curl('GET','telmex/get/userandregiones/'.$v->idFielder);
			if($subj === FALSE){}
			else{
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
					$obj['Dentro'][$i]['idUsuario']=$v->idFielder;
					$obj['Dentro'][$i]['nombre']=$v->nombre;
					$obj['Dentro'][$i]['idCFR']=$v->idCFR;
					$obj['Dentro'][$i]['idCR']=$v->idCR;
					$i++;
				}
			}
		}
	}
	$obj['com']=$com;
	if($zz[0]=='Todas las regiones'){
		$abj=curl('GET','telmex/get/userAllRegs');
		if($abj === FALSE)
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
		$abj=curl('GET','telmex/get/userAllByRegiones/'.$ix);
		if($abj === FALSE)
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
else if($pky=='-Ñp0?2.3d'){
	foreach($_POST['P'] as $v){
		$data[]=array('idFielder'=>$v);
	}
	$response=curl('POST','telmex/get/coordn',$data);
	if($response===FALSE)
		$obj['Error']='Error al recibir el servicio para obtener coordenadas de fielder';
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
else if($pky=='k;624/6'){ // Graficos, obtener RC / INT de rango de fechas
	$fa=trim($_POST['P']);
	$fb=trim($_POST['U']);
	$ca=$_POST['C'];
	$obj['Error']='';
	$obj['camps']=$ca;
	$res=curl('GET','telmex/get/rc/int/'.$fa.'/'.$fb);
	if($res === FALSE)
		$obj['Error']='No se logro obtener respuesta del servicio que devuelve la información para graficar [1]';
	else{
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
			$reis=curl('GET','telmex/get/userById/'.$k);
			if($reis === FALSE){}
			else{
				$reis=json_decode($reis);
				$obj['fielders_url'][]='telmex/get/userById/'.$k;
				$obj['fielders'][$reis->apiResponse[0]->nombre]=$yui[$k];
			}
		}
	}
	echo json_encode($obj);
}
else if($pky=='.tr/(ydF'){ // Obtener informacion de campaña por ID
	$p=$_POST['P'];
	$tkn=getCuki();
	$tkn=$tkn['token'];
	$res=curl('GET','ObtieneCampaniaPorId/1.0.0/'.$p,'',$tkn);
	$obj['errorMessage']='';
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( .tr/(ydF )';
		$obj['TalCual']=$res;
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		$res=$res['Resp'];
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
	echo json_encode($obj);
}
else if($pky=='oP{ñ_,m$"'){ // Graficos, obtener RC / INT en tiempo real, por día...
	$p=$_POST['P'];
	$r=$_POST['R'];
	$fa=strtotime(date().' -1 months');
	$fa=date('Y-m-d',$fa);
	$fb=date('Y-m-d');
	$aryRange=array();
	$obj['errorMessage']='';
	$iDateFr=mktime(1,0,0,substr($fa,5,2),substr($fa,8,2),substr($fa,0,4));
	$iDateTo=mktime(1,0,0,substr($fb,5,2),substr($fb,8,2),substr($fb,0,4));
	if($iDateTo>=$iDateFr){
		array_push($aryRange,date('d-m-Y',$iDateFr));
		while($iDateFr<$iDateTo){
			$iDateFr+=86400;
			array_push($aryRange,date('d-m-Y',$iDateFr));
		}
	}
	$tkn=getCuki();
	$tkn=$tkn['token'];$obj['toKen']=$tkn;
	$res=curl('GET','ObtieneReporteCampaniaPorIntervaloFechas/1.0.0/'.$fa.'/'.$fb,'',$tkn);
	if($res['errorMessage']!=''){
		$obj['errorMessage']=$res['errorMessage'].' ( oP{ñ_,m$" )';
		$obj['TalCual']=$res['TalCual'];
		$obj['RespUrl']=$res['RespUrl'];
	}
	else{
		foreach($res['Resp']->apiResponse[0] as $k=>$v){
			$dia=substr($v->createAt,0,2);       $dia=str_pad($dia,2,"0",STR_PAD_LEFT);
			$mes=substr($v->createAt,3,2);$mes--;$mes=str_pad($mes,2,"0",STR_PAD_LEFT);
			$ano=substr($v->createAt,6,4);
			$obj['campsIDS'][]=$v->idCampaign;
			if((in_array($v->idCampaign,$p) || $p[0]=='todas') &&
			(in_array($v->region,$r) || $r[0]=='Todas las regiones') || $r[0]=='Todas las campañas'){
				if($fv[$ano.'.'.$mes.'.'.$dia]=='' || $fv[$ano.'.'.$mes.'.'.$dia]==null)
					$fv[$ano.'.'.$mes.'.'.$dia]=0;
				if($nv[$ano.'.'.$mes.'.'.$dia]=='' || $nv[$ano.'.'.$mes.'.'.$dia]==null)
					$nv[$ano.'.'.$mes.'.'.$dia]=0;

				if($v->pesco==true)
					$fv[$ano.'.'.$mes.'.'.$dia]=$fv[$ano.'.'.$mes.'.'.$dia]+1;
				else
					$nv[$ano.'.'.$mes.'.'.$dia]=$nv[$ano.'.'.$mes.'.'.$dia]+1;
			}
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
	echo json_encode($obj);
}
else if($pky==',&44jÑ{'){ // Mostrar mensajes de fielder
	$p=$_POST['P'];
	$res=curl('GET','telmex/get/msgAll/'.$p);
	$obj['Error']='Error al tratar de recibir servicio para obtener los mensajes.';
	if($res === FALSE)
		echo json_encode($obj);
	else{
		$res=json_decode($res);
		$res=$res->apiResponse[0];
		echo json_encode($res);
	}
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
	$res=curl('GET','telmex/get/contratos/intervalo/'.$fa.'/'.$fb);
	if($res === FALSE)
		$obj['Error']='No se logro obtener respuesta del servicio que devuelve la información para graficar en tiempo real.';
	else{
		$res=json_decode($res);
		foreach($res->apiResponse[0] as $k=>$v){
			if(in_array($v->idCampaign,$p) || $p[0]=='todas')
				$obj['puntos'][]=array(
					$v->latitud,
					$v->longitud,
				);
		}
	}
	echo json_encode($obj);
}
else if($pky=='wGhj/&i:'){
	$p=$_POST['P'];
	$response=curl('PUT','telmex/user/UpdateSession/'.$p);
	if($response===FALSE){
		print_r(curl_error($ch));
	}
	else
		print_r($response);
}
else
	header("Location: ../");
ob_end_flush(); ?>