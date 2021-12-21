import Joi from 'joi';

const registroSchema = Joi.object( {
    nombre: Joi.string().required().label('Nombre'),
    telefono: Joi.number().required().label('Telefono'),
    contraseña: Joi.string().required().label('Contraseña'),
    correo: Joi.string().required().label('Correo')
});

export default registroSchema;