const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const reviews = new Schema({
  _id: ObjectId, // идентификатор
  name: String, // имя человека
  text: String, // текст отзыва
  product: String, // идентификатор привязанного продукта
  stars: Number, // оценка
  data: String, // дата
});

module.exports = mongoose.model("reviews", reviews);
