const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  registerUser,
  login,
  updateProfile,
  getAllUsers,
  getUserByUserId,
  getUserByFirstName,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", login);
router.put(
  "/profile",
  authMiddleware,
  upload.single("profilePicture"),
  updateProfile
);
router.get("/all-users", getAllUsers);
router.get("/:userId", authMiddleware, getUserByUserId);
router.get('/firstname/:firstName', getUserByFirstName);


module.exports = router;
