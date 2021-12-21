'use-strict';

let mongoose = require('mongoose'),
    Corte = mongoose.model('Corte');

exports.createCorte = (req, res) => {
    let newCorte = new Corte(req.body);
    newCorte.save((err, corte) => {
        if (err) res.send(err);
        res.json(corte);
    });
}
exports.getCorteByLugar = (req, res) => {
    console.log(req.params.lugar)
    Corte.find({ lugar: req.params.lugar }, (err, corte) => {
        if (err) res.send(err);
        res.json(corte);
    })
}
