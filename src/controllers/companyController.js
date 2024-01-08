const Company = require("../models/Company");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.registerCompany = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Extract company and user details from the request body
    const {
      companyName,
      address,
      contactInfo,
      logo,
      username,
      email,
      password,
      avatar, // Include avatar field
    } = req.body;

    // Create and save the new company
    const company = new Company({
      name: companyName,
      address,
      contactInfo,
      logo,
    });
    await company.save({ session });

    // Create and save the new superuser, linked to the company
    const superUser = new User({
      username,
      email,
      password: password,
      company: company._id,
      isSuperUser: true,
      avatar, // Save avatar path
    });
    await superUser.save({ session });

    // Add the superuser reference to the company
    company.superUser = superUser._id;
    await company.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      company,
      superUser: {
        id: superUser._id,
        username,
        email,
        avatar, // Include avatar in the response
      },
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};
