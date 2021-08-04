const express = require('express');
const app = express();

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');

try {
    app.use(express.json());
    app.listen('3001', () => {
        categoriesRoutes(app);
        productsRoutes(app);
    }); 
} catch (error) {
    console.log(error);
}

 