const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/mailSender");
const { generateRandomPassword } = require("../utils/generateRandomPassword");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, mobileNumber } = req.body;
  try {
    if (!firstName || !lastName || !email || !mobileNumber) {
      return res.status(400).json({
        status: false,
        message: "All Fields are required",
      });
    }

    let user = await User.findOne({ firstName });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const password = generateRandomPassword(firstName, lastName, mobileNumber);

    user = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    });

    await user.save();

    const emailBody = `
      Thank you for creating an account. Here are your account details:
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Password: ${password}
    `;

    await sendEmail(email, "Thank You For Creating Your Account", emailBody);

    return res.status(201).json({
      success: true,
      message: "User registered successfully, Please Check your Email",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { firstName, password } = req.body;
  try {
    const user = await User.findOne({ firstName });
    console.log(user);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (password !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.updateProfile = async (req, res) => {
  const { bio } = req.body;
  let profilePicture = req.file ? req.file.path : null; 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, 
      { bio, profilePicture }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Error updating profile', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()?.populate('videos');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.uploadProfilePicture = (req, res, next) => {
  upload.single('profilePicture')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer error', error: err });
    } else if (err) {
      return res.status(400).json({ message: 'Error uploading profile picture', error: err });
    }
    next();
  });
};
