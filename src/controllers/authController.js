const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Company = require("../models/Company");
const config = require("../config/config");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Fetch the associated company information
    const company = await Company.findById(user.company).exec();

    const token = jwt.sign(
      {
        userId: user._id,
        isSuperUser: user.isSuperUser,
        companyID: user.company,
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        companyId: user.company,
        companyName: company ? company.name : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
