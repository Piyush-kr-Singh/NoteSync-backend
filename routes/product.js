const express = require('express');
const productController = require('../controller/product');

const router = express.Router();

router
  .post('/', productController.createProduct)
  .get('/', productController.getAllProducts)
  .get('/:title', productController.getProduct)
  .put('/:title', productController.replaceProduct)
  .patch('/:title', productController.updateProduct)
  .delete('/:title', productController.deleteProduct);

exports.router = router;
