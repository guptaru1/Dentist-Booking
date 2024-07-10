const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./User');
const AvailableSlot = require('./AvailableSlot');

const Appointment = sequelize.define('Appointment', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  slotId: {
    type: DataTypes.INTEGER,
    references: {
      model: AvailableSlot,
      key: 'id'
    }
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Appointment;