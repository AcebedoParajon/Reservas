import Api from '../services/Api'

/***************************************
 * Retorna los datos que impriminos    *
 * (o envía en el caso de POST)        *
 * en la página creada por el servidor *
 * de Node                             *
 * @return http://localhost:8081/posts *
 ***************************************/
export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addReservas (params) {
    return Api().post('posts', params)
  },

  compruebaReservas (params){
    return Api().post('posts/compruebareserva', params)
  },

  fetchError(){
    return Api().post('posts/error',params)
  }
}