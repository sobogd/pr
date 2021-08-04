const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const products = new Schema({
  _id: ObjectId, // идентификатор
  link: String, // ссылка на товар
  name: String, // наименоание
  category: String, // категория товара
  description: String, // описание
  mini: Number, // мини изображение
  green: String, // зеленый лейбел
  yellow: String, // желтый лейбел
  price: Number, // цена
  discount: Number, // скидка в процентах
  sort: Number, // сортировка
  linkAli: String, // ссылка на алиекспресс
  stars: Number, // количество звезд товара
  available: Boolean, // наличие
});

module.exports = mongoose.model("products", products);
