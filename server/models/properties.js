const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const properties = new Schema({
  _id: ObjectId, // идентификатор
  name: String, // название
  image: String, // изображение
  product: String, // товар к которому привязано свойство
  value: String, // значение
});

module.exports = mongoose.model("properties", properties);
