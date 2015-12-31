<script src="http://10.105.116.52:9290/socket.io/socket.io.js"></script>
<script>
$(function () {
    $(document).ready(function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
			
        });
		
		
		
		//VARIABLE DE CONEXION SOCKETIO
		var socketio = io.connect("http://10.105.116.52:9290");
		
		//CONEXION A SOCKETIO
		function getConnection(){
			socketio.on('connect', function(){
				console.log("conectado");
			});
			socketio.on('message', function(res){
				console.log(res.nombre);
				count++;
				console.log("Queja "+count);				
			});
			
		}		

getConnection();

        $('.container_b').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                //y = Math.random()*10;
                                y = getCounting();
                            series.addPoint([x, y], true, true);
                        }, 10000);
                    }
                }
            },
            title: {
                text: 'Quejas en tiempo real'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Totales'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Quejas',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                    time = (new Date()).getTime(),
					i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: getCounting()
                        });
						//console.log("Time "+ time +" + "+ i +" * 1000 "+" = "+(time + i * 1000));
                    }
                    return data;
                }())
            }]
        });
    });
});
var count=0;

/*
amplify.subscribe("quejas", function(res){
	//if(res.resGeoCoding=="000"){
		count++;
		console.log("Queja "+count);
	//}
});
*/

function getCounting(){
	
	var countTime=count;
	count=0;
	return countTime;
}
</script>
<div class="container_b" style="min-width: 310px; height: 400px; margin: 0 auto"></div>