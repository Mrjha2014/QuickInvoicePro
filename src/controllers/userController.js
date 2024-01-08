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
      return res.status(400).json({ message: "Email is already in use. Please choose a different email." });
    }

    const { userId } = req.user;
    const userDetails = await User.findById(userId).select("company").exec();
    const companyId = userDetails.company;

    const newUser = new User({
      username,
      email,
      password: password,
      company: companyId, // Set the company ID to the superuser's company
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
