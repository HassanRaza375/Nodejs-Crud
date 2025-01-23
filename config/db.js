const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    port:process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

module.exports = { sequelize, connectDB };
