/**
 * Comprueba la valided de los campos
 * @param {objeto con los datos a evaluar} datos 
 * @param {*} error 
 * @returns mensaje de error o éxito
 */

var compruebaCampos = function (datos, error) {
    // Comprobar si todos los campos están llenos
    for (var dato in datos){
        if (datos[dato] == ''){
            this.error = 'Todos los campos son requeridos.';
            return this.error;
        }
    }

    if (datos.hasOwnProperty('nombre')) {
        // Comprobar si el nombre está vacío o contiene espacios en blanco
        if (datos.nombre == null || datos.nombre.length == 0 || /^\s+$/.test(datos.nombre) ) {
            this.error = 'El campo del nombre está vacío';
            return this.error;
        }
    }

    if (datos.hasOwnProperty('email')){
        // Comprobar el email
        if( !(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(datos.email)) ) {
            this.error = 'El formato del correo no es válido'
            return this.error;
        }
    }

    if (datos.hasOwnProperty('telefono')){
        // Comprobar teléfono
        // Comprobamos distintas posibilidades del formato
        // 999999999
        // 999 999 999
        // 999 999999
        // 999 99 99 99
        // +34 999999999
        if (!(/^\d{9}$/.test(datos.telefono)) && !(/^\d{3}-\d{3}-\d{3}$/.test(datos.telefono)) && !(/^\d{3}\s\d{6}$/.test(datos.telefono)) && !(/^\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(datos.telefono)) && !(/^\+\d{2,3}\s\d{9}$/.test(datos.telefono))){
            this.error = 'Formato del teléfono no válido';
            return this.error;
        }
    }
    if (datos.hasOwnProperty('f_entrada') && datos.hasOwnProperty('f_salida')){
        // Comprobar fechas (no pueden ser menores a la actual ni la de entrada mayor que la de salida)
        var entrada = new Date(datos.f_entrada);
        var salida = new Date(datos.f_salida);
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
    }

    // Comprobar que las fechas no están en la base de datos lo hacemos antes de insertalas

    if(datos.hasOwnProperty('personas')){
        // Comprobar el número de personas (no puede se igual o menor que cero ni mayor de 6 personas)
        if (parseInt(datos.personas) <= 0 || parseInt(datos.personas) > 6){
            this.error = 'Las personas no pueden ser cero o menos ni más de seis';
            return this.error;
        }
    }
    // Hacemos la comprobación del password, aquí sólo requerimos una longitud mayor de 6 caracteres
    if (datos.hasOwnProperty('password')){
        if (datos.password.length < 6){
            this.error = 'La longitud del password debe de ser mayor de seis caracteres.';
            return this.error;
        }
    }
    this.error = false;
    return this.error;
    
}
module.exports = compruebaCampos;