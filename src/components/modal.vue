<template>
  <div id="modal1" class="card red lighten-1">
    <div class="card-content white-text">
      <h4>Atención</h4>
      <h6>¿Realmente desea eliminar este registro?</h6>
    </div>
    <div class="card-action">
      <a @click="cerrarModal" class="btn blue accent-1">Cancelar</a>
      <a @click="eliminarRegistro" class="btn red accent-1">Aceptar</a>
    </div>
  </div>
</template>
<script>

export default {

  data(){
    return{
      eliminarUsu: false,
    }   
  },
  methods:{
    cerrarModal(){
      this.$emit('cerrarModal');
    },
    eliminarRegistro(){
      this.$emit('eliminarRegistro');
    }
  }
};
</script>
<style>

#modal1 {
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
  will-change: top, opacity; 
  z-index: 9999;
}
.modal:focus {
  outline: none; 
}
</style>
