<template>
  <div>
    <mensaje
      @cerrarMensaje="aviso = false"
      v-show="aviso"
      :contenido="contenido"
      :cabecera="cabecera"
      :estiloError="estiloError"
    ></mensaje>
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title center">Registro</span>
        <hr>
        <form @submit.prevent="compruebaDatos">
          <div class="row">
            <div class="input-field col s12">
              <input id="nombre" type="text" v-model="nombre">
              <label for="nombre">Nombre</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" v-model="email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" v-model="password">
              <label for="password">Password</label>
            </div>
          </div>
          <div class="center-align">
            <button type="submit" class="btn btn-primary btn-large">Enviar</button>
          </div>
        </form>
      </div>
      <vue-up></vue-up>
    </div>
  </div>
</template>
<script>
import babelPolyfill from "babel-polyfill";
import axios from "axios";
import PostsService from "../services/PostsService";
import compruebaCampos from "../assets/js/compruebaCampos";
import mensaje from "./Mensajes.vue";

export default {
  components: { mensaje },
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
      contenido: "",
      cabecera: "",
      aviso: false,
      error: null,
      estiloError: null
    };
  },

  methods: {
    notify() {
      this.$popup({ message: "Enviando datos...", delay: 10 });
    },

    cerrarAviso() {
      this.aviso = false;
    },

    // Muestra mensajes al cliente, los datos del error o del éxito que están en logError.json
    mensaje() {
      axios
        .get("./src/services/logError.json")
        .then(response => {
          this.contenido = response.data.message;
          this.cabecera = response.data.success;
          if (this.cabecera != false) {
            this.cabecera = "Error!!!";
            this.estiloError = true;
          }
          this.aviso = true;
          // Si el success de logError.json es false, es que no existió error y continuamos con el registro
          if (this.cabecera === false) {
            this.cabecera = "Exito!!!";
          }
        })
        .catch(e => console.log(e));
    },

    compruebaDatos() {
      var datos = {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      };
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
        // Si los campos son válidos ejecutamos la función que ingresa los datos del usuario en la base de datos
        this.register();
      }
    },

    // Ingresamos el usuario en la base de datos
    register() {
      let data = {
        nombre: this.nombre,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          this.mensaje();
          setTimeout(this.$router.push({ name: "Listado" }), 2000);
        })
        .catch(err => {
          this.mensaje();
          console.log(err);
        });
    }
  }
};
</script>
<style>
</style>

