import mysql from 'mysql';
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'reservas',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
connection.end();