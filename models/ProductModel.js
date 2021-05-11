const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  _name: String,
  _descrip: String,
  _avail: Boolean,
  _price: Number,
});

let Model = mongoose.model("ProductModel", Schema);
module.exports = Model;
