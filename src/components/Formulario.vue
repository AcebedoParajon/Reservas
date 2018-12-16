<template>
    <div class="col m12">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title center">Formulario de reservas</span>
          <hr>
          <div class="row">
            <form class="col s12 m612">
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Nombre" id="first_name" type="text" v-model="nombre">
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Email" id="email" type="email" v-model="email">
                </div>
                <div class="input-field col s6">
                  <input placeholder="Teléfono" id="telefono" type="text" v-model="telefono">
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Fecha de entrada" id="f_entrada" type="date" v-model="f_entrada">
                  <label for="f_entrada">Fecha de entrada</label>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Fecha de salida" id="f_salida" type="date" v-model="f_salida">
                  <label for="f_salida">Fecha de salida</label>
                </div>
              </div>
              <div class="row">
                  <div class="input field col s6">
                      <input placeholder="Número de personas" type="number" id="personas" v-model="personas">
                  </div>
              </div>
            </form>
          </div>
        </div>
        <div class="center-align">
          <button type="submit" class="btn btn-primary btn-large" @click="addReserva">Enviar</button>
        </div>
      </div>
    </div>
</template>
<script>
import babelPolyfill from "babel-polyfill";
import PostsService from "../services/PostsService";

export default {
  data() {
    return {
      nombre: '',
      email: '',
      telefono: '',
      f_entrada: '',
      f_salida: '',
      personas: ''
    };
  },
  methods: {
    async addReserva () {
      await PostsService.addReservas({
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        f_entrada:this.f_entrada,
        f_salida: this.f_salida,
        personas: this.personas
      })
      this.$router.push({ name: 'Posts' })
    }
  }
};
</script>
<style>
</style>
