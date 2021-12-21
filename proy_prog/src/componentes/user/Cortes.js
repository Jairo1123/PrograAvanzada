import '../../Styles/App.css'
import {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import clientAxios from '../config/axios';
import cortesSchema from '../../validator/cortesSchema'

const Cortes =() => {
  const [cortes, setCortes] = useState({lugar: '', tamano: '', hora: '', dia: ''});
  const [error, setError] = useState({});
  const [hasError, setHasError] = useState(true)

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
    setCortes({ ...cortes, [fieldName]: fieldValue });
  }

  const validateSchema = (nameField, valueField) => {
    const fieldToValidate = { [nameField]: valueField }
    const schemaToValidate = { [nameField]: cortesSchema[nameField] };
    const { error } = cortesSchema.validate(fieldToValidate, schemaToValidate);
    return error ? error.details[0].message : null;
  }
  const saveCitas = async () => {
    try {
      const headers = { 'Content-Type': 'application/json' }
      const cortesCreated = await clientAxios.post('corte', cortes, headers)
      console.log(cortesCreated);
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
      <h1>Corte</h1>
      Seleccione sus preferencias para realizar el servicio
      <br></br><br></br>
      <form onSubmit={handleSumit}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel name="lugar">Lugar</InputLabel>
        <Select name="lugar" value={cortes.lugar} label="Lugar"
          onChange={handleChange}>
          <MenuItem value="Casa">En Casa</MenuItem>
          <MenuItem value="Local">En Local</MenuItem>
        </Select>
        <FormHelperText>Lugar donde desea el Servicio</FormHelperText>
      </FormControl><br></br>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel name="tamano">Pelo</InputLabel>
        <Select name="tamano" value={cortes.tamano}  label="Pelo"
          onChange={handleChange}>
          <MenuItem value="Corto">Corto</MenuItem>
          <MenuItem value="Largo">Largo</MenuItem>
        </Select>
        <FormHelperText>Tipo de Pelaje</FormHelperText>
      </FormControl><br></br>
      <TextField  name="hora" label="Hora" onChange={handleChange} required /><br></br><br></br>
      <TextField name="dia" label="Dia" onChange={handleChange} required /><br></br><br></br>
      <Button disabled={hasError} onClick={handleSumit}>Crear Cita</Button><br></br>
      <Button href="/Inicio" value="Atras">Atras</Button>
      </form>
      </div>
  );
}
export default Cortes


