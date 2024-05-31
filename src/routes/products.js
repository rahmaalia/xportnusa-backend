const express = require('express');
// const upload = require('../middleware/multer.js');
const { upload } = require('../middleware/multer');

const ProductsController = require('../controller/products.js');

const router = express.Router();

//CREATE PRODUCT -post
router.post('/', upload.single('image'), ProductsController.createNewProduct);

// READ PRODUCT - get
router.get('/', ProductsController.getAllProduct);

// GET PRODUCT BY ID - get
router.get('/:idProduct', ProductsController.getProductById);

// UPDATE PRODUCT - patch
router.patch('/:idProduct', upload.single('image'), ProductsController.updateProduct);

// DELETE PRODUCT - delete
router.delete('/:idProduct', ProductsController.deleteProduct);

module.exports = router;