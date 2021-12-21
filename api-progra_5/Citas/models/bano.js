'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var banoSchema = new Schema({
    lugar: {
        type: 'string',
        required: 'Espacio requerido',
    },
    tamano: {
        type: 'string',
        required: 'Espacio requerido',
    },
    hora: { 
        type: 'string', 
        required:'Espacio requerido'
    },
    dia: {
        type: 'string', 
        required:'Espacio requerido'
    }
});

module.exports = mongoose.model('Baño', banoSchema);