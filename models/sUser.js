const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const sUser = sequelize.define("sUser", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activeUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // User is active by default at signup
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "un-paid",
  },
});

module.exports = sUser;
