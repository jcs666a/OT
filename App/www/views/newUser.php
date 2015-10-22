<form id="userInfo">
	<h3>Nuevo Usuario</h3>
	<label> Usuario </label>
	<input type="text" name="usuario" >
	<label>Nombre</label>
	<input type="text" name="nombre">		
	<label>Apellido</label>
	<input type="text" name="apellidos" >
	<label>Clave (Expediente):</label>
	<input type="password" name="clave">
	<select name="roles" id="" style="display:none;">
		<option value="promotor"></option>
	</select>
	<div class="submit">
		<input type="submit" value="Registrar" onclick="registarUsuario();">
	</div>
</form> 

<script>
var dataRegistro = $("#userInfo");
function registarUsuario(){
	  var data = dataRegistro.serialize();
        try{
          $.ajax({
            type: "POST",
            url: "http://187.217.179.35:9000/usuarios/",
            data: data,
            success: function(data, a, b){
              window.location="index.php";
            },
            error: function(jqXHR, textStatus, error){
              console.log('Error',jqXHR, textStatus, error);
            },
            dataType: 'json'
          });
        }catch(error){
          console.log(error)
        };
}
</script>