<template>
  <div class="col m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title center">Formulario de reservas</span>
        <hr>
        <div class="row">
          <form class="col s12 m612">
            <div class="row">
              <div class="input-field col s6">
                <input placeholder="Nombre" id="first_name" type="text">
              </div>
              <div class="input-field col s6">
                <input placeholder="Apellidos" id="last_name" type="text">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Email" id="email" type="email">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Teléfono" id="telefono" type="text">
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Fecha de entrada" id="f_entrada" type="date">
                <label for="f_entrada">Fecha de entrada</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="Fecha de salida" id="f_salida" type="date">
                 <label for="f_salida">Fecha de salida</label>
              </div>
            </div>
            <div class="row">
                <div class="input field col s12">
                    <input placeholder="Número de personas" type="number" id="personas">
                </div>
            </div>
          </form>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-large">Enviar</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
</style>
