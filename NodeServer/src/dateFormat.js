/******************************************** 
 * Damos formato a la fecha
 * @param array donde está la fecha
 * @returns array con la fecha modificada
*********************************************/

var dateFormat = function(data){
            if(data.length > 0){

                for(var i=0; i<data.length; i++){             
                    entrada = data[i].f_entrada;
                    data[i].f_entrada = entrada.getDate() + "/" + (entrada.getMonth() + 1) + "/" + entrada.getFullYear();
                    salida = data[i].f_salida;
                    data[i].f_salida = salida.getDate() + "/" + (salida.getMonth() + 1) + "/" + salida.getFullYear();
                }
                return data;
            }
            return
        
}
module.exports = dateFormat;