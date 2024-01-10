const express = require("express");
const userController = require("../controllers/userController");
const {
  requireSuperUser,
  authenticate,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Add user in compney
router.post("/add-user", requireSuperUser, userController.addUserBySuperuser);

// Get all user of compney
router.get(
  "/company-users",
  requireSuperUser,
  userController.getUsersInCompany
);

//  Route for superuser to remove a user
router.delete(
  "/remove-user/:userId",
  requireSuperUser,
  userController.removeUserBySuperuser
);

// Route for Regular User to Update Their Own Details
router.put(
  "/update-my-details",
  authenticate,
  userController.updateUser
);

// Route for Super User to Update User  Details

router.put(
  "/update-user/:userId",
  requireSuperUser,
  userController.updateUserBySuperuser
);

module.exports = router;
