const pool = require('../config/database');



const getAllProduct = () => {
    const query = 'SELECT * FROM product';
    return pool.execute(query);
}

const getProductById = (idProduct) => {
    const query = 'SELECT * FROM product WHERE id = ?';
    return pool.execute(query, [idProduct]);
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

const updateProduct = (body, id) => {
    const { name, description, price_range, min_order, order_req, supply_ability, history_view_product, user_id, orderClick, image } = body;
    const query = `
        UPDATE products SET name = ?, description = ?, price_range = ?, min_order = ?, order_req = ?, supply_ability = ?, history_view_product = ?, user_id = ?, order_click = ?, image = ?
        WHERE id = ?
    `;
    return pool.execute(query, [name, description, price_range, min_order, order_req, supply_ability, history_view_product, user_id, orderClick, image, id]);
};

const deleteProduct = (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    return pool.execute(query, [id]);
}

module.exports = {
    getAllProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductById
}