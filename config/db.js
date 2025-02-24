const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.SQLSERVER_DATABASE,
  process.env.SQLSERVER_USER,
  process.env.SQLSERVER_PASSWORD,
  {
    port: process.env.SQLSERVER_PORT,
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true, // Enable encryption for secure connections
        trustServerCertificate: true, // Allow self-signed certificates
      },
    },
  }
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to SQL database successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

module.exports = { sequelize, connectDB };
