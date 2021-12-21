import React from 'react'

import alimento from '../../Styles/img/alimento.jpeg';

import '../../Styles/App.css'
import Cookies from 'universal-cookie';

const inicio = () => {
  //console.log('nombre' + Cookies.get('nombre'));
  return (
    <div>
    <div>
      <h1>Inicio</h1>
    </div><br /><br /> 
    
    <div className="row">
    <div className="logo">      
      <img src={alimento} border="5px solid black" width="400" height="300" />
      <img src={alimento} margin="10px" border="5px solid black" width="400" height="300" /><br />
      <img src={alimento} border="5px solid black" width="400" height="300" />
      <img src={alimento} border="5px solid black" width="400" height="300" />
    </div>
  </div>
  </div>
  )
}

export default inicio
