const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const images = new Schema({
  _id: ObjectId, // идентификатор
  link: String, // ссылка на изображение
  sort: String, // сортировка
  product: String, // продукт или отзыв к которому привязано изображение
});

module.exports = mongoose.model("images", images);
