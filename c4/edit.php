<div class="holder">
    <form id="fcambiar_distro" name="fcambiar_distro" method="post" action="#">
        <input type="hidden" name="id-jefe" id="id-jefe" value="" />
        <input type="hidden" name="id-usuario" id="id-usuario" value="" />

        <i class="mdi-action-account-circle prefix white-text"></i>
        <input type="text" name="name-empleado" id="name-empleado" placeholder="Nombre:" value="" readonly="readonly" />

        <i class="mdi-action-description prefix white-text"></i>
        <input type="text" name="expediente" id="expediente" placeholder="Expediente:" value="" readonly="readonly" />
        <?php include 'distritos.php';?>
        <div class="col offset-s7 s5">
            <button class="btn waves-effect waves-light red darken-1" type="submit">Enviar
                <i class="mdi-content-send right white-text"></i>
            </button>
        </div>
    </form>
</div>