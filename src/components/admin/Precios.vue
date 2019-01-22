<template>
  <div>
    <h5>Adiministrar precios por temporada</h5>
    <hr>
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
          <span class="card-title center">Precios por temporada</span>
          <hr>
          <div class="row">
            <form class="col s12 m612">
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Alta" id="temp_alta" type="number" v-model="alta" required>
                  <label for="temp_alta">Alta</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Media" id="temp_media" type="number" v-model="media" required>
                  <label for="temp_media">Media</label>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Baja" id="temp_baja" type="number" v-model="baja" required>
                  <label for="temp_baja">Baja</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="center-align">
          <button type="submit" class="btn btn-primary btn-large" @click="modificaPrecios">Enviar</button>
        </div>
      </div>
      <vue-up></vue-up>
    </div>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import axios from "axios";
import mensaje from "../Mensajes.vue";
import PostsService from "../../services/PostsService";

export default {
  components: { mensaje },
  data() {
    return {
      baja: null,
      media: null,
      alta: null,
      cabecera : false,
      contenido: '',
      aviso: false,
      id: null,
      estiloError: false
    };
  },

  created() {
    this.getPrecios();
  },

  methods: {
    // Muestra mensajes al cliente, los datos del error o del éxito que están en logError.json
    mensaje() {
      axios
        .get("./src/services/logError.json")
        .then(response => {
          this.contenido = response.data.message;
          this.cabecera = response.data.success;
          if (this.cabecera != true) {
            this.estiloError = true;
            this.cabecera ='Error!!!'
            this.aviso = true;
          } else {
            this.estiloError = false;
            this.cabecera = 'Exito!!!';
            this.aviso = true;
          }
        })
        .catch(e => console.log(e));
    },
    async getPrecios() {
      var result = await PostsService.getPrecios();
      this.alta = result.data[0].alta;
      this.media = result.data[0].media;
      this.baja = result.data[0].baja;
      this.id = result.data[0].id;
      this.mensaje();
    },

    async modificaPrecios() {
      var result = await PostsService.modificaPrecios({
        alta: this.alta,
        media: this.media,
        baja: this.baja,
        id: this.id
	  });
	  this.mensaje();
    }
  }
};
</script>