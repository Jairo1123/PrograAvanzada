'use-strict';

let mongoose = require('mongoose'),
    Bano = mongoose.model('Baño');

exports.createBano = (req, res) => {
    let newBano = new Bano(req.body);
    newBano.save((err, bano) => {
        if (err) res.send(err);
        res.json(bano);
    });
}
exports.getBanoByLugar = (req, res) => {
    console.log(req.params.lugar)
    Bano.find({ lugar: req.params.lugar }, (err, bano) => {
        if (err) res.send(err);
        res.json(bano);
    })
}
