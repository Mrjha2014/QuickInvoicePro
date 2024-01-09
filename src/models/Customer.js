const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactDetails: {
    email: { type: String, required: true, unique: true },
    phone: String,
    address: {
      shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
      billingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    },
  },
  paymentMethod: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

module.exports = mongoose.model("Customer", customerSchema);
