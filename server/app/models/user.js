const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photoURL: {
    type: DataTypes.STRING
  },
  socketId: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    isLowercase: true,
    isEmail: true
  },
  biography: {
    type: DataTypes.STRING  
  }
});

module.exports = sequelize.model('user', User);