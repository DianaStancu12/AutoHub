const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const AdRequest = sequelize.define('AdRequest', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  }
});

User.hasMany(AdRequest, { as: 'adRequests', foreignKey: 'userId' });
AdRequest.belongsTo(User, { foreignKey: 'userId' });

module.exports = AdRequest;
