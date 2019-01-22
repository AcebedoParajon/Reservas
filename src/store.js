import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    admin: localStorage.getItem('admin') || 0,
    user: {}
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
      state.admin = localStorage.getItem('admin')
      state.user = localStorage.getItem('user')
    },
    auth_error(state) {
      state.status = 'error'
    },
    init_app(state){
      state.token = localStorage.getItem('token')
      state.user = localStorage.getItem('user')
      state.admin = localStorage.getItem('admin')
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.admin = 0
    },
  },

  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8081/posts/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const admin = resp.data.user.admin
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('admin', admin)
            localStorage.setItem('user', user.nombre)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            reject(err)
          })
      })
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8081/posts/signup', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },

    initApp({ commit }) {
      return new Promise((resolve, reject) => {
        commit('init_app')
        resolve()
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.admin,
    authStatus: state => state.status,
  }
})