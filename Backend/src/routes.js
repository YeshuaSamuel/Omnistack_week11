
const express = require('express');

//
const crypto = require('crypto');

//
const connection = require('./database/connection');

//
const routes = express.Router();


routes.get('/ongs', (req, res) =>{
    const ongs =  connection('ongs').select('*')

    return res.json(ongs)
})

routes.post('/ongs', (req, res)=> {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX') 

    connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return res.json({ id });

});

module.exports = routes;