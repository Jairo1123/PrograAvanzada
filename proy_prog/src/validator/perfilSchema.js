import Joi from 'joi';

const loginSchema = Joi.object( {
    nombre: Joi.string().required().label('Nombre'),
    teléfono: Joi.string().required().label('Teléfono'),
    correo: Joi.string().required().label('Correo'),
    cedula: Joi.string().required().label('Contraseña')
    
    
});

export default loginSchema;