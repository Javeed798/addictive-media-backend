const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connectDb");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require('./routes/videoRoute');

require("dotenv").config();



app.use(cors());
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",authRoutes);
app.use("/api/video",videoRoutes)

app.get("/",(req,res) => {
  res.send("Hello, World!");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
