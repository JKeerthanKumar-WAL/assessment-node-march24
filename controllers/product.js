const { body, validationResult } = require("express-validator");
const product = require("../models/product");
const getProducts = (req, res) => {
  product.find((err, products_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(products_list);
    }
  });
};
const createProduct = [
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { name, inStore, upload_date, sizes } = req.body;
      let productObject = new product({ name, inStore, upload_date, sizes });
      productObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: "Adding product successfully" });
        }
      });
    }
  },
];
module.exports = { getProducts, createProduct };
