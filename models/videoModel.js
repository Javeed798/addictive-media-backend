const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    maxlength: 30 
  },
  description: { 
    type: String, 
    maxlength: 120 
  },
  videoPath: { 
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
