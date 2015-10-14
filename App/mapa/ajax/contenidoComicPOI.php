			
            <?php 
				$are = $_POST["are"];
				$llave = $_POST["llave"];
			?>
            
            <table style=" font-family:Arial, Helvetica, sans-serif; font-size:11px; width:350px;">
            	<tr>
                	<td colspan="2" style="font-size:14px; background-color:#F1EEA0;" ><strong>Selecciona los Puntos de Inter&eacute;s:</strong></td>
                </tr>
                <tr><td colspan="2"><br><hr></td></tr>
				<tr><td>
                    <div style="margin-left:15px;">
                        <input type='checkbox' id="opcPoiAll" onchange="traetePoisAllCategories('<?php echo $are; ?>','<?php echo $llave; ?>');"/> Mostrar todos
                    </div>                
                </td></tr>
				<tr>
                	<td colspan="2">
                    	<table style="width:100%; background-color:#FAFAFA; border:#CCCCCC solid 1px; padding:10px; font-size:9px;">
                            <tr>
                          		<td>
                                	<ul id="poiCheck" style=" height:150px; overflow:auto;">

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
                                </td>
                            </tr>                                                      
                        </table>
                    </td>
                </tr>
                <tr>
                	<td colspan="2"><div id="loaderPOI_<?php echo $are; ?>" style="height:5px;"></div></td>
                </tr>                
                <tr><td colspan="2"><br><hr><br></td></tr>                

            </table>