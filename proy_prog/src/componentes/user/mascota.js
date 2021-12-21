import React, { Fragment, useState } from 'react';
import '../../Styles/App.css'


import mascotaSchema from '../../validator/mascotaSchema';
import clientAxios from '../config/axios';

const Mascota = () => {

    const [mascota, setMascota] = useState({ nombre: '', tipo: '', raza: '', edad: '' });
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
        setMascota({ ...mascota, [fieldName]: fieldValue });
    }

    const validateSchema = (nameField, valueField) => {
        const fieldToValidate = { [nameField]: valueField }
        const schemaToValidate = { [nameField]: mascotaSchema[nameField] };
        const { error } = mascotaSchema.validate(fieldToValidate, schemaToValidate);
        return error ? error.details[0].message : null;
    }

    const saveCitas = async () => {
        try {
            const headers = { 'Content-Type': 'application/json' }
            const mascotaCreated = await clientAxios.post('/mascota', mascota, headers)
            console.log(mascotaCreated);
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
        <Fragment>
            <div className="myDiv">
                <h1>Añadir mascota</h1>
                <form onSubmit={handleSumit} >
                <label for="lname">Nombre:</label>
                    <input type="text" className="nom" name="nombre" onChange={handleChange} required /><br></br>
                    <label for="lname">Tipo:</label>
                    <input type="text" className="tipo" name="tipo" onChange={handleChange} required /><br></br>
                    <label for="lname">Raza:</label>
                    <input type="text" className="raza" name="raza" onChange={handleChange} required /><br></br>
                    <label for="lname">Edad:</label>
                    <input type="text" className="edad" name="edad" onChange={handleChange} required /><br></br>
                    <button disabled={hasError}>Guardar</button>
                    <a href="/inicio">
                        <input type="button" value="Confirmar" />
                    </a>
                </form>
            </div>
        </Fragment>
    )
}
export default Mascota;