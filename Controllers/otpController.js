const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const generateOTP = require("../services/generateOtp");
const jwt = require("jsonwebtoken");

const OTP = require("../Models/otpModel");
const User = require("../Models/userModel");

function generateToken(id, email) {
  return jwt.sign({ id: id, email: email }, process.env.SECRET_TOKEN);
}

exports.sendOtp = async (req, res) => {
  const otp = generateOTP();
  console.log("otp>>>", otp);
  const { email } = req.body;
  const otpObj = await OTP.create({
    email: email,
    generatedOtp: otp,
    isActive: true,
  });

  console.log(otpObj);
  let transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // secure: false,
    service: "Gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const sendEmail = () => {
    try {
      console.log(email);

      if (otpObj) {
        var mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject: "Generated OTP",
          text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent successfully!");
            res
              .status(200)
              .json({ message: `OTP send successfully to ${email}` });
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
  sendEmail();
};

exports.validateOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpObj = await OTP.findOne({
      where: { email: email, isActive: true },
      order: [["updatedAt", "DESC"]],
    });
    console.log("otp>>>", otp);
    console.log("otp from db>>>", otpObj.generatedOtp);
    if (otp === otpObj.generatedOtp) {
      await OTP.update(
        { isActive: false },
        { where: { email: email, generatedOtp: otp } }
      );
      let user = await User.findOne({ where: { email: email } });
      //   console.log("existing user>>", user);
      if (!user) {
        user = await User.create({ email: email });
        // console.log("new user>>>", user);
      }
      res.status(200).json({
        message: "OTP verification successful",
        token: generateToken(user.id, user.email),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid OTP!!" });
      //   throw new Error("Invalid otp!!!");
    }
  } catch (err) {
    console.log("BE>>>", err);
    res.status(500).json({ error: err.message });
  }
};
