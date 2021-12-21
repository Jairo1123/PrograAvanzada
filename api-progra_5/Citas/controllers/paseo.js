'use-strict';

let mongoose = require('mongoose'),
Paseo = mongoose.model('Paseo');

exports.getPaseoByMascota = (req, res) => {
    console.log(req.params.mascota)
    Paseo.find({ mascota: req.params.mascota }, (err, paseo) => {
        if (err) res.send(err);
        res.json(paseo);
    })
}
exports.createPaseo = (req, res) => {
    let newPaseo = new Paseo(req.body);
    newPaseo.save((err, paseo) => {
        if (err) res.send(err);
        res.json(paseo);
    });
}