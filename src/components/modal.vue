<template>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>{{cabecera}}</h4>
      <p>{{mensaje}}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Aceptar</a>
    </div>
  </div>
</template>
<script>
//var instance = M.Modal.getInstance('.modal');
export default {
  data() {
    return {
        cabecera:'',
        mensaje:''
    };
  }
};
</script>
<style>

.modal2 {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fafafa;
  padding: 0;
  max-height: 70%;
  width: 55%;
  margin: auto;
  overflow-y: auto;
  border-radius: 2px;
  will-change: top, opacity; }
  .modal:focus {
    outline: none; }
</style>
