const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoute = require("./Routes/Auth");
const UserRoute = require("./Routes/User");
const PostRoute = require("./Routes/Post");
const ApplyRoute = require("./Routes/Application");
const multer = require("multer");
const path = require("path");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Server is Connected to Database"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/apply", ApplyRoute);
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server is up and running at port " + port);
});
