import Formulario from './components/Formulario.vue'
import Listado from './components/Listado.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Admin from './components/admin/Admin.vue'
import Forbidden from './components/forbidden.vue'
import Adreservas from './components/admin/Adreservas.vue'
import Precios from './components/admin/Precios.vue'
import Usuarios from './components/admin/Usuarios.vue'
import AdminReservas from './components/admin/AdminReservas.vue'
import AdminUsuario from './components/admin/AdminUsuario.vue'

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
    { path: '/admin', name:'Admin', component: Admin,
        meta:{
            requiresAuth: true,
            requiresAdmin: true
        } },
    { path: '/forbidden', name: 'Forbidden', component: Forbidden,
        meta:{
            requiresAuth: false
        } },
    { path:'/admin/reservas', name: 'Adreservas', component: Adreservas,
        meta:{
            requiresAuth: true,
            requiresAdmin: true
        } },
    { path: '/admin/precios', name: 'Precios', component: Precios,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        } },
    { path: '/admin/usuarios', name: 'Usuarios', component: Usuarios,
        meta:{
            requiresAuth: true,
            requiresAdmin: true
        } },
    { path: '/admin/reservas/:id', name: 'AdminReservas', component: AdminReservas,
        meta:{
            requiresAuth: true,
            requiresAdmin: true
        } },
    { path: '/admin/usuario/:id', name: 'AdminUsuario', component: AdminUsuario,
    meta:{
        requiresAuth: true,
        requiresAdmin: true
    } },
]