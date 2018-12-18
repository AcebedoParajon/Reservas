import Formulario from './components/Formulario.vue'
import Listado from './components/Listado.vue'

export const routes = [
    {path:'/', name:'Formulario', component: Formulario},
    {path:'/api', name:'Listado', component: Listado}
]