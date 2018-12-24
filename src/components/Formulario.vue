<template>
  <div>
    <mensaje @cerrarMensaje="aviso = false" v-show="aviso" :contenido="contenido" :cabecera="cabecera" :estiloError="estiloError" ></mensaje>
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
                  <input
                    placeholder="Teléfono"
                    id="telefono"
                    type="text"
                    v-model="telefono"
                    required
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input
                    placeholder="Fecha de entrada"
                    id="f_entrada"
                    type="date"
                    v-model="f_entrada"
                    required
                  >
                  <label for="f_entrada">Fecha de entrada</label>
                </div>
                <div class="input-field col s6">
                  <input
                    placeholder="Fecha de salida"
                    id="f_salida"
                    type="date"
                    v-model="f_salida"
                    required
                  >
                  <label for="f_salida">Fecha de salida</label>
                </div>
              </div>
              <div class="row">
                <div class="input field col s6">
                  <input
                    placeholder="Número de personas"
                    type="number"
                    id="personas"
                    v-model="personas"
                    required
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="center-align">
          <button type="submit" class="btn btn-primary btn-large" @click="compruebaDatos">Enviar</button>
        </div>
      </div>
      <vue-up></vue-up>
    </div>
  </div>
</template>
<script>
import babelPolyfill from "babel-polyfill"
import axios from "axios"
import PostsService from "../services/PostsService"
import compruebaCampos from "../assets/js/compruebaCampos"
import mensaje from './Mensajes.vue'

export default {
  components: {mensaje},
  data() {
    return {
      //modalInstance: null,
      nombre: "",
      email: "",
      telefono: "",
      f_entrada: "",
      f_salida: "",
      personas: "",
      aviso: false,
      cabecera: "",
      contenido: "",
      respuesta: [],
      estiloError: null,
      error: null
    };
  },

  methods: {

    notify() {
      this.$popup({ message: "Enviando datos...", delay: 10 });
    },

    // Muestra mensajes al cliente, los datos del error o del éxito que están en logError.json
    mensaje() {
      axios
        .get("./src/services/logError.json")
        .then(response => {
          this.contenido = response.data.message;
          this.cabecera = response.data.success;
          if (this.cabecera != "Enviando reserva") this.estiloError = true;
          this.aviso = true;
          // Si el success de logError.json es false, es que no existió error y continuamos con la reserva
          if (this.cabecera === "Enviando reserva") {
            this.addReserva();
          }
        })
        .catch(e => console.log(e));
    },

    // Comprobamos que los campos a enviar son válidos
    compruebaDatos() {
      var datos = {
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        f_entrada: this.f_entrada,
        f_salida: this.f_salida,
        personas: this.personas
      };
      //datos.push(this.nombre,this.email,this.telefono,this.f_entrada,this.f_salida,this.personas)
      this.notify();
      this.error = compruebaCampos(datos);
      // Si existe error en la comprobación de los campos mostramos mensaje de error
      if (this.error) {
        this.estiloError = true;
        this.cabecera = "ERROR!!!";
        this.contenido = this.error;
        this.aviso = true;
        return;
      } else {
        // Si los campos son válidos ejecutamos la función que comprueba las fechas de la reserva
        this.compruebaReserva();
      }
    },

    // Comprobamos si la fecha ya está reservada
    async compruebaReserva() {
      const response = await PostsService.compruebaReservas({
        f_entrada: this.f_entrada,
        f_salida: this.f_salida
      });
      // Mostramos mensaje tanto del error (si existió) como del éxito
      this.mensaje();
    },

    // Enviamos los datos via post sólo si pasa todos los filtros de errores
    async addReserva() {
      await PostsService.addReservas({
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        f_entrada: this.f_entrada,
        f_salida: this.f_salida,
        personas: this.personas
      });

      this.nombre = "";
      this.email = "";
      this.telefono = "";
      this.f_entrada = "";
      this.f_salida = "";
      this.personas = "";
      setTimeout(this.iraPagina, 2000);
    },

    iraPagina() {
      this.$router.push({ name: "Listado" });
    }
  }
};
</script>
<style>
</style>
