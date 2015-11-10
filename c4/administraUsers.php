<div class="row col 16">
	<nav>
		<div id="au_menu" class="nav-wrapper">
			<a id="au_cierra" href="#" class="brand-logo right">x</a>
			<ul id="nav-mobile" class="left hide-on-med-and-down">
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
					<th>División</th>
					<th>Área</th>
					<th>Distrito</th>
					<th>Usuario</th>
					<th>Nombre</th>
					<th>Rol</th>
					<th>Expediente</th>
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
							$d_json = '"usr_id":"'.$value->idUsuario.
									'","region_trabajo":"'.$value->regionTrabajo.
									'","usr_nombre":"'.$value->nombre.
									'","usr_user":"'.$value->usuario.
									'","id_role":"'.$value->role->idRole.
									'","expediente":"'.$value->expediente.'"';
							$role=roles($value->role->idRole);
							$regi=regiones($value->regionTrabajo);
							echo '<tr>
									<td>'.$value->idUsuario.'</td>
									<td>'.$regi['division'].'</td>
									<td>'.$regi['area'].'</td>
									<td>'.$regi['distrito'].'</td>
									<td>'.$value->usuario.'</td>
									<td>'.$value->nombre.'</td>
									<td>'.$role['na'].'</td>
									<td>'.$value->expediente.'</td>
									<td>
										<a href="#" class="au_editar" data=\''.$d_json.'\'>Editar</a>
											/
										<a href="#" class="au_eliminar" data="'.$value->idUsuario.'">Eliminar</a>
									</td>
								</tr>';
						}
					}
				?>
			</tbody>
		</table>
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
				<h4 class="rol_actual" style="display:none;">Region actual: <span></span></h4>
				<input type="hidden" name="sigo_la_misma_region" id="sigo_la_misma_region" value="" />
				<div class="holder-block">
					<p>Eliga el distrito de pertencia:</p>
					<?php include 'distritos.php';?>
				</div>
				<div style="padding:20px 0;text-align:center;">
					<button class="btn waves-effect waves-light red darken-1" type="submit">
						 Registrar <i class="mdi-content-send right white-text"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>