const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
  category: String,
  stockQuantity: { type: Number, default: 0 },
  // Additional fields as needed
});

module.exports = mongoose.model('Product', productSchema);
