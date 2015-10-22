<?php

$area = $_POST["llave"];
//$distrito = $_POST["distrito"];
$are = $_POST["are"];
//$tipo = $_POST["tipo"];
//$divisionId = $_POST["div"];
sleep(1);
//echo ("area=" . $area . "<br>distrito=" . $distrito);



?>
	<!--<script src="js/calendar/development-bundle/ui/jquery.ui.core.js"></script>
    <script src="js/calendar/development-bundle/ui/jquery.ui.datepicker.js"></script>-->
<!--<link rel="stylesheet" href="js/calendar/development-bundle/demos/demos.css">
<script src="http://code.highcharts.com/highcharts.js"></script>-->

<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script>


	//var dataResponseSlide = {};
	var respuestatotaltecnologias

	function busca_citas(){
		dataResponseSlide = {};

		/*var tags = ['<?php echo $distrito; ?>'];
		var distrit = '<?php echo $distrito; ?>';
		var tipo  = '<?php echo $tipo; ?>';*/
		
		var urll = "http://10.105.116.52:9090//telmex/infraestructura/tecnolgia/totales/<?php echo $are; ?>";
		
		var url2 = "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/distrito/totales/<?php echo $are; ?>";
		
		
		tags.push();
		
		//testing = {distritos:{name: tags, fechaInicial: fecha_ini, fechaFinal: fecha_fin, idArea: <?php echo $are; ?>}};
		
		$.when(getPromisess(urll))
			.then(function(response){
				respuestatotaltecnologias = response;
				//console.log("response:" + JSON.stringify(response));
				
				if (respuestatotaltecnologias.errorCode != 0){
					$('#containerPay').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="images/warning_small.png" />'+respuestatotaltecnologias.errorMessage+'</div>');
				}else{				
					payChart();
				}
			
		});
		
		$.when(getPromisess(url2))
			.then(function(response){
				respuestatotalDistritos = response;
				
				if (respuestatotaltecnologias.errorCode != 0){
					$('#linearChart').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="images/warning_small.png" />'+respuestatotaltecnologias.errorMessage+'</div>');
				}else{				
					payChartporDist('<?php echo $area; ?>');					
				}
			
		});		
			
		
	}


	function getPromisess(urll){
		var request = "";
			request =	$.ajax({
				type: "GET",
				url: urll,
				dataType: "json",
				cache: false, 
			});	
	
		return request;
	}

	


	function payChart() {
	
			var totalATM =0;
			var totalFTTH=0;
			var totalIPDSLAM=0;
			var totalTBA = 0;
			var totalVDSLTBA = 0;
			var totalND = 0;
			var totalVDSLIPD = 0;
			var totalWIMAX = 0;		
		
			for (var i = 0; i < respuestatotaltecnologias.apiResponse.length; i++){
				
					var idTecc = respuestatotaltecnologias.apiResponse[i].idTecnologia;
					
					switch (idTecc) {
						case 1:
							totalATM = respuestatotaltecnologias.apiResponse[i].totalByArea
							break;	
						case 2:
							totalFTTH = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 3:
							 totalIPDSLAM = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 4:
							 totalND = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 5:
							 totalTBA = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 6:
							totalVDSLIPD = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 7:
							 totalVDSLTBA = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
						case 8:
							totalWIMAX = respuestatotaltecnologias.apiResponse[i].totalByArea;
							break;
					}
				
			}
		
			var totaltecnologias = totalATM + totalFTTH + totalIPDSLAM + totalTBA + totalVDSLTBA + totalND + totalVDSLIPD + totalWIMAX;
			
			//console.log("totalATM:" + totalATM + " totalFTTH:" + totalFTTH + " totalIPDSLAM:" + totalIPDSLAM + " totalTBA:" + totalTBA + " totalVDSLTBA:" + totalVDSLTBA + " totalND:" + totalND + " totalVDSLIPD:" + totalVDSLIPD + " totalWIMAX:" + totalWIMAX);
			
			if (totaltecnologias >=1){
			
					$('#containerPay').html("");
					$('#containerPay').highcharts({
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: 'Porcentajes de equipos por tecnologia en: <?php echo $area; ?>'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						/*plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false
								},
								showInLegend: true
							}
						},*/
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %',
									style: {
										color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
									}
								},
								showInLegend: true
							}
						},
						navigation: {
							buttonOptions: {
								enabled: false
							}
						},
						series: [{
							name: "Porcentaje",
							colorByPoint: true,
							data: [{
								name: "ATM (" + totalATM + ")",
								y: totalATM,
								color: '#C8FE2E'
							}, {
								name: "FTTH (" + totalFTTH + ")",
								y: totalFTTH,
								sliced: true,
								selected: true,
								color: '#FF8000'
							}, {
								name: "IPDSLAM ("+totalIPDSLAM + ")",
								y: totalIPDSLAM,
								color: '#0080FF'
							}, {
								name: "ND ("+totalND + ")",
								y: totalND,
								color: '#8000FF'
							}, {
								name: "TBA ("+totalTBA + ")",
								y: totalTBA,
								color: '#B40404'
							}, {
								name: "VDS LIPD ("+totalVDSLIPD + ")",
								y: totalVDSLIPD,
								color: '#FF00FF'
							}, {
								name: "VDS LTBA ("+totalVDSLTBA+")",
								y: totalVDSLTBA,
								color: '#01DFD7'
							}, {
								name: "WIMAX ("+totalWIMAX+")",
								y: totalWIMAX,
								color: '#FFBF00'
							}]
						}]
					});	
			}else{
				$('#containerPay').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="images/warning_small.png" />No existen datos en este distrito.</div>');				
			}
	}	


	
	
	function payChartporDist(llave) {
	
			var totalATM =0;
			var totalFTTH=0;
			var totalIPDSLAM=0;
			var totalTBA = 0;
			var totalVDSLTBA = 0;
			var totalND = 0;
			var totalVDSLIPD = 0;
			var totalWIMAX = 0;		
		
			for (var i = 0; i < respuestatotalDistritos.apiResponse.length; i++){
				
					var idTecc = respuestatotalDistritos.apiResponse[i].idTecnologia;
					
					switch (idTecc) {
						case 1:
							totalATM = respuestatotalDistritos.apiResponse[i].totalByArea
							break;	
						case 2:
							totalFTTH = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 3:
							 totalIPDSLAM = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 4:
							 totalND = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 5:
							 totalTBA = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 6:
							totalVDSLIPD = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 7:
							 totalVDSLTBA = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
						case 8:
							totalWIMAX = respuestatotalDistritos.apiResponse[i].totalByArea;
							break;
					}
				
			}
		
			var totalDistritos = totalATM + totalFTTH + totalIPDSLAM + totalTBA + totalVDSLTBA + totalND + totalVDSLIPD + totalWIMAX;
			
			//console.log("totalATM:" + totalATM + " totalFTTH:" + totalFTTH + " totalIPDSLAM:" + totalIPDSLAM + " totalTBA:" + totalTBA + " totalVDSLTBA:" + totalVDSLTBA + " totalND:" + totalND + " totalVDSLIPD:" + totalVDSLIPD + " totalWIMAX:" + totalWIMAX);
			
			if (totalDistritos >=1){
			
					$('#linearChart').html("");
					$('#linearChart').highcharts({
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: 'Distritos por tecnologia en: <?php echo $area; ?>'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						/*plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false
								},
								showInLegend: true
							}
						},*/
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %',
									style: {
										color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
									}
								},
								showInLegend: true
							}
						},
						navigation: {
							buttonOptions: {
								enabled: false
							}
						},
						series: [{
							name: "Porcentaje",
							colorByPoint: true,
							data: [{
								name: "ATM (" + totalATM + ")",
								y: totalATM,
								color: '#C8FE2E'
							}, {
								name: "FTTH (" + totalFTTH + ")",
								y: totalFTTH,
								sliced: true,
								selected: true,
								color: '#FF8000'
							}, {
								name: "IPDSLAM ("+totalIPDSLAM + ")",
								y: totalIPDSLAM,
								color: '#0080FF'
							}, {
								name: "ND ("+totalND + ")",
								y: totalND,
								color: '#8000FF'
							}, {
								name: "TBA ("+totalTBA + ")",
								y: totalTBA,
								color: '#B40404'
							}, {
								name: "VDS LIPD ("+totalVDSLIPD + ")",
								y: totalVDSLIPD,
								color: '#FF00FF'
							}, {
								name: "VDS LTBA ("+totalVDSLTBA+")",
								y: totalVDSLTBA,
								color: '#01DFD7'
							}, {
								name: "WIMAX ("+totalWIMAX+")",
								y: totalWIMAX,
								color: '#FFBF00'
							}]
						}]
					});	
			}else{
				$('#linearChart').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="mapa/images/warning_small.png" />No existen datos en este distrito.</div>');				
			}

	}	



busca_citas();

</script>

<div style="margin:0px auto; font-family:Arial, Helvetica, sans-serif; margin:5px; line-height:30px; text-align:center; background-color:#fafafa; font-size:18px; color:#000000;">Informaci&oacute;n de tecnolog&iacute;a de red en: <strong><?= $area;?></strong></div>

<div id="regresaChart" style="width:95%; margin:0px auto; text-align:center;">

	<div id="linearChart" style="border:#999999 solid 2px;"></div>
    <br />
    <div id="containerPay" style="border:#999999 solid 2px;"></div>

</div>