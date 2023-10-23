const fs = require('fs');
const model = require('../model/product');
const mongoose = require('mongoose');
const Product = model.Product;

// Create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Read: Get all products 
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read: Get a single product by ID
exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update: Replace a product by ID
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true });
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Update: Update a product by ID
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete: Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};