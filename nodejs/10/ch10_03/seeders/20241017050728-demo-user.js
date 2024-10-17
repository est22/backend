"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Blossom",
        email: "blossom@gmail.com",
        password: "admin1234",
        address: "Seoul, Korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bubble",
        email: "bubble@gmail.com",
        password: "admin1234",
        address: "Paris, France",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Buttercup",
        email: "buttercup@gmail.com",
        password: "admin1234",
        address: "SF, US",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
