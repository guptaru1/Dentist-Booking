const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  medicalAid: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
