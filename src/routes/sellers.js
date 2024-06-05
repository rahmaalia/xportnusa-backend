const express = require('express');
const SellersController = require('../controller/sellers');
const { upload } = require('../middleware/multer');
const router = express.Router();


//CREATE PRODUCT -post
router.post('/', upload.none(), SellersController.createNewSeller);

module.exports = router;