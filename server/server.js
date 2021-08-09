const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const { port } = require('./config');

try {
    app.use(express.static('images'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use(cors());
    app.use(express.json());
    app.listen(port, () => {
        categoriesRoutes(app);
        productsRoutes(app);
    });
} catch (error) {
    console.log(error);
}
