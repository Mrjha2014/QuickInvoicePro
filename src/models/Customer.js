const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactDetails: {
    email: { type: String, required: true, unique: true },
    phone: String,
    address: String,
  },
  paymentMethod: String,
  // Additional fields as needed
});

module.exports = mongoose.model('Customer', customerSchema);
