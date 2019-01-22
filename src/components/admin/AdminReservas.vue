<template>
  <div>
    <a href="admin/" class="btn">Volver</a>
    <h5>Administrar reserva: {{ $route.params.id }}</h5>
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
          <span class="card-title center">Formulario de reservas</span>
          <hr>
          <div class="row">
            <form class="col s12 m612">
              <div class="row">
                <div class="input-field col s6">
                  <input
                    placeholder="Nombre"
                    id="nombre"
                    type="text"
                    v-model="all_data[0].nombre"
                  >
                  <label for="nombre">Nombre</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input placeholder="Email" id="email" type="email" v-model="all_data[0].email">
                  <label for="email">Email</label>
                </div>
                <div class="input-field col s6">
                  <input
                    placeholder="Teléfono"
                    id="telefono"
                    type="text"
                    v-model="all_data[0].telefono"
                    required
                  >
                  <label for="telefono">Teléfono</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input
                    placeholder="Fecha de entrada"
                    id="f_entrada"
                    type="text"
                    v-model="all_data[0].f_entrada"
                    required
                  >
                  <label for="f_entrada">Fecha de entrada</label>
                </div>
                <div class="input-field col s6">
                  <input
                    placeholder="Fecha de salida"
                    id="f_salida"
                    type="text"
                    v-model="all_data[0].f_salida"
                    required
                  >
                  <label for="f_salida">Fecha de salida</label>
                </div>
              </div>
              <div class="row">
                <div class="input field col s4">
                  <input
                    placeholder="Número de personas"
                    type="number"
                    id="personas"
                    v-model="all_data[0].personas"
                    required
                  >
                  <label for="personas">Personas</label>
                </div>
                <div class="input field col s4">
                  <input
                    placeholder="Temporada"
                    type="text"
                    id="temporada"
                    v-model="all_data[0].temporada"
                    required
                  >
                  <label for="temporada">Temporada</label>
                </div>
                <div class="input field col s4">
                  <input
                    placeholder="Precio"
                    type="number"
                    id="precio"
                    v-model="all_data[0].precio"
                    required
                  >
                  <label for="precio">Precio</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="center-align">
          <button type="submit" class="btn btn-primary btn-large" @click="convierteFechas">Enviar</button>
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
import pascua from "../../assets/js/pascua";
import mensaje from "../Mensajes.vue";

export default {
  components: { mensaje },
  data() {
    return {
      all_data: [{
        nombre: '',
        email: '',
        telefono: '',
        f_entrada: '',
        f_salida: '',
        personas: null,
        temporada: '',
        precio: null
      }],
      aviso: false,
      cabecera: "",
      contenido: "",
      respuesta: [],
      estiloError: null,
      error: null
    };
  },

  created: function() {
    var id = this.$route.params.id;
    this.getReserva(id);
  },

  methods: {
    async getReserva(id) {
      const response = await PostsService.buscaReserva({ id });
      this.all_data = response.data;
      var entrada = new Date(this.all_data[0].f_entrada);
      var salida = new Date(this.all_data[0].f_salida);

      this.all_data[0].f_entrada =
        entrada.getDate() +
        "-" +
        (entrada.getMonth() + 1) +
        "-" +
        entrada.getFullYear();
      this.all_data[0].f_salida =
        salida.getDate() +
        "-" +
        (salida.getMonth() + 1) +
        "-" +
        salida.getFullYear();
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
            this.cabecera = 'Error!!!';
          } else {
            this.estiloError = false;
            this.cabecera = 'Exito!!!';
          }
          this.aviso = true;
          // Si el success de logError.json es true, es que no existió error y continuamos
          if (this.cabecera === 'Exito!!!') {
            setTimeout(() => {
              this.$router.push({ name: "Adreservas" });
            }, 2000);
          }
        })
        .catch(e => console.log(e));
    },

    // Ya que en este formulario las fechas son de tipo string, debemos convertirlas a tipo Date antes de 
    // realizar cualquier operación con ellas
    convierteFechas(){
      // Comprobamos que el formato de la fecha es el correcto
      var partes_entrada = /^(\d{1,2})[-](\d{1,2})[-](\d{4})$/.exec(this.all_data[0].f_entrada);
      var partes_salida = /^(\d{1,2})[-](\d{1,2})[-](\d{4})$/.exec(this.all_data[0].f_salida);

      // Si el formato es el correcto convertimos las fechas de string a Date
      if (partes_entrada && partes_salida){
        var entrada = this.all_data[0].f_entrada.split('-');
        var salida = this.all_data[0].f_salida.split('-');
        // Debemos dar el formato correcto, con dos dígitos tanto en el día como en el mes
        // ya que, si no, javascript nos devuelve una fecha incorrecta (un día menos)
        var dia_entrada = entrada[0];
        var un_digito = /^(\d{1})$/.exec(dia_entrada);
        if (parseInt(dia_entrada) < 10 &&  un_digito){
          dia_entrada = '0' + entrada[0];
        }
        var mes_entrada = entrada[1];
        un_digito = /^(\d{1})$/.exec(mes_entrada);
        if (parseInt(mes_entrada) < 10 && un_digito){
          mes_entrada = '0' + entrada[1];
        }
        var anio_entrada = entrada[2];

        var dia_salida = salida[0];
        un_digito = /^(\d{1})$/.exec(dia_salida);
        if (parseInt(dia_salida) < 10 && un_digito){
          dia_salida = '0' + salida[0];
        }
        var mes_salida = salida[1];
        un_digito = /^(\d{1})$/.exec(mes_salida);
        if(parseInt(mes_salida) < 10 && un_digito){
          mes_salida = '0' + salida[1];
        }
        var anio_salida = salida[2];

        entrada = anio_entrada + '-' + mes_entrada + '-' + dia_entrada;
        salida = anio_salida + '-' + mes_salida + '-' + dia_salida;

        this.all_data[0].f_entrada = new Date(entrada);
        this.all_data[0].f_salida = new Date(salida);

        this.updateReserva();
      } else { // Si no es un formato correcto enviamos el mensaje al usuario
        this.cabecera = 'Error!!!';
        this.contenido = 'El formato de la fecha debe de ser dd-mm-aaaa';
        this.estiloError = true;
        this.aviso = true;
      }
    },


    // Enviamos los datos via post
    async updateReserva() {
      var response = await PostsService.updateReservas({
       data: this.all_data
      });
      this.mensaje();
    },
  }
};
</script>

