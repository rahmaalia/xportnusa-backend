const express = require('express');
const BuyersController = require('../controller/buyers');
const { upload } = require('../middleware/multer');
const router = express.Router();


//CREATE PRODUCT -post
router.post('/', upload.none(), BuyersController.createNewBuyer);

module.exports = router;