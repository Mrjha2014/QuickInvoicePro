const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.addUserBySuperuser = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only superusers can add users." });
    }

    const { username, email, password, isSuperUser } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use. Please choose a different email.",
      });
    }

    const newUser = new User({
      username,
      email,
      password: password,
      company: req.user.companyID, // Set the company ID to the superuser's company
      isSuperUser: isSuperUser || false,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User added successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all user
exports.getUsersInCompany = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res.status(403).json({
        message: "Only superusers can view all users in the company.",
      });
    }

    const users = await User.find({ company: req.user.companyID }).select(
      "-password"
    ); // Exclude passwords in the output

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove user
exports.removeUserBySuperuser = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only superusers can remove users." });
    }

    const { userId } = req.params;
    const userToRemove = await User.findById(userId);

    if (!userToRemove) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userToRemove.company.toString() !== req.user.companyID) {
      return res
        .status(403)
        .json({ message: "Cannot remove a user from a different company." });
    }

    await User.findByIdAndDelete(userId); // Correct method to use
    res.json({ message: "User removed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// User can update their own details
exports.updateUser = async (req, res) => {
  try {
    // Use the authenticated user's ID from req.user
    const userId = req.user.userId;

    const updateData = { ...req.body };
    delete updateData.isSuperUser; // Prevent updating the isSuperUser field

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Details updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Super-user can update detales of user of own compney
exports.updateUserBySuperuser = async (req, res) => {
  try {
    if (!req.user.isSuperUser) {
      return res
        .status(403)
        .json({ message: "Only superusers can update user details." });
    }

    const { userId } = req.params;
    const userToUpdate = await User.findById(userId);

    // Check if the user exists and belongs to the same company as the superuser
    if (
      !userToUpdate ||
      userToUpdate.company.toString() !== req.user.companyID
    ) {
      return res
        .status(404)
        .json({ message: "User not found in your company." });
    }

    const updateData = req.body; // Data to be updated

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");
    res.json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
