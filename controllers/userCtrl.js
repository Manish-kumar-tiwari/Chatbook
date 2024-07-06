const bcrtpt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerCtrl = async (req, res) => {
  try {
    const { username, fullName, password, confirmPassword, gender } = req.body;
    if (!username || !fullName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        msg: "Password and Confirm Password not matched",
      });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "Username already exists",
      });
    }

    const hashPassword = await bcrtpt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      username,
      fullName,
      gender,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      msg: "User registered SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(200).json({
        success: false,
        msg: "Invalid Credential",
      });
    }

    const isMatched = await bcrtpt.compare(password, user.password);
    if (!isMatched) {
      return res.status(200).json({
        success: false,
        msg: "Invalid Credential",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    user.password = "";

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        user,
        msg: "Login Successfull ",
      });
  } catch (error) {
    console.log(error);
  }
};

const logoutCtrl = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      msg: "Logout SuccessFull",
    });
  } catch (error) {
    console.log(error);
  }
};

const getOtherUsers = async (req, res) => {
  try {
    const id = req.id;
    const otherUsers = await User.find({
      _id: { $ne: id },
    }).select("-password");

    return res.status(201).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerCtrl, loginCtrl, logoutCtrl, getOtherUsers };
