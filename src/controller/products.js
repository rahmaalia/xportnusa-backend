const productsModel = require('../models/products');
const fs = require('fs');
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const { uploadFileToGCS } = require('../middleware/multer');


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

const getProductById = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const [data] = await productsModel.getProductById(idProduct);
        res.json({
            message: 'GET product by ID success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        });
    }
};


const createNewProduct = async (req, res) => {
    const { body, file } = req;

    // Validasi field yang diperlukan
    if (!body.name || !body.description || !body.price_range || !body.min_order || !body.order_req || !body.supply_ability || !body.user_id ) {
        return res.status(400).json({
            message: 'Gagal membuat produk baru',
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


const updateProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { body, file } = req;
    try {
        if (file) {
            body.address = file.filename;

            // Hapus file gambar lama jika ada
            const [user] = await productsModel.getProductById(idProduct);
            if (user && user.length > 0 && user[0].address) {
                const oldFilePath = path.join(__dirname, '../../public/images', user[0].address);
                try {
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    } else {
                        console.log(`File ${oldFilePath} not found`);
                    }
                } catch (unlinkError) {
                    console.error(`Error removing old file: ${unlinkError}`);
                }
            }
        }

        await productsModel.updateProduct(body, idProduct);
        res.json({
            message: 'UPDATE user success',
            data: {
                id: idProduct,
                ...body
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        });
    }
};


const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
        // Dapatkan data pengguna berdasarkan ID
        const [user] = await productsModel.getProductById(idProduct);
        if (user && user.length > 0 && user[0].address) {
            const oldFilePath = path.join(__dirname, '../../public/images', user[0].address); // Sesuaikan path
            try {
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                } else {
                    console.log(`File ${oldFilePath} not found`);
                }
            } catch (unlinkError) {
                console.error(`Error removing old file: ${unlinkError}`);
            }
        }

        await productsModel.deleteProduct(idProduct);
        res.json({
            message: 'DELETE user success',
            data: null
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getAllProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductById
}