const User = require("../Models/userModel");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) return true;
  else return false;
}

function isInteger(str) {
  return !isNaN(parseInt(str)) && isFinite(parseInt(str));
}

exports.saveUser = async (req, res) => {
  try {
    const { name, email, age, gender, bio } = req.body;
    const id = +req.user.id;
    if (isStringInvalid(name) || isStringInvalid(email) || !isInteger(age)) {
      return res
        .status(400)
        .json({ err: "Bad parameter. Something is missing!" });
    }

    const user = await User.update(
      {
        name: name,
        email: email,
        age: Number(age),
        gender: gender,
        bio: bio,
      },
      {
        where: { id: id },
      }
    );
    res
      .status(200)
      .json({ success: true, message: "User data saved successfully!" });
  } catch (err) {
    if (err.message === "Validation error") {
      res
        .status(500)
        .json({ success: false, message: "Email id already exists!" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = +req.user.id;
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      res.status(200).json({ message: "Success", user: user });
    }
  } catch (err) {
    console.log(err);
  }
};
