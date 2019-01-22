import Api from '../services/Api'

/***************************************
 * Retorna los datos que impriminos    *
 * (o envía en el caso de POST)        *
 * en la página creada por el servidor *
 * de Node                             *
 * @return http://localhost:8081/posts *
 ***************************************/
export default {
  listarReservas () {
    return Api().get('posts')
  },

  addReservas (params) {
    return Api().post('posts', params)
  },

  compruebaReservas (params){
    return Api().post('posts/compruebareserva', params)
  },

  fetchError(){
    return Api().post('posts/error', params)
  },

  addUser(params){
    return Api().post('posts/signup', params)
  },

  login(params){
    return Api().post('posts/login', params)
  },

  eliminaReserva(params){
    return Api().post('posts/eliminaReserva', params)
  },

  editarReserva(params){
    return Api().post('posts/editarReserva', params)
  },

  updateReservas(params){
    return Api().post('posts/updateReserva', params)
  },

  buscaReserva(params){
    return Api().post('posts/buscarReserva', params)
  },

  getPrecios() {
    return Api().get('posts/getPrecios')
  },

  modificaPrecios(params) {
    return Api().post('posts/modificaPrecios', params)
  },

  getUsuarios() {
    return Api().get('posts/getUsuarios')
  },

  eliminaUsuario(params){
    return Api().post('posts/eliminarUsuario', params)
  },

  getUsuario(params){
    return Api().post('posts/getUsuario', params)
  },

  updateUser(params){
    return Api().post('posts/updateUser', params)
  }
}