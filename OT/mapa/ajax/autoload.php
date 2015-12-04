            <?php 
				$are = $_POST["are"];
				$llave = $_POST["llave"];
				$distrito= $_POST["distrito"];
			?>
	<script>
			if('<?php echo $distrito; ?>' != '' && '<?php echo $distrito; ?>' != undefined){
				$("#tecnoDialog .inner .filtersLine").append('<div id="<?php echo $distrito; ?>" class="filter" onclick="filterOpen(this.id);"><h1>"<?php echo $distrito; ?>-<?php echo $llave;?>"</h1><ul id="tecnoCheck-<?php echo $distrito;?>" class="tecnoCheck"></ul></div>');
			}
			else{
				$("#tecnoDialog .inner .filtersLine").append('<div id="<?php echo $llave; ?>" class="filter" onclick="filterOpen(this.id);"><h1>"<?php echo $llave;?>"</h1><ul id="tecnoCheck-<?php echo $llave;?>" class="tecnoCheck"></ul></div>');
			}
	</script>
                                	<ul id="tecnoCheck">
										<script>
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
														}
														var colorLe = "";
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
								$("#tecnoCheck-<?php echo $distrito;?>").append("<li><input type='checkbox' checked='checked' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $distrito; ?>'); \" checked> <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'><img src='mapa/images/widgetIconSmall.png' style='cursor:pointer;' onclick='abreWidgetTecnos(\""+llavesi+"\",\""+tecnos[i].id+"\");' /></span></li>");														
							}
							else{
								$("#tecnoCheck-<?php echo $distrito;?>").append("<li><input type='checkbox' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $llave; ?>','<?php echo $distrito; ?>');\" checked>  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
							}
						}
						else{
							$("#tecnoCheck-<?php echo $distrito;?>").append("<li><input type='checkbox' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"discart('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $llave; ?>','<?php echo $distrito; ?>',this);\" checked>  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font>  <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
						}
						if (dataTecnologica['<?php echo $llave; ?>'].tecnologia[idt].markers.length > 0){
							if (activos.indexOf("<?php echo $llave; ?>-tenoid-"+tecnos[i].id) > 0){															
								$("#tecnoCheck-<?php echo $llave;?>").append("<li><input type='checkbox' checked='checked' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $distrito; ?>'); \" checked> <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'><img src='mapa/images/widgetIconSmall.png' style='cursor:pointer;' onclick='abreWidgetTecnos(\""+llavesi+"\",\""+tecnos[i].id+"\");' /></span></li>");														
							}
						else{
							$("#tecnoCheck-<?php echo $llave;?>").append("<li><input type='checkbox' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"traeteLasTecnologias('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $llave; ?>','<?php echo $distrito; ?>');\" checked>  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font> <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
						}
					}
					else{
						$("#tecnoCheck-<?php echo $llave;?>").append("<li><input type='checkbox' value='"+tecnos[i].id+"' class='opcTeno_"+tecnos[i].id+"' onchange=\"discart('"+tecnos[i].id+"','<?php echo $are; ?>','<?php echo $llave; ?>','<?php echo $distrito; ?>',this);\" checked>  <font style='color:#"+colorLe+";'><b>"+tecnos[i].descripcion+" </b></font>  <span id='wigTeno_"+tecnos[i].id+"'></span></li>");
					}	

														pintaAll(i, '<?php echo $llave; ?>', '<?php echo $are; ?>','<?php echo $distrito;?>');
													}
												}
											});								
                                        </script>

                                    </ul>
<div id="loader_<?php echo $are; ?>" style="height:5px;"></div>
              

<script>
$("#verSelecion").click(function(event) {
	$("#tecnoDialog").removeClass('open');
});	
</script>