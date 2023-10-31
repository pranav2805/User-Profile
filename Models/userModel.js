const { INTEGER, STRING, TEXT } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: STRING,
  age: INTEGER,
  email: {
    type: STRING,
    unique: true,
  },
  gender: STRING,
  bio: TEXT,
});

module.exports = User;
