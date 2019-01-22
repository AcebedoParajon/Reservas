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
    <h5>Administrar reservas</h5>
    <hr>
    <div>
      <span class="card-title">Listado de reservas</span>
      <table border="1" class="bordered centered responsive-table">
        <thead>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Entrada</th>
          <th>Salida</th>
          <th>Personas</th>
          <th>Temporada</th>
          <th>Precio</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="(data, index) in all_data" :key="data.id">
            <td>{{data.nombre}}</td>
            <td>{{data.email}}</td>
            <td>{{data.telefono}}</td>
            <td>{{data.f_entrada}}</td>
            <td>{{data.f_salida}}</td>
            <td>{{data.personas}}</td>
            <td>{{data.temporada}}</td>
            <td>{{data.precio}}</td>
            <td>
              <a class="btn btn-small" :href="'admin/reservas/' + data.id">Editar</a>
            </td>
            <td>
              <button class="btn btn-small red" @click="eliminar(data.id, index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import babelPolyfill from "babel-polyfill";
import PostsService from "../../services/PostsService";
import mensaje from "../Mensajes.vue";
import modal from "../Modal.vue";

export default {
  components: { mensaje, modal },
  data() {
    return {
      all_data: [],
      aviso: false,
      cabecera: "",
      contenido: "",
      estiloError: null,
      modal: false,
      index: null,
      id: null,
      eliminaRegistro: false
    };
  },
  created: function() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.listarReservas();
      this.all_data = response.data;
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
            this.cabecera = 'Exito!!!';
          }
          this.aviso = true;
        })
        .catch(e => console.log(e));
    },
  },
  
  async updated(index){
    if (this.eliminaRegistro){
        var id_reserva = this.id;
        var index_reserva = this.index;
        const response = await PostsService.eliminaReserva({ id_reserva }); // Elimina reserva de la base de datos
        this.all_data.splice(index_reserva, 1); // Elimina reserva de la vista
        this.id = null;
        this.index = null;
        this.eliminaRegistro = false;
        this.mensaje();
    }
  }
};
</script>