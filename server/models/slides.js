const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const slides = new Schema({
    name: String, // заголовок
    link: String, // ссылка
    description: String, // описание
    sort: Number, // сортировка
    active: Boolean, // активность
    image1: String, // фоновое изображение
    image2: String, // фоновое изображение
});

module.exports = mongoose.model('slides', slides);
