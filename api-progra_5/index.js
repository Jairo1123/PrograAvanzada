const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose');
Cliente = require('./Citas/models/cliente');
mascota = require('./Citas/models/mascota');
paseo = require('./Citas/models/paseo');
bano = require('./Citas/models/bano');
corte = require('./Citas/models/corte')

const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/proyecto');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

let clienteRoutes = require('./api-gateway/routes/cliente');
clienteRoutes(app);

let mascotaRoutes = require('./api-gateway/routes/mascota');
mascotaRoutes(app);


let paseoRoutes = require('./api-gateway/routes/paseo');
paseoRoutes(app);

let banoRoutes = require('./api-gateway/routes/bano');
banoRoutes(app);

let corteRoutes = require('./api-gateway/routes/corte');
corteRoutes(app);

app.post('/api/v1/login', async (req, res) => {
	const cliente = await Cliente.findOne({
		correo: req.body.correo,
	})

	if (!cliente) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPassValida = await bcrypt.compare(
		req.body.contraseña,
		cliente.contraseña
	)

	if (isPassValida) {
		const token = jwt.sign(
			{
				correo: cliente.correo,
			},
			'secret123'
		)

		return res.json({ status: 'ok', cliente: token })
	} else {
		return res.json({ status: 'error', cliente: false })
	}
})

app.listen(port)

console.log('La API esta corriendo en el puerto: ' + port);
