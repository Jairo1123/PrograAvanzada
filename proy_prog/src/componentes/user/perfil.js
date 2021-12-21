import { Button, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../Styles/App.css'


import perfilSchema from '../../validator/perfilSchema';
//import clientAxios from '../config/axios';

const Perfil = () => {

    const [cliente, setCliente] = useState({ nombre: '', teléfono: '', correo: '', contraseña: '' });
    const [error, setError] = useState({});
    // const [hasError, setHasError] = useState(true);

    const handleChange = e => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const errorForm = { ...error };
        const errorMessage = validateSchema(fieldName, fieldValue);
        if (errorMessage) {
            errorForm[fieldName] = errorMessage;
            setError({ [fieldName]: errorForm[fieldName] });
            //        setHasError(true);
        } else delete errorForm[fieldName];
        setError(errorForm);
        //    setHasError(false);
        setCliente({ ...cliente, [fieldName]: fieldValue });
    }

    const validateSchema = (nameField, valueField) => {
        const fieldToValidate = { [nameField]: valueField }
        const schemaToValidate = { [nameField]: perfilSchema[nameField] };
        const { error } = perfilSchema.validate(fieldToValidate, schemaToValidate);
        return error ? error.details[0].message : null;
    }


    return (
            <div className="myDiv">
                <h1>Configurar perfil</h1>
                <form >
                    <FormControl>
                        Ingrese los siguientes datos<br></br><br></br>
                        <TextField className="nom" name="nombre" placeholder="Nombre de Usuario" onChange={handleChange} required ></TextField><br></br>
                        <TextField className="pass" name="teléfono" placeholder="Teléfono" onChange={handleChange} required ></TextField><br></br>
                        <TextField className="cor" name="correo" placeholder="Correo Electronico" onChange={handleChange} required ></TextField><br></br>
                        <TextField className="cor" name="contraseña" placeholder="Contraseña" onChange={handleChange} required ></TextField><br></br>
                        <br></br>
                        <Button href="/Inicio" value="Atras">Atras</Button>
                    </FormControl>
                </form>
            </div>
    )
}
export default Perfil;