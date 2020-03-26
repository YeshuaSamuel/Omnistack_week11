const express = require('express'); //importar o express

const OngController = require('./controller/OngController') // Importar o Controlador das Ongs

const IncidentController = require('./controller/IncidentController') // Importar o Controlador das Ongs

const ProfileController = require('./controller/ProfileController')

const SessionController = require('./controller/SessionController')

const routes = express.Router(); // desacoplar as rotas do express para a var routes



routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create );

routes.post('/sessions', SessionController.create)

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes; //Exportar as rotas