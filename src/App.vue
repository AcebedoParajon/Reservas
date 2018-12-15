<template>
  <div class="container">
    <h1 class="center-align">Reservas</h1>
    <router-link to='/' class="btn">Acceder al formulario de reservas</router-link>
    <router-link to='api' class="btn">Acceder al listado de reservas</router-link>
    <hr>
      <div class="row">
        <!-- <formulario></formulario>
        <listado></listado> -->
        
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import formulario from '../src/components/Formulario.vue'
import listado from '../src/components/Listado.vue'
export default {
  components:{formulario, listado},
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
