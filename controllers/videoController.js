const User = require("../models/userModel");
const Video = require("../models/videoModel");

exports.addVideo = async (req, res) => {

  const { title, description } = req.body;
  const videoPath = req.file.path;
  console.log(req.body);
  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required"
      });
    }

    if(title.length > 30 || description.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Title and Description Should Not Exceed 30 and 120 Characters Respectively"
      })
    }
    const video = new Video({
      title,
      description,
      videoPath,
      user: req.userId,
    });
    await video.save();

    const user = await User.findById(req.userId);
    user.videos.push(video._id);
    await user.save();

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error });
  }
};
