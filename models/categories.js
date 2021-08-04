const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const {ObjectId} = Schema;
const categories = new Schema({
    _id: ObjectId, // идентификатор
    name: String, // название
    parent: String, // родительская категория
    link: String, // ссылка
    description: String, // описание
    sort: Number, // сортировка
    active: Boolean, // активность
    image: String, // изображение
});

module.exports = mongoose.model('categories', categories);