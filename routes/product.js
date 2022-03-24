var express = require("express");
var router = express.Router();
var productController = require("../controllers/product");
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
module.exports = router;
