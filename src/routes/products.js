const express = require('express');
const upload = require('../middleware/multer.js');

const ProductsController = require('../controller/products.js');

const router = express.Router();

//CREATE PRODUCT -post
router.post('/', upload.single('address'), ProductsController.createNewProduct);

// READ PRODUCT - get
router.get('/', ProductsController.getAllUsers);

// GET PRODUCT BY ID - get
router.get('/:idProduct', ProductsController.getProductById);

// UPDATE PRODUCT - patch
router.patch('/:idProduct', upload.single('address'), ProductsController.updateProduct);

// DELETE PRODUCT - delete
router.delete('/:idProduct', ProductsController.deleteProduct);

module.exports = router;