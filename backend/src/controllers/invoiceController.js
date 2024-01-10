const Invoice = require('../models/Invoice');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice({ ...req.body, company: req.user.company });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all invoices for the user's company
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ company: req.user.company }).populate('customer').populate({ path: 'products.product', model: 'Product' });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, company: req.user.company }).populate('customer').populate({ path: 'products.product', model: 'Product' });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or not part of your company." });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findOneAndUpdate({ _id: req.params.id, company: req.user.company }, req.body, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found or not part of your company." });
    }
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findOneAndDelete({ _id: req.params.id, company: req.user.company });
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found or not part of your company." });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
