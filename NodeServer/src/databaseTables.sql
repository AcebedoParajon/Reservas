CREATE TABLE diasreserva(
      id INT(11) NOT NULL,
      nombre VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      telefono VARCHAR(13) NOT NULL,
      f_entrada DATE,
      f_salida DATE,
      personas INT(3),
      temporada VARCHAR(10),
      precio INT(10),
      PRIMARY KEY (id)
);

CREATE TABLE users(
      id INT(11) NOT NULL,
      nombre VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      admin BOOLEAN,
      PRIMARY KEY(id)
);

CREATE TABLE temporada(
      id INT(11) NOT NULL,
      alta INT(3) NOT NULL,
      media INT(3) NOT NULL,
      baja INT(3) NOT NULL,
      PRIMARY KEY(id)
);