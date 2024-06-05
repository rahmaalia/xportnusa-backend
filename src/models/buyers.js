const pool = require('../config/database');

const createNewBuyer = (body) => {
    const SQLQuery = `INSERT into user_buyer (id, username, address, email, premium)
                        VALUES ('${body.id}', '${body.username}', '${body.address}', '${body.email}', '${body.premium}')`;
    
    return pool.execute(SQLQuery);
}

module.exports = {createNewBuyer}