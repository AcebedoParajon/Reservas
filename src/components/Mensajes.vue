<template>
  <div>
    <div class="col m12">
      <div
        class="card-panel"
        :class="{'grey lighten-4':estiloError!=true, 'red lighten-1':estiloError}"
      >
        <div class="card-content white-text">
          <span class="card-title">{{ cabecera }}</span>
          <p>{{ contenido }}</p>
        </div>
        <div class="card-action">
          <a @click="cerrarAviso" class="btn red accent-1">Cerrar</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["estiloError", "cabecera", "contenido"],

  methods: {
    cerrarAviso() {
      this.$emit('cerrarMensaje')
    }
  }
};
</script>
<style>
</style>
