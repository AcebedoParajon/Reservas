var pascua = function (annio) {
      var M = 0;
      var dia = 0;
      var mes = 0;
      if (annio > 1900 && annio < 2099) { M = 24; N = 5; }
      else if (annio > 2100 && annio < 2199) { M = 24; N = 6; }
      else if (annio > 2200 && annio < 2299) { M = 25; N = 0; }
      var a = annio % 19;
      var b = annio % 4;
      var c = annio % 7;
      var d = ((19 * a) + M) % 30;
      var e = ((2 * b) + (4 * c) + (6 * d) + N) % 7;
      var f = d + e;
      if (f < 10) {
            dia = f + 22;
            mes = 3;
      } else {
            dia = f - 9;
            mes = 4;
      };
      if (dia == 26 && mes == 4) {
            dia = 19;
      };
      if (dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10) {
            dia = 18;
      };
      var domingo_pascua = annio.toString()+'/'+mes.toString()+'/'+(dia + 1).toString();
      domingo_pascua = new Date(domingo_pascua);
      var lunes_pascua = annio.toString()+'/'+mes.toString()+'/'+(dia - 6).toString();
      lunes_pascua = new Date(lunes_pascua);
      var pascua = {lunes_pascua, domingo_pascua};
      return pascua;
}
module.exports = pascua;