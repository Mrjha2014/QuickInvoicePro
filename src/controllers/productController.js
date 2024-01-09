const Product = require("../models/Product");

// Create a new product for the user's company
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      company: req.user.companyID,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products for the user's company
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ company: req.user.companyID });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID, ensure it belongs to the user's company
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      company: req.user.companyID,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not part of your company" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product, ensure it belongs to the user's company
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, company: req.user.companyID },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not part of your company" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product, ensure it belongs to the user's company
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      company: req.user.companyID,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found or not part of your company" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search products by name, category, and SKU
exports.searchProducts = async (req, res) => {
  try {
    const { name, category, sku } = req.query;
    let query = { company: req.user.companyID };

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    if (sku) {
      query.sku = { $regex: sku, $options: "i" }
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
