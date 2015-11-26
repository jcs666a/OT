			
            <?php 
				$are = $_POST["are"];
				$llave = $_POST["llave"];
			?>
						<h5>Selecciona los Puntos de Interés:</h5>
						<div class="center">
                        	<input type='checkbox' id="opcPoiAll" onchange="traetePoisAllCategories('<?php echo $are; ?>','<?php echo $llave; ?>');"/> Mostrar todos
   						</div>
                                	<ul id="poiCheck">

										<script>
                                        
                                            var pois = "";
											if ((dataPOI['<?php echo $llave; ?>']==undefined) || (dataPOI['<?php echo $llave; ?>']=="")){
                                           	 	dataPOI['<?php echo $llave; ?>'] = {};
												dataPOI['<?php echo $llave; ?>'].poi = {};											
											}
												
											
											
											$.ajax({
												type: "GET",
												url: "http://10.105.116.52:9090/telmex/infraestructura/tecnolgia/get/pois/catalog",
												dataType: "json",
												cache: false, 
												success: function(html){
													POIs = html.apiResponse;
													
													for (var i=0; i<=POIs.length-1; i++){
														
														var idPOI = POIs[i].id;
														
														
														if ((dataPOI['<?php echo $llave; ?>'].poi[idPOI]==undefined) || (dataPOI['<?php echo $llave; ?>'].poi[idPOI]=="")){
															dataPOI['<?php echo $llave; ?>'].poi[idPOI] ={};
															dataPOI['<?php echo $llave; ?>'].poi[idPOI].dsc = {};
															dataPOI['<?php echo $llave; ?>'].poi[idPOI].markers = [];
															dataPOI['<?php echo $llave; ?>'].poi[idPOI].radius = {};	
														}
																																																																																																																																			
														if (dataPOI['<?php echo $llave; ?>'].poi[idPOI].markers.length > 0){
															if (activos.indexOf("<?php echo $llave; ?>-POIid-"+POIs[i].id) > 0){															
																$("#poiCheck").append("<li><input type='checkbox' checked='checked' value='"+POIs[i].id+"' id='opcPoi_"+POIs[i].id+"' onchange=\"traetePois("+POIs[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>'); \"> "+POIs[i].descripcion+"  </li>");														
															}else{
																$("#poiCheck").append("<li><input type='checkbox' value='"+POIs[i].id+"' id='opcPoi_"+POIs[i].id+"' onchange=\"traetePois("+POIs[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>');\"> "+POIs[i].descripcion+" </li>");
															}
														}else{
															$("#poiCheck").append("<li><input type='checkbox' value='"+POIs[i].id+"' id='opcPoi_"+POIs[i].id+"' onchange=\"traetePois("+POIs[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>');\"> "+POIs[i].descripcion+" </li>");
														}
														
													}
													
												}
											});	
																			
                                        
                                        </script>

                                    </ul>
                                    <div id="verSelecion" style="position: absolute; bottom: -13px; left: 120px;">
                                    	<p>ver seleción</p><i class="fa fa-thumbs-o-up"></i>
                                    </div>
<div id="loaderPOI_<?php echo $are; ?>" style="height:5px;"></div>
<script>
			$("#verSelecion").click(function(event) {
				$("#tecnoDialog").removeClass('open');
			});	
</script>