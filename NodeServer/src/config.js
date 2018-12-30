module.exports = {
      TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
      MYSQL_PARAMS: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'reservas',
            port: 3306
      }
};