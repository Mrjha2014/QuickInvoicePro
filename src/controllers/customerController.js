const Customer = require("../models/Customer");

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only admins can create customers." });
    }
    console.log(JSON.stringify(req.body, null, 2));
    const newCustomer = new Customer({
      ...req.body,
      company: req.user.companyID,
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all customers for the admin's company
exports.getAllCustomers = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only admins can access customer data." });
    }

    const customers = await Customer.find({ company: req.user.companyID });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      company: req.user.companyID,
    });
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not part of your company." });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only admins can update customer data." });
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id, company: req.user.companyID },
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not part of your company." });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only admins can delete customer data." });
    }

    const deletedCustomer = await Customer.findOneAndDelete({
      _id: req.params.id,
      company: req.user.companyID,
    });
    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ message: "Customer not found or not part of your company." });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search customers by name, email, and phone
exports.searchCustomers = async (req, res) => {
  try {
    const { name, email, phone } = req.query;
    let query = { company: req.user.companyID };

    if (name) {
      query["name"] = { $regex: name, $options: "i" };
    }
    if (email) {
      query["contactDetails.email"] = { $regex: email, $options: "i" };
    }
    if (phone) {
      query["contactDetails.phone"] = { $regex: phone, $options: "i" };
    }

    const customers = await Customer.find(query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
