'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo1',
        lastName: 'User1',
        email: 'demo1@user.com',
        username: 'demo1',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo2',
        lastName: 'User2',
        email: 'demo2@user.com',
        username: 'demo2',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo3',
        lastName: 'User3',
        email: 'demo3@user.com',
        username: 'demo3',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo4',
        lastName: 'User4',
        email: 'demo4@user.com',
        username: 'demo4',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo5',
        lastName: 'User5',
        email: 'demo5@user.com',
        username: 'demo5',
        password: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'] }
    }, {});
  }
};
