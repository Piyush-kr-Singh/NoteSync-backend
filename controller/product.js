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

// Read: Get a single product by title
exports.getProduct = async (req, res) => {
  const title = req.params.title; // Change id to title
  try {
    const product = await Product.findOne({ title: title }); // Find by title
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update: Replace a product by title
exports.replaceProduct = async (req, res) => {
  const title = req.params.title; // Change id to title
  try {
    const doc = await Product.findOneAndReplace({ title: title }, req.body, { new: true }); // Find by title
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Update: Update a product by title
exports.updateProduct = async (req, res) => {
  const title = req.params.title; // Change id to title
  try {
    const doc = await Product.findOneAndUpdate({ title: title }, req.body, { new: true }); // Find by title
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete: Delete a product by title
exports.deleteProduct = async (req, res) => {
  const title = req.params.title; // Change id to title
  try {
    const doc = await Product.findOneAndDelete({ title: title }); // Find by title
    if (!doc) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};