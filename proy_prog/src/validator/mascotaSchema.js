import Joi from 'joi';

const loginSchema = Joi.object( {
    nombre: Joi.string().required().label('Nombre'),
    tipo: Joi.string().required().label('tipo'),
    raza: Joi.string().required().label('raza'),
    edad: Joi.string().required().label('edad')
    
    
});

export default loginSchema;