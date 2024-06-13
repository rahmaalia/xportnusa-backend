const pool = require('../config/database');



const getAllProduct = () => {
    const query = 'SELECT * FROM product';
    return pool.execute(query);
}

const getProductById = (idProduct) => {
    const query = 'SELECT * FROM product WHERE id = ?';
    return pool.execute(query, [idProduct]);
};

const getIndexedProductById = async (idProduct) => {
    const query = 'SELECT id, name, description, price_range, min_order, order_req, supply_ability, history_view_product, user_id, order_click, image, (SELECT COUNT(*) FROM product p WHERE p.id < ?) AS `item_id` FROM product WHERE id = ?';
    const [rows] = await pool.execute(query, [idProduct, idProduct]);
    const indexedProduct = rows[0];
    if (indexedProduct) {
        indexedProduct.item_id = indexedProduct.item_id || 0; 
    }
    return indexedProduct;
};

const getProductsByNames = async (productNames) => {
    const placeholders = productNames.map(() => '?').join(', ');
    const query = `SELECT * FROM product WHERE name IN (${placeholders})`;
    const [rows] = await pool.execute(query, productNames);
    return rows;
};

const createNewProduct = (body) => {
    const SQLQuery = `INSERT INTO product (id, name, description, price_range, min_order, order_req, supply_ability, history_view_product, user_id, order_click, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return pool.execute(SQLQuery, [
        body.id,
        body.name,
        body.description,
        body.price_range,
        body.min_order,
        body.order_req,
        body.supply_ability,
        body.history_view_product,
        body.user_id,
        body.order_click,
        body.image
    ]);
};

const updateProduct = (body, idProduct) => {
    // Bangun query dinamis
    const fields = [];
    const values = [];

    for (let key in body) {
        if (body[key] !== undefined) {
            fields.push(`${key} = ?`);
            values.push(body[key]);
        }
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const SQLQuery = `UPDATE product SET ${fields.join(', ')} WHERE id = ?`;
    values.push(idProduct);

    return pool.execute(SQLQuery, values);
};

const deleteProduct = (id) => {
    const query = 'DELETE FROM product WHERE id = ?';
    return pool.execute(query, [id]);
}

const incrementProductViews = (idProduct) => {
    const query = `
        UPDATE product 
        SET history_view_product = history_view_product + 1, order_click = order_click + 1 
        WHERE id = ?
    `;
    return pool.execute(query, [idProduct]);
};

const incrementOrderReq = (idProduct) => {
    const query = `
        UPDATE product 
        SET order_req = order_req + 1 
        WHERE id = ?
    `;
    return pool.execute(query, [idProduct]);
};

const searchProducts = (searchTerm) => {
    const query = `
        SELECT * FROM product
        WHERE name LIKE ? OR description LIKE ? OR price_range LIKE ?
    `;
    const searchValue = `%${searchTerm}%`;
    return pool.execute(query, [searchValue, searchValue, searchValue])
        .then(([results]) => results)
        .catch(error => {
            console.error('Error executing search query:', error);
            throw error;
        });
};

module.exports = {
    getAllProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    incrementProductViews,
    incrementOrderReq,
    searchProducts,
    getIndexedProductById,
    getProductsByNames
}