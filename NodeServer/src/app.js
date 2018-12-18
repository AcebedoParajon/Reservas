const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
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


app.post('/posts', (req, res) => {
   var db = req.db;
   var nombre = req.body.nombre;
   var email = req.body.email;
   var telefono = req.body.telefono;
   var f_entrada = req.body.f_entrada;
   var f_salida = req.body.f_salida;
   var personas = req.body.personas;

   // TODO comprobar que las reservas no está ocupadas.
   
   // Según documentación node-mysql es la forma segura de enviar datos
   // https://github.com/mysqljs/mysql#preparing-queries
   var sql = 'INSERT INTO diasreserva(nombre, email, telefono, f_entrada, f_salida, personas) VALUES(?, ?, ?, ?, ?, ?)';
   var inserts = [nombre, email, telefono, f_entrada, f_salida, personas];
   sql = mysql.format(sql, inserts);
   var query = connection.query(sql, function(error, result){
      if(error){
        console.log('Error! No se pudieron insertar los datos.');
      }else{
         res.send({
            success: true,
            message: 'Reserva enviada correctamente, en breve recivirá una confirmación.'
         });
      }
    }
   );
 })

app.listen(process.env.PORT || 8081)