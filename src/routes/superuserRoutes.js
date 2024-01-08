const express = require('express');
const { requireSuperUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/superuser-only', requireSuperUser, (req, res) => {
  res.json({ message: 'Welcome Superuser! This route is only for you.' });
});

module.exports = router;
