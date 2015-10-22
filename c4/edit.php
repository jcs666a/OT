<div class="holder">
    <form action="#">
        <i class="mdi-action-account-circle prefix white-text"></i>
        <input type="text" id="name-edit" placeholder="Nombre:">

        <i class="mdi-action-description prefix white-text"></i>
        <input type="text" placeholder="Expediente:">
        <?php include 'distritos.php';?>
    <div class="col offset-s7 s5">
        <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
            <i class="mdi-content-send right white-text"></i>
        </button>
    </form>
</div>
<script>
    $(document).ready(function() {
        $("#select-edit").material_select();
    });
</script>
