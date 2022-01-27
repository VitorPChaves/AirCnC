const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        // if (!req.file) {
        //     return res.send('Upload a file!');
        // }
        
        //informações necessárias para criar um novo spot
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User not found!'});
        }

        //cria o spot
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //separa as strings por virgula e remove os espaços
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        return res.json(spot);
    }
};