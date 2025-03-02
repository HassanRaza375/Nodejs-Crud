const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Blog;
