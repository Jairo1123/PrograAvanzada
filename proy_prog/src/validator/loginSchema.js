import Joi from 'joi';

const loginSchema = Joi.object( {
    nombre: Joi.string().required().label('Nombre'),
    cedula: Joi.string().required().label('Contraseña')
});

export default loginSchema;