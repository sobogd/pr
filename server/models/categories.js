const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categories = new Schema({
    name: String, // название
    parent: String, // родительская категория
    link: String, // ссылка
    description: String, // описание
    sort: Number, // сортировка
    active: Boolean, // активность
    image: String, // изображение
});

module.exports = mongoose.model('categories', categories);
