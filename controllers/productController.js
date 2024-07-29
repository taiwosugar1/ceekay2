const multer = require('multer');
const path = require('path');
const Product = require('../models/ProductModel');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Name the file with a timestamp and original name
  },
});

const upload = multer({ storage });

// Create a new product
exports.createProduct = [
  upload.single('image'), // Middleware to handle single file upload
  async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    try {
      const newProduct = new Product({
        name,
        description,
        price,
        imageUrl,
      });

      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product by ID
exports.updateProduct = [
  upload.single('image'), // Middleware to handle single file upload if an image is updated
  async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.imageUrl = imageUrl || product.imageUrl;

      await product.save();
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
