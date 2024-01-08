const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// ... other routes ...

router.post('/login', authController.login);

module.exports = router;
