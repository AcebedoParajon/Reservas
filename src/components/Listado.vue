<template>
  <div class="col m12">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Listado de reservas</span>
        <table border="1" class="responsive-table">
          <thead>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha de entrada</th>
            <th>Fecha de salida</th>
            <th>Nº de personas</th>
            <th>Temporada</th>
            <th>Precio</th>
          </thead>
          <tbody>
            <tr v-for="data in all_data" :key="data.id">
              <td>{{data.nombre}}</td>
              <td>{{data.email}}</td>
              <td>{{data.telefono}}</td>
              <td>{{data.f_entrada}}</td>
              <td>{{data.f_salida}}</td>
              <td>{{data.personas}}</td>
              <td>{{data.temporada}}</td>
              <td>{{data.precio}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import babelPolyfill from "babel-polyfill";
import PostsService from "../services/PostsService";

export default {
  data() {
    return {
      all_data: []
    };
  },
  created: function() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.listarReservas();
      this.all_data = response.data;
    }
  }
};
</script>
<style>
</style>
