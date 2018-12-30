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
        <span class="card-title center">Login</span>
        <hr>
        <form @submit.prevent="compruebaDatos">
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
      email: "",
      password: "",
      aviso: false,
      error: null,
      estiloError: false,
      cabecera: "",
      contenido: ""
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
          if (this.cabecera != false) {
            this.cabecera = "Error!!!";
            this.estiloError = true;
          }
          this.aviso = true;
          // Si el success de logError.json es false, es que no existió error y continuamos con el login
          if (this.cabecera === false) {
            this.cabecera = "Exito!!!";
          }
        })
        .catch(e => console.log(e));
    },

    compruebaDatos() {
      var datos = { email: this.email, password: this.password };
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
        // Si los campos son válidos ejecutamos la función login
        this.login();
      }
    },

    // Comprobamos si el login es correcto
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
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
