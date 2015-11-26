<?php
	session_start();
		
		if (isset($_GET["us"])<>"") {
		
			$_SESSION["sesion_de"]=$_GET["us"];
			$_SESSION["niv"]=$_GET["ni"];			
			
			echo "<script>window.location='mapa.php'</script>";
			
		} else {
				$result = "<table style='width:600px; margin:0px auto;'>
					<tr>
						<td style='color:#911A1A; text-align:center; font-size:12px;'> 
							<img src='images/warning_small.png' align='absbottom' />
							<b>No se encuentra el usuario, por favor escriba el usuario y contrase&ntilde;a correctamente</b>
						</td>
					</tr>
				</table>";
		}		
		
		echo $result;

?>

