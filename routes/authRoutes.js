const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  registerUser,
  login,
  updateProfile,
  getAllUsers,
} = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", login);
router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePicture"),
  updateProfile
);
router.get("/all-users", authMiddleware, getAllUsers);

module.exports = router;
