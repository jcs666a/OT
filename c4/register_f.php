<?php
	if(isset($_POST['tel']) && isset($_POST['lat']) && isset($_POST['lon'])){
		$tel=trim($_POST['tel']);
		if($tel=='')
			$tel=0;
		$lat=trim($_POST['lat']);
		$lon=trim($_POST['lon']);
		if($lat!='' && $lon!=''){
			include_once 'db_oracle.php';
			$db = new db_Postgre();
			$db->TrackingFielders($tel,$lat,$lon);
		}
	}
?>