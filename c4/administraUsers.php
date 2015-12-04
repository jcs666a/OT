<div class="row col 16">
	<nav>
		<div id="au_menu" class="nav-wrapper">
			<a id="au_cierra" href="#" class="brand-logo right">x</a>
			<ul id="nav-mobile-b" class="left hide-on-med-and-down">
				<li class="active"><a href="#au_usuarios">Usuarios</a></li>
				<li><a href="#au_newusr">Nuevo Usuario</a></li>
			</ul>
		</div>
	</nav>
	<div id="au_usuarios">
		<table class="responsive-table highlight striped">
			<thead>
				<tr>
					<th>id</th>
					<th>Nombre</th>
					<th>Rol</th>
					<th>Expediente</th>
					<th>Usuario</th>
					<th>Region</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<?php
					include_once 'db_postgre.php';
					$json=file_get_contents('http://10.105.116.52:9090/telmex/get/userAll');
					$data=json_decode($json);
					$resp=$data->{'apiResponse'};
					foreach ($resp[0] as $key => $value){
						if($value->role->idRole > 3){ // && $value->role->idRole !=5){
							$jsonB=file_get_contents('http://10.105.116.52:9090/telmex/get/region/'.$value->idUsuario);
							$dataB=json_decode($jsonB);
							$respB=$dataB->{'apiResponse'};
							$regiones=array();
							$regi=array();
							foreach($respB[0] as $keyB => $valueB){
								$regiones[]=regiones($valueB->regionTrabajo);
							} $i=1;
							foreach($regiones as $keyC => $valueC){
								$regi[]='<li>'.$valueC['regionT'].'</li>';
								$i++;
							}
							$d_json='"usr_id":"'.$value->idUsuario.
									'","usr_nombre":"'.$value->nombre.
									'","usr_user":"'.$value->usuario.
									'","id_role":"'.$value->role->idRole.
									'","expediente":"'.$value->expediente.'"';
							$role=roles($value->role->idRole);
							echo '<tr>
									<td>'.$value->idUsuario.'</td>
									<td>'.$value->nombre.'</td>
									<td>'.$role['na'].'</td>
									<td>'.$value->expediente.'</td>
									<td>'.$value->usuario.'</td>
									<td><ul>'.implode(" ",$regi).'</ul></td>
									<td>
										<a href="#adminUsers" class="au_editar" data=\''.$d_json.'\'>Editar</a>
											/
										<a href="#" class="au_eliminar" data="'.$value->idUsuario.'">Eliminar</a>
									</td>
								</tr>';
						}
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
		<h3 style="display:none;">Editando usuario</h3>
		<form name="FormNewUser" id="FormNewUser" action="#" method="post">
			<div class="newUser-holder">
				<input class="FNUnom" type="text" name="nombre" placeholder="Nombre completo:" value="" />
				<input class="FNUexp" type="text" name="expediente" placeholder="Expediente:" value="" />
				<input class="FNUusu" type="text" name="usuario" placeholder="Usuario:" value="" />
				<input class="FNUpas" type="password" name="passwd" placeholder="Password:" value="" />
				<input class="FNUreg" type="hidden" name="region" id="region_nvo_user" />
				<input class="FNUeDI" type="hidden" name="editar" id="region_edi_user" />
				<label>ROL DE USUARIO:</label>
				<div class="rol_user">
					<label><select class="FNUrol" name="rol" id="userRol">
						<option value="5">Director</option>
						<option value="4">Corporativo</option>
						<option value="6">Lider Promotor</option>
						<option value="7">Promotor</option>
					</select></label>
				</div>
				<input type="hidden" name="sigo_la_misma_region" id="sigo_la_misma_region" value="" />
				<div class="holder-block">
					<p>&nbsp;</p>
					<?php include 'distritos.php';?>
				</div>
				<div style="padding:20px 0;text-align:center;">
					<button class="btn waves-effect waves-light red darken-1" type="submit">
						 Guardar <i class="mdi-content-save right white-text"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>