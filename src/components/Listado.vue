<template>
  <div class="col m12">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">Listado de reservas</span>
        <table border="1">
          <thead>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha de entrada</th>
            <th>Fecha de salida</th>
            <th>Nº de personas</th>
          </thead>
          <tr v-for="data in all_data ">
            <td>{{data.nombre}}</td>
            <td>{{data.email}}</td>
            <td>{{data.telefono}}</td>
            <td>{{data.f_entrada}}</td>
            <td>{{data.f_salida}}</td>
            <td>{{data.personas}}</td>
          </tr>
        </table>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
        <a href="#">This is a link</a>
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
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.all_data = response.data
    }
  }
};
</script>
<style>
</style>
