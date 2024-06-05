const sellersModel = require('../models/sellers');

const createNewSeller = async (req, res) => {
    const { body } = req;

    // Periksa apakah semua field yang diperlukan diisi
    if (!body.id || !body.username || !body.office_address || !body.website || !body.email || !body.factory_address || !body.whatsapp) {
        return res.status(400).json({
            message: 'Gagal membuat seller baru',
            error: 'Semua field harus diisi'
        });
    }

    try {
        await sellersModel.createNewSeller(body);
        res.status(201).json({
            message: 'CREATE new seller success',
            data: body
        });
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message
        });
    }
};

module.exports = {createNewSeller}