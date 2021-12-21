'use strict';

module.exports = (app) => {
   let citaController = require('../../Citas/controllers/cliente');

   app.route('/api/v1/cliente')
      .post(citaController.createCliente)
   app.route('/api/v1/cliente/:nombre')
      .get(citaController.getClienteByNombre)

   //app.route('/api/v1/login')
   //   .post(citaController.postlogincliente)

   app.route('/api/v1/googlelogin')
      .post(citaController.postgooglelogin)

}
