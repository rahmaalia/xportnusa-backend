const productsModel = require('../models/products');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const { uploadFileToGCS } = require('../middleware/multer');
const { deleteFileFromGCS } = require('../middleware/multer');


const createNewProduct = async (req, res) => {
    const { body, file } = req;

    // Validasi field yang diperlukan
    if (!body.name || !body.description || !body.price_range || !body.min_order || !body.order_req || !body.supply_ability || !body.user_id ) {
        return res.status(400).json({
            message: 'Failed to create new product',
            error: 'Semua field harus diisi'
        });
    }

    // Set ID acak dan nilai default untuk order_click dan history_view_product
    const newProduct = {
        id: uuidv4(),
        name: body.name,
        description: body.description,
        price_range: body.price_range,
        min_order: body.min_order,
        order_req: body.order_req,
        supply_ability: body.supply_ability,
        history_view_product: 0,
        user_id: body.user_id,
        order_click: 0,
        image: '' // Default value for image
    };

    try {
        if (file) {
            const publicUrl = await uploadFileToGCS(file); // Unggah ke GCS dan dapatkan URL publik
            newProduct.image = publicUrl; // Simpan URL gambar ke field 'image'
        }

        await productsModel.createNewProduct(newProduct);
        res.status(201).json({
            message: 'CREATE new product success',
            data: newProduct
        });
    } catch (error) {
        console.error('Error creating new product:', error); // Log the error
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        });
    }
};


const getAllProduct = async(req, res) => {
    try {
        const [data] = await productsModel.getAllProduct();
        res.json({
            message: 'GET products success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        })
    }
}

// const getProductById = async (req, res) => {
//     const { idProduct } = req.params;
//     try {
//         const [data] = await productsModel.getProductById(idProduct);

//         if (data.length === 0) {
//             return res.status(404).json({
//                 message: 'Product not found'
//             });
//         }

//         // Increment history_view_product 
//         await productsModel.incrementProductViews(idProduct);

//         res.json({
//             message: 'GET product by ID success',
//             data: data
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'server error',
//             serverMessage: error
//         });
//     }
// };

const getProductById = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const [data] = await productsModel.getProductById(idProduct);

        if (data.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Hitung indeks produk
        const indexedProduct = await productsModel.getIndexedProductById(idProduct);

        // Increment history_view_product 
        await productsModel.incrementProductViews(idProduct);

        res.json({
            message: 'GET product by ID success',
            data: {
                ...indexedProduct,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error.message || error
        });
    }
};

const getRecommendationsAndProducts = async (req, res) => {
    const { product_name } = req.body;

    try {
        // Memanggil endpoint eksternal
        const response = await axios.post('https://recommendation-j3z4zwlm6q-et.a.run.app/recommend/search', {
            product_name
        });

        const recommendedNames = response.data;
        if (!Array.isArray(recommendedNames)) {
            return res.status(500).json({ error: 'Invalid response from external API' });
        }

        // Ambil data produk berdasarkan nama dari database Anda
        const products = await productsModel.getProductsByNames(recommendedNames);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada produk yang ditemukan sesuai dengan rekomendasi',
                data: []
            });
        }

        res.json({
            message: 'GET recommended products success',
            data: products
        });
    } catch (error) {
        console.error("Error executing request to external API:", error);
        
        // Tampilkan respons error dari endpoint eksternal
        if (error.response) {
            return res.status(error.response.status).json({ 
                message: error.message,
                data: error.response.data 
            });
        } else {
            return res.status(500).json({ 
                message: 'Internal server error',
                serverMessage: error.message 
            });
        }
    }
};

const getRecommendationsbyItem = async (req, res) => {
    const { item_id } = req.body;

    // Validasi bahwa item_id adalah integer
    if (!Number.isInteger(Number(item_id))) {
        return res.status(400).json({ error: 'item_id harus berupa integer' });
    }

    try {
        console.log('Mengirim permintaan ke endpoint eksternal dengan item_id:', item_id);

        // Memanggil endpoint eksternal
        const response = await axios.post('https://recommendation-j3z4zwlm6q-et.a.run.app/recommend/content', {
            item_id: Number(item_id)  // Pastikan item_id adalah integer
        });

        const recommendedNames = response.data;
        if (!Array.isArray(recommendedNames)) {
            return res.status(500).json({ error: 'Invalid response from external API' });
        }

        // Ambil data produk berdasarkan nama dari database Anda
        const products = await productsModel.getProductsByNames(recommendedNames);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'Tidak ada produk yang ditemukan sesuai dengan rekomendasi',
                data: []
            });
        }

        res.json({
            message: 'GET recommended products success',
            data: products
        });
    } catch (error) {
        console.error("Error executing request to external API:", error);

        // Tampilkan respons error dari endpoint eksternal
        if (error.response) {
            return res.status(error.response.status).json({
                message: error.message,
                data: error.response.data
            });
        } else {
            return res.status(500).json({
                message: 'Internal server error',
                serverMessage: error.message
            });
        }
    }
};

const updateOrderReq = async (req, res) => {
    const { idProduct } = req.params;
    try {
        await productsModel.incrementOrderReq(idProduct);
        res.json({
            message: 'Order request incremented successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        });
    }
};

const updateProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { body, file } = req;
    try {
        if (file) {
            const publicUrl = await uploadFileToGCS(file); // Unggah ke GCS dan dapatkan URL publik
            body.image = publicUrl;
        }

        await productsModel.updateProduct(body, idProduct);
        res.json({
            message: 'UPDATE product success',
            data: {
                id: idProduct,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message || error,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
        // Dapatkan data produk berdasarkan ID
        const [product] = await productsModel.getProductById(idProduct);
        if (product && product.length > 0) {
            const imageFileName = path.basename(product[0].image); // Ambil nama file gambar dari URL
            console.log(`Attempting to delete image: ${imageFileName}`);

            try {
                await deleteFileFromGCS(imageFileName); // Hapus gambar dari GCS
                console.log(`File ${imageFileName} deleted from GCS`);
            } catch (error) {
                console.error(`Error removing file from GCS: ${error}`);
                return res.status(500).json({
                    message: 'Error deleting image from GCS',
                    serverMessage: error.message
                });
            }

            await productsModel.deleteProduct(idProduct);
            res.json({
                message: 'DELETE product success',
                data: null
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

const searchProducts = async (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required" });
    }
    try {
        const results = await productsModel.searchProducts(searchTerm);
        res.json({
            message: 'SEARCH user success',
            data: results
        });
    } catch (error) {
        console.error("Error executing search query:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    updateOrderReq,
    searchProducts,
    getRecommendationsAndProducts,
    getRecommendationsbyItem
}