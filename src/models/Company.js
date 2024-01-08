const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: String,
  contactInfo: {
    email: String,
    phone: String,
  },
  logo: String, // Field for storing the logo path
  superUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Company', companySchema);
