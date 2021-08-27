const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const products = new Schema({
    link: String, // ссылка на товар
    name: String, // наименоание
    category: String, // категория товара
    description: String, // описание
    images: [
        {
            src: String, // Путь
            sort: Number, // Сортировка
        },
    ], // мини изображение
    props: [
        {
            name: String, // Характеристика
            value: String, // Значение
            sort: Number, // Сортировка
        },
    ], // мини изображение
    green: String, // зеленый лейбел
    yellow: String, // желтый лейбел
    price: Number, // цена
    addPercent: Number, // наценка в процентах
    discount: Number, // скидка в процентах
    sort: Number, // сортировка
    linkAli: String, // ссылка на алиекспресс
    stars: Number, // количество звезд товара
    available: Number, // 0-3 наличие остатка
    active: Boolean, // наличие
    seoTitle: String, // СЕО название
    seoDescription: String, // СЕО описание
    seoKeywords: String, // СЕО ключевые слова
});

module.exports = mongoose.model('products', products);
