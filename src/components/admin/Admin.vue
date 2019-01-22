<template>
<div class="container">
      <h5>Ventana de administrador</h5>
      <router-link to="admin/reservas" class="btn">Reservas</router-link>
      <router-link to="admin/precios" class="btn">Precios</router-link>
      <router-link to="admin/usuarios" class="btn">Usuarios</router-link>
      <router-view></router-view>
</div>
</template>

<script>
export default {
      
}
</script>

