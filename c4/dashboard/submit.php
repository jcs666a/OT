<?php
$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileError = $_FILES['file']['error'];
$fileContent = file_get_contents($_FILES['file']['tmp_name']);

print_r($_FILES);
print_r($_POST);


if($fileError == UPLOAD_ERR_OK){
	$tmp_name=$_FILES["file"]["tmp_name"];
	$name=$_FILES["file"]["name"];
	$imagedata=file_get_contents($tmp_name);
	$base64=base64_encode($imagedata);
	unlink($tmp_name);
}
else{
	echo 'error...';
}
?>