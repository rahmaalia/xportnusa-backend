require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/products');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');
const bodyParser = require('body-parser');
const multer = require('multer');


const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle URL-encoded data
const uploade = multer(); // Initialize multer

app.use(middlewareLogRequest);
// app.use(express.json());

app.use('/assets', express.static('public/images'))

app.use('/users', usersRoutes);
app.post('/upload',upload.single('address'),(req, res) => {
    res.json({
        message: 'Upload berhasil'
    })
})

// error handling
app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

    // untuk mengecek database sudah connect atau belum
    // pool.execute('SELECT * from users', (err, rows) => {
    //     if(err){
    //         res.json({
    //             message: 'connection failed'
    //         })
    //     }
    //     res.json({
    //         message: 'connection success',
    //         data: rows,
    //     })

    // })

app.listen(port, () => {
    console.log(`xportnusa app listening on port ${port}`)
})