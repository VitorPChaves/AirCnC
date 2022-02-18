const Spot = require('../models/Spot');

module.exports = {
    //mostra a lista de spots do usuario logado
    async show(req, res) {
        const { user_id } = req.headers;
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}