<template>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>{{cabecera}}</h4>
      <p>{{mensage}}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        cabecera,
        mensaje
    };
  }
};
</script>
<style>
</style>
