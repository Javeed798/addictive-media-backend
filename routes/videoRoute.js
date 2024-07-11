const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { addVideo } = require("../controllers/videoController");
const upload = require("../config/multerConfig");

router.post('/upload', authMiddleware, upload.single('video'), addVideo);

module.exports = router;
