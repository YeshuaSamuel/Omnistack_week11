const connection = require('../database/connection');// Conectar o banco de dados


module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
        .where('id', id)//Buscar um id que é o mesmo que o outro. 
        .select('name')//Selecionar o nome da ong
        .first();//Retornar uma única ong.

        if(!ong) {

            return res.status(400).json({ error: 'No ong found with this ID' });

        }
        return res.json(ong);
    }
}