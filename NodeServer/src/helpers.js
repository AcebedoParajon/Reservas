const bcrypt = require('bcryptjs')
const fs = require('fs')

const helpers = {}

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;

};

helpers.matchPassword = async (password, savePassword) => {
    return await bcrypt.compare(password, savePassword);
};

helpers.writeMessage = async (data) => {
    const path = '../src/services/logError.json';
    fs.open(path, 'w', function (err, fd) {
        if (err) {
            throw 'No se puede abrir el archivo ' + path + err;
        }

        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) throw err;
            fs.close(fd, function () {
                console.log('wrote the file successfully');
                return;
            });
        });
    });
    return;
}

helpers.dateFormat = function (data) {
    if (data.length > 0) {

        for (var i = 0; i < data.length; i++) {
            entrada = data[i].f_entrada;
            data[i].f_entrada = entrada.getDate() + "/" + (entrada.getMonth() + 1) + "/" + entrada.getFullYear();
            salida = data[i].f_salida;
            data[i].f_salida = salida.getDate() + "/" + (salida.getMonth() + 1) + "/" + salida.getFullYear();
        }
        return data;
    }
    return

}
module.exports = helpers