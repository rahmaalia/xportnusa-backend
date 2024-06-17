require('dotenv').config();
const express = require('express');
const sellersRoutes = require('./routes/sellers');
const productsRoutes = require('./routes/products');
const buyersRoutes = require('./routes/buyers');
const middlewareLogRequest = require('./middleware/logs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // To handle URL-encoded data

app.use(middlewareLogRequest);
// app.use(express.json());

app.use('/assets', express.static('public/images'))

app.use('/products', productsRoutes);
app.use('/sellers', sellersRoutes);
app.use('/buyers', buyersRoutes);

app.get("/", (req, res) => res.send("Welcome to xportnusa API management!"));

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