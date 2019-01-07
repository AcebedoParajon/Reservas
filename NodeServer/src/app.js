const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
const db = require('./conectadb')
const Token = require('./authService')
const helpers = require('./helpers')

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Rutas de autenticación y login
app.post('/posts/signup', async function (req, res) {
   const newUser = {
      nombre: req.body.nombre,
      password: req.body.password,
      email: req.body.email
   }
   // Primero comprobamos si el usuario ya existe en la base de datos
   var result = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [newUser.email]);
   if (result.length > 0) {
      datosError = { success: true, message: 'El usuario ya está registrado...' };
      helpers.writeMessage(datosError);
      res.status(401).send('Usuario ya está registrado');
   } else {
      newUser.password = await helpers.encryptPassword(newUser.password);
      var result = await db.query('INSERT INTO users SET ?', [newUser]);
      if (result) {
         const user = result;
         var token = await Token.createToken(user);
         var datosError = { success: false, message: 'Usuario registrado' };
         helpers.writeMessage(datosError);
         res.status(200).send({ auth: true, token: token, user: user });
      } else {
         var datosError = { success: true, message: 'Ha ocurrido algún error al registrar el usuario...' };
         helpers.writeMessage(datosError);
         res.status(500).send({ auth: false, token: null });
      }
   }
});

app.post('/posts/login', async function (req, res) {
   var email = req.body.email;
   var password = req.body.password;
   const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
   if (rows.length > 0) {
      const user = rows[0];
      const validpassword = await helpers.matchPassword(password, rows[0].password);
      if (validpassword) {
         var token = await Token.createToken(user);
         var datosError = { success: false, message: 'Credenciales correctas...' };
         res.status(200).send({ auth: true, token: token, user: user });
      } else {
         var datosError = { success: true, message: 'Credenciales incorrectas...' };
         res.status(200).send({ auth: false, token: null });
      }
      helpers.writeMessage(datosError);
      return;
   }
   var datosError = { success: true, message: 'No se ha encontrado ningún usuario' }
   helpers.writeMessage(datosError);
   res.status(404).send({ auth: false, token: null });
   return;
});

// Ejecutada desde Listado para recoger los datos de la base de datos
app.get('/posts', async function (req, res) {
   var data = []

   var query = await db.query('SELECT * FROM diasreserva', function (err, result) {
      if (err) {
         console.log('Error! Conexión mysql ', err);
      } else {
         data = result;
         helpers.dateFormat(data);
         data = JSON.stringify(data);
         res.send(data); // enviamos el json a localhost:8081/posts      
      }
   });
})

// Ejecutada desde Formulario para comprobar si la fecha está reservada
app.post('/posts/compruebareserva', function (req, res) {

   var F_entrada = req.body.f_entrada;
   var F_salida = req.body.f_salida;

   // Comprobar que las reservas no estén ocupadas.
   async function compruebaReservas() {
      db.query('SELECT f_entrada, f_salida FROM diasreserva', await function (err, result) {
         if (err) {
            console.log('Error! Conexión mysql ', err);
            //throw err;   
         } else {
            data = result;
            var fentrada = new Date(F_entrada);
            var fsalida = new Date(F_salida);
            // Si la base de datos no está vacía comprobamos las reservas
            if (data.length > 0) {
               for (let i = 0; i < data.length; i++) {
                  var dbentrada = data[i].f_entrada;
                  var dbsalida = data[i].f_salida;
                  if (fentrada.getTime() <= dbsalida.getTime() && fentrada.getTime() >= dbentrada.getTime() || fsalida.getTime() >= dbentrada.getTime() && fsalida.getTime() <= dbsalida.getTime()) {
                     console.log('Fechas ya reservadas...');
                     datosError = { success: 'Error!!!', message: 'La fecha ya está reservada...' };
                     break;
                  } else {
                     datosError = { success: 'Enviando reserva', message: 'Enviando datos....' }
                  }
               }
            } else {
               datosError = { success: 'Enviando reserva', message: 'Enviando datos....' }
            }
            const path = '../src/services/logError.json';
            helpers.writeMessage(datosError);
            res.send({ success: true });
         }
      });
   }

   compruebaReservas();


})

// Ejecutada desde Formulario para enviar la nueva reserva a la base de datos
app.post('/posts', async function (req, res) {
   var nombre = req.body.nombre;
   var email = req.body.email;
   var telefono = req.body.telefono;
   var f_entrada = req.body.f_entrada;
   var f_salida = req.body.f_salida;
   var personas = req.body.personas;
   var temporada = req.body.temporada;
   var precio = null;

   // Calculamos los dias para saber el precio
   var entrada = new Date(f_entrada);
   var salida = new Date(f_salida);
   var diasDif = salida.getTime() - entrada.getTime();
   var dias = Math.round(diasDif / (1000 * 60 * 60 * 24));

   // Extraemos el precio por temporada de la base de datos
   var query = await db.query('SELECT * FROM temporada', function (err, result) {
      if (err) {
         helpers.writeMessage({ success: 'Error!!!', message: 'No se han encontrado precios' });
         res.send({ success: true });
      } else {

         switch (temporada) {
            case 'ALTA':
               precio = result[0].alta * dias;
               break;
            case 'MEDIA':
               precio = result[0].media * dias;
               break;
            case 'BAJA':
               precio = result[0].baja * dias;
               break;
            default:
               precio = 30;
         }
         console.log('Precio total: ', precio);

         // Según documentación node-mysql es la forma segura de enviar datos
         // https://github.com/mysqljs/mysql#preparing-queries
         var sql = 'INSERT INTO diasreserva(nombre, email, telefono, f_entrada, f_salida, personas, temporada, precio) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
         var inserts = [nombre, email, telefono, f_entrada, f_salida, personas, temporada, precio];
         sql = mysql.format(sql, inserts);
         var query = db.query(sql, function (error, result) {
            if (error) {
               datosError = { success: 'Error!!!', message: 'No se pudieron enviar los datos, inténtelo de nuevo.' }
            } else {
               datosError = { success: 'Exito!!!', message: 'Reserva enviada, en breve recibirá una respuesta.' }
            }
            helpers.writeMessage(datosError);
            res.status(200).send({ sucess: true });
         })
      }
   });

});

app.get('posts/logout', (req, res) => {
   req.logOut();
})

app.listen(process.env.PORT || 8081)