<?php

function regionesNum($zonas){
	$regiones=array();
	if($zonas[0]=='METRO'){
		$regiones['division']=1;
		if($zonas[1]==strtoupper('Acapulco')) 			$regiones['area']=1;
		if($zonas[1]==strtoupper('Balbuena')) 			$regiones['area']=2;
		if($zonas[1]==strtoupper('Chilpancingo')) 		$regiones['area']=3;
		if($zonas[1]==strtoupper('Cuautitlan-Morelos')) $regiones['area']=4;
		if($zonas[1]==strtoupper('Ermita-Tlahuac')) 	$regiones['area']=5;
		if($zonas[1]==strtoupper('Lindavista')) 		$regiones['area']=6;
		if($zonas[1]==strtoupper('Lomas')) 				$regiones['area']=7;
		if($zonas[1]==strtoupper('Mixcoac')) 			$regiones['area']=8;
		if($zonas[1]==strtoupper('Morelos')) 			$regiones['area']=9;
		if($zonas[1]==strtoupper('Satélite'))			$regiones['area']=10;
		if($zonas[1]==strtoupper('Sotelo'))				$regiones['area']=11;
		if($zonas[1]==strtoupper('Texcoco-Zaragoza'))	$regiones['area']=12;
		if($zonas[1]==strtoupper('Toluca'))				$regiones['area']=13;
		if($zonas[1]==strtoupper('Universidad'))		$regiones['area']=14;
		if($zonas[1]==strtoupper('Valle-San Juán'))		$regiones['area']=15;
	}
	else if($zonas[0]=='NORTE'){
		$regiones['division']=2;
		if($zonas[1]==strtoupper('Aguascalientes'))		$regiones['area']=16;
		if($zonas[1]==strtoupper('Celaya'))				$regiones['area']=17;
		if($zonas[1]==strtoupper('Ciudad Victoria'))	$regiones['area']=18;
		if($zonas[1]==strtoupper('Irapuato'))			$regiones['area']=19;
		if($zonas[1]==strtoupper('León'))				$regiones['area']=20;
		if($zonas[1]==strtoupper('Matamoros'))			$regiones['area']=21;
		if($zonas[1]==strtoupper('Monterrey 1'))		$regiones['area']=22;
		if($zonas[1]==strtoupper('Monterrey 2'))		$regiones['area']=23;
		if($zonas[1]==strtoupper('Monterrey Foraneas'))	$regiones['area']=24;
		if($zonas[1]==strtoupper('Nuevo Laredo'))		$regiones['area']=25;
		if($zonas[1]==strtoupper('Querétaro'))			$regiones['area']=26;
		if($zonas[1]==strtoupper('Reynosa'))			$regiones['area']=27;
		if($zonas[1]==strtoupper('Sabinas'))			$regiones['area']=28;
		if($zonas[1]==strtoupper('Saltillo'))			$regiones['area']=29;
		if($zonas[1]==strtoupper('San Luis Potosí'))	$regiones['area']=30;
		if($zonas[1]==strtoupper('Tampico'))			$regiones['area']=31;
		if($zonas[1]==strtoupper('Torreón'))			$regiones['area']=32;
		if($zonas[1]==strtoupper('Zacatecas'))			$regiones['area']=33;
	}
	else if($zonas[0]=='OCCIDENTE'){
		$regiones['division']=3;
		if($zonas[1]==strtoupper('Chihuahua'))			$regiones['area']=34;
		if($zonas[1]==strtoupper('Ciudad Juárez'))		$regiones['area']=35;
		if($zonas[1]==strtoupper('Ciudad Obregón'))		$regiones['area']=36;
		if($zonas[1]==strtoupper('Colima'))				$regiones['area']=37;
		if($zonas[1]==strtoupper('Culiacán'))			$regiones['area']=38;
		if($zonas[1]==strtoupper('Durango'))			$regiones['area']=39;
		if($zonas[1]==strtoupper('Guadalajara Centro'))	$regiones['area']=40;
		if($zonas[1]==strtoupper('Guadalajara Oriente'))$regiones['area']=41;
		if($zonas[1]==strtoupper('Guadalajara Poniente'))$regiones['area']=42;
		if($zonas[1]==strtoupper('Hermosillo'))			$regiones['area']=43;
		if($zonas[1]==strtoupper('Jalisco'))			$regiones['area']=44;
		if($zonas[1]==strtoupper('La Paz'))				$regiones['area']=45;
		if($zonas[1]==strtoupper('Los Mochis'))			$regiones['area']=46;
		if($zonas[1]==strtoupper('Mazatlan'))			$regiones['area']=47;
		if($zonas[1]==strtoupper('Morelia'))			$regiones['area']=48;
		if($zonas[1]==strtoupper('Nogales'))			$regiones['area']=49;
		if($zonas[1]==strtoupper('Puerto Vallarta'))	$regiones['area']=50;
		if($zonas[1]==strtoupper('Tepic'))				$regiones['area']=51;
		if($zonas[1]==strtoupper('Zamora'))				$regiones['area']=52;
	}
	else if($zonas[0]=='SUR'){
		$regiones['division']=4;
		if($zonas[1]==strtoupper('Campeche'))			$regiones['area']=53;
		if($zonas[1]==strtoupper('Cancún'))				$regiones['area']=54;
		if($zonas[1]==strtoupper('Coatzacoalcos'))		$regiones['area']=55;
		if($zonas[1]==strtoupper('Córdoba'))			$regiones['area']=56;
		if($zonas[1]==strtoupper('Jalapa'))				$regiones['area']=57;
		if($zonas[1]==strtoupper('Mérida'))				$regiones['area']=58;
		if($zonas[1]==strtoupper('Oaxaca'))				$regiones['area']=59;
		if($zonas[1]==strtoupper('Pachuca'))			$regiones['area']=60;
		if($zonas[1]==strtoupper('Poza Rica'))			$regiones['area']=61;
		if($zonas[1]==strtoupper('Puebla'))				$regiones['area']=62;
		if($zonas[1]==strtoupper('Tlaxcala-Puebla'))	$regiones['area']=63;
		if($zonas[1]==strtoupper('Tuxtla Guitierrez'))	$regiones['area']=64;
		if($zonas[1]==strtoupper('Veracrúz'))			$regiones['area']=65;
		if($zonas[1]==strtoupper('Villahermosa'))		$regiones['area']=66;
		if($zonas[1]==strtoupper('Tlaxcala'))			$regiones['area']=70;
	}
	else if($zonas[0]=='TELNOR'){
		$regiones['division']=5;
		if($zonas[1]==strtoupper('Ensenada'))			$regiones['area']=67;
		if($zonas[1]==strtoupper('Mexicali'))			$regiones['area']=68;
		if($zonas[1]==strtoupper('Tijuana'))			$regiones['area']=69;
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