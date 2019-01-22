<template>
  <div>
    <a href="admin/" class="btn">Volver</a>
    <h5>Administrar usuario {{ $route.params.id }}</h5>
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
          <span class="card-title center">Administrar usuarios</span>
          <hr>
          <div class="row">
            <form class="col s12 m612">
              <div class="row">
                <div class="input-field col s6">
                  <input
                    placeholder="Nombre"
                    id="first_name"
                    type="text"
                    v-model="all_data[0].nombre"
                    required
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Email" id="email" type="email" v-model="all_data[0].email" required>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input
                    placeholder="Is admin? 0 no"
                    id="admin"
                    type="number"
                    v-model="all_data[0].admin"
                  >
                  <label for="admin">Is Admin?</label>
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
import babelPolyfill from "babel-polyfill";
import axios from "axios";
import PostsService from "../../services/PostsService";
import compruebaCampos from "../../assets/js/compruebaCampos";
import mensaje from "../Mensajes.vue";

export default {
  components: { mensaje },
  data() {
    return {
      all_data: [{
        id: null,
        nombre: '',
        email: '',
        password: '',
        admin: null
      }],
      aviso: false,
      cabecera: "",
      contenido: "",
      respuesta: [],
      estiloError: null,
      error: null
    };
  },

  created(){
    var id_user = this.$route.params.id;
    this.getUsuario(id_user);
  },

  methods: {
    async getUsuario(id_user) {
      console.log(id_user);
      const response = await PostsService.getUsuario({id_user});
      this.all_data = response.data;
    },

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
          if (this.cabecera != true) {
            this.estiloError = true;
            this.cabecera = 'Error!!!'
            } else {
              this.estiloError = false;
              this.cabecera = 'Exito!!!'
            }
          this.aviso = true;
          // Si el success de logError.json es true, es que no existió error y continuamos
          if (this.cabecera === 'Exito!!!') {
            setTimeout(()=>{
              this.$router.push({ name: 'Usuarios' });
            }, 2000)
          }
        })
        .catch(e => console.log(e));
    },
    // Comprobamos que los campos a enviar son válidos
    compruebaDatos() {
      var datos = {
        nombre: this.all_data[0].nombre,
        email: this.all_data[0].email,
        admin: this.all_data[0].admin
      };

      this.notify();
      if (datos.nombre == '') {
        this.error = 'El nombre es requerido.'
      }
      if (datos.email == '') {
        this.error = 'El email es es requerido.'
      }
      if( !(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(datos.email)) ) {
            this.error = 'El formato del correo no es válido'
      }
      // Si existe error en la comprobación de los campos mostramos mensaje de error
      if (this.error) {
        this.estiloError = true;
        this.cabecera = "ERROR!!!";
        this.contenido = this.error;
        this.aviso = true;
        return;
      } else {
        // Si los campos son válidos ejecutamos la función que comprueba las fechas de la reserva
        this.updateUser();
      }
    },

    async updateUser() {
      var response = await PostsService.updateUser({
        data: this.all_data
      });
      this.mensaje();
    }
  }
};
</script>

