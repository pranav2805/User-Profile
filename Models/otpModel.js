const { INTEGER, STRING, BOOLEAN, NUMBER } = require("sequelize");
const sequelize = require("../util/database");

const OTP = sequelize.define("otp", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: STRING,
  },
  generatedOtp: {
    type: STRING,
  },
  isActive: {
    type: BOOLEAN,
    default: true,
  },
});

module.exports = OTP;
