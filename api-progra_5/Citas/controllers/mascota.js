'use-strict';

let mongoose = require('mongoose'),
Mascota = mongoose.model('Mascota');

   exports.createMascota = (req, res) => {
        let newMascota = new Mascota(req.body);
        newMascota.save( (err, mascota) => {
            if (err) res.send(err);
            res.json(mascota);
        });
    }
    exports.getMascotaByNombre = (req, res) => {
        console.log(req.params.nombre) 
        Mascota.find({ nombre: req.params.nombre}, (err, mascota) => {
            if (err) res.send(err);
            res.json(mascota);
        })
    }