<?php
$feA=trim($_GET['feA']);
$feB=trim($_GET['feB']);
$cam=$_GET['cam'];
$cam = explode(",",$cam);

//$ipServ='http://10.105.116.52:9090/';
//$ipServ='http://localhost:9090/';
$ipServ='http://187.217.179.35:9090/';
//$ipServ='http://10.105.116.187:9090/';

$res=file_get_contents($ipServ.'telmex/get/contratos/intervalo/'.$feA.'/'.$feB);
if($res!=''){
	$res=json_decode($res);

	error_reporting(E_ALL);
	ini_set('display_errors', TRUE);
	ini_set('display_startup_errors', TRUE);
	date_default_timezone_set('Europe/London');

	if(PHP_SAPI == 'cli')
		die('This example should only be run from a Web Browser');

	require_once 'Classes/PHPExcel.php';

	$objPHPExcel = new PHPExcel();
	$objPHPExcel->getProperties()->setCreator("Julio Cesar Sandoval")
		->setLastModifiedBy("Julio Cesar Sandoval")
		->setTitle("Office 2007 XLSX Test Document")
		->setSubject("Office 2007 XLSX Test Document")
		->setDescription("Reporte generado desde dashboard de OT, desarrollado por Julio Sandoval")
		->setKeywords("reporte,Telmex,dashboard")
		->setCategory("Reporte Telmex");

	$cabeceras=array(
		'alignment' => array(
			'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		),
		'font'=>array(
			'bold' =>true,
			'color'=>array('rgb'=>'FFFFFF'),
			'size' =>14,
			'name' =>'Arial'
	));

	$titulo=array(
		'alignment' => array(
			'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		),
		'font'=>array(
			'bold' =>true,
			'color'=>array('rgb'=>'00BBFA'),
			'size' =>25,
			'name' =>'Arial'
	));

	$celdas = array(
		'alignment' => array(
			'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
		),
		'borders' => array(
			'allborders' => array(
				'style' => PHPExcel_Style_Border::BORDER_THIN,
				'color' => array('rgb'=>'cccccc')
			)
		)
	);

	$objPHPExcel->getActiveSheet()->setShowGridlines(false);
	$objPHPExcel->getActiveSheet()->getStyle('A4:Q4')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('00BBFA');
	$objPHPExcel->getActiveSheet()->mergeCells('A2:Q2');

	$objPHPExcel->setActiveSheetIndex(0)
		->setCellValue('A2','Contratos logrados del '.$feA.' a '.$feB)
		->setCellValue('A4','idContrato')
		->setCellValue('B4','servicioTipo')
		->setCellValue('C4','servicioId')
		->setCellValue('D4','Cliente')
		->setCellValue('E4','Teléfono')
		->setCellValue('F4','email')
		->setCellValue('G4','RFC')
		->setCellValue('H4','Domicilio')
		->setCellValue('I4','Colonia')
		->setCellValue('J4','Delegación')
		->setCellValue('K4','C.P.')
		->setCellValue('L4','Estado')
		->setCellValue('M4','Celular')
		->setCellValue('N4','idFielder')
		->setCellValue('O4','Región')
		->setCellValue('P4','Campaña')
		->setCellValue('Q4','Fecha');

	$objPHPExcel->getActiveSheet()->getStyle('A2')->applyFromArray($titulo);
	$objPHPExcel->getActiveSheet()->getStyle('A4:Q4')->applyFromArray($cabeceras);

	$i=5;
	foreach($res->apiResponse[0] as $k=>$v){
		if(in_array($v->idCampaign,$cam) || $cam[0]=='todas'){
			$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A'.$i,$v->idContrato)
				->setCellValue('B'.$i,$v->servicioTipo)
				->setCellValue('C'.$i,$v->servicioId)
				->setCellValue('D'.$i,$v->paterno.' '.$v->materno.' '.$v->nombre)
				->setCellValue('E'.$i,$v->telefono)
				->setCellValue('F'.$i,$v->email)
				->setCellValue('G'.$i,$v->rfc)
				->setCellValue('H'.$i,$v->calle.' No. '.$v->numExt)
				->setCellValue('I'.$i,$v->colonia)
				->setCellValue('J'.$i,$v->delMun)
				->setCellValue('K'.$i,$v->cp)
				->setCellValue('L'.$i,$v->estado)
				->setCellValue('M'.$i,$v->celular)
				->setCellValue('N'.$i,$v->idFielder)
				->setCellValue('O'.$i,$v->region)
				->setCellValue('P'.$i,$v->idCampaign)
				->setCellValue('Q'.$i,$v->fecha);
			$objPHPExcel->getActiveSheet()->getStyle('A'.$i.':Q'.$i)->applyFromArray($celdas);
			$i++;
		}
	}
	$objPHPExcel->getActiveSheet()->setAutoFilter('A4:Q4');
	$objPHPExcel->getActiveSheet()->getRowDimension(2)->setRowHeight(36);
	$objPHPExcel->getActiveSheet()->getRowDimension(4)->setRowHeight(20);
	foreach(range('A','Q') as $columnID){
		$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
	}
	$objPHPExcel->getActiveSheet()->setTitle('Reporte');
	$objPHPExcel->setActiveSheetIndex(0);
	header('Content-Type: application/vnd.ms-excel');
	header('Content-Disposition: attachment;filename="Reporte.xls"');
	header('Cache-Control: max-age=0');
	header('Cache-Control: max-age=1');
	header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
	header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
	header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
	header ('Pragma: public'); // HTTP/1.0

	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	$objWriter->save('php://output');

	exit;
}
else echo 'No se logro obtener respuesta del servicio que devuelve la información para crear el excel';
?>