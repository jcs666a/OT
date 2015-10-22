<?php
	session_start();
		if (isset($_GET["us"])<>"") {
			$_SESSION["sesion_de"]=$_GET["us"];
			$_SESSION["niv"]=$_GET["ni"];
			if($_SESSION["niv"] == "CORPORATIVO"){
				$_SESSION["niv"] = 1;
			}	
			if($_SESSION["niv"] == "DIRECCION"){
				$_SESSION["niv"] = 2;
			}
			if($_SESSION["niv"] == "LIDER"){
				$_SESSION["niv"] = 3;
			}	
			if($_SESSION["niv"] == "PROMOTOR"){
				$_SESSION["niv"] = 4;
			}	
			
			echo "<script>window.location='../index.php#home'</script>";

		} else {
				$result = "<table style='width:600px; margin:0px auto;'>
					<tr>
						<td style='color:#911A1A; text-align:center; font-size:12px;'> 
							<img src='img/warning_small.png' align='absbottom' />
							<b>No se encuentra el usuario, por favor escriba el usuario y contrase&ntilde;a correctamente</b>
						</td>
					</tr>
				</table>";
		}		

		echo $result;

?>