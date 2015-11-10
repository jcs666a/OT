<?php
function serialize_cookie($nombre_cookie='',$arreglo='',$time='mas'){
	$la_url	= "10.105.116.69";
	$array=array();
	unset($_COOKIE[$nombre_cookie]);
	if($nombre_cookie!='' && $arreglo!=''){
		if($time=='mas'){
			$nvo='[';
			foreach($arreglo as $value){
				$nvo.='"'.$value.'",';
			}
			$nvo=rtrim($nvo,",").']';
			setcookie($nombre_cookie,$nvo,time()+7000,"/");
		}
		else
			setcookie($nombre_cookie,'',time()-5600,"/");
		$array=array($nombre_cookie=>$arreglo);
	}
	return $array;
}
if (isset($_GET["us"])<>""){
	serialize_cookie('cCuatroV',array(
						'idJefe'	=>$_GET["idJefe"],
						'sesion_de'	=>$_GET["us"],
						'niv'		=>$_GET["ni"]
					));
	echo "<html><head><script>window.location='c4.php';</script></head></body></html>";
}
?>




