// let Model = require("../../models/ProductModel");
let Model = require("../../models/ProductModel");

async function CreateProduct(name, descipt, available, price) {
  let product = Model();
  product._name = name;
  product._descrip = descipt;
  product._avail = available;
  product._price = price;
  await product.save();
}

module.exports = CreateProduct;
