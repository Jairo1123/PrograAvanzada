import { Button, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../Styles/App.css'


import registroSchema from '../../validator/registroSchema';
import clientAxios from '../config/axios';

const Registro = () => {

    const [cliente, setCliente] = useState({ nombre: '', teléfono: '', contraseña: '', correo: '' });
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
        setCliente({ ...cliente, [fieldName]: fieldValue });
    }

    const validateSchema = (nameField, valueField) => {
        const fieldToValidate = { [nameField]: valueField }
        const schemaToValidate = { [nameField]: registroSchema[nameField] };
        const { error } = registroSchema.validate(fieldToValidate, schemaToValidate);
        return error ? error.details[0].message : null;
    }
    const saveCitas = async () => {
        try {
            const headers = { 'Content-Type': 'application/json' }
            const clienteCreated = await clientAxios.post('/cliente', cliente, headers)
            console.log(clienteCreated);
        } catch (err) {
            console.log("Hay un error");
        }
    }

    const handleSumit = async e => {
        e.preventDefault();
        saveCitas();        
        console.log('Aqui');
        
        return(            
        alert("usuario creado"),
        window.location.href = "/")
    }



    return (
            <div className="myDiv">
                <h1>Crear Usuario</h1>
                <form onSubmit={handleSumit}>
                    <FormControl>
                        Ingrese los siguientes datos<br></br><br></br>
                        <TextField className="nom" name="nombre" label="Nombre de Usuario" onChange={handleChange} required></TextField><br></br>
                        <TextField className="tel" name="teléfono" label="Teléfono" onChange={handleChange} required ></TextField><br></br>
                        <TextField className="pass" name="contraseña" label="Contraseña" onChange={handleChange} required ></TextField><br></br>
                        <TextField className="cor" name="correo" label="Correo Electronico" onChange={handleChange} required ></TextField><br></br>
                        </FormControl><br></br>
                        <Button onClick={handleSumit} disabled={hasError}>Registrar</Button><br></br>
                        <Button variant="outlined" href="/">Atras</Button>
                </form>
            </div>
    )
}
export default Registro;