import Vue from 'vue';
import VueUp from 'vueup';
import VueRouter from 'vue-router';
import {routes} from './routes';
import App from './App.vue';

Vue.use(VueUp);

Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
