const productsModel = require('../models/products');
const fs = require('fs');
const path = require('path'); 


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


const createNewProduct = async(req, res) => {
    const {body, file} = req;
    try {
        // Pastikan file gambar telah diunggah
        if (file) {
            body.address = file.filename; // Simpan nama file gambar ke field 'address'
        }

        await productsModel.createNewProduct(body);
        res.status(201).json({
            message: 'CREATE new product success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        })
    }
}


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