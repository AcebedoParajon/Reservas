<template>
<div>
  <div class="col m12" v-if="aviso">
    <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{ cabecera }}</span>
          <p>{{ contenido }}</p>
        </div>
        <div class="card-action">
          <a @click="cerrarAviso" class="btn">Cerrar</a>
        </div>
      </div>
  </div>
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
                  <input placeholder="Teléfono" id="telefono" type="text" v-model="telefono" required>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Fecha de entrada" id="f_entrada" type="date" v-model="f_entrada" required>
                  <label for="f_entrada">Fecha de entrada</label>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Fecha de salida" id="f_salida" type="date" v-model="f_salida" required>
                  <label for="f_salida">Fecha de salida</label>
                </div>
              </div>
              <div class="row">
                  <div class="input field col s6">
                      <input placeholder="Número de personas" type="number" id="personas" v-model="personas" required>
                  </div>
              </div>
            </form>
          </div>
        </div>
        <div class="center-align">
          <button type="submit" class="btn btn-primary btn-large" @click="compruebaReserva">Enviar</button>
        </div>
      </div>
      <vue-up></vue-up>
    </div>
</div>
</template>
<script>
import babelPolyfill from "babel-polyfill";
import PostsService from "../services/PostsService";
import compruebaCampos from "../assets/js/compruebaCampos";
import modal from "./modal.vue";


export default {
  components:{modal},
  data() {
    return {
      //modalInstance: null,
      nombre: '',
      email: '',
      telefono: '',
      f_entrada: '',
      f_salida: '',
      personas: '',
      aviso: false,
      cabecera:'',
      contenido:'',
      error: null
    };
  },

  methods: {
    cerrarAviso(){
      this.aviso = false;
    },
    notify () {
      this.$popup({ message: 'Enviando datos...', delay: 10 })
    },
    compruebaReserva() {
      var datos = []
      datos.push(this.nombre,this.email,this.telefono,this.f_entrada,this.f_salida,this.personas)
      this.notify()
      this.error = compruebaCampos(datos)
      console.log(this.error)
      if (this.error){
        this.cabecera = 'Error!!!';
        this.contenido = this.error;
        this.aviso = true;
        return;
      }else{
        this.addReserva()
      }
    },
    async addReserva () {
      await PostsService.addReservas({
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        f_entrada:this.f_entrada,
        f_salida: this.f_salida,
        personas: this.personas
      });
      this.nombre = '';
      this.email = '';
      this.telefono = '';
      this.f_entrada = '';
      this.f_salida = '';
      this.personas = '';
      this.$router.push({ name: 'Listado' });
    }
  }
};
</script>
<style>
</style>
