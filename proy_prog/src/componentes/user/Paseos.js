
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import clientAxios from '../config/axios';
import paseosSchema from '../../validator/paseosSchema'
import { Button } from '@mui/material';

const Paseos = () => {

    const [paseos, setPaseos] = useState({ direccion: '', hora: '', mascota: '', fecha: '' });
    const [error, setError] = useState({});
    const [hasError, setHasError] = useState(true);


    const handleChange = e => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const errorForm = { ...error };
        const errorMessage = validateSchema(fieldName, fieldValue);
        if (errorMessage) {
            errorForm[fieldName] = errorMessage;
            setError({ [fieldName]: errorForm[fieldName] });
            setHasError(true);
        } else delete errorForm[fieldName];
        setError(errorForm);
        setHasError(false);
        setPaseos({ ...paseos, [fieldName]: fieldValue });
    }

    const validateSchema = (nameField, valueField) => {
        const fieldToValidate = { [nameField]: valueField }
        const schemaToValidate = { [nameField]: paseosSchema[nameField] };
        const { error } = paseosSchema.validate(fieldToValidate, schemaToValidate);
        return error ? error.details[0].message : null;
    }
    const saveCitas = async () => {
        try {
            const headers = { 'Content-Type': 'application/json' }
            const paseosCreated = await clientAxios.post('paseo', paseos, headers)
            console.log(paseosCreated);
        } catch (err) {
            console.log("Hay un error");
        }
    }

    const handleSumit = async e => {
        e.preventDefault();
        saveCitas();
        console.log('Aqui');
    }

    return (
        <form onSubmit={handleSumit}>
            <div>
                <h1>Paseos</h1>
                Seleccione sus preferencias para realizar el servicio
            </div>
            <br></br>
            <TextField name="direccion" label="Barrio" onChange={handleChange} required/><br></br><br></br>
            <TextField name="hora" label="Hora" onChange={handleChange} required/><br></br><br></br>
            <TextField name="mascota" label="Nombre de Mascota" onChange={handleChange} required/><br></br><br></br>
            <TextField name="fecha" label="Fecha" onChange={handleChange} required/><br></br><br></br>
            <Button disabled={hasError} onClick={handleSumit}>Crear Cita</Button><br></br>
            <Button href="/Inicio" value="Atras">Atras</Button>

        </form>
    )
}

export default Paseos
