const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate, requireSuperUser } = require('../middleware/authMiddleware');

router.post('/', authenticate, requireSuperUser, customerController.createCustomer);
router.get('/', authenticate, requireSuperUser, customerController.getAllCustomers);
router.get('/search', authenticate, requireSuperUser, customerController.searchCustomers);
router.get('/:id', authenticate, requireSuperUser, customerController.getCustomerById);
router.put('/:id', authenticate, requireSuperUser, customerController.updateCustomer);
router.delete('/:id', authenticate, requireSuperUser, customerController.deleteCustomer);

module.exports = router;
