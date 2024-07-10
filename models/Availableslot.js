const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const AvailableSlot = sequelize.define('AvailableSlot', {
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = AvailableSlot;