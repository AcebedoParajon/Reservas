import Formulario from './components/Formulario.vue'
import Listado from './components/Listado.vue'

export const routes = [
    {path:'/', component: Formulario},
    {path:'/api', component: Listado}
]