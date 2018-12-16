import Api from '../services/Api'

/***************************************
 * Retorna los datos que impriminos    *
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
  }
}