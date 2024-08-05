const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rating = require('./Rating');

const Ad = sequelize.define('Ad', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isOnlineAppointment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is24_7: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  paymentMethods: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workingHours: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  provider:{
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

Ad.hasMany(Rating, { foreignKey: 'adId' });
Rating.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = Ad;
