const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
const fs = require('fs')
const dateFormat = require('./dateFormat')

const app = express()


const mysqlparams= {
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'reservas',
   port: 3306
}

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var connection = mysql.createConnection(mysqlparams);
exports.connection = connection;

var conectar = function() {
   connection.connect(function(err){
      if(err){
         connection.end();
         console.log('Conexión mysql no establecida ',err);
      }else{
         console.log('Conexion mysql correcta.');
      }
   });
}

var datosError = {};

// Ejecutada desde Listado para recoger los datos de la base de datos
app.get('/posts',function (req, res) {
    var data = []
    
    var query = connection.query('SELECT * FROM diasreserva', function(err, result){
        if(err){
            console.log('Error! Conexión mysql ',err);    
         }else{
            data = result;
            dateFormat(data);
            data = JSON.stringify(data);
            res.send(data); // enviamos el json a localhost:8081/posts      
         }
    });
})

// Ejecutada desde Formulario para comprobar si la fecha está reservada
app.post('/posts/compruebareserva', function (req, res) {

   var F_entrada = req.body.f_entrada;
   var F_salida = req.body.f_salida;

   // TODO comprobar que las reservas no está ocupadas.
   async function compruebaReservas(){
      connection.query('SELECT f_entrada, f_salida FROM diasreserva', await function(err, result){
         if(err){
            console.log('Error! Conexión mysql ',err);
            //throw err;   
         }else{
            data = result;
            var fentrada = new Date(F_entrada);
            var fsalida = new Date(F_salida);
            // Si la base de datos no está vacía comprobamos las reservas
            if (data.length > 0){
               for(let i=0; i<data.length; i++){
                  var dbentrada = data[i].f_entrada;
                  var dbsalida = data[i].f_salida;
                  if (fentrada.getTime() <= dbsalida.getTime() && fentrada.getTime() >= dbentrada.getTime() || fsalida.getTime() >= dbentrada.getTime() && fsalida.getTime() <= dbsalida.getTime() ){
                     console.log('Fechas ya reservadas...');
                     datosError = {success:'Error!!!', message:'La fecha ya está reservada...'};
                     break;
                  }else{
                     errorcon = false;
                     datosError = {success: 'Enviando reserva', message: 'Enviando datos....'}
                  }  
               }
            }else{
               datosError = {success: 'Enviando reserva', message: 'Enviando datos....'}
            }
            const path = '../src/services/logError.json';
            fs.open(path, 'w', function(err, fd){
               if (err){
                     throw 'No se puede abrir el archivo '+path+err;
               }
            
               fs.writeFile(path, JSON.stringify(datosError), (err) => {
                  if (err) throw err;
                  fs.close(fd, function() {
                     console.log('wrote the file successfully');
                  });
               });
            });
            res.send({success: true});
         }
      });
   }

   compruebaReservas();

   
})

// Ejecutada desde Formulario para enviar la nueva reserva a la base de datos
app.post('/posts', function(req, res){
   var nombre = req.body.nombre;
   var email = req.body.email;
   var telefono = req.body.telefono;
   var f_entrada = req.body.f_entrada;
   var f_salida = req.body.f_salida;
   var personas = req.body.personas;

   // Según documentación node-mysql es la forma segura de enviar datos
   // https://github.com/mysqljs/mysql#preparing-queries
   var sql = 'INSERT INTO diasreserva(nombre, email, telefono, f_entrada, f_salida, personas) VALUES(?, ?, ?, ?, ?, ?)';
   var inserts = [nombre, email, telefono, f_entrada, f_salida, personas];
   sql = mysql.format(sql, inserts);
   var query = connection.query(sql, function(error, result){
      if(error){
         datosError = {success: 'Error!!!', message: 'No se pudieron enviar los datos, inténtelo de nuevo.'}
      }else{
         //errores = true;
         datosError = {success: 'Exito!!!', message: 'Reserva enviada, en breve recibirá una respuesta.'}
      }
      const path = '../src/services/logError.json';
      fs.open(path, 'w', function(err, fd){
         if (err){
               throw 'No se puede abrir el archivo '+path+err;
         }
      
         fs.writeFile(path, JSON.stringify(datosError), (err) => {
            if (err) throw 'El archivo se ha abierto pero no se pudo escribir...'+err;
            fs.close(fd, function() {
               console.log('Se ha escrito en el archivo con éxito.');
               res.send({success: true});
            });
         });
      });
   })
         
})


app.listen(process.env.PORT || 8081)