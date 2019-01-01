import Formulario from './components/Formulario.vue'
import Listado from './components/Listado.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Forbidden from './components/forbidden.vue'

export const routes = [
    { path: '*', redirect: '/login' },
    { path: '/', name: 'Formulario', component: Formulario,
        meta:{
            requiresAuth: true
        } },
    { path: '/listado', name: 'Listado', component: Listado,
        meta: {
        requiresAuth: true
      } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/forbidden', name: 'Forbidden', component: Forbidden }
]