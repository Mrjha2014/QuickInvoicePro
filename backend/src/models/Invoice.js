const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    }
  ],
  issueDate: { type: Date, default: Date.now },
  dueDate: Date,
  totalAmount: Number,
  status: String, // e.g., paid, unpaid, pending
  // Additional fields as needed
});

module.exports = mongoose.model('Invoice', invoiceSchema);
