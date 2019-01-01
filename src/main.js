import Vue from 'vue';
import App from './App.vue';
import VueUp from 'vueup';
import VueRouter from 'vue-router';
import {routes} from './routes';
import store from './store'
import Axios from 'axios';

Vue.use(VueUp);

Vue.use(VueRouter);


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/forbidden')
  } else {
    next()
  }
});

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
