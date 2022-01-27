const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        //busca os parametros da rota
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        //checa se há conexão em tempo real do dono do spot com o cliente e envia a solicitação de reserva
        //(essa parte foi feita na aplicação web/como não fiz a parte web, apenas testei com insomnia)
        const ownerSocket = req.connectedUsers[booking.spot.user];
        if(ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};