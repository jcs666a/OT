<?php
if (isset($_GET["name"]) && isset($_GET["exp"]) && isset($_GET["usuario"])){
	$name = $_GET["name"];
	$exp = $_GET["exp"];
	$usuario = $_GET["usuario"];
	$passwd = $_GET["passwd"];
	$rol = $_GET["rol"];
	$region = $_GET["region"];
//	include_once './GCM.php';
//include_once 'db_postgre.php';
//	$db = new db_Postgre();
//	$gcm = new GCM();

//	$res = $db->storeUsuarios($rol,$name,$usuario,$passwd,$region,$exp);

//	$registatoin_ids = array($gcm_regid);
//	$message = array("product" => "shirt");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
</head>
<body>
	<h1>prueba registro de <?php echo $name;?></h1>
</body>
<script>
var name =  '<?php echo $name;?>',
	role = '<?php echo $rol;?>',
	usuario = '<?php echo $usuario;?>',
	password = '<?php echo $passwd;?>',
	region = '<?php echo $region;?>',
	expediente = '<?php echo $exp;?>';
	var arrSend = { role: {idRole:''+role+''}, nombre: ''+name+'', usuario: ''+usuario+'', password: ''+password+'', regionTrabajo:''+region+'', expediente: ''+expediente+''};
$(document).ready(function() {
try{
$.ajax({
type: "POST",
url: "http://10.105.116.57:9090/telmex/add/user",
data:JSON.stringify(arrSend),
contentType: "application/json",
dataType: "json",
success: function(data, a, b){
var respuesta = data;
window.location.href="c4.php";
},
error: function(jqXHR, textStatus, error){
	console.log(textStatus, error, jqXHR);
//$("#formulario #error").html('<small>Credenciales incorrectas.</small>');
}
});
}catch(error){
console.log(error)
};
});
</script>
</html>
<script>
