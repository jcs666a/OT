<?php
	$num=0;
	if($_GET['tipo']=='area'){
		$json=file_get_contents('http://10.105.116.52:9090/getAreaByName/geoJson/'.$_GET['cual']);
	}
	else if($_GET['tipo']=='division'){
	    $json=file_get_contents('http://10.105.116.52:9090/getDivisionByName/geoJson/'.$_GET['cual']);
	    if($_GET['cual']=='METRO')
			$num=2;
	    else if($_GET['cual']=='OCCIDENTE')
			$num=51; // 51
	}
	$data=json_decode($json);
//	print_r($data);

	$i=0;
	$uno=$data->apiResponse[0]->features[0]->geometry->coordinates;

/*	foreach($uno as $valua){
		$dos[$i]='[';
		$o=0;
		foreach($valua as $value){
			$cuat[$o]='['.$value[1].','.$value[0].']';
			$o++;
		}
		$dos[$i]=$dos[$i].implode(",",$cuat).']';

		$i++;
	} */

	foreach($uno as $valua){
		$o=0;
		foreach($valua as $value){
			$cuat[$o]=$value[1];
			$o++;
			$cuat[$o]=$value[0];
			$o++;
		}
		$dos[$i]=$cuat;

		$i++;
	}

/*
	$uno=$data->apiResponse[0]->features[0]->geometry->coordinates[$num];
	foreach($uno as $key => $value){
		$dos[]='['.$value[1].','.$value[0].']';
	}
*/
//	echo implode(",",$dos);
//	print_r($uno);
	echo json_encode($uno);
?>