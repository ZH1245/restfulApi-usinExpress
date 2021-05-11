const express = require("express");
// const ExpressApp = express();
var router = express.Router();
const CreateProduct = require("./createProduct");
let products = require("../../models/ProductModel");
let newProduct = CreateProduct(
  "Dell Laptop",
  "DELL Inspiron 3542 i7 6th generation",
  true,
  130000
);
let newProduct2 = CreateProduct(
  "Dell Laptop",
  "DELL Inspiron 3842 i5 8th generation",
  true,
  145500
);
let newProduct3 = CreateProduct(
  "Dell Laptop",
  "DELL Inspiron 5402 i5 11th generation",
  true,
  170500
);
let newProduct4 = CreateProduct(
  "HP Laptop",
  "HP Omen i5 11th generation",
  true,
  2020500
);

router.get("/", async (req, resp) => {
  await products.find({}, (error, results) => {
    if (error) {
      return resp.status(404).send("Product not found");
    } else {
      if (results.length) return resp.send(results);
      else return resp.status(404).send("Product not found");
    }
  });
  //   console.log(products.find());
  //   if (product != []) {

  //   } else return resp.status(404).send("Not Found");
});

router.get("/:id", async (req, resp) => {
  let product = await products.findById(req.params.id);
  if (product) {
    return resp.send(product);
  } else resp.status(404).send("Not Found");
});

router.post("/", async (req, resp) => {
  let { _name, _descrip, _avail, _price } = req.body;
  let product = await CreateProduct(_name, _descrip, _avail, _price);
  return resp.send(await products.find({}));
});

router.put("/:id", async (req, resp) => {
  let product = await products.findById(req.params.id);
  product._name = req.body._name;
  product._descrip = req.body._descrip;
  product._avail = req.body._avail;
  product._price = req.body._price;
  await product.save();
  return resp.send(product);
});
router.delete("/:id", async (req, res) => {
  let product = products.findById(req.params.id, (error, results) => {
    if (error) {
      return res.status(404).send("NOT FOUND TO DELETE");
    } else {
      if (results != null) {
        products.findByIdAndDelete(req.params.id, (err, result) => {
          if (err) {
            return res.status(404).send("BAD Request");
          } else {
            return res.send("Deleted");
          }
        });
      } else {
        return res.status(402).send("Not Found");
      }
    }
  });
  //   res.send(`DELETE BY +${req.params.id}`);
});
module.exports = router;
