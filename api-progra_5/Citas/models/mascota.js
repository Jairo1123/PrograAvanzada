'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mascotaSchema = new Schema({
    nombre: {
        type: 'string',
        required: 'Espacio requerido',
    },

    tipo: {
        type: 'string',
        required: 'Espacio requerido',
    },
    raza: { 
        type: 'string', 
        required:'Espacio requerido'
    },
    edad: {
        type: 'Number', 
        required:'Espacio requerido'
    }
});

module.exports = mongoose.model('Mascota', mascotaSchema);