const otpGenerator = require("otp-generator");

const generatedOtp = () => {
  const OTP = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

module.exports = generatedOtp;
