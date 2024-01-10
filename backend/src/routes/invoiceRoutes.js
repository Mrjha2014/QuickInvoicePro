const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new invoice
router.post('/', authenticate, invoiceController.createInvoice);

// Get all invoices for the user's company
router.get('/', authenticate, invoiceController.getAllInvoices);

// Get a single invoice by ID
router.get('/:id', authenticate, invoiceController.getInvoiceById);

// Update an invoice
router.put('/:id', authenticate, invoiceController.updateInvoice);

// Delete an invoice
router.delete('/:id', authenticate, invoiceController.deleteInvoice);

module.exports = router;
