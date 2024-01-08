const express = require('express');
const userController = require('../controllers/userController');
const { requireSuperUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-user', requireSuperUser, userController.addUserBySuperuser);

module.exports = router;
