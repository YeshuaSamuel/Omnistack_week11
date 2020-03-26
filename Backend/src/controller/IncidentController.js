const connection = require('../database/connection');// Conectar o banco de dados

module.exports = {
    async index(req, res) {

        const { page = 1 } = req.query; // acesso ao banco de dados na variável

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')// relacionar dados de duas tabelas
            .limit(5)// limite de casos para mostrar
            .offset((page - 1 ) * 5 )
            .select(['incidents.*',
             'ongs.name', 
             'ongs.email',  // selecionar tudo da tabela incidents
             'ongs.whatsapp',   
              'ongs.city',
              'ongs.uf']);              

        res.header('X-Total-Count', count['count(*)'])// mostrar quantos casos foram feitos )// dar um nome para um cabeçalho

        return res.json(incidents);
    },

    async create(req, res)  {
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({ 
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization; // buscar o id da ong

        const incident = await connection('incidents')
        .where('id',id) // buscar um id onde os dois sao os mesmos
        .select('ong_id')// selecionar apenas a coluna ong_id
        .first();// retornar apenas um resultado

        if(incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.'});// retornar status do http não autorizado 
        };

        await connection('incidents').where('id',id).delete();

        return res.status(204).send();
    }

};