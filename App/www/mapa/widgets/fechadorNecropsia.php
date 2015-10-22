<?php

$area = $_POST["llave"];
$distrito = $_POST["distrito"];
$are = $_POST["are"];
$tipo = $_POST["tipo"];
$divisionId = $_POST["div"];
sleep(1);
//echo ("area=" . $area . "<br>distrito=" . $distrito);



?>
	<!--<script src="js/calendar/development-bundle/ui/jquery.ui.core.js"></script>
    <script src="js/calendar/development-bundle/ui/jquery.ui.datepicker.js"></script>-->
    <link rel="stylesheet" href="js/calendar/development-bundle/demos/demos.css">
<!--<script src="http://code.highcharts.com/highcharts.js"></script>-->
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script>

$(document).ready(function () {

	$( "#fecha_ini" ).datepicker();
	$( "#fecha_ini" ).datepicker("option", "dateFormat", "mm-yy");
	$( "#fecha_fin" ).datepicker();
	$( "#fecha_fin" ).datepicker("option", "dateFormat", "mm-yy");

	$("#btn_busca_domic").click( function() { busca_citas(); } );

});

	var dataResponseSlide = {};

	function busca_citas(){
		dataResponseSlide = {};
		var fecha_ini = $("#fecha_ini").val();
		var fecha_fin = $("#fecha_fin").val();
		var tags = ['<?php echo $distrito; ?>'];
		var distrit = '<?php echo $distrito; ?>';
		var tipo  = '<?php echo $tipo; ?>';
		
		if (tipo=="2"){
			var urll = "http://10.105.116.52:9090/telmex/necropsia/reporte/distrito";
		}else if (tipo=="1"){
			if (fecha_ini != "" || fecha_fin != ""){
				var urll = "http://10.105.116.52:9090/telmex/necropsia/reporte/area/"+<?php echo $are; ?>+"/"+fecha_ini+"/"+fecha_fin+"";
			}else{
				var urll = "http://10.105.116.52:9090/telmex/necropsia/reporte/area/"+<?php echo $are; ?>+"/todo/todo";
			}
		}else if (tipo=="3"){
			if (fecha_ini != "" || fecha_fin != ""){
				var urll = "http://10.105.116.52:9090/telmex/necropsia/reporte/division/"+<?php echo $divisionId; ?>+"/"+fecha_ini+"/"+fecha_fin+"";
			}else{
				var urll = "http://10.105.116.52:9090/telmex/necropsia/reporte/division/"+<?php echo $divisionId; ?>+"/todo/todo";
			}
		}
		
		//http://10.105.116.52:9090/telmex/necropsia/reporte/division/1/fdinicial/fdfinal
		
		
		
		tags.push();
		
		testing = {distritos:{name: tags, fechaInicial: fecha_ini, fechaFinal: fecha_fin, idArea: <?php echo $are; ?>}};
		$.when(getPromisess(urll, testing, tipo))
			.then(function(response){
				dataResponseSlide[distrit] = response;
				//console.log("response:" + response);
				
				if (dataResponseSlide[distrit].errorCode != 0){
					$('#linearChart').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="images/warning_small.png" />'+dataResponseSlide[distrit].errorMessage+'</div>');
				}else{				
					linearChart(distrit);
					payChart(distrit);
				}
			
		});	
		
	}


	function getPromisess(urll, data, tipo){
		var request = "";
		//console.log("url:"+urll);
		if (tipo=="2"){
			request = $.ajax({
				   method: "POST",
				   url: urll,
				   contentType: "application/json",
				   data: JSON.stringify(data),
				   processData: false
			});	
		}else if (tipo=="1" || tipo=="3"){
			request =	$.ajax({
				type: "GET",
				url: urll,
				dataType: "json",
				cache: false, 
			});	
		}	
		
		return request;
	}

	

