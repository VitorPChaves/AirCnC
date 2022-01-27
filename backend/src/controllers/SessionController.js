// index(retorna uma lista de sessões), show(uma única sessão), store(cria sessão), update(atualiza sessão), destroy

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });
        
        //creates a new user in case there is no user with the given email
        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};