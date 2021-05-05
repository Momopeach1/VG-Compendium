const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: {
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

User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

User.addHook('beforeValidate', (user, options) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


module.exports = User;