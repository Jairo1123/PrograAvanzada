'use strict';



module.exports = (app) => {
   let mascotaController = require('../../Citas/controllers/mascota');

   app.route('/api/v1/mascota')
      .post(mascotaController.createMascota)
   app.route('/api/v1/mascota/:nombre')
      .get(mascotaController.getMascotaByNombre)
}