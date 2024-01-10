require('dotenv').config(); // This will load environment variables from a .env file

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI, // Database connection URI
  jwtSecret: process.env.JWT_SECRET, // Secret key for JWT
  // Add other configurations as needed
};

module.exports = config;
