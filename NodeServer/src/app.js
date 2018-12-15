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
            console.log('Datos enviados....');       
            
         }
    });
})

app.listen(process.env.PORT || 8081)