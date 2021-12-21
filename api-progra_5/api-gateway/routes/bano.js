'use strict';

module.exports = (app) => {
   let banoController = require('../../Citas/controllers/bano');

   app.route('/api/v1/bano')
      .post(banoController.createBano)
   app.route('/api/v1/bano/:lugar')
      .get(banoController.getBanoByLugar)
}