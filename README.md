# reservas

> Proyecto reservas con VueJs, Express, NodeJs y Mysql.<br>
> Un MEVN PERO CON Mysql en lugar de Mongodb.<br>
> Formulario para realizar reserva de fechas y su comprobación y envío a la base de datos.<br>
> La aplicación primero comprueba que todos los campos a enviar son correctos y, de ser así, después comprueba que las fechas no están ya reservadas. En el caso de que todo sea correcto guarda los datos en la base de datos.<br>
> En la base de datos tenemos tres tablas:<br>
> - `diasreserva`, donde guardamos todos los datos de la reserva.
> - `temporada`, donde guardamos los precios de las temporadas alta, media y baja.
> - `users`, donde guardamos los usuarios de la aplicación.<br>
>
> La aplicación también comprueba la temporada de la reserva, suponiendo que aquí, en el norte, la temporada alta es del 15 de julio al 15 de septiembre, navidades y Semana Santa; la temporada media es mayo, junio y hasta el 15 de julio; el resto temporada baja. Dependiendo de la temporada calcula el precio por los dias de estancia.<br>
>
> Trabajamos con:<br>
> - Expresiones regulares para comprobar la valided de los campos.
> - En VueJs con single components, estilos css dinámicos, bucles v-for para listar las reservas, axios.
> - Con file system (fs) para la apertura y escritura de ficheros (logError.json) para mostrar mensajes al usuario.
> - Separamos la ventana que da avisos al usuario en un componente aparte ya que cuando la aplicación crezca será usado en otros componentes.
>     - Para cerrar esta ventana utilizamos la emisión de eventos personalizados con `this.$emit('cerrarMensaje')` y así poder comunicarnos de componente hijo a componente padre.
>     - En el componente hijo, el botón de cerrar quedaría así:
>     - - `<a @click="cerrarAviso" class="la clase que quieras">Cerrar</a>` para lanzar la función `cerrarAviso` que es dónde está `this.$emit`
>     - En el componente padre incluimos el hijo así:
>     - - `<mensaje @cerrarMensaje="aviso = false" v-show="aviso" :propiedad="contenido" :otraPropiedad="cabecera"></mensaje>`
>     - Así al pinchar en el botón de cerrar emite el evento `cerrarMensaje` que cambia el valor de la variable `aviso` que es la mantiene la ventana abierta o cerrada.
> - Incluyo registro de usuarios con token, si el usuario no se registra o loguea no podrá acceder a las vistas del formulario ni del listado de reservas. Para el cual nos servimos de Vuex, localStorage y `jwt-simple`. Las rutas las protegemos con `router.beforeEach`.
> - También se incluye encriptado de la contraseña con `bcrypt`.



## Build Setup

``` bash
# Mysql
Crear base de datos
Arrancar mysql con Xampp Wamp o el que quieras

# instalar dependencias en reservas
npm install

# servidor con hot reload para desarrollo en localhost:8080
npm run dev

# construir para producción
npm run build
```

## Crear servidor de Node

``` bash
# Ir al directorio /NodeServer arranca servidor en localhost:8081
npm install
npm run start
```

### En producción en servidor fuera de localhost

 - Cambiar en el archivo Api.js el parámetro baseURL<br>
 - Se está usando Vue en modo desarrollo, cambiar Vue a [modo producción](https://vuejs.org/v2/guide/deployment.html)<br>
 <br>

Gracias a [Aneeta Sharma](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0)