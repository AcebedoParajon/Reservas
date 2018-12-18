var compruebaCampos = function (datos, error) {
    // Comprobar si todos los campos están llenos
    for (var dato in datos){
        if (datos[dato] == ''){
            this.error = 'Todos los campos son requeridos.';
            return this.error;
        }
    }

    // Comprobar si el nombre está vacío o contiene espacios en blanco
    if (datos[0] == null || datos[0].length == 0 || /^\s+$/.test(datos[0]) ) {
        this.error = 'El campo del nombre está vacío';
        return this.error;
    }

    // Comprobar el email
    if( !(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(datos[1])) ) {
        this.error = 'El formato del correo no es válido'
        return this.error;
    }

    // Comprobar teléfono
    if (!(/^\d{9}$/.test(datos[2])) && !(/^\d{3}-\d{3}-\d{3}$/.test(datos[2])) && !(/^\d{3}\s\d{6}$/.test(datos[2])) && !(/^\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(datos[2])) && !(/^\+\d{2,3}\s\d{9}$/.test(datos[2]))){
        this.error = 'Formato del teléfono no válido';
        return this.error;
    }

    // Comprobar fechas (no pueden ser menores a la actual ni la de entrada mayor que la de salida)
    var entrada = new Date(datos[3]);
    var salida = new Date(datos[4]);
    var fecha_actual = new Date();
    if (entrada > salida){
        this.error = 'La fecha de entrada no puede ser mayor que la fecha de salida.'
        return this.error;
    } else if (entrada < fecha_actual || salida < fecha_actual){
        this.error = 'Las fechas no pueden ser menores a la fecha actual.';
        return this.error;
    }else if (entrada.getTime() === salida.getTime()){
        this.error = 'Las fechas no pueden ser iguales.'
        return this.error;
    }

    // Comprobar que las fechas no están en la base de datos lo hacemos antes de insertalas


    // Comprobar el número de personas (no puede se igual o menor que cero ni mayor de 6 personas)
    if (parseInt(datos[5]) <= 0 || parseInt(datos[6]) > 6){
        this.error = 'Las personas no pueden ser cero o menos ni más de seis';
        return this.error;
    }
    this.error = false;
    return this.error;
    
}
module.exports = compruebaCampos;