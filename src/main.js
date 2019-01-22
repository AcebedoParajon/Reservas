import Vue from 'vue';
import App from './App.vue';
import VueUp from 'vueup';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store'
import Axios from 'axios';

Vue.use(VueUp);

Vue.use(VueRouter);


const router = new VueRouter({
	mode: 'history',
	routes
});

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token');
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (to.matched.some(record => record.meta.requiresAdmin)) {
			if (store.getters.isAdmin === '1' && store.getters.isLoggedIn) {
				next()
				return
			} else {
				next('/forbidden')
				return
			}
		} else {
			if (store.getters.isLoggedIn) {
				next()
				return
			} else {
				next('/forbidden')
				return
			}
		}
	} else {
		next()
	}

});
store.dispatch('initApp').then(() => {
	new Vue({
		el: '#app',
		router,
		store,
		render: h => h(App)
	});
});