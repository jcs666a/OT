<script>

	function counterMarkers(key){
		for(var ubicacion in markers) { 
			//var obj = dataCartografica[key]; 
			//console.log(dataCartografica[key].features[0]);
				paths = [];
				path = [];
				var exteriorDirection;
				var interiorDirection;									
				
				console.log("g" + ubicacion.position.G);
				
				for (var i = 0; i < dataCartografica[key].features[0].geometry.coordinates.length; i++){
					//path = [];
					for (var j = 0; j < dataCartografica[key].features[0].geometry.coordinates[i].length; j++){
						//console.log(dataCartografica[llave].features[0].geometry.coordinates[i][j][0]);
						path.push(new google.maps.LatLng(dataCartografica[key].features[0].geometry.coordinates[i][j][1], dataCartografica[key].features[0].geometry.coordinates[i][j][0]));
					}
				}
			
				  bermudaTriangle = new google.maps.Polygon({
					paths: path,
					strokeColor: '#ff9000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35
				  });
				
				//bermudaTriangle.setMap(map);
				
				
			   if (google.maps.geometry.poly.containsLocation(myLatlng, bermudaTriangle)) {
					console.log("yeaahhhhhhhh");
					console.log("key-->" + key);
					
					/*var featureStyle = {
						fillColor: 'red',
						strokeWeight: 1,
						strokeOpacity: 0.4,
						fillOpacity: 0.3
					}
					capas[key].setStyle(featureStyle);*/
					
				} else {
					console.log("buuuuu");	
				}	
									
		}
	}

</script>