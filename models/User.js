//Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
//Import bcrypt for password
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//User inherits all properties and moethods from Model
class User extends Model {
  //Call checkPassword helper function
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//Column strcuture for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    //Hook to bcrypt password before user creation
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
