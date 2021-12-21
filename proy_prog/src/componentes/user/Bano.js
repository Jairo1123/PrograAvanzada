import '../../Styles/App.css'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import clientAxios from '../config/axios';
import banoSchema from '../../validator/banoSchema'
import { Button } from '@mui/material';

const Bano = () => {

  const [bano, setBano] = useState({ lugar: '', tamano: '', hora: '', dia: '' });
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
    setBano({ ...bano, [fieldName]: fieldValue });
  }

  const validateSchema = (nameField, valueField) => {
    const fieldToValidate = { [nameField]: valueField }
    const schemaToValidate = { [nameField]: banoSchema[nameField] };
    const { error } = banoSchema.validate(fieldToValidate, schemaToValidate);
    return error ? error.details[0].message : null;
  }
  const saveCitas = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' }
      const banoCreated = await clientAxios.post('bano', bano, headers)
      console.log(banoCreated);
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
    <div>
      <h1>Baños</h1>
      Seleccione sus preferencias para realizar el servicio
      <br></br><br></br>
      <form onSubmit={handleSumit}>
      <FormControl>
        <InputLabel name="lugar">Lugar</InputLabel>
        <Select name="lugar" value={bano.lugar} label="lugar" onChange={handleChange}>
          <MenuItem value="Casa">Casa</MenuItem>
          <MenuItem value="Local">Local</MenuItem>
        </Select>
        <FormHelperText>Lugar de Servicio</FormHelperText>
      </FormControl><br></br>

      <FormControl>
        <InputLabel name="tamano" >Pelo</InputLabel>
        <Select name="tamano" value={bano.tamano} label="tamano" onChange={handleChange}        >
          <MenuItem value="Corto">Corto: $10</MenuItem>
          <MenuItem value="Largo">Largo: $16</MenuItem>
        </Select>
        <FormHelperText>Tipo de Pelo</FormHelperText><br></br>
      </FormControl><br></br>

      <TextField name="hora" label="Hora" helperText="Hora del servicio" onChange={handleChange} required /><br></br>
      <TextField name="dia" label="Día" helperText="Día que desea el servicio" onChange={handleChange} required /><br></br><br></br>
      <Button onClick={handleSumit} disabled={hasError} >Crear Cita</Button>
      </form>
    </div>
  );
}

export default Bano

