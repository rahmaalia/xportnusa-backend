const buyersModel = require('../models/buyers');

const createNewBuyer = async (req, res) => {
    const { body } = req;

    // Periksa apakah semua field yang diperlukan diisi
    if (!body.id || !body.username || !body.address || !body.email || !body.premium ) {
        return res.status(400).json({
            message: 'Gagal membuat buyer baru',
            error: 'Semua field harus diisi'
        });
    }

    try {
        await buyersModel.createNewBuyer(body);
        res.status(201).json({
            message: 'CREATE new Buyer success',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message
        });
    }
};

module.exports = {createNewBuyer}