function linearChart(distrit) {
	
	var fechas = [];
	var altasMes = [];
	var bajasTotales = [];
	var clientesInfinitum = [];
	var totalQuejasNps = [];
	var enlacesSaturados = [];
	var churn = [];
	var totalCpc = [];
	var bajasB1 = [];
	var bajasB2Tf = [];
	var bajasCpc = [];
	var bajasNps = [];
	
	for (var i = 0; i < dataResponseSlide[distrit].apiResponse[0].data.length; i++){
		var str = dataResponseSlide[distrit].apiResponse[0].data[i].fechaCarga.split("-");
		var datt = str[1] + "-" + str[2];
		
		fechas.push(datt);
		altasMes.push(dataResponseSlide[distrit].apiResponse[0].data[i].altasMes);
		bajasTotales.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasTotales);
		clientesInfinitum.push(dataResponseSlide[distrit].apiResponse[0].data[i].clientesInfinitum);
		totalQuejasNps.push(dataResponseSlide[distrit].apiResponse[0].data[i].totalQuejasNps);
		enlacesSaturados.push(dataResponseSlide[distrit].apiResponse[0].data[i].enlacesSaturados);
		churn.push(dataResponseSlide[distrit].apiResponse[0].data[i].churn);
		totalCpc.push(dataResponseSlide[distrit].apiResponse[0].data[i].totalCpc);
	}
	
	//console.log("altasMes:" + altasMes + " bajasTotales:" + bajasTotales + " clientesInfinitum:" + clientesInfinitum + " totalQuejasNps:" + totalQuejasNps + " enlacesSaturados:" + enlacesSaturados);

    $('#linearChart').highcharts({
        title: {
            text: 'Comportamiento de la Necropsia en un periodo de tiempo',
            x: -20 //center
        },
        subtitle: {
            text: 'Fuente: Telmex',
            x: -20
        },
        xAxis: {
            categories: fechas
        },
        yAxis: {
            title: {
                text: 'Cantidad'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },		
        tooltip: {
            valueSuffix: ''
        },
		navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Clientes Infinitum',
            data: clientesInfinitum
        }, {
            name: 'Altas del mes',
            data: altasMes
        }, {
            name: 'Bajas Totales',
            data: bajasTotales
        },  {
            name: 'Total de Quejas',
            data: totalQuejasNps
        }, {
            name: 'Enlaces Saturados',
            data: enlacesSaturados
        }, {
            name: 'Churn',
            data: churn
        }, {
            name: 'Total CPC',
            data: totalCpc
        }]
    });

	


}



	function payChart(distrit) {
	
			
			
			var fechas = [];
			var totalCpc = [];
			var bajasB1 = [];
			var bajasB2Tf = [];
			var bajasCpc = [];
			var bajasNps = [];
			var bajasTotales = [];
			
			for (var i = 0; i < dataResponseSlide[distrit].apiResponse[0].data.length; i++){
				var str = dataResponseSlide[distrit].apiResponse[0].data[i].fechaCarga.split("-");
				
				
				var datt = str[1] + "-" + str[2];
				
				fechas.push(datt);
				bajasB1.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasB1);
				bajasB2Tf.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasB2Tf);
				bajasCpc.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasCpc);
				bajasNps.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasNps);
				bajasTotales.push(dataResponseSlide[distrit].apiResponse[0].data[i].bajasTotales);
			}
		
			var totalBajasB1 = 0;
			for (var i= 0; i < bajasB1.length; i++){
			  totalBajasB1 = totalBajasB1 + bajasB1[i];
			}
			
			var totalbajasB2Tf = 0;
			for (var i= 0; i < bajasB2Tf.length; i++){
			  totalbajasB2Tf = totalbajasB2Tf + bajasB2Tf[i];
			}
			
			var totalbajasCpc = 0;
			for (var i= 0; i < bajasCpc.length; i++){
			  totalbajasCpc = totalbajasCpc + bajasCpc[i];
			}	
			
			var totalbajasNps = 0;
			for (var i= 0; i < bajasNps.length; i++){
			  totalbajasNps = totalbajasNps + bajasNps[i];
			}
					
			var totalbajasTotales = 0;
			for (var i= 0; i < bajasTotales.length; i++){
			  totalbajasTotales = totalbajasTotales + bajasTotales[i];
			}			
				
			
			//console.log("totalBajasB1:" + totalBajasB1 + " totalbajasB2Tf:" + totalbajasB2Tf + " totalbajasCpc:" + totalbajasCpc + " totalbajasNps:" + totalbajasNps + " BAJASTOTALES:" + totalbajasTotales);
			
			if (totalbajasTotales >=1){
			
					$('#containerPay').html("");
					$('#containerPay').highcharts({
						chart: {
							plotBackgroundColor: null,
							plotBorderWidth: null,
							plotShadow: false,
							type: 'pie'
						},
						title: {
							text: 'Comportamiento de cancelaciones en el periodo de tiempo'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: false
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
								name: "BajasB1",
								y: totalBajasB1
							}, {
								name: "bajasB2Tf",
								y: totalbajasB2Tf,
								sliced: true,
								selected: true
							}, {
								name: "bajasCpc",
								y: totalbajasCpc
							}, {
								name: "bajasNps",
								y: totalbajasNps
							}]
						}]
					});	
			}else{
				$('#containerPay').html('<div style="border:solid 1px color:#cccccc; height:50px; width:500px; margin:0px auto; text-align:center; font-size:16px; color:#B40404; margin-top:20px;"><img src="images/warning_small.png" />No existen datos dobre bajas en este distrito.</div>');				
			}
	}

busca_citas();

</script>

<div style="margin:0px auto; font-family:Arial, Helvetica, sans-serif; margin:10px; text-align:center; font-size:18px; color:#000000;">Informaci&oacute;n estadistica de Necropsia: <strong><?= $distrito;?></strong></div>
<table cellspacing="10" style="margin:10px; background-color:#f5f5f5; width:98%;  border:solid #CCCCCC 1px;">
    <tr>
        <td colspan="5" style="font-size:15px; text-align:center; padding:4px; color:#FFFFFF; font-family:Verdana, Arial, Helvetica, sans-serif; background-color:#999999;">Selecciona un rango de fechas para mostrar la información</td>
    </tr>
    <tr>
        <td style="text-align:right;">Fecha de Inicio</td>
        <td><input type="text" id="fecha_ini" /></td>
        <td style="text-align:right;">Fecha de Fin</td>
        <td><input type="text" id="fecha_fin" /></td>
        <td><input type="button" value=" Buscar >> " id="btn_busca_domic"></td>                    
    </tr>
</table>

<div id="regresaChart" style="width:95%; margin:0px auto; text-align:center;">

	<div id="linearChart"></div>
    <br />
    <div id="containerPay"></div>

</div>