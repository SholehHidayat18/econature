'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Relawans', [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        alamat: '123 Main Street, Jakarta',
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        alamat: '456 Maple Avenue, Bandung',
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        alamat: '789 Elm Road, Surabaya',
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Relawans', null, {});
  }
};