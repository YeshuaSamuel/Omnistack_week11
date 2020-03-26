const express = require('express'); // importar o express

const cors = require("cors");

const routes = require('./routes') //importar as rotas

const app = express();

app.use(cors());

app.use(express.json()); // Reconhecer por formato json

app.use(routes); // usar as rotas

app.listen(3333); // ouvir a porta do servidor

