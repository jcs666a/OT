<div class="row col 16">
	<nav>
		<div id="au_menu" class="nav-wrapper">
			<a id="au_cierra" href="#" class="brand-logo right">x</a>
			<ul id="nav-mobile-b" class="left hide-on-med-and-down">
				<li class="active"><a href="#au_usuarios">Campañas</a></li>
				<li><a href="#au_newusr">Nueva campaña</a></li>
			</ul>
		</div>
	</nav>
	<div id="au_usuarios">
		<table class="responsive-table highlight striped">
			<thead>
				<tr>
					<th>id</th>
					<th>Título</th>
					<th>tCode</th>
					<th>CampaignCode</th>
					<th>OfferCode</th>
					<th>Fecha</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<?php
					include_once 'db_postgre.php';
					$json=file_get_contents('http://10.105.116.52:9090/telmex/get/campañas');
					$data=json_decode($json);
					$resp=$data->{'apiResponse'};
					foreach($resp[0] as $key => $value){
						$d_json='"id":"'.$value->id.
								'","titulo":"'.$value->titulo.
								'","tcode":"'.$value->tcode.
								'","campaigncode":"'.$value->campaigncode.
								'","offercode":"'.$value->offercode.'"';
						echo '<tr>
								<td>'.$value->id.'</td>
								<td>'.$value->titulo.'</td>
								<td>'.$value->tcode.'</td>
								<td>'.$value->campaigncode.'</td>
								<td>'.$value->offercode.'</td>
								<td>'.$value->createAt.'</td>
								<td>
									<a href="#adminUsers" class="au_editar" data=\''.$d_json.'\'>Editar</a>
										/
									<a href="#" class="au_eliminar" data="'.$value->id.'">Eliminar</a>
								</td>
							</tr>';
					}
				?>
			</tbody>
		</table>
		<div id="pager" class="pager">
			<form>
				<span class="first mdi-av-skip-previous"></span>
				<span class="prev mdi-image-navigate-before"></span>
				<input type="text" class="pagedisplay" readonly="readonly" disabled="disabled" />
				<span class="next mdi-image-navigate-next"></span>
				<span class="last mdi-av-skip-next"></span>
				<label><select class="pagesize">
					<option selected="selected"  value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option  value="40">40</option>
				</select></label>
			</form>
		</div>
	</div>
	<div id="au_newusr" style="display:none;">
		<h3 style="display:none;">Editando campaña</h3>
		<form name="FormNewCamp" id="FormNewCamp" action="#" method="post">
			<div class="newUser-holder">
				<input class="FNtitulo" type="text" name="titulo" placeholder="Título" value="" />
				<input class="FNtCode" type="text" name="tCode" placeholder="tCode" value="" />
				<input class="FNcampaignCode" type="text" name="campaignCode" placeholder="CampaignCode" value="" />
				<input class="FNofferCode" type="text" name="offerCode" placeholder="OfferCode" value="" />
				<input class="FNdescripcion" type="text" name="descripcion" placeholder="Descripción" value="" />
				<input class="FNUeDI" type="hidden" name="eDI" id="eDI" value="" />
				<div style="padding:20px 0;text-align:center;">
					<button class="btn waves-effect waves-light red darken-1" type="submit">
						 Guardar <i class="mdi-content-save right white-text"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>