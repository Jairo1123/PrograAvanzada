'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var saltRounds = 5;

var clienteSchema = new Schema({
    nombre: {
        type: 'string',
        required: 'Espacio requerido',
    },

    teléfono: {
        type: 'Number',
        required: 'Ingrese un numero valido',
    },
    contraseña: { 
        type: 'string', 
        required:'Espacio requerido'
    },
    correo: {
        type: 'string', 
        required:'Espacio requerido',
        unique: true
    }
},
{ collection: 'clientes' }
);

clienteSchema.pre('save', function(next){
    if(this.isNew || this.isModified('contraseña')){
        const document = this;
        bcrypt.hash(document.contraseña, saltRounds, (err, hashedContraseña) => {
            if(err){
                next(err);
            }else{
                document.contraseña = hashedContraseña;
                next();
            }
        });
    }else{
        next();
    }
});

clienteSchema.methods.isCorrectContraseña = function(contraseña, callback){
    bcrypt.compare(contraseña, this.contraseña, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('Cliente', clienteSchema);