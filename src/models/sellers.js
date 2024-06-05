const pool = require('../config/database');

const createNewSeller = (body) => {
    const SQLQuery = `INSERT into user_seller (id, username, office_address, website, email, factory_address, whatsapp)
                        VALUES ('${body.id}', '${body.username}', '${body.office_address}', '${body.website}', '${body.email}', '${body.factory_address}', '${body.whatsapp}')`;
    
    return pool.execute(SQLQuery);
}

module.exports = {createNewSeller}