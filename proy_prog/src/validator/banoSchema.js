import Joi from 'joi';

const banoSchema = Joi.object( {
    lugar: Joi.string().required().label('Lugar'),
    tamano: Joi.string().required().label('Tamaño'),
    hora: Joi.string().required().label('Hora'),
    dia: Joi.string().required().label('Dia')
});

export default banoSchema;