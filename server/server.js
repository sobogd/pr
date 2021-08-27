const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const connectDB = require('./services/db');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const slidesRoutes = require('./routes/slides');
const { port } = require('./config');

try {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.static('images'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use(cors());
    app.use(express.json());
    app.listen(port, () => {
        connectDB(true);
        categoriesRoutes(app);
        productsRoutes(app);
        slidesRoutes(app);
    });
} catch (error) {
    console.log(error);
}
