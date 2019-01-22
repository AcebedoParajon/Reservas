<template>
  <div>
    <mensaje
      @cerrarMensaje="aviso = false"
      v-show="aviso"
      :contenido="contenido"
      :cabecera="cabecera"
      :estiloError="estiloError"
    ></mensaje>
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
// import babelPolyfill from "babel-polyfill";
import axios from "axios";
import PostsService from "../services/PostsService";
import compruebaCampos from "../assets/js/compruebaCampos";
import pascua from "../assets/js/pascua";
import mensaje from "./Mensajes.vue";

export default {
  components: { mensaje },
  data() {
    return {
      nombre: "",
      email: "",
      telefono: "",
      f_entrada: "",
      f_salida: "",
      personas: "",
      temporada: "",
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
          if (this.cabecera != true) this.estiloError = true;
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
        this.compruebaTemporada();
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

    compruebaTemporada() {
      var fecha = new Date(this.f_entrada);
      var f_pascua = pascua(fecha.getFullYear());

      // Temporada alta verano
      if (fecha.getDate() >= 15 && fecha.getMonth() + 1 >= 7) {
        if (fecha.getMonth() + 1 == 9 && fecha.getDate() > 15) {
          this.temporada = "BAJA";
        } else {
          this.temporada = "ALTA";
        }
      };

      // Temporada media
      if (fecha.getMonth() + 1 >= 5 && fecha.getMonth() + 1 <= 6) {
        this.temporada = "MEDIA";
      };
      if (fecha.getMonth() + 1 == 7 && fecha.getDate() < 15) {
        this.temporada = "MEDIA";
      };

      // Temporada alta navidades
      if (fecha.getMonth() + 1 == 12 && fecha.getDate() > 24) {
        this.temporada = "ALTA";
      };
      if (fecha.getMonth() + 1 == 1 && fecha.getDate() < 6) {
        this.temporada = "ALTA";
      } else {
        this.temporada = "BAJA";
      };

      // Semana Santa
      if (fecha >= f_pascua.lunes_pascua && fecha < f_pascua.domingo_pascua) {
        this.temporada = "ALTA";
      };
      this.compruebaReserva();
    },

    // Enviamos los datos via post sólo si pasa todos los filtros de errores
    async addReserva() {
      await PostsService.addReservas({
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        f_entrada: this.f_entrada,
        f_salida: this.f_salida,
        personas: this.personas,
        temporada: this.temporada
      });

      this.nombre = "";
      this.email = "";
      this.telefono = "";
      this.f_entrada = "";
      this.f_salida = "";
      this.personas = "";
      this.temporada = "";
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
