const mongoose = require("mongoose");
const Video = require('./videoModel');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bio: { 
    type: String, 
    default: "",
    maxLength:500,
  },
  profilePicture: { 
    type: String, 
    default: "" 
  },
  mobileNumber : {
    type : Number,
    required: true,
    unique: true,
    maxLength: 10
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
