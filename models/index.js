const { sequelize, connectDB } = require("../config/db");
const User = require("../models/User");

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Set `force: true` to reset tables during development
    console.log("Database synchronized successfully.");
  } catch (err) {
    console.error("Error synchronizing models:", err.message);
  }
};

module.exports = { connectDB, syncModels, User };
