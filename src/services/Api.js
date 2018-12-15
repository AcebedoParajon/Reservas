import axios from 'axios'

/*************************************
 * Crea una nueva instancia de axios *
 * que apunta a la url del servidor  *
 * que creamos en node
 * @return new axios instance        *
 ************************************/
export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}