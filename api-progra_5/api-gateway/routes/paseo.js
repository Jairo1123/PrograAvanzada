'use strict';
module.exports = (app) => {
   let paseoController = require('../../Citas/controllers/paseo');

   app.route('/api/v1/paseo')
      .post(paseoController.createPaseo)
   app.route('/api/v1/paseo/:mascota')
      .get(paseoController.getPaseoByMascota)
}