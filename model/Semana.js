const mongoos = require('mongoose');
const semanasSchemas = new mongoos.Schema({
    monto: Number,
    fechaInicioSemana: Date,
    fechaFinalSemana: Date,
    cantHorasTrabajadas: Number
});

const Semanas = new mongoos.model('Semanas', semanasSchemas);
module.exports= Semanas;