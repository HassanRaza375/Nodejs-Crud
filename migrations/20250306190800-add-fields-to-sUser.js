"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add columns to the existing table `sUsers`
    await queryInterface.addColumn("sUsers", "activeUser", {
      type: Sequelize.BOOLEAN, // Field type
      allowNull: false, // Not nullable
      defaultValue: true, // Default value
    });

    await queryInterface.addColumn("sUsers", "amount", {
      type: Sequelize.DECIMAL(10, 2), // Decimal with precision
      allowNull: false, // Not nullable
      defaultValue: 0.0, // Default value
    });

    await queryInterface.addColumn("sUsers", "paymentStatus", {
      type: Sequelize.STRING, // Field type
      allowNull: false, // Not nullable
      defaultValue: "active", // Default value
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the added columns from `sUsers`
    await queryInterface.removeColumn("sUsers", "activeUser");
    await queryInterface.removeColumn("sUsers", "amount");
    await queryInterface.removeColumn("sUsers", "paymentStatus");
  },
};
