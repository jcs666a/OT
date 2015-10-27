			
            <?php 
				$are = $_POST["are"];
				$llave = $_POST["llave"];
			?>
            
            <table style=" font-family:Arial, Helvetica, sans-serif; font-size:11px; width:auto;">
            	<tr>
                	<td colspan="2" style="font-size:14px; background-color:#92E9D4;" ><strong>Selecciona las tecnolog&iacute;as:</strong></td>
                </tr>
                <tr><td colspan="2"><br><hr><br></td></tr>
				<tr>
                	<td colspan="2">
                    	<table style="width:100%; background-color:#FAFAFA; border:#CCCCCC solid 1px; padding:10px;">
                            <tr>
                          		<td>
                                	<ul id="tecnoCheck">

										<script>
                                        
                                            var tecnos = "";
											if ((dataTecnologica['<?php echo $llave; ?>']==undefined) || (dataTecnologica['<?php echo $llave; ?>']=="")){
                                           	 	dataTecnologica['<?php echo $llave; ?>'] = {};
												dataTecnologica['<?php echo $llave; ?>'].tecnologia = {};											
											}
												
											
											
											$.ajax({
												type: "GET",
												url: "http://10.105.116.52:9090/getCatalog/CatTecnologias",
												dataType: "json",
												cache: false, 
												success: function(html){
													tecnos = html.apiResponse;
													
													for (var i=0; i<=tecnos.length-1; i++){
													
														
														var idt = tecnos[i].id;
														
														if ((dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt]==undefined) || (dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt]=="")){
															dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt] ={};
															dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt].distrito = {};
															dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt].markers = [];
															///dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt].markers[0].marker = {};	
														}
														
														var colorLe = "";
														//console.log(idt + "-->" + tecnos[i].descripcion);
														var llavesi = '<?php echo $llave; ?>';
														switch (idt) {
															case "1":
																 colorLe = "5FB404";
																break;	
															case "2":
																 colorLe = "FF8000";
																break;
															case "3":
																 colorLe = "0080FF";
																break;
															case "4":
																 colorLe = "8000FF";
																break;
															case "5":
																 colorLe = "B40404";
																break;
															case "6":
																 colorLe = "FF00FF";
																break;
															case "7":
																 colorLe = "01DFD7";
																break;
															case "8":
																 colorLe = "FFBF00";
																break;
														}																																																																																																																						
														 

														if (dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt].markers.length > 0){
															if (activos.indexOf("<?php echo $llave; ?>-tenoid-"+tecnos[i].id) > 0){															
																$("#tecnoCheck").append("<li><input type='checkbox' checked='checked' value='"+tecnos[i].id+"' id='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias("+tecnos[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>'); \"> <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'><img src='mapa/images/widgetIconSmall.png' style='cursor:pointer;' onclick='abreWidgetTecnos(\""+llavesi+"\",\""+tecnos[i].id+"\");' /></span></li>");														
															}else{
																$("#tecnoCheck").append("<li><input type='checkbox' value='"+tecnos[i].id+"' id='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias("+tecnos[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>');\">  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
															}
														}else{
															$("#tecnoCheck").append("<li><input type='checkbox' value='"+tecnos[i].id+"' id='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias("+tecnos[i].id+",'<?php echo $are; ?>','<?php echo $llave; ?>');\">  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font>  <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
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
                	<td colspan="2"><div id="loader_<?php echo $are; ?>" style="height:5px;"></div></td>
                </tr>                
                <tr><td colspan="2"><br><hr><br></td></tr>                

            </table>
