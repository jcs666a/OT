


<script>

var datos = "";

function pintapie(datos){
	//alert(datos);
	
    $('#container_c').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Estadistica de ancho de banda'
        },
        tooltip: {
            pointFormat: '{series.name}'
//            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'			
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    //format: '<b>{point.name}</b>: {point.percentage:.1f} %',					
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: "Brands",
            colorByPoint: true,
            data: datos
        }]
    });
}

	
			

	function trae(){
			$.ajax({
				type: "GET",
				url: "./docs/internet.json",
				//contentType: "application/json",
				dataType: "json",
				cache: false, 
				success: function(html){
					  // Load GeoJSON.
					  pintapie(html);
					  //console.log(html);
					
				}		
			});
	}
	
	trae();	
	
</script>

<!--</head>
<body>-->
<div id="container_c" style="width: 95%; height: 95%; margin: 0 auto;"></div>
<!--</body>
</html>-->

