import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import '../../Styles/App.css'
import clientAxios from '../config/axios';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';


export default function Login() {

    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:5000/api/v1/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo,
                contraseña,
            }),
        })

        const data = await response.json()

        if (data.cliente) {
            localStorage.setItem('token', data.cliente)
            alert('Login successful')
            //console.log(data)
            window.location.href = "./Inicio";
        } else {
            alert('Algo salio mal, reintente nuevamente!')
        }
    }

    const responseSuccessGoogle = (response) => {
        console.log(response)
        clientAxios({
            method: "POST",
            url: 'http://localhost:5000/api/v1/googlelogin',
            data: {tokenId: response.tokenId}
        }).then(response => {
            console.log(response);
        })
    }

    const responseErrorGoogle = (response) => {

    }

    const paperStyle = { padding: 20, height: '70vh', width: 290, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <form onSubmit={loginUser}>
            <div className='login'>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}></Avatar>
                            <h2>Iniciar Sesión</h2><br />
                        </Grid>
                        <TextField value={correo}
                            onChange={(e) => setCorreo(e.target.value)} label='Correo' placeholder='Ingrese correo' fullWidth /><br /><br />
                        <TextField value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)} label='Contraseña' placeholder='Ingrese contraseña' type='password' fullWidth /><br /><br />
                        <Button onSubmit={loginUser} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Iniciar Sesión</Button>

                        <Typography > ¿Necesitas una cuenta?
                            <Link href="/Registro" >
                                Registrarse
                            </Link>
                        </Typography><br />
                        <GoogleLogin
                        className='googlelogin'
                        clientId="38199729549-ruenftt5i8se42ed7urt8i0um1da105t.apps.googleusercontent.com"
                        buttonText="Login con google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />,
                    </Paper>
                    
                </Grid>
            </div>

        </form>
    )

}


