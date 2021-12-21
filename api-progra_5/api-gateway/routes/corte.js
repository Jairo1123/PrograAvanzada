'use strict';

module.exports = (app) => {
   let corteController = require('../../Citas/controllers/corte');

   app.route('/api/v1/corte')
      .post(corteController.createCorte)
   app.route('/api/v1/corte/:lugar')
      .get(corteController.getCorteByLugar)
}