const moment = require('moment')

var fecha = "01/01/2019";
let partes = /^(\d{2})[/](\d{2})[/](\d{4})$/.exec(fecha);
console.log(partes);
if (partes) {
      fecha = fecha.split("/");
      var dia = fecha[0];
      console.log('Dia: ', dia);
      var mes = fecha[1];
      console.log('Mes: ', mes);
      var anio = fecha[2];
      console.log('Año: ', anio);
      fecha = (anio + "-" + mes + "-" + dia);
      fecha = new Date(fecha);
      console.log('Fecha: ', fecha);
} else {
      console.log('Fecha incorrecta');
}