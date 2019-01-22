<template>
  <div>
    <mensaje
      @cerrarMensaje="aviso = false"
      v-show="aviso"
      :contenido="contenido"
      :cabecera="cabecera"
      :estiloError="estiloError"
    ></mensaje>
    <modal
      @cerrarModal="modal = false"
      v-show="modal"
      @eliminarRegistro="eliminaRegistro = true, modal=false"
    ></modal>
    <h5>Listado de usuarios</h5>
    <table class="responsive-table">
      <thead>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Is Admin?</th>
      </thead>
      <tbody>
        <tr v-for="(data, index) in all_data" :key="data.id">
          <td>{{data.id}}</td>
          <td>{{data.nombre}}</td>
          <td>{{data.email}}</td>
          <td>{{data.admin}}</td>
          <td>
            <a class="btn btn-small" :href="'admin/usuario/' + data.id">Editar</a>
          </td>
          <td>
            <button class="btn btn-small red" @click="eliminar(data.id, index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import babelPolyfill from "babel-polyfill";
import axios from "axios";
import PostsService from "../../services/PostsService";
import compruebaCampos from "../../assets/js/compruebaCampos";
import mensaje from "../Mensajes.vue";
import modal from "../Modal.vue"

export default {
  components: { mensaje, modal },
  data() {
    return {
      all_data: [],
      aviso: false,
      cabecera: "",
      contenido: "",
      respuesta: [],
      estiloError: null,
      error: null,
      modal: false,
      index: null,
      id: null,
      eliminaRegistro: false
    };
  },

  created() {
    var id = this.$route.params.id;
    this.getUsuarios();
  },

  methods: {
    async getUsuarios() {
      const response = await PostsService.getUsuarios();
      this.all_data = response.data;
      this.mensaje();
    },

    eliminar(id, index) {
      this.id = id;
      this.index = index;
      this.modal = true;    
    },

    // Muestra mensajes al cliente, los datos del error o del éxito que están en logError.json
    mensaje() {
      axios
        .get("./src/services/logError.json")
        .then(response => {
          this.contenido = response.data.message;
          this.cabecera = response.data.success;
          if (this.cabecera != true) {
            this.estiloError = true;
            this.cabecera = 'Error!!!';
          } else {
            this.estiloError = false;
            this.cabecera ='Exito!!!';
          }
          this.aviso = true;
        })
        .catch(e => console.log(e));
    },
  },

  async updated(index){
    if (this.eliminaRegistro){
        var id_user = this.id;
        var index_user = this.index;
        const response = await PostsService.eliminaUsuario({ id_user });
        this.all_data.splice(index_user, 1);
        this.id = null;
        this.index = null;
        this.eliminaRegistro = false;
        this.mensaje();
    }
  }
};
</script>