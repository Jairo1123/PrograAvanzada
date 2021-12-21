'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paseoSchema = new Schema({
    direccion: {
        type: 'string',
        required: 'Espacio requerido',
    },
    hora: { 
        type: 'string', 
        required:'Espacio requerido'
    },
    mascota: {
        type: 'string', 
        required:'Espacio requerido'
    },
    fecha: {
        type: 'string', 
        required:'Espacio requerido'
    }
});

module.exports = mongoose.model('Paseo', paseoSchema);