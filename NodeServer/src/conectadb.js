const mysql = require('mysql');
const { promisify } = require('util');
const { MYSQL_PARAMS } = require('./config');

const pool = mysql.createPool(MYSQL_PARAMS);


pool.getConnection( (error, connection) => {
      if (error){
            if (error.code === 'PROTOCOL_CONNECTION_LOST'){
                  console.error('Conexión con la base de datos cerrada');
            }
            if (error.code === 'ER_CON_COUNT_ERROR'){
                  console.error('Demasiadas conexiones en la base de datos');
            }
            if (error.code === 'CONNREFUSED'){
                  console.error('Conexión con la base de datos rechazada');
            }
      }
      if (connection) connection.release();
      console.log('Conexión con la DB establecida');
      return;
});
pool.query = promisify(pool.query);
module.exports = pool;