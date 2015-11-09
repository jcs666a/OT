<form action="#">
<div class="newUser-holder">
	<input type="text" name="nombre" placeholder="NOMBRE: ">
	<input type="text" name="apellido" placeholder="APELLIDO: ">
	<input type="text" name="usuario" placeholder="USUARIO: ">
	<input type="password" name="expediente" placeholder="PASSWORD (EXPEDIENTE): ">
	<label for="userRol">ROl DE USUARIO:</label>
	<select name="rol" id="userRol">
		<option value="#">Director</option>
		<option value="#">Corporativo</option>
		<option value="#">Lider</option>
		<option value="#">Promotor</option>
	</select>
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

<script>
	$(document).ready(function() {
		$("#userRol").material_select();
	});
</script>