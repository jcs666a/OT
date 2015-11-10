<form name="FormNewUser" id="FormNewUser" action="#" method="post">
<div class="newUser-holder">
	<input class="FNUnom" type="text" name="nombre" placeholder="Nombre completo:" value="" />
	<input class="FNUexp" type="text" name="expediente" placeholder="Expediente:" value="" />
	<input class="FNUusu" type="text" name="usuario" placeholder="Usuario:" value="" />
	<input class="FNUpas" type="password" name="passwd" placeholder="Password:" value="" />
	<input class="FNUreg" type="hidden" name="region" id="region_nvo_user" />
	<label>ROl DE USUARIO:</label>
	<div class="box col s12 m4 l4">
		<label><select class="FNUrol" name="rol" id="userRol">
			<option value="5">Director</option>
			<option value="1">Corporativo</option>
			<option value="4">Lider</option>
		</select></label>
	</div>
	<div class="holder-block">
		<p>Eliga el distrito de pertencia:</p>
		<?php include 'distritos.php';?>
	</div>
    <div class="col offset-s7 s5" style="text-align:center; padding:20px;">
		<button class="btn waves-effect waves-light red darken-1" type="submit">
			 Registrar <i class="mdi-content-send right white-text"></i>
		</button>
	</div>
</div>
</form>