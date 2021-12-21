'use-strict';
let { OAuth2Client } = require('google-auth-library')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let mongoose = require('mongoose'),
   Cliente = mongoose.model('Cliente');

const client = new OAuth2Client('38199729549-ruenftt5i8se42ed7urt8i0um1da105t.apps.googleusercontent.com')
exports.createCliente = (req, res) => {
   let newCliente = new Cliente(req.body);
   newCliente.save((err, cliente) => {
      if (err) res.send(err);
      res.json(cliente);
   });
}
exports.getClienteByNombre = (req, res) => {
   console.log(req.params.nombre)
   Cliente.find({ nombre: req.params.nombre }, (err, cliente) => {
      if (err) res.send(err);
      res.json(cliente);
   })
}

exports.postgooglelogin = (req, res) => {
   const { tokenId } = req.body;
   client.verifyIdToken({ idToken: tokenId, audience: "38199729549-ruenftt5i8se42ed7urt8i0um1da105t.apps.googleusercontent.com" }).then(response => {
      const { email_verfied, nombre, correo } = response.payload;
      if (correo_verfied) {
         Cliente.findOne({ correo }).exec((err, cliente) => {
            if (err) {
               return res.status(400).json({
                  error: "El usuario no existe, antes debes registrarte!"
               })
            }else{
               if(cliente) {
                  const token = jwt.sign(
                     {
                        nombre: cliente.nombre,
                        correo: cliente.correo
                     },
                  )
            
                  return res.json({ status: 'ok', cliente: token })
               }else{
                  return res.json({ status: 'error', cliente: false })

               }
            }
         })
      }
   })
}

