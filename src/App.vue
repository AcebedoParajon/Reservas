<template>
  <div class="container">
    <h1 class="center-align">Reservas</h1>
    <div class="center-align">
      <router-link to="/" class="btn">Formulario de reservas</router-link>
      <router-link to="listado" class="btn">Listado de reservas</router-link>
      <span v-if="isLoggedIn">
        <a href="#" @click="logout" class="btn">Logout</a>
      </span>
      <span v-else>
        <router-link to="/login" class="btn">Login</router-link>
      </span>
      <router-link to="signup" class="btn">Registrarse</router-link>
    </div>
    <hr>
    <div>
      <!-- <formulario></formulario>
      <listado></listado>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


export default {
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};

</script>

<style>
</style>
