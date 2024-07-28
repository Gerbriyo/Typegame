const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('Type', 'postgres', 'qwert@123', {
  // Uncomment and set your host if not using default
  host: 'localhost',
  dialect: 'postgres'
});

// Create a new instance of Sequelize

let db = {};

// Import the User model
const User = require('../models/user.model')(sequelize, DataTypes);

db.User = User;
db.sequelize = sequelize;

module.exports = db;
